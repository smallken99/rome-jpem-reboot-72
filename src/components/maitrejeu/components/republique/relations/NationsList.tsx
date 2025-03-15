
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Eye, Edit, Trash } from 'lucide-react';
import { nationsMock } from './data';

export interface NationsListProps {
  isEditable?: boolean;
  searchTerm?: string;
  filters?: any;
}

export const NationsList: React.FC<NationsListProps> = ({ 
  isEditable = true,
  searchTerm = '',
  filters = {}
}) => {
  const nations = nationsMock;
  
  const filteredNations = nations.filter(nation => {
    // Appliquer la recherche par texte
    if (searchTerm && !nation.name.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    
    // Appliquer les filtres
    if (filters.status && nation.status !== filters.status) {
      return false;
    }
    
    if (filters.region && nation.region !== filters.region) {
      return false;
    }
    
    return true;
  });
  
  // Fonction pour obtenir la couleur du badge de statut
  const getStatusBadgeVariant = (status: string) => {
    switch(status) {
      case 'ally': return 'default';
      case 'neutral': return 'secondary';
      case 'enemy': return 'destructive';
      case 'tributary': return 'outline';
      default: return 'secondary';
    }
  };
  
  // Fonction pour obtenir le libellé du statut
  const getStatusLabel = (status: string) => {
    switch(status) {
      case 'ally': return 'Allié';
      case 'neutral': return 'Neutre';
      case 'enemy': return 'Ennemi';
      case 'tributary': return 'Tributaire';
      default: return status;
    }
  };
  
  return (
    <Card>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nation</TableHead>
              <TableHead>Région</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead>Puissance</TableHead>
              <TableHead>Relation</TableHead>
              {isEditable && <TableHead className="text-right">Actions</TableHead>}
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredNations.length === 0 ? (
              <TableRow>
                <TableCell colSpan={isEditable ? 6 : 5} className="text-center h-24">
                  Aucune nation trouvée
                </TableCell>
              </TableRow>
            ) : (
              filteredNations.map((nation) => (
                <TableRow key={nation.id}>
                  <TableCell className="font-medium">{nation.name}</TableCell>
                  <TableCell>{nation.region}</TableCell>
                  <TableCell>
                    <Badge variant={getStatusBadgeVariant(nation.status)}>
                      {getStatusLabel(nation.status)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {Array.from({ length: 5 }).map((_, i) => (
                      <span key={i} className={`inline-block w-2 h-2 mx-0.5 rounded-full ${i < nation.power ? 'bg-rome-red' : 'bg-gray-200'}`} />
                    ))}
                  </TableCell>
                  <TableCell>
                    {Array.from({ length: 5 }).map((_, i) => (
                      <span key={i} className={`inline-block w-2 h-2 mx-0.5 rounded-full ${i < nation.relation ? 'bg-green-500' : 'bg-gray-200'}`} />
                    ))}
                  </TableCell>
                  {isEditable && (
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  )}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
