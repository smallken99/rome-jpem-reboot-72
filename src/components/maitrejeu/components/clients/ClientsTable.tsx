
import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Client } from '../../types/clients';
import { SenateurJouable } from '../../types/senateurs';
import { MoreHorizontal, Edit, FileEdit, Trash2, UserPlus, Star, Shield } from 'lucide-react';

interface ClientsTableProps {
  clients: Client[];
  senateurs: SenateurJouable[];
  onEdit: (client: Client) => void;
  onAdvancedEdit: (client: Client) => void;
  onManageCompetences: (client: Client) => void;
  onStatusChange: (clientId: string, status: string) => void;
  onDelete: (clientId: string) => void;
  onAssign: (clientId: string, senateurId: string | null) => void;
}

export const ClientsTable: React.FC<ClientsTableProps> = ({
  clients,
  senateurs,
  onEdit,
  onAdvancedEdit,
  onManageCompetences,
  onStatusChange,
  onDelete,
  onAssign,
}) => {
  const getStatusColor = (status?: string) => {
    if (!status) return "default";
    switch (status) {
      case 'active':
        return 'success';
      case 'inactive':
        return 'secondary';
      case 'probation':
        return 'destructive';
      default:
        return 'default';
    }
  };

  const getAssignedSenateur = (client: Client) => {
    if (!client.assignedToSenateurId) return null;
    return senateurs.find((s) => s.id === client.assignedToSenateurId);
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[200px]">Nom</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Lieu</TableHead>
            <TableHead>Loyauté</TableHead>
            <TableHead>Statut</TableHead>
            <TableHead>Assigné à</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {clients.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="h-24 text-center">
                Aucun client trouvé.
              </TableCell>
            </TableRow>
          ) : (
            clients.map((client) => (
              <TableRow key={client.id}>
                <TableCell className="font-medium">{client.name}</TableCell>
                <TableCell>
                  {client.type.charAt(0).toUpperCase() + client.type.slice(1)}
                  {client.subType && (
                    <span className="text-muted-foreground ml-1">({client.subType})</span>
                  )}
                </TableCell>
                <TableCell>{client.location || 'Inconnu'}</TableCell>
                <TableCell>{client.loyalty || 'Moyenne'}</TableCell>
                <TableCell>
                  <Badge variant={getStatusColor(client.activeStatus)}>
                    {client.activeStatus
                      ? client.activeStatus.charAt(0).toUpperCase() + client.activeStatus.slice(1)
                      : 'Actif'}
                  </Badge>
                </TableCell>
                <TableCell>
                  {client.assignedToSenateurId ? (
                    <span className="flex items-center">
                      <UserPlus className="mr-2 h-4 w-4 text-green-500" />
                      {getAssignedSenateur(client)?.name || 'Sénateur'}
                    </span>
                  ) : (
                    <span className="text-muted-foreground">Non assigné</span>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => onEdit(client)}>
                        <Edit className="mr-2 h-4 w-4" />
                        Modifier
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onAdvancedEdit(client)}>
                        <FileEdit className="mr-2 h-4 w-4" />
                        Édition avancée
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onManageCompetences(client)}>
                        <Star className="mr-2 h-4 w-4" />
                        Compétences
                      </DropdownMenuItem>
                      {client.activeStatus !== 'active' ? (
                        <DropdownMenuItem onClick={() => onStatusChange(client.id, 'active')}>
                          <Shield className="mr-2 h-4 w-4 text-green-500" />
                          Activer
                        </DropdownMenuItem>
                      ) : (
                        <DropdownMenuItem onClick={() => onStatusChange(client.id, 'inactive')}>
                          <Shield className="mr-2 h-4 w-4 text-red-500" />
                          Désactiver
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuItem
                        className="text-red-600"
                        onClick={() => onDelete(client.id)}
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Supprimer
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};
