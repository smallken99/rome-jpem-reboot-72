
import React from 'react';
import { Timeline, TimelineItem, TimelineHeader, TimelineTitle, TimelineBadge, TimelineContent } from '@/components/ui/timeline-custom';
import { EquilibreTypes } from '../types';

export interface PoliticalEventsTimelineProps {
  politicalEvents: EquilibreTypes.PoliticalEvent[];
}

export const PoliticalEventsTimeline: React.FC<PoliticalEventsTimelineProps> = ({
  politicalEvents
}) => {
  // Sort events by date (newest first)
  const sortedEvents = [...politicalEvents].sort((a, b) => {
    if (a.date.year !== b.date.year) {
      return b.date.year - a.date.year;
    }
    // Map seasons to numerical values for comparison
    const seasonOrder = { 'SPRING': 0, 'SUMMER': 1, 'AUTUMN': 2, 'WINTER': 3 };
    return seasonOrder[b.date.season] - seasonOrder[a.date.season];
  });

  return (
    <Timeline className="mt-4">
      {sortedEvents.map((event) => (
        <Timeline.Item key={event.id} className="pb-8">
          <Timeline.Header>
            <Timeline.Title className={event.importance === 'majeure' ? 'text-xl font-bold text-red-600' : ''}>
              {event.title}
            </Timeline.Title>
            <Timeline.Badge className={`
              ${event.importance === 'majeure' ? 'bg-red-100 text-red-800' : ''}
              ${event.importance === 'mineure' ? 'bg-blue-100 text-blue-800' : ''}
              ${event.importance === 'normale' ? 'bg-gray-100 text-gray-800' : ''}
            `}>
              {event.date.year} - {event.date.season}
            </Timeline.Badge>
          </Timeline.Header>
          <Timeline.Content>
            <p className="mb-2">{event.description}</p>
            
            {/* Show impact values if they exist */}
            {event.impact && (
              <div className="mt-2 grid grid-cols-2 gap-2 text-xs">
                {Object.entries(event.impact).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between">
                    <span className="capitalize">{key}:</span>
                    <span className={value > 0 ? 'text-green-600' : 'text-red-600'}>
                      {value > 0 ? `+${value}` : value}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </Timeline.Content>
        </Timeline.Item>
      ))}

      {politicalEvents.length === 0 && (
        <Timeline.Content className="text-center py-4">
          Aucun événement politique enregistré.
        </Timeline.Content>
      )}
    </Timeline>
  );
};
