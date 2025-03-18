
import React, { ReactNode } from 'react';

interface InfoItemProps {
  icon: ReactNode;
  label: string;
  value: string;
  valueClass?: string;
}

export const InfoItem: React.FC<InfoItemProps> = ({
  icon,
  label,
  value,
  valueClass = ''
}) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        {icon}
        <span className="text-sm text-muted-foreground">{label}:</span>
      </div>
      <span className={`text-sm font-medium ${valueClass}`}>{value}</span>
    </div>
  );
};
