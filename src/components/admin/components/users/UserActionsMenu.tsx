
import React from 'react';
import { DotsHorizontalIcon } from '@radix-ui/react-icons';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { User } from '../../types/adminTypes';
import { Edit, Trash2, ShieldAlert, ShieldCheck, User as UserIcon, UserX } from 'lucide-react';
import { toast } from 'sonner';
import { useAdmin } from '../../context/AdminContext';

interface UserActionsMenuProps {
  user: User;
}

export const UserActionsMenu: React.FC<UserActionsMenuProps> = ({ user }) => {
  const { deleteUser, toggleUserStatus, promoteDemoteUser } = useAdmin();
  
  const handleDeleteUser = async () => {
    if (window.confirm(`Êtes-vous sûr de vouloir supprimer l'utilisateur ${user.name} ?`)) {
      const success = await deleteUser(user.id);
      if (success) {
        toast.success(`L'utilisateur ${user.name} a été supprimé.`);
      } else {
        toast.error(`Impossible de supprimer l'utilisateur ${user.name}.`);
      }
    }
  };
  
  const handleToggleStatus = async () => {
    const newStatus = user.status === 'active' ? 'inactive' : 'active';
    const success = await toggleUserStatus(user.id, newStatus === 'active');
    if (success) {
      toast.success(`Le statut de ${user.name} a été changé en "${newStatus}".`);
    } else {
      toast.error(`Impossible de changer le statut de ${user.name}.`);
    }
  };
  
  const handleChangeRole = async (newRole: string) => {
    // On ne veut pas que l'utilisateur puisse changer son propre rôle
    if (user.id === 'current-user-id') { // Remplacez par la logique pour détecter l'utilisateur actuel
      toast.error("Vous ne pouvez pas changer votre propre rôle.");
      return;
    }
    
    const success = await promoteDemoteUser(user.id, newRole);
    if (success) {
      toast.success(`Le rôle de ${user.name} a été changé en "${newRole}".`);
    } else {
      toast.error(`Impossible de changer le rôle de ${user.name}.`);
    }
  };
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <DotsHorizontalIcon className="h-4 w-4" />
          <span className="sr-only">Ouvrir le menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[200px]">
        <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
          <Edit className="h-4 w-4" />
          <span>Modifier</span>
        </DropdownMenuItem>
        
        <DropdownMenuSeparator />
        
        {/* Rôles */}
        <DropdownMenuItem 
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => handleChangeRole('user')}
          disabled={user.role === 'user'}
        >
          <UserIcon className="h-4 w-4" />
          <span>Définir comme Utilisateur</span>
        </DropdownMenuItem>
        
        <DropdownMenuItem 
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => handleChangeRole('moderator')}
          disabled={user.role === 'moderator'}
        >
          <ShieldCheck className="h-4 w-4" />
          <span>Définir comme Modérateur</span>
        </DropdownMenuItem>
        
        <DropdownMenuItem 
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => handleChangeRole('admin')}
          disabled={user.role === 'admin'}
        >
          <ShieldAlert className="h-4 w-4" />
          <span>Définir comme Admin</span>
        </DropdownMenuItem>
        
        <DropdownMenuSeparator />
        
        {/* Activer/Désactiver */}
        <DropdownMenuItem 
          className="flex items-center gap-2 cursor-pointer"
          onClick={handleToggleStatus}
        >
          {user.status === 'active' ? (
            <>
              <UserX className="h-4 w-4" />
              <span>Désactiver</span>
            </>
          ) : (
            <>
              <UserIcon className="h-4 w-4" />
              <span>Activer</span>
            </>
          )}
        </DropdownMenuItem>
        
        <DropdownMenuSeparator />
        
        {/* Supprimer */}
        <DropdownMenuItem 
          className="flex items-center gap-2 cursor-pointer text-red-600 focus:text-red-600"
          onClick={handleDeleteUser}
        >
          <Trash2 className="h-4 w-4" />
          <span>Supprimer</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
