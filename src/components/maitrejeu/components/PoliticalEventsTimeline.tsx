
import React from 'react';
import { Timeline, TimelineItem, TimelineHeader, TimelineIcon, TimelineTitle, TimelineBody } from '@/components/ui/timeline';
import { CalendarIcon, FlagIcon, ScrollIcon } from 'lucide-react';

export interface PoliticalEvent {
  id: string;
  date: string;
  title: string;
  description: string;
  type: 'election' | 'crisis' | 'law' | 'other';
}

export interface PoliticalEventsTimelineProps {
  events: PoliticalEvent[];
}

export const PoliticalEventsTimeline: React.FC<PoliticalEventsTimelineProps> = ({ events }) => {
  const getEventIcon = (type: string) => {
    switch (type) {
      case 'election':
        return <FlagIcon className="h-4 w-4" />;
      case 'law':
        return <ScrollIcon className="h-4 w-4" />;
      default:
        return <CalendarIcon className="h-4 w-4" />;
    }
  };

  return (
    <Timeline>
      {events && events.map((event) => (
        <TimelineItem key={event.id}>
          <TimelineHeader>
            <TimelineIcon icon={getEventIcon(event.type)} />
            <TimelineTitle>{event.title}</TimelineTitle>
          </TimelineHeader>
          <TimelineBody>
            <p className="text-xs text-muted-foreground mb-1">{event.date}</p>
            <p>{event.description}</p>
          </TimelineBody>
        </TimelineItem>
      ))}
      {(!events || events.length === 0) && (
        <TimelineItem>
          <TimelineHeader>
            <TimelineIcon icon={<CalendarIcon className="h-4 w-4" />} />
            <TimelineTitle>Aucun événement enregistré</TimelineTitle>
          </TimelineHeader>
          <TimelineBody>
            <p>Les événements politiques apparaîtront ici.</p>
          </TimelineBody>
        </TimelineItem>
      )}
    </Timeline>
  );
};
