
import React from 'react';

interface ProgressBarProps {
  value: number;
  max?: number;
  color?: string;
  showLabel?: boolean;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ 
  value, 
  max = 100, 
  color = "bg-primary", 
  showLabel = false 
}) => {
  const percentage = Math.min(Math.max(0, value), max) / max * 100;
  
  const getColorClass = () => {
    if (color !== "bg-primary") return color;
    
    if (percentage >= 75) return "bg-green-500";
    if (percentage >= 50) return "bg-amber-500";
    if (percentage >= 25) return "bg-orange-500";
    return "bg-red-500";
  };

  return (
    <div className="w-full">
      <div className="w-full bg-muted rounded-full h-2.5 dark:bg-gray-700">
        <div 
          className={`h-2.5 rounded-full ${getColorClass()}`} 
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
      {showLabel && (
        <div className="text-xs text-muted-foreground mt-1 text-center">{value}%</div>
      )}
    </div>
  );
};
