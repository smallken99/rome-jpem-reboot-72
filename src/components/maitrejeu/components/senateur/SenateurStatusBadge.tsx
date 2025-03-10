
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface SenateurStatusBadgeProps {
  status: string;
}

export const SenateurStatusBadge: React.FC<SenateurStatusBadgeProps> = ({ status }) => {
  const getStatusColor = () => {
    switch (status) {
      case 'Actif':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'Inactif':
        return 'bg-red-100 text-red-800 border-red-300';
      case 'En mission':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  return (
    <Badge
      variant="outline"
      className={cn('font-medium', getStatusColor())}
    >
      {status}
    </Badge>
  );
};
