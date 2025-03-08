
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Timeline } from '@/components/ui/timeline';
import { PoliticalEvent } from '../types/equilibre';

interface PoliticalEventsTimelineProps {
  events: PoliticalEvent[];
}

export const PoliticalEventsTimeline: React.FC<PoliticalEventsTimelineProps> = ({ events }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Historique des Événements Politiques</CardTitle>
      </CardHeader>
      <CardContent>
        {events.length === 0 ? (
          <p className="text-center text-muted-foreground py-4">Aucun événement historique</p>
        ) : (
          <Timeline>
            {events.map((event, index) => (
              <Timeline.Item key={event.id || index}>
                <Timeline.Header>
                  <Timeline.Title>{event.title || `Événement ${index + 1}`}</Timeline.Title>
                  <Timeline.Badge>
                    {event.date ? 
                      `${event.date.season} ${event.date.year}` : 
                      (event.année && event.saison ? 
                        `${event.saison} ${event.année}` : 
                        "Date inconnue")}
                  </Timeline.Badge>
                </Timeline.Header>
                <Timeline.Content>
                  {event.description && <p className="mb-2">{event.description}</p>}
                  
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    {event.populaires !== undefined && (
                      <div className="flex justify-between">
                        <span className="text-sm">Populares:</span>
                        <span className="text-sm font-medium">{event.populaires}%</span>
                      </div>
                    )}
                    {event.optimates !== undefined && (
                      <div className="flex justify-between">
                        <span className="text-sm">Optimates:</span>
                        <span className="text-sm font-medium">{event.optimates}%</span>
                      </div>
                    )}
                    {event.moderates !== undefined && (
                      <div className="flex justify-between">
                        <span className="text-sm">Moderates:</span>
                        <span className="text-sm font-medium">{event.moderates}%</span>
                      </div>
                    )}
                    {event.plebeiens !== undefined && (
                      <div className="flex justify-between">
                        <span className="text-sm">Plébéiens:</span>
                        <span className="text-sm font-medium">{event.plebeiens}%</span>
                      </div>
                    )}
                    {event.patriciens !== undefined && (
                      <div className="flex justify-between">
                        <span className="text-sm">Patriciens:</span>
                        <span className="text-sm font-medium">{event.patriciens}%</span>
                      </div>
                    )}
                  </div>
                </Timeline.Content>
              </Timeline.Item>
            ))}
          </Timeline>
        )}
      </CardContent>
    </Card>
  );
};
