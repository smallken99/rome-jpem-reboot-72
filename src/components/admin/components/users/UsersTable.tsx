
import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAdmin } from '../../context/AdminContext';
import { UserStatusBadge } from './UserStatusBadge';
import { UserRoleBadge } from './UserRoleBadge';
import { UserActionsMenu } from './UserActionsMenu';
import { User } from '../../types/adminTypes';

export const UsersTable: React.FC = () => {
  const { filteredUsers } = useAdmin();
  
  if (filteredUsers.length === 0) {
    return (
      <div className="text-center py-8 border rounded-md bg-muted/20">
        <p className="text-muted-foreground">Aucun utilisateur trouvé</p>
      </div>
    );
  }
  
  // Fonction pour obtenir les initiales d'un nom
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase();
  };
  
  // Formatage de la date
  const formatDate = (date: Date | null) => {
    if (!date) return 'Jamais';
    
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor(diff / (1000 * 60 * 60)) % 24;
    
    if (days > 0) {
      return `Il y a ${days} jour${days > 1 ? 's' : ''}`;
    } else if (hours > 0) {
      return `Il y a ${hours} heure${hours > 1 ? 's' : ''}`;
    } else {
      return 'Récemment';
    }
  };
  
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[250px]">Utilisateur</TableHead>
          <TableHead>Famille</TableHead>
          <TableHead>Rôle</TableHead>
          <TableHead>Statut</TableHead>
          <TableHead>Dernière connexion</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {filteredUsers.map((user: User) => (
          <TableRow key={user.id}>
            <TableCell className="font-medium">
              <div className="flex items-center space-x-3">
                <Avatar>
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span>{user.name}</span>
                  <span className="text-xs text-muted-foreground">{user.email}</span>
                </div>
              </div>
            </TableCell>
            <TableCell>{user.family || '-'}</TableCell>
            <TableCell>
              <UserRoleBadge role={user.role} />
            </TableCell>
            <TableCell>
              <UserStatusBadge status={user.status} />
            </TableCell>
            <TableCell>{formatDate(user.lastLogin)}</TableCell>
            <TableCell className="text-right">
              <UserActionsMenu user={user} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
