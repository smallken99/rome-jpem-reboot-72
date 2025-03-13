
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { formatMoney } from '@/utils/formatUtils';
import { TrendingDown, TrendingUp, ArrowRight } from 'lucide-react';

interface Resource {
  id: string;
  name: string;
  category: string;
  quantity: number;
  unit: string;
  value: number;
  location: string;
  lastUpdate: string;
  trend: 'up' | 'down' | 'stable';
}

interface ResourceTableProps {
  searchTerm: string;
}

export const ResourceTable: React.FC<ResourceTableProps> = ({ searchTerm }) => {
  // Mock data - would come from an API in a real app
  const resources: Resource[] = [
    {
      id: '1',
      name: 'Blé',
      category: 'Nourriture',
      quantity: 2000,
      unit: 'kg',
      value: 2000,
      location: 'Entrepôt d\'Ostie',
      lastUpdate: '20 Mai 2024',
      trend: 'up'
    },
    {
      id: '2',
      name: 'Vin',
      category: 'Boisson',
      quantity: 500,
      unit: 'litres',
      value: 5000,
      location: 'Cave de la Villa',
      lastUpdate: '15 Mai 2024',
      trend: 'stable'
    },
    {
      id: '3',
      name: 'Huile d\'olive',
      category: 'Nourriture',
      quantity: 300,
      unit: 'litres',
      value: 3000,
      location: 'Entrepôt d\'Ostie',
      lastUpdate: '10 Mai 2024',
      trend: 'up'
    },
    {
      id: '4',
      name: 'Laine',
      category: 'Textile',
      quantity: 150,
      unit: 'kg',
      value: 1500,
      location: 'Atelier de Rome',
      lastUpdate: '5 Mai 2024',
      trend: 'down'
    },
    {
      id: '5',
      name: 'Marbre',
      category: 'Construction',
      quantity: 10,
      unit: 'blocs',
      value: 10000,
      location: 'Carrière de Carrare',
      lastUpdate: '1 Mai 2024',
      trend: 'stable'
    }
  ];
  
  // Filter resources based on search term
  const filteredResources = resources.filter(resource => 
    resource.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    resource.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    resource.location.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Category counts
  const categories = filteredResources.reduce((acc, resource) => {
    acc[resource.category] = (acc[resource.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  // Calculate total value
  const totalValue = filteredResources.reduce((sum, resource) => sum + resource.value, 0);
  
  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="h-4 w-4 text-green-500" />;
      case 'down':
        return <TrendingDown className="h-4 w-4 text-red-500" />;
      default:
        return <ArrowRight className="h-4 w-4 text-gray-500" />;
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 bg-blue-50 rounded-md">
          <h3 className="text-sm font-medium text-blue-800">Valeur totale du stock</h3>
          <p className="text-2xl font-bold text-blue-700 mt-1">{formatMoney(totalValue)}</p>
        </div>
        
        <div className="p-4 bg-amber-50 rounded-md">
          <h3 className="text-sm font-medium text-amber-800">Types de ressources</h3>
          <div className="flex flex-wrap gap-2 mt-2">
            {Object.entries(categories).map(([category, count]) => (
              <Badge key={category} variant="outline" className="bg-amber-100">
                {category}: {count}
              </Badge>
            ))}
          </div>
        </div>
        
        <div className="p-4 bg-green-50 rounded-md">
          <h3 className="text-sm font-medium text-green-800">Stockage disponible</h3>
          <p className="text-lg font-medium text-green-700 mt-1">4 entrepôts actifs</p>
          <p className="text-sm text-green-600">Capacité utilisée: 65%</p>
        </div>
      </div>
      
      <div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Ressource</TableHead>
              <TableHead>Catégorie</TableHead>
              <TableHead>Quantité</TableHead>
              <TableHead>Valeur</TableHead>
              <TableHead>Emplacement</TableHead>
              <TableHead>Tendance</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredResources.map((resource) => (
              <TableRow key={resource.id}>
                <TableCell className="font-medium">{resource.name}</TableCell>
                <TableCell>{resource.category}</TableCell>
                <TableCell>{resource.quantity} {resource.unit}</TableCell>
                <TableCell>{formatMoney(resource.value)}</TableCell>
                <TableCell>{resource.location}</TableCell>
                <TableCell>
                  <div className="flex items-center">
                    {getTrendIcon(resource.trend)}
                    <span className="ml-2 text-sm">
                      {resource.trend === 'up' ? 'En hausse' : 
                       resource.trend === 'down' ? 'En baisse' : 
                       'Stable'}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      Détails
                    </Button>
                    <Button size="sm" variant="outline">
                      Transférer
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {filteredResources.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-4 text-muted-foreground">
                  Aucune ressource trouvée
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
