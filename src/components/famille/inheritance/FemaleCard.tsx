
import React from 'react';
import { Home, Coins } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { RomanCard } from '@/components/ui-custom/RomanCard';
import { calculateDowryValue } from './dowryUtils';

interface FemaleCardProps {
  female: {
    id: string;
    name: string;
    role?: string;
    gender: 'female';
    age: number;
  };
}

export const FemaleCard: React.FC<FemaleCardProps> = ({ female }) => {
  const relation = female.role || 'Fille';
  const dowryValue = calculateDowryValue(female);
  
  return (
    <RomanCard className="p-3 transition-all bg-gray-50/50">
      <div className="flex justify-between items-start">
        <div>
          <h4 className="font-cinzel">{female.name}</h4>
          <p className="text-sm text-muted-foreground">{relation} • {female.age} ans</p>
        </div>
        
        <div className="px-2 py-1 text-xs bg-gray-200 text-gray-600 rounded">
          Non éligible
        </div>
      </div>
      
      <Separator className="my-2" />
      
      <div className="text-sm grid grid-cols-2 gap-2">
        <div className="flex items-center gap-1">
          <Home className="h-4 w-4 text-muted-foreground" />
          <span>Dot de mariage ({dowryValue})</span>
        </div>
        
        <div className="flex items-center gap-1">
          <Coins className="h-4 w-4 text-muted-foreground" />
          <span>Portion d'héritage</span>
        </div>
      </div>
    </RomanCard>
  );
};
