
import React from 'react';
import { cn } from '@/lib/utils';

export interface TimelineItemProps {
  title: string;
  date?: string | { year: number; season: string };
  description?: string;
  children?: React.ReactNode;
  isLast?: boolean;
  className?: string;
}

const TimelineItem: React.FC<TimelineItemProps> = ({
  title,
  date,
  description,
  children,
  isLast = false,
  className,
}) => {
  return (
    <div className={cn("relative border-l border-gray-200 pl-5 pb-6", className)}>
      <div className="absolute -left-1.5 top-1.5 h-3 w-3 rounded-full bg-primary"></div>
      {!isLast && <div className="absolute -left-0.5 top-5 bottom-0 w-px bg-gray-200"></div>}
      
      <div className="mt-1">
        <h3 className="text-base font-semibold text-gray-900">{title}</h3>
        {date && (
          <time className="text-xs font-normal text-gray-500">
            {typeof date === 'string' ? date : `An ${date.year}, ${date.season}`}
          </time>
        )}
        {description && <p className="mt-2 text-sm text-gray-600">{description}</p>}
        {children}
      </div>
    </div>
  );
};

export default TimelineItem;
