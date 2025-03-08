
import React from 'react';
import { StatBox } from '@/components/ui-custom/StatBox';
import { LucideIcon } from 'lucide-react';

interface StatItemProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  trend: 'up' | 'down' | 'neutral';
  trendValue: string;
  description: string;
  additionalInfo?: string;
}

export const StatItem: React.FC<StatItemProps> = ({
  title,
  value,
  icon,
  trend,
  trendValue,
  description,
  additionalInfo
}) => {
  return (
    <div className="relative">
      <StatBox 
        title={title}
        value={value}
        icon={icon}
        trend={trend}
        trendValue={trendValue}
        description={description}
      />
      {additionalInfo && (
        <div className="absolute -top-2 -right-2 bg-rome-navy text-white text-xs rounded-full px-2 py-1 z-10">
          {additionalInfo}
        </div>
      )}
    </div>
  );
};
