
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
  Eye,
  Star,
  Users,
  UserPlus
} from 'lucide-react';
import { MembreFamille } from '../../types/familles';

interface MembreActionsProps {
  membre: MembreFamille;
  onView: () => void;
  onEdit: () => void;
  onPromote: (role: string) => void;
  onAddRelation: () => void;
  onViewFamily: () => void;
  onDelete: () => void;
}

export const MembreActions: React.FC<MembreActionsProps> = ({
  membre,
  onView,
  onEdit,
  onPromote,
  onAddRelation,
  onViewFamily,
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
        
        {membre.genre === 'male' && (
          <DropdownMenuItem onClick={() => onPromote('Pater Familias')}>
            <Star className="h-4 w-4 mr-2" />
            Promouvoir comme chef de famille
          </DropdownMenuItem>
        )}
        
        {membre.genre === 'female' && (
          <DropdownMenuItem onClick={() => onPromote('Mater Familias')}>
            <Star className="h-4 w-4 mr-2" />
            Promouvoir comme matrone
          </DropdownMenuItem>
        )}
        
        <DropdownMenuItem onClick={onAddRelation}>
          <UserPlus className="h-4 w-4 mr-2" />
          Ajouter une relation
        </DropdownMenuItem>
        
        <DropdownMenuItem onClick={onViewFamily}>
          <Users className="h-4 w-4 mr-2" />
          Voir la famille
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
