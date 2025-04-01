
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Equilibre } from '../../types/equilibre';
import { Event } from '../../types/events';
import { formatGameDate, adaptSeason } from '@/utils/types/gameDate';

interface RecentEventsTableProps {
  events: Event[];
  equilibre: Equilibre;
}

export const RecentEventsTable: React.FC<RecentEventsTableProps> = ({ events, equilibre }) => {
  // Sort events by date, most recent first
  const sortedEvents = [...events].sort((a, b) => {
    if (a.date.year !== b.date.year) {
      return b.date.year - a.date.year;
    }
    // Compare seasons (assuming Spring = 1, Summer = 2, etc.)
    const seasonToNumber: Record<string, number> = {
      Spring: 1, Ver: 1,
      Summer: 2, Aes: 2,
      Autumn: 3, Fall: 3, Aut: 3,
      Winter: 4, Hie: 4,
      SPRING: 1,
      SUMMER: 2,
      AUTUMN: 3,
      WINTER: 4,
      spring: 1,
      summer: 2,
      autumn: 3,
      winter: 4,
      fall: 3
    };
    
    const seasonA = seasonToNumber[a.date.season] || 0;
    const seasonB = seasonToNumber[b.date.season] || 0;
    return seasonB - seasonA;
  });
  
  return (
    <div className="border rounded-md">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Événement</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Impact</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedEvents.length > 0 ? (
            sortedEvents.slice(0, 5).map((event) => (
              <TableRow key={event.id}>
                <TableCell>{event.date ? formatGameDate(event.date) : 'N/A'}</TableCell>
                <TableCell className="font-medium">{event.title}</TableCell>
                <TableCell>
                  <Badge variant="outline">{event.type}</Badge>
                </TableCell>
                <TableCell className="text-right">
                  {event.effects && Object.keys(event.effects).map((key) => {
                    const impact = event.effects[key];
                    return (
                      <Badge 
                        key={key}
                        variant={impact > 0 ? "default" : "destructive"}
                        className="mr-1"
                      >
                        {key}: {impact > 0 ? '+' : ''}{impact}
                      </Badge>
                    );
                  })}
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4} className="text-center py-4">
                Aucun événement récent
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};
