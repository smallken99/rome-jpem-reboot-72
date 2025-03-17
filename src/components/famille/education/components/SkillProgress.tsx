
import React from 'react';
import { Progress } from "@/components/ui/progress";

export interface SkillProgressProps {
  label?: string;
  value: number;
  max?: number;
  icon?: React.ReactNode;
}

export const SkillProgress: React.FC<SkillProgressProps> = ({
  label,
  value,
  max = 10,
  icon
}) => {
  const percentage = (value / max) * 100;
  
  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {icon && <span>{icon}</span>}
          <span className="text-sm font-medium capitalize">{label}</span>
        </div>
        <span className="text-sm text-muted-foreground">{value}/{max}</span>
      </div>
      <Progress value={percentage} className="h-2" />
    </div>
  );
};
