
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useMaitreJeu } from '../../context';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Database, Users, MapPin, ScrollText } from 'lucide-react';

export const DatabaseOverview: React.FC = () => {
  const { familles, senateurs, provinces, lois } = useMaitreJeu();

  const tables = [
    { name: 'Familles', icon: <Users className="h-4 w-4" />, count: familles.length },
    { name: 'Sénateurs', icon: <Users className="h-4 w-4" />, count: senateurs.length },
    { name: 'Provinces', icon: <MapPin className="h-4 w-4" />, count: provinces.length },
    { name: 'Lois', icon: <ScrollText className="h-4 w-4" />, count: lois.length },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Vue d'ensemble de la base de données</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12"></TableHead>
              <TableHead>Table</TableHead>
              <TableHead className="text-right">Enregistrements</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tables.map((table, index) => (
              <TableRow key={index}>
                <TableCell>{table.icon}</TableCell>
                <TableCell className="font-medium">{table.name}</TableCell>
                <TableCell className="text-right">{table.count}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
