
import React from 'react';
import { cn } from '@/lib/utils';

export interface TimelineItemProps {
  title: string;
  description?: string; // Add missing description prop
  date?: string; // Add missing date prop
  icon?: React.ReactNode;
  badge?: React.ReactNode;
  isLast?: boolean;
}

export interface TimelineProps {
  items: TimelineItemProps[]; // Add items prop
  className?: string;
}

export const TimelineItem = ({
  title,
  description,
  date,
  icon,
  badge,
  isLast = false,
}: TimelineItemProps) => {
  return (
    <div className="relative pb-8">
      {!isLast && (
        <div
          className="absolute top-5 left-5 -ml-px h-full w-0.5 bg-gray-200"
          aria-hidden="true"
        />
      )}
      <div className="relative flex items-start space-x-3">
        <div className="relative">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 ring-8 ring-white">
            {icon || (
              <span className="h-4 w-4 text-gray-500">•</span>
            )}
          </div>
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex justify-between">
            <h3 className="text-base font-medium">{title}</h3>
            {badge && <div className="self-center">{badge}</div>}
          </div>
          {date && <p className="text-sm text-muted-foreground">{date}</p>}
          {description && <p className="mt-1 text-sm text-gray-500">{description}</p>}
        </div>
      </div>
    </div>
  );
};

export const Timeline = React.forwardRef<HTMLDivElement, TimelineProps>(
  ({ items, className }, ref) => {
    return (
      <div ref={ref} className={cn("flow-root", className)}>
        <ul className="-mb-8">
          {items.map((item, index) => (
            <li key={index}>
              <TimelineItem
                {...item}
                isLast={index === items.length - 1}
              />
            </li>
          ))}
        </ul>
      </div>
    );
  }
);

Timeline.displayName = "Timeline";
