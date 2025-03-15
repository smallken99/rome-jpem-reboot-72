
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Eye, Edit, Trash } from 'lucide-react';
import { alliancesMock } from './data';

export interface AlliancesMilitairesProps {
  isEditable?: boolean;
  searchTerm?: string;
  filters?: any;
}

export const AlliancesMilitaires: React.FC<AlliancesMilitairesProps> = ({ 
  isEditable = true,
  searchTerm = '',
  filters = {}
}) => {
  const alliances = alliancesMock;
  
  const filteredAlliances = alliances.filter(alliance => {
    // Appliquer la recherche par texte
    if (searchTerm && !alliance.name.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    
    // Appliquer les filtres
    if (filters.status && alliance.status !== filters.status) {
      return false;
    }
    
    if (filters.type && alliance.type !== filters.type) {
      return false;
    }
    
    return true;
  });
  
  // Fonction pour obtenir la couleur du badge de statut
  const getStatusBadgeVariant = (status: string) => {
    switch(status) {
      case 'active': return 'default';
      case 'inactive': return 'secondary';
      case 'pending': return 'outline';
      default: return 'secondary';
    }
  };
  
  // Fonction pour obtenir le libellé du statut
  const getStatusLabel = (status: string) => {
    switch(status) {
      case 'active': return 'Active';
      case 'inactive': return 'Inactive';
      case 'pending': return 'En attente';
      default: return status;
    }
  };
  
  // Fonction pour obtenir le libellé du type
  const getTypeLabel = (type: string) => {
    switch(type) {
      case 'defensive': return 'Défensive';
      case 'offensive': return 'Offensive';
      case 'full': return 'Complète';
      default: return type;
    }
  };
  
  return (
    <Card>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Alliance</TableHead>
              <TableHead>Membres</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Statut</TableHead>
              {isEditable && <TableHead className="text-right">Actions</TableHead>}
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAlliances.length === 0 ? (
              <TableRow>
                <TableCell colSpan={isEditable ? 6 : 5} className="text-center h-24">
                  Aucune alliance trouvée
                </TableCell>
              </TableRow>
            ) : (
              filteredAlliances.map((alliance) => (
                <TableRow key={alliance.id}>
                  <TableCell className="font-medium">{alliance.name}</TableCell>
                  <TableCell>{alliance.members.join(', ')}</TableCell>
                  <TableCell>{getTypeLabel(alliance.type)}</TableCell>
                  <TableCell>{alliance.date}</TableCell>
                  <TableCell>
                    <Badge variant={getStatusBadgeVariant(alliance.status)}>
                      {getStatusLabel(alliance.status)}
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
