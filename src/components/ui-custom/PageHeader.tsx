
import React from 'react';
import { cn } from '@/lib/utils';
import { Laurels } from './Laurels';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  className?: string;
  actions?: React.ReactNode;
}

export const PageHeader: React.FC<PageHeaderProps> = ({ title, subtitle, className, actions }) => {
  return (
    <div className={cn("mb-8", className)}>
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-rome-navy">
            <Laurels>{title}</Laurels>
          </h1>
          {subtitle && (
            <p className="mt-2 text-muted-foreground italic">{subtitle}</p>
          )}
        </div>
        {actions && <div>{actions}</div>}
      </div>
      <div className="mt-4 h-px bg-gradient-to-r from-rome-gold/70 via-rome-gold/30 to-transparent" />
    </div>
  );
};
