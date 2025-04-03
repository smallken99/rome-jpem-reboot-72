
import React from 'react';
import { Timeline, TimelineItem } from './ui/Timeline';
import { HistoireEntry } from '../types';
import { CalendarIcon, BookIcon, ActivityIcon } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface HistoireTimelineProps {
  entries: HistoireEntry[];
  limit?: number;
}

export const HistoireTimeline: React.FC<HistoireTimelineProps> = ({ entries, limit }) => {
  // Sort entries by date, newest first
  const sortedEntries = [...entries].sort((a, b) => {
    // Handle different date formats safely
    const dateA = typeof a.date === 'string' ? new Date(a.date) : 
                 (a.date instanceof Date ? a.date : new Date());
    const dateB = typeof b.date === 'string' ? new Date(b.date) : 
                 (b.date instanceof Date ? b.date : new Date());
    
    return dateB.getTime() - dateA.getTime();
  });
  
  // Limit entries if needed
  const displayedEntries = limit ? sortedEntries.slice(0, limit) : sortedEntries;
  
  // Get icon based on entry type
  const getIcon = (entry: HistoireEntry) => {
    const entryType = entry.type?.toLowerCase() || '';
    if (entryType === 'evenement' || entryType === 'event') {
      return <ActivityIcon className="h-5 w-5" />;
    } else if (entryType === 'decision' || entryType === 'politique') {
      return <BookIcon className="h-5 w-5" />;
    } else {
      return <CalendarIcon className="h-5 w-5" />;
    }
  };
  
  // Get badge color based on importance
  const getBadgeVariant = (importance: string): "default" | "destructive" | "outline" | "secondary" | "success" => {
    if (!importance) return "secondary";
    
    switch (importance.toLowerCase()) {
      case 'haute':
      case 'high':
        return "destructive";
      case 'moyenne':
      case 'medium':
        return "secondary";
      case 'basse':
      case 'low':
        return "outline";
      default:
        return "secondary";
    }
  };
  
  return (
    <Timeline>
      {displayedEntries.map((entry) => (
        <TimelineItem
          key={entry.id}
          title={entry.titre || entry.id}
          date={typeof entry.date === 'string' ? entry.date : 
                (entry.date instanceof Date ? entry.date.toLocaleDateString() : 
                `${entry.date.year} ${entry.date.season}`)}
          icon={getIcon(entry)}
        >
          {entry.importance && (
            <Badge variant={getBadgeVariant(entry.importance)} className="mb-2">
              {entry.importance}
            </Badge>
          )}
          <p className="text-sm text-muted-foreground">{entry.texte || ""}</p>
        </TimelineItem>
      ))}
    </Timeline>
  );
};
