
import React from 'react';
import { Timeline, TimelineItem } from '@/components/ui/timeline';
import { PoliticalEvent } from '../types/equilibre';

export interface PoliticalEventsTimelineProps {
  events: PoliticalEvent[];
}

export const PoliticalEventsTimeline: React.FC<PoliticalEventsTimelineProps> = ({ events }) => {
  if (!events || events.length === 0) {
    return <div className="text-muted-foreground italic">Aucun événement politique enregistré.</div>;
  }

  return (
    <Timeline>
      {events.map((event, index) => (
        <TimelineItem key={event.id || index}>
          <div className="flex flex-col">
            <div className="font-bold">{event.title || `Année ${event.date.year}, ${event.date.season}`}</div>
            {event.description && <p className="text-sm text-muted-foreground">{event.description}</p>}
            <div className="grid grid-cols-3 gap-2 mt-2">
              {event.populaires !== undefined && (
                <div className="text-xs">Populares: <span className="font-medium">{event.populaires}%</span></div>
              )}
              {event.optimates !== undefined && (
                <div className="text-xs">Optimates: <span className="font-medium">{event.optimates}%</span></div>
              )}
              {event.moderates !== undefined && (
                <div className="text-xs">Moderates: <span className="font-medium">{event.moderates}%</span></div>
              )}
            </div>
          </div>
        </TimelineItem>
      ))}
    </Timeline>
  );
};
