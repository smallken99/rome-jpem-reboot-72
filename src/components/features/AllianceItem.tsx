
import React from 'react';
import { RomanCard } from '../ui-custom/RomanCard';
import { Handshake, Users, Landmark } from 'lucide-react';

export type AllianceType = 'politique' | 'matrimoniale';
export type AllianceStatus = 'actif' | 'en négociation' | 'rompu';

interface AllianceItemProps {
  name: string;
  type: AllianceType;
  status: AllianceStatus;
}

export const AllianceItem: React.FC<AllianceItemProps> = ({ name, type, status }) => {
  const getStatusClass = () => {
    switch (status) {
      case 'actif':
        return 'text-green-600';
      case 'en négociation':
        return 'text-yellow-600';
      case 'rompu':
        return 'text-red-600';
      default:
        return '';
    }
  };
  
  const getTypeIcon = () => {
    switch (type) {
      case 'politique':
        return <Landmark className="h-5 w-5" />;
      case 'matrimoniale':
        return <Users className="h-5 w-5" />;
      default:
        return <Handshake className="h-5 w-5" />;
    }
  };
  
  return (
    <div className="flex items-center gap-3 p-2 border-b border-rome-gold/20 last:border-0 hover:bg-rome-gold/5 transition-colors">
      <div className="text-rome-gold/80">
        {getTypeIcon()}
      </div>
      <div className="flex-1">
        <div className="font-medium">{name}</div>
        <div className="text-sm text-muted-foreground capitalize">{type}</div>
      </div>
      <div className={`text-sm font-medium ${getStatusClass()} capitalize`}>
        {status}
      </div>
    </div>
  );
};
