import React from 'react';
import { Timeline, TimelineItem, TimelineHeader, TimelineIcon, TimelineTitle, TimelineBody } from "@/components/ui/timeline";
import { Badge } from "@/components/ui/badge";
import { formatDate } from '@/utils/formatUtils';
import { Evenement, PoliticalEventsTimelineProps } from '../types/compatibilityAdapter';

export const PoliticalEventsTimeline: React.FC<PoliticalEventsTimelineProps> = ({ entries }) => {
  return (
    <Timeline>
      {entries.map(entry => (
        <TimelineItem key={entry.id}>
          <TimelineHeader>
            <TimelineIcon />
            <TimelineTitle>{entry.titre}</TimelineTitle>
            <Badge variant="secondary">{formatDate(entry.date.year, entry.date.season, entry.date.day)}</Badge>
          </TimelineHeader>
          <TimelineBody>
            {entry.contenu}
          </TimelineBody>
        </TimelineItem>
      ))}
    </Timeline>
  );
};
