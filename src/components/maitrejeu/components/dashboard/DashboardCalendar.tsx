
import React from 'react';
import { Button } from '@/components/ui/button';
import { GameDate } from '../../types/common';
import { ChevronRight } from 'lucide-react';

interface DashboardCalendarProps {
  currentDate?: GameDate;
  onAdvanceTime?: () => void;
}

export const DashboardCalendar: React.FC<DashboardCalendarProps> = ({ 
  currentDate,
  onAdvanceTime
}) => {
  // Safely handle season display
  const seasonDisplay = currentDate?.season || "Ver";
  const yearDisplay = currentDate?.year?.toString() || "250";
  const phaseDisplay = currentDate?.phase || "normal";

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <p className="text-sm font-medium">Année</p>
          <p className="text-2xl font-bold">{yearDisplay}</p>
        </div>
        <div className="space-y-1">
          <p className="text-sm font-medium">Saison</p>
          <p className="text-2xl font-bold">{seasonDisplay}</p>
        </div>
      </div>
      
      <div className="space-y-1">
        <p className="text-sm font-medium">Phase actuelle</p>
        <p className="text-lg font-semibold capitalize">{phaseDisplay}</p>
      </div>
      
      {onAdvanceTime && (
        <Button 
          onClick={onAdvanceTime} 
          className="w-full mt-2 flex items-center justify-center gap-2"
        >
          Avancer le temps
          <ChevronRight className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
};
