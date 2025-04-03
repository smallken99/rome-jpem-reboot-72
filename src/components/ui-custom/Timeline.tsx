
import React, { ReactNode } from 'react';

interface TimelineProps {
  children: ReactNode;
  position?: 'alternate' | 'left' | 'right';
}

export const Timeline: React.FC<TimelineProps> = ({ children, position = 'left' }) => {
  return (
    <div className={`relative ${position === 'alternate' ? 'timeline-alternate' : ''}`}>
      <div className="absolute left-1/2 top-0 h-full w-0.5 -translate-x-1/2 bg-primary/20"></div>
      <div className="space-y-8">
        {children}
      </div>
    </div>
  );
};

interface TimelineItemProps {
  children: ReactNode;
}

export const TimelineItem: React.FC<TimelineItemProps> = ({ children }) => {
  return (
    <div className="relative flex timeline-item">
      {children}
    </div>
  );
};

interface TimelineContentProps {
  children: ReactNode;
}

export const TimelineContent: React.FC<TimelineContentProps> = ({ children }) => {
  return (
    <div className="ml-6 w-1/2 py-2 timeline-content">
      {children}
    </div>
  );
};

interface TimelineOppositeContentProps {
  children: ReactNode;
}

export const TimelineOppositeContent: React.FC<TimelineOppositeContentProps> = ({ children }) => {
  return (
    <div className="w-1/2 text-right pr-6 py-2 text-sm text-muted-foreground timeline-opposite-content">
      {children}
    </div>
  );
};

interface TimelineDotProps {
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'info' | 'error';
}

export const TimelineDot: React.FC<TimelineDotProps> = ({ color = 'primary' }) => {
  const colorClasses = {
    primary: 'bg-primary',
    secondary: 'bg-secondary',
    success: 'bg-green-500',
    warning: 'bg-yellow-500',
    info: 'bg-blue-500',
    error: 'bg-red-500'
  };
  
  return (
    <div className="absolute left-1/2 -translate-x-1/2 z-10 timeline-dot">
      <div className={`h-4 w-4 rounded-full ${colorClasses[color]}`}></div>
    </div>
  );
};

export const TimelineConnector: React.FC = () => {
  return (
    <div className="absolute left-1/2 top-4 h-full -translate-x-1/2 timeline-connector">
      {/* Connector is provided by Timeline's background line */}
    </div>
  );
};
