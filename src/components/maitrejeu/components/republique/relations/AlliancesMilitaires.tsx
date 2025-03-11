
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Shield } from 'lucide-react';
import { Alliance } from './types';
import { alliancesMock } from './data';

interface AlliancesMilitairesProps {
  searchTerm?: string;
}

export const AlliancesMilitaires: React.FC<AlliancesMilitairesProps> = ({ searchTerm = '' }) => {
  // Filter alliances based on searchTerm if provided
  const filteredAlliances = searchTerm
    ? alliancesMock.filter(alliance => 
        alliance.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
        alliance.type?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        alliance.membres.some(member => member.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    : alliancesMock;
    
  return (
    <Card className="w-full mt-6">
      <CardHeader className="flex flex-row items-center gap-2">
        <Shield className="h-5 w-5" />
        <CardTitle>Alliances Militaires</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nom</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Membres</TableHead>
              <TableHead>Formation</TableHead>
              <TableHead>Forces</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAlliances.map(alliance => (
              <TableRow key={alliance.id}>
                <TableCell className="font-medium">{alliance.nom}</TableCell>
                <TableCell>
                  <Badge variant="outline">{alliance.type}</Badge>
                </TableCell>
                <TableCell>{alliance.membres.join(', ')}</TableCell>
                <TableCell>{alliance.dateFormation}</TableCell>
                <TableCell>
                  <div className="flex flex-col">
                    <span>{alliance.forces?.legions || 0} légions</span>
                    <span className="text-xs text-muted-foreground">{alliance.forces?.auxiliaires || 0} auxiliaires</span>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
