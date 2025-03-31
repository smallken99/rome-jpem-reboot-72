
import React from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Client } from '../../types/clients';
import { SenateurJouable } from '../../types/senateurs';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { MoreHorizontal, Edit, Settings, ToggleLeft, Trash2, UserPlus } from 'lucide-react';

interface ClientsTableProps {
  clients: Client[];
  senateurs: SenateurJouable[];
  onEdit: (client: Client) => void;
  onAdvancedEdit: (client: Client) => void;
  onManageCompetences: (client: Client) => void;
  onStatusChange: (id: string, status: 'active' | 'inactive' | 'probation') => void;
  onDelete: (id: string) => void;
  onAssign: (clientId: string, senatorId: string | null) => void;
}

export const ClientsTable: React.FC<ClientsTableProps> = ({
  clients,
  senateurs,
  onEdit,
  onAdvancedEdit,
  onManageCompetences,
  onStatusChange,
  onDelete,
  onAssign
}) => {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge variant="success">Actif</Badge>;
      case 'inactive':
        return <Badge variant="destructive">Inactif</Badge>;
      case 'probation':
        return <Badge variant="warning">Probation</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };
  
  const getClientTypeLabel = (type: string) => {
    switch (type) {
      case 'standard':
        return <Badge variant="outline">Standard</Badge>;
      case 'premium':
        return <Badge>Premium</Badge>;
      case 'exclusive':
        return <Badge className="bg-amber-500">Exclusif</Badge>;
      default:
        return <Badge variant="outline">{type}</Badge>;
    }
  };
  
  const formatDate = (date: string | undefined) => {
    if (!date) return 'N/A';
    try {
      return format(new Date(date), 'dd/MM/yyyy', { locale: fr });
    } catch (error) {
      return 'Date invalide';
    }
  };
  
  // Function to capitalize the first letter of a string
  const capitalize = (str: string) => {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
  };
  
  return (
    <div className="border rounded-lg overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nom</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Statut</TableHead>
            <TableHead>Lieu</TableHead>
            <TableHead>Sénateur</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {clients.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center p-4 text-muted-foreground">
                Aucun client trouvé
              </TableCell>
            </TableRow>
          ) : (
            clients.map(client => (
              <TableRow key={client.id}>
                <TableCell>
                  <div className="font-medium">{client.name}</div>
                  <div className="text-xs text-muted-foreground">
                    {client.subType && `${capitalize(client.subType)}`}
                  </div>
                </TableCell>
                <TableCell>
                  {getClientTypeLabel(client.type)}
                </TableCell>
                <TableCell>
                  {getStatusBadge(client.activeStatus || client.status || 'active')}
                </TableCell>
                <TableCell>
                  {client.location || '-'}
                </TableCell>
                <TableCell>
                  {client.assignedToSenateurId ? (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          {senateurs.find(s => s.id === client.assignedToSenateurId)?.nom || 'Assigné'}
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => onAssign(client.id, null)}>
                          Retirer l'assignation
                        </DropdownMenuItem>
                        {senateurs.map(senateur => (
                          <DropdownMenuItem 
                            key={senateur.id}
                            onClick={() => onAssign(client.id, senateur.id)}
                          >
                            {senateur.prenom} {senateur.nom}
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  ) : (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm">
                          <UserPlus className="h-4 w-4 mr-1" />
                          Assigner
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        {senateurs.map(senateur => (
                          <DropdownMenuItem 
                            key={senateur.id}
                            onClick={() => onAssign(client.id, senateur.id)}
                          >
                            {senateur.prenom} {senateur.nom}
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => onEdit(client)}>
                        <Edit className="h-4 w-4 mr-2" />
                        Modifier
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onAdvancedEdit(client)}>
                        <Settings className="h-4 w-4 mr-2" />
                        Édition avancée
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onManageCompetences(client)}>
                        <Settings className="h-4 w-4 mr-2" />
                        Gérer les compétences
                      </DropdownMenuItem>
                      <DropdownMenu>
                        <DropdownMenuTrigger className="flex w-full items-center px-2 py-1.5 text-sm">
                          <ToggleLeft className="h-4 w-4 mr-2" />
                          Changer le statut
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem onClick={() => onStatusChange(client.id, 'active')}>
                            Actif
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => onStatusChange(client.id, 'inactive')}>
                            Inactif
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => onStatusChange(client.id, 'probation')}>
                            Probation
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                      <DropdownMenuItem 
                        onClick={() => onDelete(client.id)}
                        className="text-destructive"
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
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
