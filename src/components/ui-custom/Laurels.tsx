
import React from 'react';
import { cn } from '@/lib/utils';

interface LaurelsProps {
  children: React.ReactNode;
  className?: string;
}

export const Laurels: React.FC<LaurelsProps> = ({ children, className }) => {
  return (
    <div className={cn("relative inline-flex items-center font-cinzel px-8", className)}>
      <span className="absolute left-0 text-rome-gold text-2xl opacity-80">❦</span>
      <span className="mx-2">{children}</span>
      <span className="absolute right-0 text-rome-gold text-2xl opacity-80">❦</span>
    </div>
  );
};
