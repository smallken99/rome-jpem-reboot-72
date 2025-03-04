
import React from 'react';
import { RomanCard } from '../ui-custom/RomanCard';
import { Handshake, Users, Landmark, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';

export type AllianceType = 'politique' | 'matrimoniale';
export type AllianceStatus = 'actif' | 'en négociation' | 'rompu';

interface AllianceItemProps {
  name: string;
  type: AllianceType;
  status: AllianceStatus;
  benefits?: string[];
}

export const AllianceItem: React.FC<AllianceItemProps> = ({ name, type, status, benefits = [] }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
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
    <div className="border-b border-rome-gold/20 last:border-0 hover:bg-rome-gold/5 transition-colors">
      <div 
        className="flex items-center gap-3 p-2 cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
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
        <div className="text-muted-foreground">
          {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </div>
      </div>
      
      {isExpanded && benefits.length > 0 && (
        <div className="bg-muted/30 p-3 pl-10 text-sm">
          <p className="font-medium mb-1">Bénéfices:</p>
          <ul className="space-y-1">
            {benefits.map((benefit, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="text-rome-gold">•</span>
                <span>{benefit}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
      
      {isExpanded && benefits.length === 0 && (
        <div className="bg-muted/30 p-3 pl-10 text-sm italic text-muted-foreground">
          Aucun bénéfice actuellement.
        </div>
      )}
    </div>
  );
};
