
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Eye, Edit, Trash } from 'lucide-react';
import { traitesMock } from './data';

export interface TraitesListProps {
  isEditable?: boolean;
  searchTerm?: string;
  filters?: any;
}

export const TraitesList: React.FC<TraitesListProps> = ({ 
  isEditable = true,
  searchTerm = '',
  filters = {}
}) => {
  const traites = traitesMock;
  
  const filteredTraites = traites.filter(traite => {
    // Appliquer la recherche par texte
    if (searchTerm && !traite.title.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    
    // Appliquer les filtres
    if (filters.status && traite.status !== filters.status) {
      return false;
    }
    
    if (filters.type && traite.type !== filters.type) {
      return false;
    }
    
    return true;
  });
  
  // Fonction pour obtenir la couleur du badge de statut
  const getStatusBadgeVariant = (status: string) => {
    switch(status) {
      case 'active': return 'default';
      case 'draft': return 'secondary';
      case 'expired': return 'outline';
      case 'revoked': return 'destructive';
      default: return 'secondary';
    }
  };
  
  // Fonction pour obtenir le libellé du statut
  const getStatusLabel = (status: string) => {
    switch(status) {
      case 'active': return 'En vigueur';
      case 'draft': return 'Brouillon';
      case 'expired': return 'Expiré';
      case 'revoked': return 'Révoqué';
      default: return status;
    }
  };
  
  // Fonction pour obtenir le libellé du type
  const getTypeLabel = (type: string) => {
    switch(type) {
      case 'peace': return 'Paix';
      case 'trade': return 'Commerce';
      case 'military': return 'Militaire';
      case 'tribute': return 'Tribut';
      default: return type;
    }
  };
  
  return (
    <Card>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Traité</TableHead>
              <TableHead>Avec</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Statut</TableHead>
              {isEditable && <TableHead className="text-right">Actions</TableHead>}
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTraites.length === 0 ? (
              <TableRow>
                <TableCell colSpan={isEditable ? 6 : 5} className="text-center h-24">
                  Aucun traité trouvé
                </TableCell>
              </TableRow>
            ) : (
              filteredTraites.map((traite) => (
                <TableRow key={traite.id}>
                  <TableCell className="font-medium">{traite.title}</TableCell>
                  <TableCell>{traite.parties.join(', ')}</TableCell>
                  <TableCell>{getTypeLabel(traite.type)}</TableCell>
                  <TableCell>{traite.date}</TableCell>
                  <TableCell>
                    <Badge variant={getStatusBadgeVariant(traite.status)}>
                      {getStatusLabel(traite.status)}
                    </Badge>
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
