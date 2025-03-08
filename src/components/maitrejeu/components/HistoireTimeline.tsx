
import React from 'react';
import { HistoireEntry } from '../types';
import { Timeline, TimelineItem, TimelineHeader, TimelineIcon, TimelineTitle, TimelineBody } from '@/components/ui/timeline';
import { CalendarIcon, BookIcon, ScrollIcon } from 'lucide-react';

export interface HistoireTimelineProps {
  entries: HistoireEntry[];
}

export const HistoireTimeline: React.FC<HistoireTimelineProps> = ({ entries }) => {
  const getEventIcon = (type: string) => {
    switch (type) {
      case 'bataille':
        return <ScrollIcon className="h-4 w-4" />;
      default:
        return <BookIcon className="h-4 w-4" />;
    }
  };

  return (
    <Timeline>
      {entries && entries.map((entry) => (
        <TimelineItem key={entry.id}>
          <TimelineHeader>
            <TimelineIcon icon={getEventIcon(entry.type)} />
            <TimelineTitle>{entry.titre}</TimelineTitle>
          </TimelineHeader>
          <TimelineBody>
            <p className="text-xs text-muted-foreground mb-1">
              {`${entry.date.year} AUC - ${
                entry.date.season === 'SPRING' ? 'Printemps' :
                entry.date.season === 'SUMMER' ? 'Été' :
                entry.date.season === 'AUTUMN' ? 'Automne' : 'Hiver'
              }`}
            </p>
            <p>{entry.description}</p>
          </TimelineBody>
        </TimelineItem>
      ))}
      {(!entries || entries.length === 0) && (
        <TimelineItem>
          <TimelineHeader>
            <TimelineIcon icon={<CalendarIcon className="h-4 w-4" />} />
            <TimelineTitle>Aucun événement historique enregistré</TimelineTitle>
          </TimelineHeader>
          <TimelineBody>
            <p>Les événements historiques apparaîtront ici.</p>
          </TimelineBody>
        </TimelineItem>
      )}
    </Timeline>
  );
};
