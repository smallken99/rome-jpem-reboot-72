
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Users, Coins } from 'lucide-react';

type Family = {
  id: string;
  name: string;
  prestige: string;
  influence: string;
  wealth: string;
};

interface FamilySelectionCardProps {
  family: Family;
  isSelected: boolean;
  onSelect: (familyId: string) => void;
}

export const FamilySelectionCard: React.FC<FamilySelectionCardProps> = ({ 
  family, 
  isSelected, 
  onSelect 
}) => {
  return (
    <Card 
      className={`border cursor-pointer transition-colors hover:border-rome-gold ${
        isSelected ? 'border-rome-gold bg-rome-gold/5' : ''
      }`}
      onClick={() => onSelect(family.id)}
    >
      <CardContent className="p-4">
        <div className="flex justify-between items-center">
          <h4 className="font-cinzel">{family.name}</h4>
          <span className="text-sm">Prestige: {family.prestige}</span>
        </div>
        
        <div className="mt-2 grid grid-cols-2 gap-x-4 gap-y-1 text-sm">
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4 text-rome-navy" />
            <span>Influence: {family.influence}</span>
          </div>
          <div className="flex items-center gap-1">
            <Coins className="h-4 w-4 text-rome-gold" />
            <span>Richesse: {family.wealth}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
