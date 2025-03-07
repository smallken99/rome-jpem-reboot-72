
import React from 'react';
import { cn } from '@/lib/utils';

interface FunctionCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  iconColor: string;
  onClick?: () => void;
}

export const FunctionCard: React.FC<FunctionCardProps> = ({
  title,
  description,
  icon,
  color,
  iconColor,
  onClick
}) => {
  return (
    <div 
      className={cn(
        "p-4 rounded-lg border border-rome-gold/30 hover:border-rome-gold/50 bg-white transition-all duration-200",
        "hover:shadow-md cursor-pointer"
      )}
      onClick={onClick}
    >
      <div className="flex items-start gap-4">
        <div className={cn("p-3 rounded-md", color)}>
          <div className={iconColor}>{icon}</div>
        </div>
        <div className="flex-1">
          <h3 className="font-cinzel text-lg mb-1 text-rome-navy">{title}</h3>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </div>
    </div>
  );
};
