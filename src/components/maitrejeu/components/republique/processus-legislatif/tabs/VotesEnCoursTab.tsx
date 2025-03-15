
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { VoteLoi } from '../types';

interface VotesEnCoursTabProps {
  votes: VoteLoi[];
  isEditable: boolean;
}

export const VotesEnCoursTab: React.FC<VotesEnCoursTabProps> = ({
  votes,
  isEditable
}) => {
  const calculateProgress = (pour: number, contre: number, abstention: number) => {
    const total = pour + contre + abstention;
    if (total === 0) return { pour: 0, contre: 0, abstention: 0 };
    
    return {
      pour: (pour / total) * 100,
      contre: (contre / total) * 100,
      abstention: (abstention / total) * 100
    };
  };
  
  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Titre</TableHead>
            <TableHead>Auteur</TableHead>
            <TableHead>Date début</TableHead>
            <TableHead>Date fin</TableHead>
            <TableHead>Résultats actuels</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {votes.map((vote) => {
            const progress = calculateProgress(vote.pour, vote.contre, vote.abstention);
            const total = vote.pour + vote.contre + vote.abstention;
            
            return (
              <TableRow key={vote.id}>
                <TableCell className="font-medium">{vote.titre}</TableCell>
                <TableCell>{vote.auteur}</TableCell>
                <TableCell>{vote.dateDebut}</TableCell>
                <TableCell>{vote.dateFin}</TableCell>
                <TableCell className="w-[300px]">
                  <div className="space-y-3">
                    <div className="flex justify-between text-xs">
                      <span>Pour: {vote.pour} ({((vote.pour / total) * 100).toFixed(1)}%)</span>
                      <span>Contre: {vote.contre} ({((vote.contre / total) * 100).toFixed(1)}%)</span>
                      <span>Abst.: {vote.abstention} ({((vote.abstention / total) * 100).toFixed(1)}%)</span>
                    </div>
                    <div className="flex h-2 overflow-hidden rounded-full bg-gray-200">
                      <div 
                        className="bg-green-500 h-full" 
                        style={{ width: `${progress.pour}%` }}
                      ></div>
                      <div 
                        className="bg-red-500 h-full" 
                        style={{ width: `${progress.contre}%` }}
                      ></div>
                      <div 
                        className="bg-gray-400 h-full" 
                        style={{ width: `${progress.abstention}%` }}
                      ></div>
                    </div>
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      
      {votes.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          <p>Aucun vote en cours</p>
        </div>
      )}
    </div>
  );
};
