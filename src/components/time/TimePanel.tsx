
import React from 'react';
import { useTimeStore } from '@/utils/timeSystem';
import { formatSeasonDisplay } from '@/components/maitrejeu/types/common';
import { Card, CardContent } from '@/components/ui/card';
import { CalendarDays } from 'lucide-react';

interface TimePanelProps {
  minimal?: boolean;
}

export const TimePanel: React.FC<TimePanelProps> = ({ minimal = false }) => {
  const timeStore = useTimeStore();
  // Extraire les propriétés de manière sécurisée
  const year = timeStore.year || timeStore.currentDate?.year;
  const season = timeStore.season || timeStore.currentDate?.season;
  // Ces propriétés peuvent ne pas exister dans toutes les implémentations
  const day = timeStore.day || timeStore.currentDate?.day || 1;
  const phase = timeStore.phase || timeStore.currentPhase || "SENAT";
  
  if (minimal) {
    return (
      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
        <CalendarDays className="h-3.5 w-3.5" />
        <span>An {year} - {formatSeasonDisplay(season)}</span>
      </div>
    );
  }
  
  return (
    <Card className="border-muted/30">
      <CardContent className="p-4 flex items-center justify-between">
        <div className="flex flex-col">
          <span className="text-xs text-muted-foreground">Date actuelle</span>
          <span className="font-medium">An {year} - {formatSeasonDisplay(season)}</span>
          <span className="text-xs text-muted-foreground mt-1">Jour {day}</span>
        </div>
        
        <div className="flex flex-col items-end">
          <span className="text-xs text-muted-foreground">Phase</span>
          <span className="font-medium">{phase}</span>
        </div>
      </CardContent>
    </Card>
  );
};
