
import React from 'react';
import { cn } from '@/lib/utils';

interface StatBoxProps {
  title: string;
  value: string | number;
  description: string;
  icon?: React.ReactNode;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
  className?: string;
}

export const StatBox: React.FC<StatBoxProps> = ({ 
  title, 
  value, 
  description,
  icon, 
  trend,
  trendValue,
  className 
}) => {
  const getTrendIcon = () => {
    if (!trend) return null;
    
    const commonClasses = "ml-1 inline";
    
    if (trend === 'up') {
      return <span className={`${commonClasses} text-green-600`}>↑ {trendValue}</span>;
    } else if (trend === 'down') {
      return <span className={`${commonClasses} text-red-600`}>↓ {trendValue}</span>;
    } else {
      return <span className={`${commonClasses} text-yellow-600`}>→ {trendValue}</span>;
    }
  };
  
  return (
    <div className={cn("bg-white p-4 rounded-md border border-rome-gold/30 shadow-sm", className)}>
      <div className="flex justify-between items-start">
        <div>
          <div className="text-sm text-muted-foreground mb-1">{title}</div>
          <div className="text-2xl font-cinzel font-semibold text-rome-navy flex items-center">
            {value}
            {getTrendIcon()}
          </div>
          <div className="text-xs text-muted-foreground mt-1">{description}</div>
        </div>
        {icon && (
          <div className="text-rome-gold opacity-80 h-10 w-10 flex items-center justify-center bg-rome-parchment rounded-full">
            {icon}
          </div>
        )}
      </div>
    </div>
  );
};
