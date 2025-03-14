import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Loi } from '../types/lois';
import { ensureGameDate } from './lois/utils/dateHelpers';

export interface LoisTableProps {
  lois: Loi[];
  onVote?: (loiId: string, vote: 'pour' | 'contre' | 'abstention') => void;
  onAbroger?: (loiId: string) => void;
  onEdit?: (loiId: string) => void;
}

export const LoisTable: React.FC<LoisTableProps> = ({ 
  lois,
  onVote,
  onAbroger,
  onEdit
}) => {
  // Obtenir la couleur pour le badge d'état
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'proposée':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'adoptée':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'rejetée':
        return 'bg-red-100 text-red-800 border-red-300';
      case 'abrogée':
        return 'bg-gray-100 text-gray-800 border-gray-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };
  
  // Obtenir la couleur pour le badge de catégorie
  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case 'politique':
        return 'bg-purple-100 text-purple-800 border-purple-300';
      case 'économique':
      case 'economique':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'militaire':
        return 'bg-red-100 text-red-800 border-red-300';
      case 'religieuse':
        return 'bg-amber-100 text-amber-800 border-amber-300';
      case 'sociale':
        return 'bg-pink-100 text-pink-800 border-pink-300';
      default:
        return 'bg-blue-100 text-blue-800 border-blue-300';
    }
  };
  
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Loi</TableHead>
            <TableHead>Proposeur</TableHead>
            <TableHead>Catégorie</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>État</TableHead>
            <TableHead>Votes</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        
        <TableBody>
          {lois.map((loi) => {
            // Safely get date information
            const gameDate = ensureGameDate(loi.date);
            
            return (
              <TableRow key={loi.id}>
                <TableCell className="font-medium">
                  {loi.titre}
                  <div className="text-xs text-gray-500 mt-1">{loi.description.substring(0, 60)}...</div>
                </TableCell>
                
                <TableCell>{loi.proposeur}</TableCell>
                
                <TableCell>
                  <Badge className={getCategoryColor(loi.catégorie)}>
                    {loi.catégorie}
                  </Badge>
                </TableCell>
                
                <TableCell>
                  An {gameDate.year} - {gameDate.season}
                </TableCell>
                
                <TableCell>
                  <Badge className={getStatusColor(loi.état)}>
                    {loi.état}
                  </Badge>
                </TableCell>
                
                <TableCell>
                  <div className="flex flex-col gap-1 text-xs">
                    <div className="flex items-center">
                      <span className="w-8 text-green-600">Pour:</span> 
                      <span className="font-medium">{loi.votesPositifs}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="w-8 text-red-600">Contre:</span> 
                      <span className="font-medium">{loi.votesNégatifs}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="w-8 text-gray-600">Abst:</span> 
                      <span className="font-medium">{loi.votesAbstention}</span>
                    </div>
                  </div>
                </TableCell>
                
                <TableCell>
                  <div className="flex flex-col gap-2">
                    {onVote && loi.état === 'proposée' && (
                      <div className="flex gap-1">
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="bg-green-50 hover:bg-green-100 text-green-700 border-green-200 h-7 text-xs px-2"
                          onClick={() => onVote(loi.id, 'pour')}
                        >
                          Pour
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="bg-red-50 hover:bg-red-100 text-red-700 border-red-200 h-7 text-xs px-2"
                          onClick={() => onVote(loi.id, 'contre')}
                        >
                          Contre
                        </Button>
                      </div>
                    )}
                    
                    {onEdit && (
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="h-7 text-xs px-2"
                        onClick={() => onEdit(loi.id)}
                      >
                        Détails
                      </Button>
                    )}
                    
                    {onAbroger && loi.état === 'adoptée' && (
                      <Button 
                        size="sm" 
                        variant="destructive" 
                        className="h-7 text-xs px-2"
                        onClick={() => onAbroger(loi.id)}
                      >
                        Abroger
                      </Button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};
