
import React from 'react';
import { cn } from '@/lib/utils';

interface StatBoxProps {
  label: string;
  value: string | number;
  icon?: React.ReactNode;
  trend?: 'up' | 'down' | 'neutral';
  className?: string;
}

export const StatBox: React.FC<StatBoxProps> = ({ 
  label, 
  value, 
  icon, 
  trend,
  className 
}) => {
  const getTrendIcon = () => {
    if (!trend) return null;
    
    const commonClasses = "ml-1 inline";
    
    if (trend === 'up') {
      return <span className={`${commonClasses} text-green-600`}>↑</span>;
    } else if (trend === 'down') {
      return <span className={`${commonClasses} text-red-600`}>↓</span>;
    } else {
      return <span className={`${commonClasses} text-yellow-600`}>→</span>;
    }
  };
  
  return (
    <div className={cn("stat-box", className)}>
      <div className="flex justify-between items-start">
        <div>
          <div className="stat-label">{label}</div>
          <div className="stat-value flex items-center">
            {value}
            {getTrendIcon()}
          </div>
        </div>
        {icon && (
          <div className="text-rome-gold opacity-80">
            {icon}
          </div>
        )}
      </div>
    </div>
  );
};
