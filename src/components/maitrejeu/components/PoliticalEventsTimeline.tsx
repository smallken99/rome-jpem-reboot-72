
import React from 'react';
import { 
  Timeline, 
  TimelineItem, 
  TimelineConnector, 
  TimelineContent, 
  TimelineIcon, 
  TimelineSeparator 
} from '@/components/ui/timeline';
import { extractGameDateComponents, isGameDate } from './lois/utils/formatGameDate';
import { PoliticalEvent } from '../types/equilibre';
import { Tooltip } from '@/components/ui/tooltip';
import { LawIcon, MilitaryIcon, DiplomaticIcon, DisasterIcon, InfoIcon } from './icons';

export const PoliticalEventsTimeline: React.FC<{ events: PoliticalEvent[] }> = ({ events }) => {
  const getYearRange = () => {
    let minYear = 9999;
    let maxYear = 0;

    events.forEach(event => {
      if (event.date) {
        const dateComponents = extractGameDateComponents(event.date);
        if (dateComponents) {
          minYear = Math.min(minYear, dateComponents.year);
          maxYear = Math.max(maxYear, dateComponents.year);
        }
      }
    });

    return { minYear, maxYear };
  };

  const getSeasonsInYear = (year: number) => {
    return events
      .filter(event => {
        const dateComponents = extractGameDateComponents(event.date);
        return dateComponents && dateComponents.year === year;
      })
      .map(event => {
        const dateComponents = extractGameDateComponents(event.date);
        return dateComponents ? dateComponents.season : '';
      })
      .filter((season, index, self) => self.indexOf(season) === index);
  };

  const getEventIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'politique':
      case 'political':
        return <LawIcon className="h-5 w-5" />;
      case 'militaire':
      case 'military':
        return <MilitaryIcon className="h-5 w-5" />;
      case 'diplomatique':
      case 'diplomatic':
        return <DiplomaticIcon className="h-5 w-5" />;
      case 'catastrophe':
      case 'disaster':
        return <DisasterIcon className="h-5 w-5" />;
      default:
        return <InfoIcon className="h-5 w-5" />;
    }
  };

  const { minYear, maxYear } = getYearRange();
  const years = Array.from({ length: maxYear - minYear + 1 }, (_, i) => minYear + i);

  return (
    <Timeline>
      {years.map(year => (
        <React.Fragment key={year}>
          <TimelineItem>
            <TimelineSeparator>
              <TimelineIcon />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
              <h3 className="text-lg font-bold">Année {year}</h3>
              {getSeasonsInYear(year).map(season => (
                <div key={`${year}-${season}`} className="ml-4 mt-2">
                  <h4 className="text-md font-semibold text-muted-foreground">{season}</h4>
                  <ul className="space-y-1 mt-1">
                    {events
                      .filter(event => {
                        const dateComponents = extractGameDateComponents(event.date);
                        return dateComponents && dateComponents.year === year && dateComponents.season === season;
                      })
                      .map(event => (
                        <li key={event.id} className="flex items-start gap-2">
                          <span className="mt-0.5 text-primary">
                            {getEventIcon(event.type)}
                          </span>
                          <Tooltip content={event.description}>
                            <span>
                              <span className="font-medium">{event.title}</span>
                              {event.faction && (
                                <span className="text-xs ml-1 text-muted-foreground">
                                  ({event.faction})
                                </span>
                              )}
                            </span>
                          </Tooltip>
                        </li>
                      ))}
                  </ul>
                </div>
              ))}
            </TimelineContent>
          </TimelineItem>
        </React.Fragment>
      ))}
    </Timeline>
  );
};
