
import React from 'react';

export interface SenateurStatBarProps {
  value: number;
  maxValue?: number;
  color?: string;
}

export const SenateurInfluenceBar: React.FC<SenateurStatBarProps> = ({ 
  value, 
  maxValue = 100,
  color = '#3b82f6' // blue-500
}) => {
  const percentage = Math.min(100, Math.max(0, (value / maxValue) * 100));
  
  return (
    <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
      <div 
        className="h-full rounded-full" 
        style={{ 
          width: `${percentage}%`,
          backgroundColor: color
        }}
      />
    </div>
  );
};
