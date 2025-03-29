import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import { Evenement } from '@/components/maitrejeu/types';
import { CalendarIcon } from '@radix-ui/react-icons';
import { Badge } from '@/components/ui/badge';

// Use our date conversion utilities
import { gameDateToDate } from '../lois/utils/dateConverter';

interface PoliticalEventsTimelineProps {
  events: Evenement[];
}

export const PoliticalEventsTimeline: React.FC<PoliticalEventsTimelineProps> = ({ events }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Chronologie des Événements Politiques</CardTitle>
      </CardHeader>
      <CardContent>
        <VerticalTimeline>
          {events.map((event) => {
            // Replace direct date conversion with utility function
            const startDate = typeof event.date === 'string' ? new Date() : gameDateToDate(event.date);
            const endDate = typeof event.endDate === 'string' ? new Date() : event.endDate ? gameDateToDate(event.endDate) : null;
            
            return (
              <VerticalTimelineElement
                key={event.id}
                className="vertical-timeline-element--event"
                date={
                  endDate
                    ? `${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}`
                    : startDate.toLocaleDateString()
                }
                iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
                icon={<CalendarIcon />}
              >
                <h3 className="vertical-timeline-element-title">{event.nom}</h3>
                <h4 className="vertical-timeline-element-subtitle">{event.description}</h4>
                
                {event.tags && event.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {event.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary">{tag}</Badge>
                    ))}
                  </div>
                )}
                
                {/* Display actions if they exist */}
                {event.actions && event.actions.length > 0 && (
                  <div className="mt-2">
                    <strong>Actions:</strong>
                    <ul>
                      {event.actions.map((action, index) => (
                        <li key={index}>{action.description}</li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {/* Display the event date */}
                <p>
                  {/* Fix other date conversion */}
                  Date: {typeof event.date === 'string' ? 
                    new Date(event.date).toLocaleDateString() : gameDateToDate(event.date).toLocaleDateString()}
                </p>
              </VerticalTimelineElement>
            );
          })}
        </VerticalTimeline>
      </CardContent>
    </Card>
  );
};
