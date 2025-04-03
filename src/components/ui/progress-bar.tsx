
import React from 'react';
import { cn } from '@/lib/utils';

interface ProgressBarProps {
  value: number;
  max: number;
  className?: string;
  indicatorClassName?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ 
  value, 
  max = 100, 
  className, 
  indicatorClassName 
}) => {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));
  
  return (
    <div className={cn("h-2.5 w-full bg-muted overflow-hidden rounded-full", className)}>
      <div 
        className={cn("h-full bg-primary transition-all", indicatorClassName)} 
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
};

export default ProgressBar;
