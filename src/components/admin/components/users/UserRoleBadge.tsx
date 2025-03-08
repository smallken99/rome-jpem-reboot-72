
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { ShieldAlert, ShieldCheck, User } from 'lucide-react';

interface UserRoleBadgeProps {
  role: 'admin' | 'moderator' | 'user';
}

export const UserRoleBadge: React.FC<UserRoleBadgeProps> = ({ role }) => {
  switch (role) {
    case 'admin':
      return (
        <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200 flex items-center gap-1">
          <ShieldAlert className="h-3 w-3" />
          Admin
        </Badge>
      );
    case 'moderator':
      return (
        <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 flex items-center gap-1">
          <ShieldCheck className="h-3 w-3" />
          Modérateur
        </Badge>
      );
    case 'user':
      return (
        <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200 flex items-center gap-1">
          <User className="h-3 w-3" />
          Utilisateur
        </Badge>
      );
    default:
      return null;
  }
};
