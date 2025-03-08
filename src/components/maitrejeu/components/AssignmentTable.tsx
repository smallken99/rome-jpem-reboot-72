
import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { UserPlus, User, UserX } from 'lucide-react';
import { SenateurJouable } from '../types/maitreJeuTypes';

interface AssignmentTableProps {
  senateurs: SenateurJouable[];
  assignments: Record<string, string>;
  onAssign: (senateurId: string, joueurId: string | null) => void;
}

export const AssignmentTable: React.FC<AssignmentTableProps> = ({ 
  senateurs, 
  assignments,
  onAssign 
}) => {
  const availableSenateurs = senateurs.filter(s => s.statut === 'actif' && !s.joueurId);
  const assignedSenateurs = senateurs.filter(s => s.joueurId);
  
  // Joueurs fictifs 
  const players = [
    { id: 'player-1', username: 'Marcus', email: 'marcus@roma.spqr' },
    { id: 'player-2', username: 'Julia', email: 'julia@roma.spqr' },
    { id: 'player-3', username: 'Gaius', email: 'gaius@roma.spqr' },
    { id: 'player-4', username: 'Livia', email: 'livia@roma.spqr' }
  ];
  
  const handleAssign = (senateurId: string, joueurId: string) => {
    onAssign(senateurId, joueurId);
  };
  
  const handleUnassign = (senateurId: string) => {
    onAssign(senateurId, null);
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-3">Sénateurs assignés</h3>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Sénateur</TableHead>
              <TableHead>Famille</TableHead>
              <TableHead>Joueur</TableHead>
              <TableHead>Fonction</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {assignedSenateurs.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center text-muted-foreground">
                  Aucun sénateur n'est actuellement assigné à un joueur
                </TableCell>
              </TableRow>
            ) : (
              assignedSenateurs.map(senateur => {
                const player = players.find(p => p.id === senateur.joueurId);
                return (
                  <TableRow key={senateur.id}>
                    <TableCell className="font-medium">{senateur.nom}</TableCell>
                    <TableCell>{senateur.famille}</TableCell>
                    <TableCell>
                      {player ? (
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4 text-muted-foreground" />
                          <span>{player.username}</span>
                        </div>
                      ) : "—"}
                    </TableCell>
                    <TableCell>
                      {senateur.fonctionActuelle ? (
                        <Badge variant="outline">{senateur.fonctionActuelle}</Badge>
                      ) : "—"}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleUnassign(senateur.id)}
                      >
                        <UserX className="h-4 w-4 mr-2" />
                        Désassigner
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-3">Assignation de sénateurs</h3>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Sénateur</TableHead>
              <TableHead>Famille</TableHead>
              <TableHead>Fonction</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {availableSenateurs.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center text-muted-foreground">
                  Aucun sénateur disponible pour assignation
                </TableCell>
              </TableRow>
            ) : (
              availableSenateurs.map(senateur => (
                <TableRow key={senateur.id}>
                  <TableCell className="font-medium">{senateur.nom}</TableCell>
                  <TableCell>{senateur.famille}</TableCell>
                  <TableCell>
                    {senateur.fonctionActuelle ? (
                      <Badge variant="outline">{senateur.fonctionActuelle}</Badge>
                    ) : "—"}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      {players.slice(0, 2).map(player => (
                        <Button
                          key={player.id}
                          variant="outline"
                          size="sm"
                          onClick={() => handleAssign(senateur.id, player.id)}
                        >
                          <UserPlus className="h-4 w-4 mr-2" />
                          {player.username}
                        </Button>
                      ))}
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
