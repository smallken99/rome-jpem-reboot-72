
import React, { useEffect, useState } from 'react';
import { Calendar, Clock, SunDim, Hourglass } from 'lucide-react';
import { useTimeStore, useTimeEvents, formatRomanSeason } from '@/utils/timeSystem';

interface TimePanelProps {
  minimal?: boolean;
}

export const TimePanel: React.FC<TimePanelProps> = ({ minimal = false }) => {
  const { year, season, dayInSeason, formatDate } = useTimeStore();
  const [timeMessage, setTimeMessage] = useState<string | null>(null);
  
  // Get time advancement function
  const { advanceTime } = useTimeEvents(
    // Day change
    () => {
      // Clear any existing message after 3 seconds
      if (timeMessage) {
        const timer = setTimeout(() => setTimeMessage(null), 3000);
        return () => clearTimeout(timer);
      }
    },
    // Season change
    (newSeason) => {
      setTimeMessage(`Nouvelle saison: ${formatRomanSeason(newSeason)}`);
    },
    // Year change
    (newYear) => {
      setTimeMessage(`Nouvelle année: ${newYear} AUC`);
    }
  );
  
  // Get season icon and color
  const getSeasonInfo = () => {
    switch (season) {
      case 'Ver':
        return { icon: <SunDim className={`${minimal ? 'h-4 w-4' : 'h-5 w-5'} text-green-500`} />, color: 'bg-green-100 text-green-800' };
      case 'Aestas':
        return { icon: <SunDim className={`${minimal ? 'h-4 w-4' : 'h-5 w-5'} text-amber-500`} />, color: 'bg-amber-100 text-amber-800' };
      case 'Autumnus':
        return { icon: <SunDim className={`${minimal ? 'h-4 w-4' : 'h-5 w-5'} text-orange-500`} />, color: 'bg-orange-100 text-orange-800' };
      case 'Hiems':
        return { icon: <SunDim className={`${minimal ? 'h-4 w-4' : 'h-5 w-5'} text-blue-500`} />, color: 'bg-blue-100 text-blue-800' };
      default:
        return { icon: <SunDim className={`${minimal ? 'h-4 w-4' : 'h-5 w-5'}`} />, color: 'bg-gray-100 text-gray-800' };
    }
  };
  
  const { icon, color } = getSeasonInfo();
  
  if (minimal) {
    return (
      <div className="flex items-center space-x-2 text-sm">
        <div className={`px-1.5 py-0.5 rounded-md flex items-center gap-1 ${color}`}>
          {icon}
          <span className="text-xs font-medium">{formatRomanSeason(season)}</span>
        </div>
        <span className="text-xs text-muted-foreground">{year} AUC</span>
      </div>
    );
  }
  
  return (
    <div className="rounded-md border p-3 bg-white shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Calendar className="h-5 w-5 text-muted-foreground" />
          <span className="text-sm font-medium">{formatDate()}</span>
        </div>
        
        <button
          onClick={() => advanceTime()}
          className="p-1.5 rounded-full bg-muted/50 hover:bg-muted transition-colors"
          title="Avancer le temps (pour démonstration)"
        >
          <Hourglass className="h-4 w-4 text-muted-foreground" />
        </button>
      </div>
      
      <div className="flex items-center gap-4 mt-2">
        <div className={`px-2 py-1 rounded-md flex items-center gap-1 ${color}`}>
          {icon}
          <span className="text-xs font-medium">{formatRomanSeason(season)}</span>
        </div>
      </div>
      
      {timeMessage && (
        <div className="mt-2 text-sm bg-blue-50 text-blue-700 px-2 py-1 rounded animate-fade-in">
          {timeMessage}
        </div>
      )}
    </div>
  );
};
