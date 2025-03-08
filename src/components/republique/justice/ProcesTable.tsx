
import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Gavel, Eye, AlertTriangle, ArrowUpDown, FileText } from 'lucide-react';
import { ActionButton } from '@/components/ui-custom/ActionButton';

export interface ProcesData {
  id: string;
  titre: string;
  demandeur: string;
  accusé: string;
  type: string;
  statut: string;
  date: string;
}

export interface ProcesTableProps {
  proces: ProcesData[];
  status: 'en-cours' | 'juge';
  onAssign?: (procesId: string) => void;
}

export const ProcesTable: React.FC<ProcesTableProps> = ({ 
  proces, 
  status,
  onAssign 
}) => {
  const [selectedProces, setSelectedProces] = useState<string | null>(null);

  const getStatutBadge = (statut: string) => {
    switch (statut) {
      case 'En cours':
        return <Badge className="bg-blue-100 text-blue-800 border-blue-200">En cours</Badge>;
      case 'En attente':
        return <Badge className="bg-amber-100 text-amber-800 border-amber-200">En attente</Badge>;
      case 'Jugement rendu':
        return <Badge className="bg-green-100 text-green-800 border-green-200">Jugement rendu</Badge>;
      case 'Condamnation':
        return <Badge className="bg-red-100 text-red-800 border-red-200">Condamnation</Badge>;
      case 'Exil':
        return <Badge className="bg-purple-100 text-purple-800 border-purple-200">Exil</Badge>;
      default:
        return <Badge>{statut}</Badge>;
    }
  };

  const handleViewDetails = (procesId: string) => {
    setSelectedProces(procesId === selectedProces ? null : procesId);
  };

  const handleVote = (procesId: string, vote: 'pour' | 'contre') => {
    console.log(`Vote ${vote} pour le procès ${procesId}`);
    // Logique à implémenter pour enregistrer le vote
  };

  const handlePresider = (procesId: string) => {
    if (onAssign) {
      onAssign(procesId);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h3 className="text-lg font-semibold">Procès {status === 'en-cours' ? 'en cours' : 'passés'}</h3>
          <p className="text-sm text-muted-foreground">
            {status === 'en-cours' 
              ? 'Procédures judiciaires actuellement traitées par les tribunaux romains' 
              : 'Procédures judiciaires conclues'}
          </p>
        </div>
        
        {status === 'en-cours' && (
          <Button variant="outline" className="roman-btn-outline">
            <FileText className="h-4 w-4 mr-2" />
            Nouveau procès
          </Button>
        )}
      </div>
      
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="font-cinzel">Affaire</TableHead>
              <TableHead className="font-cinzel">Demandeur</TableHead>
              <TableHead className="font-cinzel">Accusé</TableHead>
              <TableHead className="font-cinzel">
                <div className="flex items-center">
                  Type
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </div>
              </TableHead>
              <TableHead className="font-cinzel">
                <div className="flex items-center">
                  Date
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </div>
              </TableHead>
              <TableHead className="font-cinzel">Statut</TableHead>
              <TableHead className="font-cinzel">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {proces.map((proces) => (
              <React.Fragment key={proces.id}>
                <TableRow>
                  <TableCell className="font-medium">{proces.titre}</TableCell>
                  <TableCell>{proces.demandeur}</TableCell>
                  <TableCell>{proces.accusé}</TableCell>
                  <TableCell>{proces.type}</TableCell>
                  <TableCell>{proces.date}</TableCell>
                  <TableCell>{getStatutBadge(proces.statut)}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => handleViewDetails(proces.id)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      
                      {status === 'en-cours' && proces.statut === 'En attente' && (
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="roman-btn-outline text-xs"
                          onClick={() => handlePresider(proces.id)}
                        >
                          <Gavel className="h-4 w-4 mr-1" />
                          Présider
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
                
                {selectedProces === proces.id && (
                  <TableRow className="bg-muted/20">
                    <TableCell colSpan={7} className="p-4">
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-cinzel text-base font-medium">Détails de l'affaire</h4>
                          <p className="mt-1 text-sm">
                            Affaire concernant {proces.titre.toLowerCase()} entre {proces.demandeur} et {proces.accusé}.
                            {proces.type === 'Criminel' && 
                              <span className="ml-2 text-red-600 flex items-center">
                                <AlertTriangle className="h-4 w-4 mr-1" /> 
                                Affaire criminelle pouvant entraîner de lourdes sanctions
                              </span>
                            }
                          </p>
                        </div>
                        
                        {status === 'en-cours' && proces.statut !== 'Jugement rendu' && (
                          <div className="flex justify-end space-x-3">
                            <ActionButton
                              variant="outline"
                              label="Voter contre"
                              onClick={() => handleVote(proces.id, 'contre')}
                            />
                            <ActionButton
                              label="Voter pour"
                              onClick={() => handleVote(proces.id, 'pour')}
                            />
                          </div>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
