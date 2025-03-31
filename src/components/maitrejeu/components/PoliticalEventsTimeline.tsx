
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import { Evenement } from '@/components/maitrejeu/types';
import { CalendarIcon } from '@radix-ui/react-icons';
import { Badge } from '@/components/ui/badge';
import { convertToUtilsGameDate } from '../utils/dateUtils';

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
            // We'll use our utility to convert between different date formats
            const eventDate = typeof event.date === 'string' 
              ? new Date() 
              : new Date(event.date.year, getSeasonMonthIndex(event.date.season), 1);
              
            const endDate = event.endDate 
              ? (typeof event.endDate === 'string' 
                ? new Date() 
                : new Date(event.endDate.year, getSeasonMonthIndex(event.endDate.season), 1))
              : null;
            
            return (
              <VerticalTimelineElement
                key={event.id}
                className="vertical-timeline-element--event"
                date={
                  endDate
                    ? `${eventDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}`
                    : eventDate.toLocaleDateString()
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
                  Date: {formatPoliticalEventDate(event.date)}
                </p>
              </VerticalTimelineElement>
            );
          })}
        </VerticalTimeline>
      </CardContent>
    </Card>
  );
};

/**
 * Helper function to get month index based on season
 */
function getSeasonMonthIndex(season: any): number {
  const seasonStr = String(season).toUpperCase();
  if (seasonStr.includes('SPRING') || seasonStr.includes('VER')) return 3; // April
  if (seasonStr.includes('SUMMER') || seasonStr.includes('AESTAS')) return 6; // July
  if (seasonStr.includes('AUTUMN') || seasonStr.includes('FALL') || seasonStr.includes('AUTUMNUS')) return 9; // October
  if (seasonStr.includes('WINTER') || seasonStr.includes('HIEMS')) return 0; // January
  return 0; // Default to January
}

/**
 * Format a date for display
 */
function formatPoliticalEventDate(date: any): string {
  if (typeof date === 'string') {
    return new Date(date).toLocaleDateString();
  }
  
  if (date && typeof date === 'object' && 'year' in date && 'season' in date) {
    // It's a GameDate
    const seasons: Record<string, string> = {
      'VER': 'Printemps',
      'AESTAS': 'Été',
      'AUTUMNUS': 'Automne',
      'HIEMS': 'Hiver',
      'SPRING': 'Printemps',
      'SUMMER': 'Été',
      'AUTUMN': 'Automne',
      'WINTER': 'Hiver'
    };
    
    const seasonUpper = String(date.season).toUpperCase();
    const seasonDisplay = seasons[seasonUpper] || String(date.season);
    
    return `${seasonDisplay} ${date.year}`;
  }
  
  // Fallback for any other type
  return new Date().toLocaleDateString();
}
