
import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Resource, ResourcesListProps } from './types';
import { Plus, ArrowUpDown, Filter } from 'lucide-react';

// Données mockées
const mockResources: Resource[] = [
  {
    id: '1',
    name: 'Blé',
    quantity: 500,
    unit: 'modii',
    category: 'Céréales',
    location: 'Grenier Principal',
    lastUpdate: new Date('2023-09-01'),
    quality: 'Excellente',
    origin: 'Sicile'
  },
  {
    id: '2',
    name: 'Vin',
    quantity: 200,
    unit: 'amphores',
    category: 'Boissons',
    location: 'Cave du Palatin',
    lastUpdate: new Date('2023-08-15'),
    quality: 'Supérieure',
    origin: 'Campanie'
  },
  {
    id: '3',
    name: 'Huile d\'olive',
    quantity: 150,
    unit: 'amphores',
    category: 'Huiles',
    location: 'Entrepôt du Port',
    lastUpdate: new Date('2023-08-30'),
    quality: 'Bonne',
    origin: 'Bétique'
  }
];

export const ResourcesList: React.FC<ResourcesListProps> = ({
  searchTerm = '',
  onResourceSelect,
  onAddResource,
  filters = {}
}) => {
  const [resources, setResources] = useState<Resource[]>([]);
  const [sortField, setSortField] = useState<keyof Resource>('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  // Effet de filtrage et tri
  useEffect(() => {
    let filteredResources = [...mockResources];

    // Filtrage par terme de recherche
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filteredResources = filteredResources.filter(resource =>
        resource.name.toLowerCase().includes(term) ||
        resource.category.toLowerCase().includes(term) ||
        resource.location.toLowerCase().includes(term)
      );
    }

    // Filtrage par catégorie
    if (filters.category) {
      filteredResources = filteredResources.filter(resource =>
        resource.category === filters.category
      );
    }

    // Filtrage par lieu
    if (filters.location) {
      filteredResources = filteredResources.filter(resource =>
        resource.location === filters.location
      );
    }

    // Filtrage par quantité
    if (filters.minQuantity !== undefined) {
      filteredResources = filteredResources.filter(resource =>
        resource.quantity >= filters.minQuantity!
      );
    }
    if (filters.maxQuantity !== undefined) {
      filteredResources = filteredResources.filter(resource =>
        resource.quantity <= filters.maxQuantity!
      );
    }

    // Filtrage par qualité
    if (filters.quality) {
      filteredResources = filteredResources.filter(resource =>
        resource.quality === filters.quality
      );
    }

    // Tri des ressources
    filteredResources.sort((a, b) => {
      if (sortDirection === 'asc') {
        return a[sortField] > b[sortField] ? 1 : -1;
      } else {
        return a[sortField] < b[sortField] ? 1 : -1;
      }
    });

    setResources(filteredResources);
  }, [searchTerm, filters, sortField, sortDirection]);

  // Gestion du tri
  const handleSort = (field: keyof Resource) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Ressources</CardTitle>
        <Button onClick={onAddResource} className="gap-1">
          <Plus className="h-4 w-4" />
          <span>Ajouter</span>
        </Button>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="cursor-pointer" onClick={() => handleSort('name')}>
                  Nom
                  <ArrowUpDown className="ml-2 h-4 w-4 inline" />
                </TableHead>
                <TableHead className="cursor-pointer" onClick={() => handleSort('quantity')}>
                  Quantité
                  <ArrowUpDown className="ml-2 h-4 w-4 inline" />
                </TableHead>
                <TableHead className="cursor-pointer" onClick={() => handleSort('category')}>
                  Catégorie
                  <ArrowUpDown className="ml-2 h-4 w-4 inline" />
                </TableHead>
                <TableHead className="cursor-pointer" onClick={() => handleSort('location')}>
                  Emplacement
                  <ArrowUpDown className="ml-2 h-4 w-4 inline" />
                </TableHead>
                <TableHead className="cursor-pointer" onClick={() => handleSort('lastUpdate')}>
                  Dernière mise à jour
                  <ArrowUpDown className="ml-2 h-4 w-4 inline" />
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {resources.length > 0 ? (
                resources.map((resource) => (
                  <TableRow 
                    key={resource.id} 
                    className="cursor-pointer hover:bg-primary/5"
                    onClick={() => onResourceSelect && onResourceSelect(resource)}
                  >
                    <TableCell className="font-medium">{resource.name}</TableCell>
                    <TableCell>{resource.quantity} {resource.unit}</TableCell>
                    <TableCell>{resource.category}</TableCell>
                    <TableCell>{resource.location}</TableCell>
                    <TableCell>{resource.lastUpdate.toLocaleDateString()}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="h-24 text-center">
                    Aucune ressource trouvée.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};
