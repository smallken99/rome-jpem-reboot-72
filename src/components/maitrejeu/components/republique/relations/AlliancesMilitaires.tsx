
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Eye, Edit, Trash2 } from 'lucide-react';
import { Alliance, AlliancesMilitairesProps } from './types';

export const AlliancesMilitaires: React.FC<AlliancesMilitairesProps> = ({ alliances, searchTerm, filters, isEditable }) => {
  // Filtrage des alliances en fonction du terme de recherche et des filtres
  const filteredAlliances = alliances.filter(alliance => {
    // Filtre de recherche
    if (
      searchTerm &&
      !alliance.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !alliance.nations.some(nation => nation.toLowerCase().includes(searchTerm.toLowerCase())) &&
      !alliance.type.toLowerCase().includes(searchTerm.toLowerCase())
    ) {
      return false;
    }
    
    // Filtre de statut
    if (filters.status && alliance.status !== filters.status) {
      return false;
    }
    
    // Filtre de date de création
    if (filters.dateFrom && new Date(alliance.dateCreated) < new Date(filters.dateFrom)) {
      return false;
    }
    
    if (filters.dateTo && new Date(alliance.dateCreated) > new Date(filters.dateTo)) {
      return false;
    }
    
    return true;
  });
  
  // Couleurs des statuts pour les badges
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'inactive': return 'bg-yellow-500';
      case 'pending': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };
  
  // Texte des statuts pour l'affichage
  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'Active';
      case 'inactive': return 'Inactive';
      case 'pending': return 'En attente';
      default: return status;
    }
  };
  
  // Format du type d'alliance
  const getTypeText = (type: string) => {
    switch (type) {
      case 'defensive': return 'Défensive';
      case 'offensive': return 'Offensive';
      case 'commercial': return 'Commerciale';
      case 'full': return 'Complète';
      default: return type;
    }
  };
  
  const handleView = (id: string) => {
    console.log('Viewing alliance:', id);
    // TODO: implement view modal
  };
  
  const handleEdit = (id: string) => {
    console.log('Editing alliance:', id);
    // TODO: implement edit modal
  };
  
  const handleDelete = (id: string) => {
    console.log('Deleting alliance:', id);
    // TODO: implement delete confirmation
  };
  
  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nom</TableHead>
            <TableHead>Nations</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Statut</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredAlliances.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-4">
                Aucune alliance correspondant aux critères
              </TableCell>
            </TableRow>
          ) : (
            filteredAlliances.map(alliance => (
              <TableRow key={alliance.id}>
                <TableCell className="font-medium">{alliance.name}</TableCell>
                <TableCell>{alliance.nations.join(', ')}</TableCell>
                <TableCell>{getTypeText(alliance.type)}</TableCell>
                <TableCell>{alliance.date || alliance.dateCreated}</TableCell>
                <TableCell>
                  <Badge className={getStatusColor(alliance.status)}>{getStatusText(alliance.status)}</Badge>
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon" onClick={() => handleView(alliance.id)}>
                      <Eye className="h-4 w-4" />
                    </Button>
                    {isEditable && (
                      <>
                        <Button variant="ghost" size="icon" onClick={() => handleEdit(alliance.id)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleDelete(alliance.id)}>
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
