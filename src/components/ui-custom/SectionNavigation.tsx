
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';

export interface NavigationItem {
  label: string;
  path: string;
  icon?: React.ReactNode;
}

interface SectionNavigationProps {
  items: NavigationItem[];
  className?: string;
}

export const SectionNavigation: React.FC<SectionNavigationProps> = ({
  items,
  className
}) => {
  const location = useLocation();
  
  return (
    <div className={cn("flex flex-wrap gap-2 mb-6", className)}>
      {items.map((item) => {
        const isActive = location.pathname === item.path;
        
        return (
          <Link
            key={item.path}
            to={item.path}
            className={cn(
              "px-4 py-2 rounded-md flex items-center gap-2 text-sm font-medium transition-colors",
              isActive 
                ? "bg-rome-gold/20 text-rome-navy border border-rome-gold/40" 
                : "bg-white hover:bg-rome-gold/10 border border-rome-gold/30"
            )}
          >
            {item.icon && <span>{item.icon}</span>}
            <span>{item.label}</span>
          </Link>
        );
      })}
    </div>
  );
};
