
import React from 'react';
import { Badge } from '@/components/ui/badge';

interface StatusBadgeProps {
  status: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  switch(status) {
    case 'completed':
      return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Terminé</Badge>;
    case 'in_progress':
      return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">En construction</Badge>;
    case 'damaged':
      return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Endommagé</Badge>;
    case 'abandoned':
      return <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">Abandonné</Badge>;
    case 'planned':
      return <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">Planifié</Badge>;
    default:
      return <Badge variant="outline">Inconnu</Badge>;
  }
};
