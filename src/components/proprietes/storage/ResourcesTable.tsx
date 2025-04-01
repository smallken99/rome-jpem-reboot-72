
import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, PlusCircle } from 'lucide-react';

interface Resource {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  value: number;
  location: string;
  category: string;
  lastUpdated: string;
}

interface ResourcesTableProps {
  onAddResource: () => void;
}

export const ResourcesTable: React.FC<ResourcesTableProps> = ({ onAddResource }) => {
  const [searchQuery, setSearchQuery] = useState('');
  
  // Mock resources data - in a real implementation, this would come from a hook or context
  const resources: Resource[] = [
    {
      id: 'res-1',
      name: 'Blé',
      quantity: 5000,
      unit: 'kg',
      value: 25000,
      location: 'Entrepôt Principal',
      category: 'Nourriture',
      lastUpdated: '15 Mars, 705 AUC'
    },
    {
      id: 'res-2',
      name: 'Huile d\'olive',
      quantity: 1200,
      unit: 'l',
      value: 18000,
      location: 'Villa Toscane',
      category: 'Nourriture',
      lastUpdated: '10 Avril, 705 AUC'
    },
    {
      id: 'res-3',
      name: 'Vin',
      quantity: 800,
      unit: 'l',
      value: 24000,
      location: 'Cave de la Domus',
      category: 'Boisson',
      lastUpdated: '5 Mai, 705 AUC'
    },
    {
      id: 'res-4',
      name: 'Bois de construction',
      quantity: 350,
      unit: 'unités',
      value: 8000,
      location: 'Chantier Naval',
      category: 'Matériaux',
      lastUpdated: '2 Juin, 705 AUC'
    }
  ];
  
  // Filter resources based on search query
  const filteredResources = resources.filter(resource =>
    resource.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    resource.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    resource.location.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Rechercher des ressources..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            Filtrer
          </Button>
          <Button onClick={onAddResource} className="flex items-center gap-2">
            <PlusCircle className="h-4 w-4" />
            Ajouter
          </Button>
        </div>
      </div>
      
      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nom</TableHead>
              <TableHead>Quantité</TableHead>
              <TableHead className="hidden md:table-cell">Valeur</TableHead>
              <TableHead className="hidden md:table-cell">Emplacement</TableHead>
              <TableHead className="hidden lg:table-cell">Catégorie</TableHead>
              <TableHead className="hidden lg:table-cell">Dernière mise à jour</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredResources.length > 0 ? (
              filteredResources.map(resource => (
                <TableRow key={resource.id}>
                  <TableCell>{resource.name}</TableCell>
                  <TableCell>
                    {resource.quantity} {resource.unit}
                    {resource.quantity < 500 && (
                      <Badge variant="destructive" className="ml-2">Faible</Badge>
                    )}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">{resource.value.toLocaleString()} as</TableCell>
                  <TableCell className="hidden md:table-cell">{resource.location}</TableCell>
                  <TableCell className="hidden lg:table-cell">{resource.category}</TableCell>
                  <TableCell className="hidden lg:table-cell">{resource.lastUpdated}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">Détails</Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-6">
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
