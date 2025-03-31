
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Pencil, Trash2 } from 'lucide-react';

interface Slave {
  id: string;
  name: string;
  age: number;
  health: number;
  specialization?: string;
  acquired: string;
  value: number;
  status: 'assigned' | 'unassigned' | 'sick' | 'training';
}

interface SlavesListProps {
  slaves: Slave[];
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

export const SlavesList: React.FC<SlavesListProps> = ({
  slaves,
  onEdit,
  onDelete
}) => {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'assigned':
        return <Badge variant="secondary">Assigné</Badge>;
      case 'unassigned':
        return <Badge variant="outline">Non assigné</Badge>;
      case 'sick':
        return <Badge variant="destructive">Malade</Badge>;
      case 'training':
        return <Badge variant="default">En formation</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Nom</TableHead>
          <TableHead>Âge</TableHead>
          <TableHead>Santé</TableHead>
          <TableHead>Spécialisation</TableHead>
          <TableHead>Valeur</TableHead>
          <TableHead>Statut</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {slaves.length === 0 ? (
          <TableRow>
            <TableCell colSpan={7} className="text-center h-32 text-muted-foreground">
              Aucun esclave dans votre propriété
            </TableCell>
          </TableRow>
        ) : (
          slaves.map((slave) => (
            <TableRow key={slave.id}>
              <TableCell className="font-medium">{slave.name}</TableCell>
              <TableCell>{slave.age} ans</TableCell>
              <TableCell>{slave.health}%</TableCell>
              <TableCell>{slave.specialization || '—'}</TableCell>
              <TableCell>{slave.value} as</TableCell>
              <TableCell>{getStatusBadge(slave.status)}</TableCell>
              <TableCell className="text-right">
                {onEdit && (
                  <Button variant="ghost" size="sm" onClick={() => onEdit(slave.id)}>
                    <Pencil className="h-4 w-4" />
                  </Button>
                )}
                {onDelete && (
                  <Button variant="ghost" size="sm" onClick={() => onDelete(slave.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
};
