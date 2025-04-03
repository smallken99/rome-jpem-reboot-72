
import React from 'react';
import { CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface TimelineItemProps {
  title: string;
  date: string;
  description?: string;
  icon?: React.ReactNode;
  isActive?: boolean;
  badge?: React.ReactNode;
  children?: React.ReactNode;
}

export const TimelineItem: React.FC<TimelineItemProps> = ({
  title,
  date,
  icon,
  isActive = false,
  children
}) => {
  return (
    <div className="flex gap-4 mb-8 last:mb-0">
      <div className="flex flex-col items-center">
        <div className={cn(
          "flex items-center justify-center w-10 h-10 rounded-full border z-10",
          isActive 
            ? "bg-primary text-primary-foreground border-primary" 
            : "bg-background border-border"
        )}>
          {icon || <CalendarIcon className="h-5 w-5" />}
        </div>
        <div className="w-0.5 grow bg-border mt-2"></div>
      </div>
      
      <div className="flex-1 pt-1.5">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2">
          <h3 className={cn(
            "text-base font-medium",
            isActive ? "text-primary" : "text-foreground"
          )}>
            {title}
          </h3>
          <time className="text-sm text-muted-foreground">
            {date}
          </time>
        </div>
        
        {children}
      </div>
    </div>
  );
};

export const Timeline: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="space-y-4">
      {children}
    </div>
  );
};
