
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { PoliticalEventsTimelineProps } from '../types/maitreJeuTypes';
import { formatRomanDate } from '@/utils/timeSystem';
import { 
  Timeline, 
  TimelineItem, 
  TimelineItemContent,
  TimelineItemHeading,
  TimelineItemDescription,
  TimelineItemDate
} from '@/components/ui/timeline';
import { Search, Filter, ArrowDown, ArrowUp } from 'lucide-react';
import { Input } from '@/components/ui/input';

export const PoliticalEventsTimeline: React.FC<PoliticalEventsTimelineProps> = ({ 
  events
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [selectedType, setSelectedType] = useState<string | null>(null);
  
  // Filtrer et trier les événements
  const filteredEvents = events
    .filter(event => {
      // Filtrage par type
      if (selectedType && event.type !== selectedType) {
        return false;
      }
      
      // Filtrage par recherche
      if (searchTerm) {
        const search = searchTerm.toLowerCase();
        return (
          event.titre.toLowerCase().includes(search) || 
          event.description.toLowerCase().includes(search)
        );
      }
      
      return true;
    })
    .sort((a, b) => {
      // Tri par date
      const dateA = new Date(a.date.year, getSeasonIndex(a.date.season), a.date.day);
      const dateB = new Date(b.date.year, getSeasonIndex(b.date.season), b.date.day);
      
      return sortOrder === 'desc' ? dateB.getTime() - dateA.getTime() : dateA.getTime() - dateB.getTime();
    });
  
  // Convertir la saison en index numérique pour le tri
  function getSeasonIndex(season: string): number {
    switch (season) {
      case 'Ver': return 0;
      case 'Aestas': return 3;
      case 'Autumnus': return 6;
      case 'Hiems': return 9;
      default: return 0;
    }
  }
  
  const getTypeBadge = (type: string) => {
    switch (type) {
      case 'politique':
        return <Badge className="bg-blue-100 text-blue-800">Politique</Badge>;
      case 'militaire':
        return <Badge className="bg-red-100 text-red-800">Militaire</Badge>;
      case 'économique':
        return <Badge className="bg-green-100 text-green-800">Économique</Badge>;
      case 'religieux':
        return <Badge className="bg-purple-100 text-purple-800">Religieux</Badge>;
      case 'social':
        return <Badge className="bg-orange-100 text-orange-800">Social</Badge>;
      default:
        return <Badge>{type}</Badge>;
    }
  };
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Événements politiques</CardTitle>
        
        <div className="flex flex-col sm:flex-row gap-2 mt-3">
          <div className="relative flex-1">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Rechercher un événement..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8"
            />
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc')}
              className="flex items-center gap-1"
            >
              <Filter className="h-4 w-4" />
              {sortOrder === 'desc' ? (
                <ArrowDown className="h-3 w-3" />
              ) : (
                <ArrowUp className="h-3 w-3" />
              )}
            </Button>
            <Button
              variant={selectedType === null ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedType(null)}
            >
              Tous
            </Button>
            <Button
              variant={selectedType === 'politique' ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedType('politique')}
            >
              Politique
            </Button>
            <Button
              variant={selectedType === 'militaire' ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedType('militaire')}
            >
              Militaire
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {filteredEvents.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            Aucun événement trouvé
          </div>
        ) : (
          <Timeline>
            {filteredEvents.map((event) => (
              <TimelineItem key={event.id} active={!event.résolu}>
                <TimelineItemContent>
                  <div className="flex justify-between items-start">
                    <TimelineItemHeading>{event.titre}</TimelineItemHeading>
                    <div className="flex gap-2 items-center">
                      {getTypeBadge(event.type)}
                      <TimelineItemDate>
                        {formatRomanDate(event.date.year, event.date.season, event.date.day)}
                      </TimelineItemDate>
                    </div>
                  </div>
                  <TimelineItemDescription>{event.description}</TimelineItemDescription>
                  
                  {!event.résolu && event.options && (
                    <div className="mt-4 space-y-2">
                      <div className="text-xs font-medium">Options:</div>
                      <div className="grid grid-cols-1 gap-2">
                        {event.options.map((option) => (
                          <div key={option.id} className="p-2 border rounded-md text-xs bg-white">
                            <div className="font-medium">{option.titre}</div>
                            <div className="text-muted-foreground">{option.description}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {event.résolu && event.optionChoisie && event.options && (
                    <div className="mt-4 p-2 border rounded-md text-xs bg-green-50 border-green-200">
                      <div className="font-medium text-green-700">Option choisie:</div>
                      <div className="text-green-600">
                        {event.options.find(o => o.id === event.optionChoisie)?.titre}
                      </div>
                    </div>
                  )}
                  
                  {event.résolu && (
                    <div className="mt-2 text-xs text-right">
                      <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200">
                        Résolu
                      </Badge>
                    </div>
                  )}
                </TimelineItemContent>
              </TimelineItem>
            ))}
          </Timeline>
        )}
      </CardContent>
    </Card>
  );
};
