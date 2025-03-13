
import React from 'react';

export interface SenateurStatBarProps {
  value: number;
  maxValue?: number;
  color?: string;
  label?: string;
  showValue?: boolean;
}

export const SenateurInfluenceBar: React.FC<SenateurStatBarProps> = ({ 
  value, 
  maxValue = 100,
  color = '#3b82f6', // blue-500
  label,
  showValue = false
}) => {
  const percentage = Math.min(100, Math.max(0, (value / maxValue) * 100));
  
  return (
    <div className="w-full">
      {label && (
        <div className="flex justify-between mb-1 text-sm">
          <span className="text-muted-foreground">{label}</span>
          {showValue && <span className="text-muted-foreground">{value}/{maxValue}</span>}
        </div>
      )}
      <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
        <div 
          className="h-full rounded-full" 
          style={{ 
            width: `${percentage}%`,
            backgroundColor: color
          }}
        />
      </div>
    </div>
  );
};
