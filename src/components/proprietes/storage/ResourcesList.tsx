
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Eye, Edit, Trash2, Plus } from 'lucide-react';
import { Resource, ResourcesListProps } from './types';

const ResourcesList: React.FC<ResourcesListProps> = ({ 
  searchTerm = '', 
  onResourceSelect, 
  onAddResource,
  filters 
}) => {
  // Example resources for demo
  const [resources, setResources] = React.useState<Resource[]>([
    {
      id: '1',
      name: 'Blé',
      quantity: 500,
      unit: 'kg',
      category: 'Céréales',
      location: 'Grenier principal',
      quality: 'Standard',
      origin: 'Campanie',
      lastUpdate: new Date(2022, 2, 15)
    },
    {
      id: '2',
      name: 'Huile d\'olive',
      quantity: 100,
      unit: 'litres',
      category: 'Huiles',
      location: 'Cellier',
      quality: 'Supérieure',
      origin: 'Italie',
      lastUpdate: new Date(2022, 3, 10)
    },
    {
      id: '3',
      name: 'Vin',
      quantity: 50,
      unit: 'amphores',
      category: 'Boissons',
      location: 'Cave',
      quality: 'Premium',
      origin: 'Grèce',
      lastUpdate: new Date(2022, 1, 20)
    }
  ]);
  
  // Filter resources based on search term and filters
  const filteredResources = resources.filter(resource => {
    // Search term filter
    if (searchTerm && !resource.name.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    
    // Apply other filters if provided
    if (filters) {
      if (filters.category && resource.category !== filters.category) {
        return false;
      }
      if (filters.location && resource.location !== filters.location) {
        return false;
      }
      if (filters.minQuantity !== undefined && resource.quantity < filters.minQuantity) {
        return false;
      }
      if (filters.maxQuantity !== undefined && resource.quantity > filters.maxQuantity) {
        return false;
      }
      if (filters.quality && resource.quality !== filters.quality) {
        return false;
      }
    }
    
    return true;
  });
  
  const handleDelete = (id: string) => {
    setResources(resources.filter(resource => resource.id !== id));
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>Ressources</span>
          {onAddResource && (
            <Button onClick={onAddResource} size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Ajouter
            </Button>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nom</TableHead>
              <TableHead>Quantité</TableHead>
              <TableHead>Catégorie</TableHead>
              <TableHead>Emplacement</TableHead>
              <TableHead>Qualité</TableHead>
              <TableHead>Dernière mise à jour</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredResources.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-4">
                  Aucune ressource trouvée
                </TableCell>
              </TableRow>
            ) : (
              filteredResources.map(resource => (
                <TableRow key={resource.id}>
                  <TableCell>{resource.name}</TableCell>
                  <TableCell>{resource.quantity} {resource.unit}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{resource.category}</Badge>
                  </TableCell>
                  <TableCell>{resource.location}</TableCell>
                  <TableCell>{resource.quality || 'Standard'}</TableCell>
                  <TableCell>{resource.lastUpdate.toLocaleDateString()}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      {onResourceSelect && (
                        <Button variant="ghost" size="icon" onClick={() => onResourceSelect(resource)}>
                          <Eye className="h-4 w-4" />
                        </Button>
                      )}
                      <Button variant="ghost" size="icon">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDelete(resource.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter className="flex justify-between">
        <div>Total: {filteredResources.length} ressources</div>
      </CardFooter>
    </Card>
  );
};

export default ResourcesList;
