
import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MoreHorizontal, Search, PlusCircle } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Resource {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  value: number;
  location: string;
  lastUpdated: Date;
}

interface ResourcesTableProps {
  onManageClick?: (resource: Resource) => void;
  onAddResourceClick?: () => void;
}

export const ResourcesTable: React.FC<ResourcesTableProps> = ({
  onManageClick,
  onAddResourceClick,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Mock resources - in a real implementation, this would come from a hook or context
  const resources: Resource[] = [
    {
      id: 'res-1',
      name: 'Blé',
      quantity: 1000,
      unit: 'kg',
      value: 5000,
      location: 'Entrepôt Principal',
      lastUpdated: new Date('2023-07-15')
    },
    {
      id: 'res-2',
      name: 'Huile d\'olive',
      quantity: 500,
      unit: 'litres',
      value: 7500,
      location: 'Entrepôt Principal',
      lastUpdated: new Date('2023-07-12')
    },
    {
      id: 'res-3',
      name: 'Vin',
      quantity: 200,
      unit: 'amphores',
      value: 10000,
      location: 'Cave Vinicole',
      lastUpdated: new Date('2023-07-10')
    },
    {
      id: 'res-4',
      name: 'Tissu de laine',
      quantity: 100,
      unit: 'rouleaux',
      value: 3000,
      location: 'Magasin de Textiles',
      lastUpdated: new Date('2023-07-08')
    },
    {
      id: 'res-5',
      name: 'Marbre',
      quantity: 50,
      unit: 'blocs',
      value: 15000,
      location: 'Dépôt de Matériaux',
      lastUpdated: new Date('2023-07-05')
    }
  ];
  
  // Filter resources based on search term
  const filteredResources = resources.filter(resource =>
    resource.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    resource.location.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Ressources</CardTitle>
        <Button onClick={onAddResourceClick} size="sm">
          <PlusCircle className="h-4 w-4 mr-1" />
          Ajouter Ressource
        </Button>
      </CardHeader>
      <CardContent>
        <div className="mb-4 relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Rechercher des ressources..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nom</TableHead>
                <TableHead>Quantité</TableHead>
                <TableHead className="hidden md:table-cell">Valeur</TableHead>
                <TableHead className="hidden md:table-cell">Emplacement</TableHead>
                <TableHead className="hidden md:table-cell">Dernière Mise à Jour</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredResources.length > 0 ? (
                filteredResources.map(resource => (
                  <TableRow key={resource.id}>
                    <TableCell>{resource.name}</TableCell>
                    <TableCell>{resource.quantity} {resource.unit}</TableCell>
                    <TableCell className="hidden md:table-cell">{resource.value} as</TableCell>
                    <TableCell className="hidden md:table-cell">{resource.location}</TableCell>
                    <TableCell className="hidden md:table-cell">{resource.lastUpdated.toLocaleDateString()}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => onManageClick?.(resource)}>
                            Gérer
                          </DropdownMenuItem>
                          <DropdownMenuItem>Historique</DropdownMenuItem>
                          <DropdownMenuItem>Déplacer</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-6">
                    Aucune ressource trouvée
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
