
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { PoliticalEvent } from '../types/equilibre';
import { formatSeasonDisplay } from '../types/common';

interface PoliticalEventsTimelineProps {
  events: PoliticalEvent[];
}

export const PoliticalEventsTimeline: React.FC<PoliticalEventsTimelineProps> = ({ events }) => {
  const sortedEvents = [...events].sort((a, b) => {
    // Si date est un objet Date
    if (a.date instanceof Date && b.date instanceof Date) {
      return a.date.getTime() - b.date.getTime();
    }
    
    // Si year et season sont fournis directement
    if (a.year !== undefined && b.year !== undefined) {
      if (a.year !== b.year) {
        return a.year - b.year;
      }
      
      // Ordre des saisons
      const seasons = ['Ver', 'Aestas', 'Autumnus', 'Hiems', 'SPRING', 'SUMMER', 'AUTUMN', 'WINTER'];
      const aSeasonIndex = seasons.indexOf(a.season || '');
      const bSeasonIndex = seasons.indexOf(b.season || '');
      
      return aSeasonIndex - bSeasonIndex;
    }
    
    // Si ce sont des chaînes de caractères
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
    if (event.year && event.season) {
      return `An ${event.year} - ${formatSeasonDisplay(event.season as any)}`;
    }
    
    if (event.date instanceof Date) {
      return event.date.toLocaleDateString();
    }
    
    return String(event.date);
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
              <div className={`absolute left-0 top-0 bottom-0 w-1 bg-${event.faction === 'Populares' ? 'red' : event.faction === 'Optimates' ? 'blue' : 'gray'}-500`} />
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
