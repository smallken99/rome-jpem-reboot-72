
import React from 'react';
import { HistoireEntry } from '../types/histoire';
import { CalendarDays, BookText, Flag, ScrollText } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

interface HistoireTimelineProps {
  entries: HistoireEntry[];
}

export const HistoireTimeline: React.FC<HistoireTimelineProps> = ({ entries }) => {
  // Sort entries by date, most recent first
  const sortedEntries = [...entries].sort((a, b) => {
    if (a.date.year !== b.date.year) {
      return b.date.year - a.date.year;
    }
    
    const seasons = ['SPRING', 'SUMMER', 'AUTUMN', 'WINTER'];
    return seasons.indexOf(b.date.season) - seasons.indexOf(a.date.season);
  });
  
  const getIconForType = (type: string | undefined) => {
    switch (type || 'default') {
      case 'POLITIQUE':
        return <ScrollText className="h-5 w-5 text-blue-500" />;
      case 'MILITAIRE':
        return <Flag className="h-5 w-5 text-red-500" />;
      case 'ECONOMIQUE':
        return <ScrollText className="h-5 w-5 text-green-500" />;
      default:
        return <BookText className="h-5 w-5 text-gray-500" />;
    }
  };
  
  const getSeasonName = (season: string) => {
    const seasonMap: Record<string, string> = {
      'SPRING': 'Printemps',
      'SUMMER': 'Été',
      'AUTUMN': 'Automne',
      'WINTER': 'Hiver'
    };
    return seasonMap[season] || season;
  };
  
  return (
    <div className="space-y-4">
      {sortedEntries.map((entry) => (
        <Card key={entry.id} className="overflow-hidden">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <div className="flex items-center space-x-2">
                {getIconForType(entry.type || entry.catégorie)}
                <CardTitle className="text-lg">{entry.titre}</CardTitle>
              </div>
              <Badge variant="outline" className="ml-2">
                {entry.date.year} - {getSeasonName(entry.date.season)}
              </Badge>
            </div>
            <CardDescription>
              {entry.catégorie || entry.type} - {entry.importance}
            </CardDescription>
          </CardHeader>
          <Separator />
          <CardContent className="pt-4">
            <p className="text-sm leading-relaxed">{entry.contenu}</p>
            {entry.personnagesImpliqués && entry.personnagesImpliqués.length > 0 && (
              <div className="mt-3">
                <div className="text-xs font-medium text-muted-foreground mb-1">Personnages impliqués:</div>
                <div className="flex flex-wrap gap-1">
                  {entry.personnagesImpliqués.map((person, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {person}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
            {entry.auteur && (
              <div className="mt-3 text-xs text-right text-muted-foreground">
                Enregistré par: {entry.auteur}
              </div>
            )}
          </CardContent>
        </Card>
      ))}
      
      {sortedEntries.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          <BookText className="mx-auto h-10 w-10 mb-2 opacity-50" />
          <p>Aucun événement historique enregistré.</p>
        </div>
      )}
    </div>
  );
};
