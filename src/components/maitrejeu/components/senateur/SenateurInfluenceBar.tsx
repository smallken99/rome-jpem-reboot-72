
import React from 'react';

interface SenateurInfluenceBarProps {
  influence: number;
  maxInfluence?: number;
}

export const SenateurInfluenceBar: React.FC<SenateurInfluenceBarProps> = ({ 
  influence, 
  maxInfluence = 100 
}) => {
  const percentage = (influence / maxInfluence) * 100;
  
  return (
    <div className="w-full">
      <div className="flex justify-between text-sm mb-1">
        <span className="text-muted-foreground">Influence</span>
        <span className="font-medium">{influence}/{maxInfluence}</span>
      </div>
      <div className="h-2 bg-muted rounded-full overflow-hidden">
        <div 
          className="h-full bg-rome-gold transition-all duration-300"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};
