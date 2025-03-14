
import React from 'react';
import { Progress } from '@/components/ui/progress';
import { SkillProgressProps } from '../types/educationTypes';

export const SkillProgress: React.FC<SkillProgressProps> = ({ skill, value }) => {
  // Calculate a percentage for the Progress component
  const percentage = Math.min(Math.max(value * 10, 0), 100);
  
  return (
    <div className="space-y-1">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium capitalize">{skill}</span>
        <span className="text-sm text-muted-foreground">{value}/10</span>
      </div>
      <Progress value={percentage} className="h-2" />
    </div>
  );
};
