
import React from 'react';
import { 
  Timeline,
  TimelineItem,
  TimelineConnector,
  TimelineHeader,
  TimelineIcon,
  TimelineBody
} from '@/components/ui/timeline';
import { Badge } from '@/components/ui/badge';
import { CalendarDays, FileText, Flag, User, Shield, History } from 'lucide-react';
import { Evenement } from '../types/maitreJeuTypes';
import { formatDate } from '@/utils/timeSystem';

interface PoliticalEventsTimelineProps {
  events: Evenement[];
}

export const PoliticalEventsTimeline: React.FC<PoliticalEventsTimelineProps> = ({ events }) => {
  const getEventIcon = (type: string) => {
    switch (type) {
      case 'politique': return <FileText className="h-4 w-4" />;
      case 'militaire': return <Shield className="h-4 w-4" />;
      case 'économique': return <History className="h-4 w-4" />;
      case 'religieux': return <Flag className="h-4 w-4" />;
      case 'social': return <User className="h-4 w-4" />;
      default: return <CalendarDays className="h-4 w-4" />;
    }
  };
  
  const getEventColor = (type: string) => {
    switch (type) {
      case 'politique': return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'militaire': return 'bg-red-100 text-red-800 border-red-300';
      case 'économique': return 'bg-green-100 text-green-800 border-green-300';
      case 'religieux': return 'bg-purple-100 text-purple-800 border-purple-300';
      case 'social': return 'bg-amber-100 text-amber-800 border-amber-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };
  
  // Trier les événements par date (du plus récent au plus ancien)
  const sortedEvents = [...events].sort((a, b) => {
    const dateA = new Date(a.date.year, a.date.month - 1, a.date.day);
    const dateB = new Date(b.date.year, b.date.month - 1, b.date.day);
    return dateB.getTime() - dateA.getTime();
  });
  
  return (
    <Timeline className="max-h-[500px] overflow-y-auto pr-4">
      {sortedEvents.map((event) => (
        <TimelineItem key={event.id}>
          <TimelineHeader>
            <TimelineIcon>
              {getEventIcon(event.type)}
            </TimelineIcon>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-semibold">{event.titre}</h3>
              <Badge variant="outline" className={getEventColor(event.type)}>
                {event.type}
              </Badge>
              <span className="text-xs text-muted-foreground ml-auto">
                {formatDate(event.date)}
              </span>
            </div>
          </TimelineHeader>
          <TimelineBody className="text-sm">
            <p>{event.description}</p>
            {event.résolu && event.optionChoisie && (
              <div className="mt-2 text-xs">
                <strong>Résultat:</strong> {event.optionChoisie}
                {event.acteur && <span> par {event.acteur}</span>}
              </div>
            )}
          </TimelineBody>
          <TimelineConnector />
        </TimelineItem>
      ))}
    </Timeline>
  );
};
