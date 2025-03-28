
import React from 'react';

export interface TimelineItemProps {
  title: string;
  icon?: React.ReactNode;
  isFirst?: boolean;
  isLast?: boolean;
  status?: 'success' | 'danger' | 'warning' | 'info' | 'default';
  date?: string | { year: number; season: string };
  description?: string;
  children?: React.ReactNode;
}

const TimelineItem: React.FC<TimelineItemProps> = ({
  title,
  icon,
  isFirst = false,
  isLast = false,
  status = 'default',
  date,
  description,
  children
}) => {
  // Status colors
  const statusColors = {
    success: 'bg-green-500',
    danger: 'bg-red-500',
    warning: 'bg-yellow-500',
    info: 'bg-blue-500',
    default: 'bg-gray-500'
  };

  return (
    <div className="relative pl-8 py-3">
      {/* Vertical line */}
      {!isFirst && <div className="absolute top-0 left-4 w-0.5 h-3 bg-gray-300"></div>}
      {!isLast && <div className="absolute top-6 left-4 w-0.5 h-full bg-gray-300"></div>}
      
      {/* Timeline dot */}
      <div className={`absolute top-3 left-3 w-3 h-3 rounded-full ${statusColors[status]}`}></div>
      
      {/* Content */}
      <div className="ml-2">
        <div className="flex items-center mb-1">
          {icon && <span className="mr-2">{icon}</span>}
          <h4 className="font-medium text-gray-900">{title}</h4>
          {date && (
            <span className="ml-auto text-sm text-gray-500">
              {typeof date === 'string' 
                ? date 
                : `${date.year} - ${date.season}`}
            </span>
          )}
        </div>
        {description && <p className="text-sm text-gray-600 mb-2">{description}</p>}
        {children}
      </div>
    </div>
  );
};

export default TimelineItem;
