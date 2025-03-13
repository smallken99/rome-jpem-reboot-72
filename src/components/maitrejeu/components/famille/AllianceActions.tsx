
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
  CheckCircle,
  XCircle
} from 'lucide-react';
import { FamilleAlliance } from '../../types/familles';

interface AllianceActionsProps {
  alliance: FamilleAlliance;
  onView: () => void;
  onEdit: () => void;
  onActivate: () => void;
  onTerminate: () => void;
  onDelete: () => void;
}

export const AllianceActions: React.FC<AllianceActionsProps> = ({
  alliance,
  onView,
  onEdit,
  onActivate,
  onTerminate,
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
        
        {alliance.statut !== 'active' && (
          <DropdownMenuItem onClick={onActivate}>
            <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
            Activer l'alliance
          </DropdownMenuItem>
        )}
        
        {alliance.statut === 'active' && (
          <DropdownMenuItem onClick={onTerminate}>
            <XCircle className="h-4 w-4 mr-2 text-red-500" />
            Rompre l'alliance
          </DropdownMenuItem>
        )}
        
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
