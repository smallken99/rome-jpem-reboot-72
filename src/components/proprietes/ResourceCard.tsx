
import React from 'react';
import { cn } from '@/lib/utils';

interface ResourceCardProps {
  name: string;
  quantity: string;
  value: string;
  trend?: 'up' | 'down' | 'neutral';
  icon?: React.ReactNode;
  className?: string;
}

export const ResourceCard: React.FC<ResourceCardProps> = ({ 
  name, 
  quantity, 
  value, 
  trend, 
  icon,
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
    <div className={cn(
      "p-4 rounded-md border border-rome-gold/30 hover:border-rome-gold transition-all bg-white/90",
      className
    )}>
      <div className="flex items-center justify-between mb-2">
        <h4 className="font-cinzel text-base font-semibold">{name}</h4>
        {icon && <div className="text-rome-terracotta">{icon}</div>}
      </div>
      
      <div className="space-y-1 mt-2">
        <div className="text-sm text-muted-foreground">Quantité:</div>
        <div className="font-bold text-lg">{quantity}</div>
      </div>
      
      <div className="space-y-1 mt-3">
        <div className="text-sm text-muted-foreground">Valeur marchande:</div>
        <div className="font-bold flex items-center">
          {value}
          {getTrendIcon()}
        </div>
      </div>
    </div>
  );
};
