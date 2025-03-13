
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Nation } from './types';
import { nationsMock } from './data';

interface NationsListProps {
  searchTerm?: string;
}

export const NationsList: React.FC<NationsListProps> = ({ searchTerm = '' }) => {
  // Filter nations based on searchTerm if provided
  const filteredNations = searchTerm
    ? nationsMock.filter(nation => 
        nation.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
        nation.région.toLowerCase().includes(searchTerm.toLowerCase()) ||
        nation.gouvernement.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : nationsMock;
    
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Nom</TableHead>
          <TableHead>Région</TableHead>
          <TableHead>Statut</TableHead>
          <TableHead>Puissance</TableHead>
          <TableHead>Richesse</TableHead>
          <TableHead>Relation</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {filteredNations.map(nation => (
          <TableRow key={nation.id}>
            <TableCell className="font-medium">{nation.nom}</TableCell>
            <TableCell>{nation.région}</TableCell>
            <TableCell>
              <Badge className={
                nation.statut === "Allié" ? "bg-green-500" : 
                nation.statut === "Neutre" ? "bg-gray-500" : 
                nation.statut === "Ennemi" ? "bg-red-500" : 
                "bg-blue-500"
              }>
                {nation.statut}
              </Badge>
            </TableCell>
            <TableCell>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div 
                  className="bg-red-600 h-2.5 rounded-full"
                  style={{ width: `${nation.puissanceMilitaire * 10}%` }}
                ></div>
              </div>
            </TableCell>
            <TableCell>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div 
                  className="bg-yellow-400 h-2.5 rounded-full"
                  style={{ width: `${nation.richesse * 10}%` }}
                ></div>
              </div>
            </TableCell>
            <TableCell>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div 
                  className={`h-2.5 rounded-full ${
                    nation.relationAvecRome > 6 ? "bg-green-500" : 
                    nation.relationAvecRome > 3 ? "bg-yellow-400" : 
                    "bg-red-600"
                  }`}
                  style={{ width: `${nation.relationAvecRome * 10}%` }}
                ></div>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
