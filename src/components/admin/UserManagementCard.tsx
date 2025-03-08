
import React from 'react';
import { RomanCard } from '@/components/ui-custom/RomanCard';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export const UserManagementCard: React.FC = () => {
  return (
    <RomanCard>
      <RomanCard.Header>
        <h2 className="font-cinzel text-lg">Administration des utilisateurs</h2>
      </RomanCard.Header>
      <RomanCard.Content>
        <p className="text-muted-foreground mb-4">
          Ici, vous pouvez gérer les utilisateurs du site web.
        </p>
        
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nom</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Rôle</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>Jean Dupont</TableCell>
              <TableCell>jean.dupont@example.com</TableCell>
              <TableCell>
                <Badge variant="secondary">Administrateur</Badge>
              </TableCell>
              <TableCell className="text-right">
                <button className="px-4 py-2 bg-red-500 text-white rounded">Supprimer</button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Jeanne Martin</TableCell>
              <TableCell>jeanne.martin@example.com</TableCell>
              <TableCell>
                <Badge variant="secondary">Modérateur</Badge>
              </TableCell>
              <TableCell className="text-right">
                <button className="px-4 py-2 bg-red-500 text-white rounded">Supprimer</button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </RomanCard.Content>
    </RomanCard>
  );
};
