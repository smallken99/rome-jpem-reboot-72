
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowUpDown, Package, Edit, Trash } from 'lucide-react';
import { formatNumber } from '@/utils/formatUtils';

interface Resource {
  id: string;
  name: string;
  quantity: number;
  type: string;
  location: string;
  quality: 'low' | 'medium' | 'high';
  lastUpdated: Date;
}

interface ResourcesListProps {
  searchTerm?: string;
}

export const ResourcesList: React.FC<ResourcesListProps> = ({ searchTerm = '' }) => {
  // Données fictives de ressources
  const resources: Resource[] = [
    {
      id: '1',
      name: 'Blé',
      quantity: 15000,
      type: 'Céréale',
      location: 'Entrepôt du Tibre',
      quality: 'high',
      lastUpdated: new Date(2023, 4, 15)
    },
    {
      id: '2',
      name: 'Vin',
      quantity: 500,
      type: 'Boisson',
      location: 'Villa Campanie',
      quality: 'medium',
      lastUpdated: new Date(2023, 5, 2)
    },
    {
      id: '3',
      name: 'Huile d\'olive',
      quantity: 800,
      type: 'Condiment',
      location: 'Entrepôt du Tibre',
      quality: 'high',
      lastUpdated: new Date(2023, 3, 28)
    },
    {
      id: '4',
      name: 'Laine',
      quantity: 2500,
      type: 'Textile',
      location: 'Magasin Rome',
      quality: 'medium',
      lastUpdated: new Date(2023, 5, 10)
    },
    {
      id: '5',
      name: 'Marbre',
      quantity: 120,
      type: 'Matériau',
      location: 'Carrière de Luni',
      quality: 'high',
      lastUpdated: new Date(2023, 2, 5)
    }
  ];

  // Filtrer les ressources par le terme de recherche
  const filteredResources = resources.filter(resource =>
    resource.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    resource.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    resource.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Obtenir la couleur de badge en fonction de la qualité
  const getQualityBadge = (quality: string) => {
    switch (quality) {
      case 'high': return 'bg-green-100 text-green-800 border-green-200';
      case 'medium': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'low': return 'bg-amber-100 text-amber-800 border-amber-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Inventaire des ressources</h3>
        <Button size="sm">
          <Package className="h-4 w-4 mr-2" /> Ajouter une ressource
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nom</TableHead>
            <TableHead>
              <div className="flex items-center">
                Quantité
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </div>
            </TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Lieu de stockage</TableHead>
            <TableHead>Qualité</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredResources.length > 0 ? (
            filteredResources.map((resource) => (
              <TableRow key={resource.id}>
                <TableCell className="font-medium">{resource.name}</TableCell>
                <TableCell>{formatNumber(resource.quantity)}</TableCell>
                <TableCell>{resource.type}</TableCell>
                <TableCell>{resource.location}</TableCell>
                <TableCell>
                  <Badge className={getQualityBadge(resource.quality)}>
                    {resource.quality === 'high' ? 'Haute' : 
                     resource.quality === 'medium' ? 'Moyenne' : 'Basse'}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button size="icon" variant="ghost">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button size="icon" variant="ghost" className="text-destructive">
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-4 text-muted-foreground">
                Aucune ressource trouvée
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};
