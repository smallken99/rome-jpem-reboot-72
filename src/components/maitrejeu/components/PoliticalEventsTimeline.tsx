
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Timeline } from '@/components/ui/timeline';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { formatSeasonDisplay } from '@/utils/timeSystem';
import { PoliticalEvent } from '@/components/maitrejeu/types';
import { LawIcon, MilitaryIcon, DiplomaticIcon, InfoIcon } from '@/components/maitrejeu/components/icons';

interface PoliticalEventsTimelineProps {
  events: PoliticalEvent[];
  title?: string;
  limit?: number;
}

const sortEvents = (a: PoliticalEvent, b: PoliticalEvent) => {
  // Gérer les dates au format { year, season } ou Date
  const aYear = a.date && typeof a.date === 'object' && 'year' in a.date ? a.date.year : new Date(a.date as Date).getFullYear();
  const bYear = b.date && typeof b.date === 'object' && 'year' in b.date ? b.date.year : new Date(b.date as Date).getFullYear();
  
  if (aYear !== bYear) {
    return bYear - aYear; // Plus récent en premier
  }
  
  // Si même année, comparer les saisons
  const aSeason = a.date && typeof a.date === 'object' && 'season' in a.date ? a.date.season : '';
  const bSeason = b.date && typeof b.date === 'object' && 'season' in b.date ? b.date.season : '';
  
  // Ordre des saisons: Hiems, Autumnus, Aestas, Ver (hiver, automne, été, printemps)
  const seasonOrder = { 'Ver': 0, 'Aestas': 1, 'Autumnus': 2, 'Hiems': 3 };
  return (seasonOrder[bSeason as keyof typeof seasonOrder] || 0) - (seasonOrder[aSeason as keyof typeof seasonOrder] || 0);
};

const getEventIcon = (type: string) => {
  switch (type?.toLowerCase()) {
    case 'law':
    case 'politique':
      return <LawIcon className="h-4 w-4" />;
    case 'military':
    case 'militaire':
      return <MilitaryIcon className="h-4 w-4" />;
    case 'diplomatic':
    case 'diplomatique':
      return <DiplomaticIcon className="h-4 w-4" />;
    default:
      return <InfoIcon className="h-4 w-4" />;
  }
};

const getEventColor = (event: PoliticalEvent) => {
  switch (event.type?.toLowerCase()) {
    case 'law':
    case 'politique':
      return 'bg-blue-500';
    case 'military':
    case 'militaire':
      return 'bg-red-500';
    case 'diplomatic':
    case 'diplomatique':
      return 'bg-green-500';
    default:
      return 'bg-gray-500';
  }
};

export const PoliticalEventsTimeline: React.FC<PoliticalEventsTimelineProps> = ({
  events,
  title = "Événements Politiques Récents",
  limit = 5
}) => {
  // Trier et limiter les événements
  const timelineEvents = [...events].sort(sortEvents).slice(0, limit);
  
  const renderDate = (event: PoliticalEvent) => {
    if (typeof event.date === 'object' && 'year' in event.date && 'season' in event.date) {
      return `${event.date.year} AUC - ${formatSeasonDisplay(event.date.season as string)}`;
    }
    return new Date(event.date as Date).toLocaleDateString();
  };

  const renderFaction = (event: PoliticalEvent) => {
    if (!event.title) return null;
    
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Badge variant="outline" className="ml-2">
              {event.title.substring(0, 15)}
              {event.title.length > 15 ? '...' : ''}
            </Badge>
          </TooltipTrigger>
          <TooltipContent>
            {event.title}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  };

  const timelineItems = timelineEvents.map(event => ({
    title: (
      <div className="flex items-center gap-2">
        <span>{event.title}</span>
        {renderFaction(event)}
      </div>
    ),
    content: (
      <div>
        <p>{event.description}</p>
        <div className="mt-1 text-xs text-muted-foreground">{renderDate(event)}</div>
      </div>
    ),
    icon: getEventIcon(event.type),
    iconBackground: getEventColor(event),
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        {timelineEvents.length > 0 ? (
          <Timeline items={timelineItems} />
        ) : (
          <p className="text-muted-foreground text-center py-4">
            Aucun événement récent à afficher
          </p>
        )}
      </CardContent>
    </Card>
  );
};
