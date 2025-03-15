
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Nation } from './types';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Eye, Edit, Trash } from 'lucide-react';

// Mock data for the Nations
const mockNations: Nation[] = [
  {
    id: '1',
    name: 'Carthage',
    region: 'North Africa',
    status: 'enemy',
    population: 700000,
    militaryStrength: 75,
    diplomaticInfluence: 65,
    tradeValue: 1000000,
    lastContact: '15 Mars 705 AUC',
    description: 'Ancienne colonie phénicienne, principale rivale de Rome en Méditerranée occidentale.',
    leaders: ['Hamilcar Barca', 'Hasdrubal']
  },
  {
    id: '2',
    name: 'Ptolemaic Egypt',
    region: 'North Africa',
    status: 'ally',
    population: 4000000,
    militaryStrength: 60,
    diplomaticInfluence: 80,
    tradeValue: 3000000,
    lastContact: '5 Février 705 AUC',
    description: 'Royaume hellénistique dirigé par les Ptolémées, riche en ressources et culture.',
    leaders: ['Ptolémée XIII', 'Cléopâtre VII']
  },
  {
    id: '3',
    name: 'Parthian Empire',
    region: 'Asia',
    status: 'neutral',
    population: 8000000,
    militaryStrength: 85,
    diplomaticInfluence: 70,
    tradeValue: 2000000,
    lastContact: '20 Janvier 705 AUC',
    description: 'Empire iranien succédant aux Séleucides en Perse. Connu pour sa cavalerie redoutable.',
    leaders: ['Orodes II']
  }
];

interface NationsListProps {
  searchTerm: string;
  filters: any;
}

export const NationsList: React.FC<NationsListProps> = ({ 
  searchTerm, 
  filters
}) => {
  // Simple filtering logic
  const filteredNations = mockNations.filter(nation => {
    const matchesSearch = nation.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         nation.region.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = !filters.status || nation.status === filters.status;
    const matchesRegion = !filters.region || nation.region === filters.region;
    
    return matchesSearch && matchesStatus && matchesRegion;
  });
  
  // Status badge style helper
  const getStatusBadge = (status: Nation['status']) => {
    switch(status) {
      case 'ally':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Allié</Badge>;
      case 'enemy':
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-200">Ennemi</Badge>;
      case 'neutral':
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">Neutre</Badge>;
      case 'tributary':
        return <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-200">Tributaire</Badge>;
    }
  };

  return (
    <Card>
      {filteredNations.length === 0 ? (
        <div className="p-8 text-center text-muted-foreground">
          Aucune nation ne correspond à vos critères de recherche
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nation</TableHead>
              <TableHead>Région</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead>Force Militaire</TableHead>
              <TableHead>Dernier Contact</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredNations.map(nation => (
              <TableRow key={nation.id} className="hover:bg-muted/50">
                <TableCell className="font-medium">{nation.name}</TableCell>
                <TableCell>{nation.region}</TableCell>
                <TableCell>{getStatusBadge(nation.status)}</TableCell>
                <TableCell>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className="bg-rome-navy h-2.5 rounded-full" 
                      style={{ width: `${nation.militaryStrength}%` }}
                    ></div>
                  </div>
                </TableCell>
                <TableCell>{nation.lastContact}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-destructive">
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </Card>
  );
};
