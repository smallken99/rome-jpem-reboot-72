
import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { AssignmentTableProps } from '../types/senateurs';
import { toast } from 'sonner';
import { Search, Save, AlertCircle, User } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export const AssignmentTable: React.FC<AssignmentTableProps> = ({ 
  senateurs, 
  assignments,
  onAssign 
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentAssignments, setCurrentAssignments] = useState<Record<string, string>>(assignments || {});
  
  const players = [
    { id: 'player1', name: 'Jules César' },
    { id: 'player2', name: 'Marcus Brutus' },
    { id: 'player3', name: 'Cicéron' },
    { id: 'player4', name: 'Pompée' },
    { id: 'player5', name: 'Marc Antoine' },
  ];
  
  const handleAssignmentChange = (senateurId: string, playerId: string) => {
    setCurrentAssignments(prev => ({
      ...prev,
      [senateurId]: playerId
    }));
  };
  
  const handleSaveAssignment = (senateurId: string) => {
    const playerId = currentAssignments[senateurId];
    onAssign(senateurId, playerId);
    
    const playerName = players.find(p => p.id === playerId)?.name || 'Joueur';
    const senateur = senateurs.find(s => s.id === senateurId);
    
    if (senateur) {
      toast.success(`${senateur.nom} assigné à ${playerName}`);
    }
  };
  
  const filteredSenateurs = senateurs.filter(senateur => 
    senateur.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
    senateur.famille.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input 
          placeholder="Rechercher un sénateur..." 
          value={searchTerm} 
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-8" 
        />
      </div>
      
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nom</TableHead>
              <TableHead>Famille</TableHead>
              <TableHead>Fonction</TableHead>
              <TableHead>Assignation</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredSenateurs.map(senateur => (
              <TableRow key={senateur.id}>
                <TableCell className="font-medium">{senateur.nom}</TableCell>
                <TableCell>{senateur.famille}</TableCell>
                <TableCell>
                  {senateur.fonctionActuelle || senateur.magistrature || 
                    <span className="text-muted-foreground">Aucune fonction</span>
                  }
                </TableCell>
                <TableCell>
                  <Select 
                    value={currentAssignments[senateur.id] || ''} 
                    onValueChange={(value) => handleAssignmentChange(senateur.id, value)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Assigner à un joueur" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">Non assigné</SelectItem>
                      {players.map(player => (
                        <SelectItem key={player.id} value={player.id}>
                          {player.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleSaveAssignment(senateur.id)}
                    title="Enregistrer l'assignation"
                  >
                    <Save className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            
            {filteredSenateurs.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center">
                  <div className="flex flex-col items-center justify-center text-muted-foreground">
                    <AlertCircle className="h-8 w-8 mb-2" />
                    <p>Aucun sénateur trouvé</p>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      
      <div className="bg-muted/50 rounded-md p-4">
        <h3 className="text-sm font-medium mb-2">Sénateurs déjà assignés</h3>
        <div className="flex flex-wrap gap-2">
          {Object.entries(assignments || {}).map(([senateurId, playerId]) => {
            const senateur = senateurs.find(s => s.id === senateurId);
            const player = players.find(p => p.id === playerId);
            
            if (!senateur || !player) return null;
            
            return (
              <Badge key={senateurId} variant="secondary" className="flex items-center gap-1">
                <User className="h-3 w-3" />
                <span>{senateur.nom} → {player.name}</span>
              </Badge>
            );
          })}
          
          {Object.keys(assignments || {}).length === 0 && (
            <p className="text-sm text-muted-foreground">Aucun sénateur n'est actuellement assigné</p>
          )}
        </div>
      </div>
    </div>
  );
};
