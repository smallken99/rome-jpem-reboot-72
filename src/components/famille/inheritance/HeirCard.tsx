
import React from 'react';
import { Home, Coins, Crown } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { RomanCard } from '@/components/ui-custom/RomanCard';

interface HeirCardProps {
  heir: {
    id: string;
    name: string;
    role?: string;
    gender: 'male' | 'female';
    age: number;
  };
  isSelected: boolean;
  onSelect: (heirId: string) => void;
}

export const HeirCard: React.FC<HeirCardProps> = ({ heir, isSelected, onSelect }) => {
  const relation = heir.role || 'Fils';
  
  return (
    <RomanCard className={`p-3 transition-all ${isSelected ? 'border-l-4 border-l-rome-gold bg-rome-gold/5' : ''}`}>
      <div className="flex justify-between items-start">
        <div>
          <h4 className="font-cinzel">{heir.name}</h4>
          <p className="text-sm text-muted-foreground">{relation} • {heir.age} ans</p>
        </div>
        
        {isSelected ? (
          <div className="px-2 py-1 text-xs bg-rome-gold/20 text-rome-gold rounded flex items-center gap-1">
            <Crown className="h-3.5 w-3.5" />
            Héritier Principal
          </div>
        ) : (
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => onSelect(heir.id)}
            className="text-xs border-rome-navy/30 text-rome-navy hover:bg-rome-navy/10"
          >
            Désigner Héritier
          </Button>
        )}
      </div>
      
      <Separator className="my-2" />
      
      <div className="text-sm grid grid-cols-2 gap-2">
        <div className="flex items-center gap-1">
          <Home className="h-4 w-4 text-muted-foreground" />
          <span>Hérite des terres</span>
        </div>
        
        <div className="flex items-center gap-1">
          <Coins className="h-4 w-4 text-muted-foreground" />
          <span>{isSelected ? 'Hérite de la fortune' : 'Portion d\'héritage'}</span>
        </div>
      </div>
      
      {isSelected && (
        <div className="mt-3 pt-2 border-t border-dashed border-muted">
          <p className="text-xs text-rome-navy">
            En tant qu'héritier principal, {heir.name} recevra la majorité des terres et des propriétés, 
            ainsi que le nom et les titres de la famille.
          </p>
        </div>
      )}
    </RomanCard>
  );
};
