
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Edit, Trash2, PlayCircle } from 'lucide-react';
import { ProjetLoi } from '../types';

interface ProjetsLoiTabProps {
  projets: ProjetLoi[];
  isEditable: boolean;
  onEdit: (loi: ProjetLoi) => void;
  onDelete: (loiId: string) => void;
  onStartVote: (loi: ProjetLoi) => void;
}

export const ProjetsLoiTab: React.FC<ProjetsLoiTabProps> = ({
  projets,
  isEditable,
  onEdit,
  onDelete,
  onStartVote
}) => {
  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case 'en révision':
        return <Badge variant="outline" className="bg-amber-50 text-amber-700">En révision</Badge>;
      case 'prêt pour vote':
        return <Badge variant="outline" className="bg-green-50 text-green-700">Prêt pour vote</Badge>;
      case 'brouillon':
        return <Badge variant="outline" className="bg-gray-50 text-gray-700">Brouillon</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };
  
  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Titre</TableHead>
            <TableHead>Auteur</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Statut</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {projets.map((projet) => (
            <TableRow key={projet.id}>
              <TableCell className="font-medium">{projet.titre}</TableCell>
              <TableCell>{projet.auteur}</TableCell>
              <TableCell>{projet.date}</TableCell>
              <TableCell>{getStatusBadge(projet.statut)}</TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  {isEditable && (
                    <>
                      <Button variant="ghost" size="sm" onClick={() => onEdit(projet)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-red-600" onClick={() => onDelete(projet.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                      {projet.statut.toLowerCase() === 'prêt pour vote' && (
                        <Button variant="ghost" size="sm" className="text-green-600" onClick={() => onStartVote(projet)}>
                          <PlayCircle className="h-4 w-4" />
                        </Button>
                      )}
                    </>
                  )}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      
      {projets.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          <p>Aucun projet de loi en cours</p>
        </div>
      )}
    </div>
  );
};
