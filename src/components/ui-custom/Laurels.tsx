
import React from 'react';
import { cn } from '@/lib/utils';

interface LaurelsProps {
  children: React.ReactNode;
  className?: string;
}

export const Laurels: React.FC<LaurelsProps> = ({ children, className }) => {
  return (
    <div className={cn("laurel-decorated", className)}>
      {children}
    </div>
  );
};
