
import React from 'react';
import { cn } from '@/lib/utils';

interface RomanCardProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
  headerClassName?: string;
  contentClassName?: string;
}

export const RomanCard: React.FC<RomanCardProps> = ({ 
  title, 
  children, 
  className,
  headerClassName,
  contentClassName 
}) => {
  return (
    <div className={cn("roman-card", className)}>
      {title && (
        <div className={cn("roman-card-header", headerClassName)}>
          <h3 className="font-cinzel text-lg text-rome-navy">{title}</h3>
        </div>
      )}
      <div className={cn("p-4", contentClassName)}>
        {children}
      </div>
    </div>
  );
};
