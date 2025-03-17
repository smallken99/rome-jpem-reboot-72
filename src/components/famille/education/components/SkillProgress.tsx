
import React from 'react';
import { Progress } from '@/components/ui/progress';
import { SkillProgressProps } from '../types/educationTypes';

export const SkillProgress: React.FC<SkillProgressProps> = ({ 
  skill, 
  label,
  value, 
  max = 10, 
  icon 
}) => {
  const displayLabel = label || skill;
  const percentage = Math.min(100, (value / max) * 100);
  
  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center gap-1.5">
          {icon && icon}
          <span className="capitalize">{displayLabel}</span>
        </div>
        <span>{value}/{max}</span>
      </div>
      <Progress value={percentage} className="h-2" />
    </div>
  );
};
