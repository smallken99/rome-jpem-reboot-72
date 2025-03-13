
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useGameTime } from '@/hooks/useGameTime';
import { formatSeasonDisplay } from '@/utils/timeSystem';
import { CalendarIcon, ArrowRightIcon, ClockIcon } from 'lucide-react';

interface TimePanelProps {
  minimal?: boolean;
}

export const TimePanel: React.FC<TimePanelProps> = ({ minimal = false }) => {
  const { 
    year,
    season,
    currentPhase,
    advanceTime
  } = useGameTime();

  // Format phase display
  const formatPhase = (phase: string) => {
    return phase.charAt(0).toUpperCase() + phase.slice(1).toLowerCase();
  };

  if (minimal) {
    return (
      <div className="flex items-center space-x-2 text-sm">
        <CalendarIcon className="h-4 w-4" />
        <span className="font-medium">An {year} - {formatSeasonDisplay(season)}</span>
      </div>
    );
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Calendrier Romain</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <CalendarIcon className="h-5 w-5 text-muted-foreground" />
              <span className="font-medium">An {year}</span>
            </div>
            <div className="bg-primary/10 px-2 py-1 rounded text-primary font-medium">
              {formatSeasonDisplay(season)}
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <ClockIcon className="h-5 w-5 text-muted-foreground" />
            <span className="font-medium">Phase: {formatPhase(currentPhase)}</span>
          </div>
          
          <Button 
            onClick={() => advanceTime()} 
            className="w-full flex items-center justify-center gap-1"
          >
            Avancer <ArrowRightIcon className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
