
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Eye, Edit, Trash2 } from 'lucide-react';
import { Traite, TraitesListProps } from './types';

export const TraitesList: React.FC<TraitesListProps> = ({ traites, searchTerm, filters, isEditable }) => {
  // Filtrage des traités en fonction du terme de recherche et des filtres
  const filteredTraites = traites.filter(traite => {
    // Filtre de recherche
    if (
      searchTerm &&
      !traite.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !traite.parties.some(party => party.toLowerCase().includes(searchTerm.toLowerCase())) &&
      !traite.type.toLowerCase().includes(searchTerm.toLowerCase())
    ) {
      return false;
    }
    
    // Filtre de statut
    if (filters.status && traite.status !== filters.status) {
      return false;
    }
    
    // Filtre de date de création
    if (filters.dateFrom && new Date(traite.dateCreated) < new Date(filters.dateFrom)) {
      return false;
    }
    
    if (filters.dateTo && new Date(traite.dateCreated) > new Date(filters.dateTo)) {
      return false;
    }
    
    return true;
  });
  
  // Couleurs des statuts pour les badges
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'draft': return 'bg-blue-500';
      case 'expired': return 'bg-yellow-500';
      case 'revoked': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };
  
  // Texte des statuts pour l'affichage
  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'En vigueur';
      case 'draft': return 'Brouillon';
      case 'expired': return 'Expiré';
      case 'revoked': return 'Révoqué';
      default: return status;
    }
  };
  
  // Format du type de traité
  const getTypeText = (type: string) => {
    switch (type) {
      case 'commercial': return 'Commercial';
      case 'peace': return 'Paix';
      case 'military': return 'Militaire';
      case 'tribute': return 'Tribut';
      default: return type;
    }
  };
  
  const handleView = (id: string) => {
    console.log('Viewing traite:', id);
    // TODO: implement view modal
  };
  
  const handleEdit = (id: string) => {
    console.log('Editing traite:', id);
    // TODO: implement edit modal
  };
  
  const handleDelete = (id: string) => {
    console.log('Deleting traite:', id);
    // TODO: implement delete confirmation
  };
  
  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Titre</TableHead>
            <TableHead>Parties</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Statut</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredTraites.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-4">
                Aucun traité correspondant aux critères
              </TableCell>
            </TableRow>
          ) : (
            filteredTraites.map(traite => (
              <TableRow key={traite.id}>
                <TableCell className="font-medium">{traite.title}</TableCell>
                <TableCell>{traite.parties.join(', ')}</TableCell>
                <TableCell>{getTypeText(traite.type)}</TableCell>
                <TableCell>{traite.date || traite.dateCreated}</TableCell>
                <TableCell>
                  <Badge className={getStatusColor(traite.status)}>{getStatusText(traite.status)}</Badge>
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon" onClick={() => handleView(traite.id)}>
                      <Eye className="h-4 w-4" />
                    </Button>
                    {isEditable && (
                      <>
                        <Button variant="ghost" size="icon" onClick={() => handleEdit(traite.id)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleDelete(traite.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};
