
import React from 'react';
import { Evenement } from '../types/evenements';
import { Loi } from '../types/lois';
import { HistoireEntry } from '../types/histoire';
import { Gavel, Scale, Landmark, Shield, AlertTriangle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Timeline,
  TimelineItem,
  TimelineHeader,
  TimelineTitle,
  TimelineBadge,
  TimelineContent
} from '@/components/ui/timeline-custom';

interface PoliticalEventsTimelineProps {
  evenements: Evenement[];
  lois: Loi[];
  histoireEntries: HistoireEntry[];
}

export const PoliticalEventsTimeline: React.FC<PoliticalEventsTimelineProps> = ({
  evenements,
  lois,
  histoireEntries
}) => {
  // Combine all events into a single array
  type CombinedEvent = {
    id: string;
    type: 'evenement' | 'loi' | 'histoire';
    title: string;
    date: any;
    importance: string;
    status?: string;
    description?: string;
    original: any;
  };
  
  const combinedEvents: CombinedEvent[] = [
    ...evenements.map(e => ({
      id: e.id,
      type: 'evenement' as const,
      title: e.titre,
      date: e.date,
      importance: e.importance,
      description: e.description,
      status: e.resolved ? 'résolu' : 'en cours',
      original: e
    })),
    ...lois.map(l => ({
      id: l.id,
      type: 'loi' as const,
      title: l.titre,
      date: l.date,
      importance: l.importance,
      description: l.description,
      status: l.état,
      original: l
    })),
    ...histoireEntries.map(h => ({
      id: h.id,
      type: 'histoire' as const,
      title: h.titre,
      date: h.date,
      importance: h.importance,
      description: h.contenu,
      original: h
    }))
  ];
  
  // Sort by date (most recent first)
  const sortedEvents = [...combinedEvents].sort((a, b) => {
    if (a.date.year !== b.date.year) {
      return b.date.year - a.date.year;
    }
    
    const seasons = ['SPRING', 'SUMMER', 'AUTUMN', 'WINTER'];
    return seasons.indexOf(b.date.season) - seasons.indexOf(a.date.season);
  });
  
  const getEventIcon = (eventType: string) => {
    switch (eventType) {
      case 'evenement':
        return <AlertTriangle className="h-5 w-5 text-amber-500" />;
      case 'loi':
        return <Gavel className="h-5 w-5 text-indigo-500" />;
      case 'histoire':
        return <Landmark className="h-5 w-5 text-emerald-500" />;
      default:
        return <Shield className="h-5 w-5 text-gray-500" />;
    }
  };
  
  const getImportanceClass = (importance: string) => {
    switch (importance) {
      case 'majeure':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'normale':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'mineure':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };
  
  const getStatusClass = (status: string) => {
    switch (status) {
      case 'résolu':
      case 'adoptée':
        return 'bg-green-100 text-green-800';
      case 'en cours':
      case 'proposée':
        return 'bg-amber-100 text-amber-800';
      case 'rejetée':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  const getSeasonName = (season: string) => {
    const seasonMap: Record<string, string> = {
      'SPRING': 'Printemps',
      'SUMMER': 'Été',
      'AUTUMN': 'Automne',
      'WINTER': 'Hiver'
    };
    return seasonMap[season] || season;
  };
  
  return (
    <Timeline className="mt-4">
      {sortedEvents.map((event) => (
        <TimelineItem key={`${event.type}-${event.id}`} className="relative pl-6 pb-8 border-l-2 border-gray-200 last:border-l-0 last:pb-0">
          <div className="absolute left-0 top-0 -translate-x-1/2 rounded-full bg-white p-1 border-2 border-gray-200">
            {getEventIcon(event.type)}
          </div>
          
          <TimelineHeader>
            <TimelineTitle className="text-base font-semibold">
              {event.title}
            </TimelineTitle>
            <TimelineBadge className={getImportanceClass(event.importance)}>
              {event.importance}
            </TimelineBadge>
          </TimelineHeader>
          
          <div className="flex flex-wrap gap-2 mt-1 mb-2">
            <Badge variant="outline" className="text-xs">
              {event.date.year} - {getSeasonName(event.date.season)}
            </Badge>
            
            {event.status && (
              <Badge className={cn("text-xs", getStatusClass(event.status))}>
                {event.status}
              </Badge>
            )}
            
            <Badge variant="outline" className="text-xs capitalize">
              {event.type}
            </Badge>
          </div>
          
          <TimelineContent>
            <p>{event.description}</p>
            
            {event.type === 'evenement' && !event.original.resolved && (
              <div className="mt-3">
                <Button size="sm" variant="outline">Résoudre</Button>
              </div>
            )}
          </TimelineContent>
        </TimelineItem>
      ))}
    </Timeline>
  );
};

// Helper function to get the proper class names based on conditions
function cn(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}
