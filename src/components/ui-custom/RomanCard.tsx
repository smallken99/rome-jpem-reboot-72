
import React from 'react';
import { cn } from '@/lib/utils';

interface RomanCardProps {
  children: React.ReactNode;
  className?: string;
}

interface RomanCardHeaderProps {
  children: React.ReactNode;
  className?: string;
}

interface RomanCardContentProps {
  children: React.ReactNode;
  className?: string;
}

const RomanCardHeader: React.FC<RomanCardHeaderProps> = ({ 
  children, 
  className 
}) => {
  return (
    <div className={cn("border-b border-rome-gold/20 p-4 font-medium", className)}>
      {children}
    </div>
  );
};

const RomanCardContent: React.FC<RomanCardContentProps> = ({ 
  children, 
  className 
}) => {
  return (
    <div className={cn("p-4", className)}>
      {children}
    </div>
  );
};

const RomanCard = ({ 
  children, 
  className,
}: RomanCardProps) => {
  return (
    <div className={cn("bg-white rounded-md border border-rome-gold/30 shadow-sm overflow-hidden", className)}>
      {children}
    </div>
  );
};

RomanCard.Header = RomanCardHeader;
RomanCard.Content = RomanCardContent;

export { RomanCard };
