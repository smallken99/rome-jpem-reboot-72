
import React from 'react';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Edit, FileText, Vote } from 'lucide-react';
import { Loi } from '../types/maitreJeuTypes';
import { formatDate } from '@/utils/timeSystem';

interface LoisTableProps {
  lois: Loi[];
  onEdit: (loi: Loi) => void;
  onVote: (loi: Loi) => void;
}

export const LoisTable: React.FC<LoisTableProps> = ({ lois, onEdit, onVote }) => {
  // Fonction pour obtenir la couleur du badge selon le statut
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'promulguée': return 'bg-green-100 text-green-800 border-green-300';
      case 'en préparation': return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'présentée': return 'bg-amber-100 text-amber-800 border-amber-300';
      case 'débattue': return 'bg-purple-100 text-purple-800 border-purple-300';
      case 'votée': return 'bg-teal-100 text-teal-800 border-teal-300';
      case 'abrogée': return 'bg-red-100 text-red-800 border-red-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  // Fonction pour formatter les résultats de vote si disponibles
  const formatVoteResults = (loi: Loi) => {
    if (loi.résultat === 'en attente' || !loi.résultat) return 'En attente';
    return `${loi.votePour} pour, ${loi.voteContre} contre, ${loi.abstentions} abstentions`;
  };

  return (
    <Table>
      <TableCaption>Liste des lois de la République</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[150px]">Nom</TableHead>
          <TableHead>Proposé par</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Statut</TableHead>
          <TableHead>Résultat</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {lois.map((loi) => (
          <TableRow key={loi.id}>
            <TableCell className="font-medium">{loi.nom}</TableCell>
            <TableCell>{loi.proposéPar}</TableCell>
            <TableCell>{formatDate(loi.datePrésentation)}</TableCell>
            <TableCell>
              <Badge variant="outline" className={getStatusColor(loi.statusActuel)}>
                {loi.statusActuel}
              </Badge>
            </TableCell>
            <TableCell>{formatVoteResults(loi)}</TableCell>
            <TableCell className="text-right">
              <div className="flex justify-end gap-2">
                <Button variant="ghost" size="icon" onClick={() => onEdit(loi)}>
                  <Edit className="h-4 w-4" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => onVote(loi)}
                  disabled={loi.statusActuel !== 'débattue'}
                >
                  <Vote className="h-4 w-4" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
