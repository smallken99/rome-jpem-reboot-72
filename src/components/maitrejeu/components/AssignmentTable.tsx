
import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { SenateurJouable } from '../types/senateurs';

interface AssignmentTableProps {
  senateurs: SenateurJouable[];
  onAssign: (senateurId: string, playerId: string) => void;
}

export const AssignmentTable: React.FC<AssignmentTableProps> = ({ 
  senateurs,
  onAssign 
}) => {
  const [playerIdInputs, setPlayerIdInputs] = useState<Record<string, string>>({});
  
  // Gérer la saisie d'ID de joueur pour un sénateur
  const handlePlayerIdChange = (senateurId: string, value: string) => {
    setPlayerIdInputs(prev => ({
      ...prev,
      [senateurId]: value
    }));
  };
  
  // Assigner un sénateur à un joueur
  const handleAssign = (senateurId: string) => {
    const playerId = playerIdInputs[senateurId];
    if (playerId && playerId.trim()) {
      onAssign(senateurId, playerId.trim());
      
      // Réinitialiser l'input après assignation
      setPlayerIdInputs(prev => ({
        ...prev,
        [senateurId]: ''
      }));
    }
  };
  
  // Désassigner un sénateur d'un joueur
  const handleUnassign = (senateurId: string) => {
    onAssign(senateurId, '');
  };
  
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nom</TableHead>
            <TableHead>Famille</TableHead>
            <TableHead>Fonction</TableHead>
            <TableHead>Assigned To</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        
        <TableBody>
          {senateurs.map((senateur) => (
            <TableRow key={senateur.id}>
              <TableCell className="font-medium">{senateur.nom}</TableCell>
              <TableCell>{senateur.famille}</TableCell>
              <TableCell>{senateur.fonction || senateur.magistrature || 'Aucune'}</TableCell>
              <TableCell>
                {senateur.playerId ? (
                  <div className="flex items-center space-x-2">
                    <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs font-medium">
                      {senateur.playerId}
                    </span>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-7 w-7 p-0 text-red-500"
                      onClick={() => handleUnassign(senateur.id)}
                    >
                      &times;
                    </Button>
                  </div>
                ) : (
                  <span className="text-gray-500 text-sm">Non assigné</span>
                )}
              </TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Input
                    placeholder="ID Joueur"
                    className="h-8 w-32"
                    value={playerIdInputs[senateur.id] || ''}
                    onChange={(e) => handlePlayerIdChange(senateur.id, e.target.value)}
                  />
                  <Button 
                    size="sm" 
                    className="h-8"
                    onClick={() => handleAssign(senateur.id)}
                    disabled={!playerIdInputs[senateur.id]}
                  >
                    Assigner
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
