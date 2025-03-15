
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Eye, Edit, Trash2 } from 'lucide-react';
import { Nation, NationsListProps } from './types';

export const NationsList: React.FC<NationsListProps> = ({ nations, searchTerm, filters, isEditable }) => {
  // Filtrage des nations en fonction du terme de recherche et des filtres
  const filteredNations = nations.filter(nation => {
    // Filtre de recherche
    if (
      searchTerm &&
      !nation.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !nation.region.toLowerCase().includes(searchTerm.toLowerCase())
    ) {
      return false;
    }
    
    // Filtre de statut
    if (filters.status && nation.status !== filters.status) {
      return false;
    }
    
    // Filtre de région
    if (filters.region && nation.region !== filters.region) {
      return false;
    }
    
    // Filtre de date (si applicable)
    if (filters.dateFrom && nation.founded && new Date(nation.founded) < new Date(filters.dateFrom)) {
      return false;
    }
    
    if (filters.dateTo && nation.founded && new Date(nation.founded) > new Date(filters.dateTo)) {
      return false;
    }
    
    return true;
  });
  
  // Couleurs des statuts pour les badges
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ally': return 'bg-green-500';
      case 'neutral': return 'bg-blue-500';
      case 'enemy': return 'bg-red-500';
      case 'tributary': return 'bg-amber-500';
      default: return 'bg-gray-500';
    }
  };
  
  // Texte des statuts pour l'affichage
  const getStatusText = (status: string) => {
    switch (status) {
      case 'ally': return 'Allié';
      case 'neutral': return 'Neutre';
      case 'enemy': return 'Ennemi';
      case 'tributary': return 'Tributaire';
      default: return status;
    }
  };
  
  const handleView = (id: string) => {
    console.log('Viewing nation:', id);
    // TODO: implement view modal
  };
  
  const handleEdit = (id: string) => {
    console.log('Editing nation:', id);
    // TODO: implement edit modal
  };
  
  const handleDelete = (id: string) => {
    console.log('Deleting nation:', id);
    // TODO: implement delete confirmation
  };
  
  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nom</TableHead>
            <TableHead>Région</TableHead>
            <TableHead>Statut</TableHead>
            <TableHead>Puissance</TableHead>
            <TableHead>Relation</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredNations.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-4">
                Aucune nation correspondant aux critères
              </TableCell>
            </TableRow>
          ) : (
            filteredNations.map(nation => (
              <TableRow key={nation.id}>
                <TableCell className="font-medium">{nation.name}</TableCell>
                <TableCell>{nation.region}</TableCell>
                <TableCell>
                  <Badge className={getStatusColor(nation.status)}>{getStatusText(nation.status)}</Badge>
                </TableCell>
                <TableCell>{nation.power || '-'}</TableCell>
                <TableCell>{nation.relation || '-'}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon" onClick={() => handleView(nation.id)}>
                      <Eye className="h-4 w-4" />
                    </Button>
                    {isEditable && (
                      <>
                        <Button variant="ghost" size="icon" onClick={() => handleEdit(nation.id)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleDelete(nation.id)}>
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
