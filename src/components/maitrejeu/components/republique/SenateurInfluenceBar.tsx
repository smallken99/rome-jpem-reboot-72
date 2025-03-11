
import React from 'react';
import { cn } from '@/lib/utils';

interface SenateurInfluenceBarProps {
  influence: number;
}

export const SenateurInfluenceBar: React.FC<SenateurInfluenceBarProps> = ({ influence }) => {
  // Déterminer la couleur en fonction du niveau d'influence
  const getColorClass = (value: number) => {
    if (value >= 80) return "bg-red-500";
    if (value >= 60) return "bg-orange-500";
    if (value >= 40) return "bg-yellow-500";
    if (value >= 20) return "bg-green-500";
    return "bg-blue-500";
  };

  // Limiter la valeur entre 0 et 100
  const normalizedValue = Math.max(0, Math.min(100, influence));
  
  return (
    <div className="space-y-1 w-full">
      <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
        <div 
          className={cn("h-full rounded-full", getColorClass(normalizedValue))}
          style={{ width: `${normalizedValue}%` }}
        />
      </div>
      <div className="text-xs text-center text-muted-foreground">
        {normalizedValue}/100
      </div>
    </div>
  );
};
