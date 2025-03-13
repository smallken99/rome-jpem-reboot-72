
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
  Users,
  Handshake,
  Eye,
  UserPlus,
  Plus
} from 'lucide-react';
import { FamilleInfo } from '../../types/familles';

interface FamilleActionsProps {
  famille: FamilleInfo;
  onView: () => void;
  onEdit: () => void;
  onAddMember: () => void;
  onAddAlliance: () => void;
  onViewMembers: () => void;
  onViewAlliances: () => void;
  onDelete: () => void;
}

export const FamilleActions: React.FC<FamilleActionsProps> = ({
  famille,
  onView,
  onEdit,
  onAddMember,
  onAddAlliance,
  onViewMembers,
  onViewAlliances,
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
        <DropdownMenuItem onClick={onView}>
          <Eye className="h-4 w-4 mr-2" />
          Voir détails
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onEdit}>
          <Pencil className="h-4 w-4 mr-2" />
          Modifier
        </DropdownMenuItem>
        
        <DropdownMenuSeparator />
        
        <DropdownMenuItem onClick={onAddMember}>
          <UserPlus className="h-4 w-4 mr-2" />
          Ajouter un membre
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onAddAlliance}>
          <Handshake className="h-4 w-4 mr-2" />
          Créer une alliance
        </DropdownMenuItem>
        
        <DropdownMenuSeparator />
        
        <DropdownMenuItem onClick={onViewMembers}>
          <Users className="h-4 w-4 mr-2" />
          Voir les membres
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onViewAlliances}>
          <Handshake className="h-4 w-4 mr-2" />
          Voir les alliances
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
