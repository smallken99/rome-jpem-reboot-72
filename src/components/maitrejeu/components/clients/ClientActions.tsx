
import React from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import {
  MoreHorizontal,
  Pencil,
  Trash2,
  Star,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Sliders
} from 'lucide-react';
import { Client } from '../../types/clients';

interface ClientActionsProps {
  client: Client;
  onEdit: () => void;
  onAdvancedEdit: () => void;
  onManageCompetences: () => void;
  onStatusChange: (status: 'active' | 'inactive' | 'probation') => void;
  onDelete: () => void;
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
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Ouvrir le menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={onEdit}>
          <Pencil className="h-4 w-4 mr-2" />
          Modifier
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onAdvancedEdit}>
          <Sliders className="h-4 w-4 mr-2" />
          Modification avancée
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onManageCompetences}>
          <Star className="h-4 w-4 mr-2" />
          Gérer les compétences
        </DropdownMenuItem>
        
        <DropdownMenuSeparator />
        
        <DropdownMenuItem onClick={() => onStatusChange('active')}>
          <CheckCircle2 className="h-4 w-4 mr-2 text-green-500" />
          Marquer comme actif
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onStatusChange('inactive')}>
          <XCircle className="h-4 w-4 mr-2 text-red-500" />
          Marquer comme inactif
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onStatusChange('probation')}>
          <AlertTriangle className="h-4 w-4 mr-2 text-amber-500" />
          Mettre en probation
        </DropdownMenuItem>
        
        <DropdownMenuSeparator />
        
        <DropdownMenuItem 
          onClick={onDelete}
          className="text-red-600 focus:text-red-600"
        >
          <Trash2 className="h-4 w-4 mr-2" />
          Supprimer
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
