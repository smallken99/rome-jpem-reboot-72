
import React from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { MoreHorizontal, Shield, ShieldOff, UserCheck, UserX, Trash2, Mail } from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';
import { User } from '../../types/adminTypes';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

interface UserActionsMenuProps {
  user: User;
}

export const UserActionsMenu: React.FC<UserActionsMenuProps> = ({ user }) => {
  const [showDeleteDialog, setShowDeleteDialog] = React.useState(false);
  const { deleteUser, toggleUserStatus, promoteDemoteUser } = useAdmin();
  
  const handleDelete = async () => {
    await deleteUser(user.id);
    setShowDeleteDialog(false);
  };
  
  const handleToggleStatus = async () => {
    await toggleUserStatus(user.id, user.status !== 'active');
  };
  
  const handlePromoteDemote = async (role: string) => {
    await promoteDemoteUser(user.id, role);
  };
  
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <MoreHorizontal className="h-4 w-4" />
            <span className="sr-only">Menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => console.log('Voir le profil')}>
            <User className="h-4 w-4 mr-2" />
            Voir le profil
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => console.log('Envoyer un message')}>
            <Mail className="h-4 w-4 mr-2" />
            Envoyer un message
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          
          {user.status === 'active' ? (
            <DropdownMenuItem onClick={handleToggleStatus}>
              <UserX className="h-4 w-4 mr-2" />
              Désactiver
            </DropdownMenuItem>
          ) : (
            <DropdownMenuItem onClick={handleToggleStatus}>
              <UserCheck className="h-4 w-4 mr-2" />
              Activer
            </DropdownMenuItem>
          )}
          
          {user.role === 'user' ? (
            <DropdownMenuItem onClick={() => handlePromoteDemote('moderator')}>
              <Shield className="h-4 w-4 mr-2" />
              Promouvoir modérateur
            </DropdownMenuItem>
          ) : (
            <DropdownMenuItem onClick={() => handlePromoteDemote('user')}>
              <ShieldOff className="h-4 w-4 mr-2" />
              Rétrograder
            </DropdownMenuItem>
          )}
          
          <DropdownMenuSeparator />
          <DropdownMenuItem 
            onClick={() => setShowDeleteDialog(true)}
            className="text-red-500 focus:text-red-500 focus:bg-red-50"
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Supprimer
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Supprimer l'utilisateur ?</AlertDialogTitle>
            <AlertDialogDescription>
              Êtes-vous sûr de vouloir supprimer l'utilisateur {user.name} ? Cette action est irréversible.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-red-500 hover:bg-red-600">
              Supprimer
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
