
import React from 'react';
import { CalendarDays } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface AnnualProgressProps {
  yearsCompleted: number;
  totalYears: number;
}

export const AnnualProgress: React.FC<AnnualProgressProps> = ({ yearsCompleted, totalYears }) => {
  const yearProgress = totalYears > 0 ? (yearsCompleted / totalYears) * 100 : 0;
  
  return (
    <div className="mt-3">
      <div className="flex justify-between items-center">
        <p className="text-xs text-muted-foreground flex items-center gap-1">
          <CalendarDays className="h-3 w-3" />
          Progression annuelle:
        </p>
        <p className="text-xs font-medium">
          {yearsCompleted} / {totalYears} années
        </p>
      </div>
      <Progress value={yearProgress} className="h-2 mt-1" />
    </div>
  );
};
