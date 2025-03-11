
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Nation } from './types';
import { nationsMock } from './data';

export const NationsList: React.FC = () => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Nations et États Étrangers</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nom</TableHead>
              <TableHead>Région</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead>Relation</TableHead>
              <TableHead>Puissance</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {nationsMock.map(nation => (
              <TableRow key={nation.id}>
                <TableCell className="font-medium">{nation.nom}</TableCell>
                <TableCell>{nation.région}</TableCell>
                <TableCell>
                  <Badge className={
                    nation.statut === "Allié" ? "bg-green-500" :
                    nation.statut === "Neutre" ? "bg-yellow-500" :
                    nation.statut === "Ennemi" ? "bg-red-500" :
                    "bg-blue-500"
                  }>
                    {nation.statut}
                  </Badge>
                </TableCell>
                <TableCell>{nation.relationAvecRome}/100</TableCell>
                <TableCell>{nation.puissanceMilitaire}/100</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
