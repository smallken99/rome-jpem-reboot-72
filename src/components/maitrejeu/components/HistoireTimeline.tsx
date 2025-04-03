
import React from 'react';
import { Timeline, TimelineItem } from './ui/Timeline';
import { HistoireEntry } from '../types';
import { CalendarIcon, BookIcon, ActivityIcon } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { formatGameDate } from '../types/common';

interface HistoireTimelineProps {
  entries: HistoireEntry[];
  limit?: number;
}

export const HistoireTimeline: React.FC<HistoireTimelineProps> = ({ entries, limit }) => {
  // Sort entries by date, newest first
  const sortedEntries = [...entries].sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateB.getTime() - dateA.getTime();
  });
  
  // Limit entries if needed
  const displayedEntries = limit ? sortedEntries.slice(0, limit) : sortedEntries;
  
  // Get icon based on entry type
  const getIcon = (entry: HistoireEntry) => {
    switch (entry.type.toLowerCase()) {
      case 'evenement':
      case 'event':
        return <ActivityIcon className="h-5 w-5" />;
      case 'decision':
      case 'politique':
        return <BookIcon className="h-5 w-5" />;
      default:
        return <CalendarIcon className="h-5 w-5" />;
    }
  };
  
  // Get badge color based on importance
  const getBadgeVariant = (importance: string) => {
    switch (importance?.toLowerCase()) {
      case 'haute':
      case 'high':
        return 'destructive';
      case 'moyenne':
      case 'medium':
        return 'warning';
      case 'basse':
      case 'low':
        return 'outline';
      default:
        return 'secondary';
    }
  };
  
  return (
    <Timeline>
      {displayedEntries.map((entry) => (
        <TimelineItem
          key={entry.id}
          title={entry.title}
          date={typeof entry.date === 'string' ? entry.date : formatGameDate(entry.date as any)}
          icon={getIcon(entry)}
        >
          {entry.importance && (
            <Badge variant={getBadgeVariant(entry.importance)} className="mb-2">
              {entry.importance}
            </Badge>
          )}
          <p className="text-sm text-muted-foreground">{entry.description}</p>
        </TimelineItem>
      ))}
    </Timeline>
  );
};
