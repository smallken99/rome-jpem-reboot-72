
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { PoliticalEvent } from '../types/equilibre';
import { formatSeasonDisplay, GameDate } from '@/utils/timeSystem';

interface PoliticalEventsTimelineProps {
  events: PoliticalEvent[];
}

export const PoliticalEventsTimeline: React.FC<PoliticalEventsTimelineProps> = ({ events }) => {
  const sortedEvents = [...events].sort((a, b) => {
    // If both events have date objects
    if (a.date && b.date) {
      // Compare years first
      if (a.date.year !== b.date.year) {
        return a.date.year - b.date.year;
      }
      
      // Then compare seasons
      const seasons = ['Ver', 'Aestas', 'Autumnus', 'Hiems', 'SPRING', 'SUMMER', 'AUTUMN', 'WINTER'];
      const aSeasonIndex = seasons.indexOf(a.date.season);
      const bSeasonIndex = seasons.indexOf(b.date.season);
      
      return aSeasonIndex - bSeasonIndex;
    }
    
    // Fallback to string comparison if date objects aren't available
    return String(a.date).localeCompare(String(b.date));
  });

  const getEventBadgeColor = (event: PoliticalEvent) => {
    const importanceValue = event.importance || "normale";
    switch (importanceValue) {
      case "majeure": return "destructive";
      case "normale": return "secondary";
      case "mineure": return "outline";
      default: return "secondary";
    }
  };

  // Formater la date d'un événement pour l'affichage
  const formatEventDate = (event: PoliticalEvent) => {
    if (event.date && event.date.year && event.date.season) {
      return `An ${event.date.year} - ${formatSeasonDisplay(event.date.season as any)}`;
    }
    
    return String(event.date);
  };

  const getEventFaction = (event: PoliticalEvent): string => {
    return event.faction || 'Neutre';
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Chronologie des événements politiques</h3>
      
      {sortedEvents.length === 0 ? (
        <Card>
          <CardContent className="p-4 text-center text-muted-foreground">
            Aucun événement politique enregistré
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {sortedEvents.map(event => (
            <Card key={event.id} className="relative overflow-hidden">
              <div className={`absolute left-0 top-0 bottom-0 w-1 bg-${getEventFaction(event) === 'Populares' ? 'red' : getEventFaction(event) === 'Optimates' ? 'blue' : 'gray'}-500`} />
              <CardContent className="p-4 pl-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium">{event.title}</h4>
                    <p className="text-sm text-muted-foreground mt-1">{event.description}</p>
                  </div>
                  <div className="flex flex-col items-end">
                    <Badge variant={getEventBadgeColor(event) as any}>{event.type}</Badge>
                    <span className="text-xs text-muted-foreground mt-1">
                      {formatEventDate(event)}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
