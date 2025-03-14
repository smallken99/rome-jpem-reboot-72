
import React from 'react';

export interface TimelineItemProps {
  title: string;
  description?: string;
  date?: string;
  icon?: React.ReactNode;
  badge?: React.ReactNode;
}

export interface TimelineProps {
  items: TimelineItemProps[];
}

export const TimelineItem: React.FC<TimelineItemProps> = ({
  title,
  description,
  date,
  icon,
  badge
}) => {
  return (
    <div className="relative pl-8 pb-8 last:pb-0">
      {/* Timeline connector */}
      <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-muted-foreground/20"></div>
      
      {/* Timeline marker */}
      <div className="absolute left-[-8px] top-1 w-4 h-4 rounded-full border bg-background flex items-center justify-center">
        {icon || <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>}
      </div>
      
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-medium">{title}</h4>
          {badge && <div>{badge}</div>}
        </div>
        
        {description && <p className="text-sm text-muted-foreground">{description}</p>}
        
        {date && <time className="text-xs text-muted-foreground">{date}</time>}
      </div>
    </div>
  );
};

export const Timeline: React.FC<TimelineProps> = ({ items }) => {
  return (
    <div className="space-y-4">
      {items.map((item, index) => (
        <TimelineItem key={index} {...item} />
      ))}
    </div>
  );
};
