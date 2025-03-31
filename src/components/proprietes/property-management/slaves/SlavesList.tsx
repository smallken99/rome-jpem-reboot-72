
import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export interface Slave {
  id: string;
  name?: string;
  age: number;
  status: string;
  acquired: Date;
  value: number;
  origin?: string;
  skills?: string[];
  buildingId?: string;
}

interface SlavesListProps {
  slaves: Slave[];
  onDeleteSlave: (id: string) => void;
}

export const SlavesList: React.FC<SlavesListProps> = ({ slaves, onDeleteSlave }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Liste des esclaves</CardTitle>
      </CardHeader>
      <CardContent>
        {slaves.length === 0 ? (
          <p className="text-center py-8 text-muted-foreground">
            Aucun esclave enregistré
          </p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Identifiant</TableHead>
                <TableHead>Âge</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Acquis le</TableHead>
                <TableHead>Valeur</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {slaves.map((slave) => (
                <TableRow key={slave.id}>
                  <TableCell className="font-medium">
                    {slave.name || `Esclave #${slave.id.substring(0, 6)}`}
                  </TableCell>
                  <TableCell>{slave.age} ans</TableCell>
                  <TableCell>
                    <Badge variant={slave.status === 'assigned' ? 'outline' : 'secondary'}>
                      {slave.status === 'assigned' ? 'Assigné' : 'Disponible'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {slave.acquired instanceof Date
                      ? slave.acquired.toLocaleDateString()
                      : new Date(slave.acquired).toLocaleDateString()}
                  </TableCell>
                  <TableCell>{slave.value} As</TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onDeleteSlave(slave.id)}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
};
