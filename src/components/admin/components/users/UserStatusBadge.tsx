
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Check, Ban, AlertTriangle } from 'lucide-react';

interface UserStatusBadgeProps {
  status: 'active' | 'inactive' | 'banned';
}

export const UserStatusBadge: React.FC<UserStatusBadgeProps> = ({ status }) => {
  switch (status) {
    case 'active':
      return (
        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 flex items-center gap-1">
          <Check className="h-3 w-3" />
          Actif
        </Badge>
      );
    case 'inactive':
      return (
        <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200 flex items-center gap-1">
          <AlertTriangle className="h-3 w-3" />
          Inactif
        </Badge>
      );
    case 'banned':
      return (
        <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200 flex items-center gap-1">
          <Ban className="h-3 w-3" />
          Banni
        </Badge>
      );
    default:
      return null;
  }
};
