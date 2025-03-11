
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle, Clock, AlertTriangle } from 'lucide-react';

type SenateurStatus = 'actif' | 'inactif' | 'retraité' | 'décédé' | 'disgracié';

interface SenateurStatusBadgeProps {
  status: SenateurStatus;
}

export const SenateurStatusBadge: React.FC<SenateurStatusBadgeProps> = ({ status }) => {
  const getStatusConfig = (status: SenateurStatus) => {
    switch (status) {
      case 'actif':
        return {
          variant: 'outline' as const,
          className: 'bg-green-100 text-green-800 border-green-200',
          icon: <CheckCircle className="h-3.5 w-3.5 mr-1" />
        };
      case 'inactif':
        return {
          variant: 'outline' as const,
          className: 'bg-gray-100 text-gray-800 border-gray-200',
          icon: <Clock className="h-3.5 w-3.5 mr-1" />
        };
      case 'retraité':
        return {
          variant: 'outline' as const,
          className: 'bg-blue-100 text-blue-800 border-blue-200',
          icon: <CheckCircle className="h-3.5 w-3.5 mr-1" />
        };
      case 'décédé':
        return {
          variant: 'outline' as const,
          className: 'bg-red-100 text-red-800 border-red-200',
          icon: <XCircle className="h-3.5 w-3.5 mr-1" />
        };
      case 'disgracié':
        return {
          variant: 'outline' as const,
          className: 'bg-amber-100 text-amber-800 border-amber-200',
          icon: <AlertTriangle className="h-3.5 w-3.5 mr-1" />
        };
      default:
        return {
          variant: 'outline' as const,
          className: 'bg-gray-100 text-gray-800 border-gray-200',
          icon: null
        };
    }
  };

  const config = getStatusConfig(status);

  return (
    <Badge variant={config.variant} className={config.className}>
      <span className="flex items-center">
        {config.icon}
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    </Badge>
  );
};
