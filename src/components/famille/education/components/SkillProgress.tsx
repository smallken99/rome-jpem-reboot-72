
import React from 'react';
import { Progress } from '@/components/ui/progress';

interface SkillProgressProps {
  label: string;
  value: number;
  maxValue?: number;
}

export const SkillProgress: React.FC<SkillProgressProps> = ({
  label,
  value,
  maxValue = 10
}) => {
  const progressPercentage = (value / maxValue) * 100;
  
  return (
    <div className="space-y-1">
      <div className="flex justify-between items-center text-sm">
        <span className="capitalize">{label}</span>
        <span>{value}/{maxValue}</span>
      </div>
      <Progress value={progressPercentage} className="h-2" />
    </div>
  );
};
