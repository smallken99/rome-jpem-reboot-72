
import React from 'react';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { MoreVertical, Edit, Star, Shield, UserCheck, Trash2 } from 'lucide-react';
import { Client } from '../../types/clients';

interface ClientActionsProps {
  client: Client;
  onEdit: (client: Client) => void;
  onAdvancedEdit: (client: Client) => void;
  onManageCompetences: (client: Client) => void;
  onStatusChange: (id: string, status: 'active' | 'inactive' | 'probation') => void;
  onDelete: (id: string) => void;
}

export const ClientActions: React.FC<ClientActionsProps> = ({
  client,
  onEdit,
  onAdvancedEdit,
  onManageCompetences,
  onStatusChange,
  onDelete
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0" title="Actions">
          <MoreVertical className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => onEdit(client)}>
          <Edit className="mr-2 h-4 w-4" />
          Modifier
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onAdvancedEdit(client)}>
          <Star className="mr-2 h-4 w-4" />
          Édition avancée
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onManageCompetences(client)}>
          <Shield className="mr-2 h-4 w-4" />
          Gérer les compétences
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => onStatusChange(client.id, 'active')}>
          <UserCheck className="mr-2 h-4 w-4" />
          Marquer comme actif
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onStatusChange(client.id, 'inactive')}>
          <UserCheck className="mr-2 h-4 w-4" />
          Marquer comme inactif
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => onDelete(client.id)}>
          <Trash2 className="mr-2 h-4 w-4" />
          Supprimer
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
