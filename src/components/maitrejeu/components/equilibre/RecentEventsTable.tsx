
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { PoliticalEvent } from '@/types/equilibre';
import { Badge } from '@/components/ui/badge';
import { formatGameDate } from '@/utils/types/gameDate';

interface RecentEventsTableProps {
  events: PoliticalEvent[];
  maxEvents?: number;
}

export const RecentEventsTable: React.FC<RecentEventsTableProps> = ({ 
  events,
  maxEvents = 5
}) => {
  // Sort events by date (most recent first) and limit to maxEvents
  const sortedEvents = [...events]
    .sort((a, b) => {
      if (a.date instanceof Date && b.date instanceof Date) {
        return b.date.getTime() - a.date.getTime();
      }
      // Handle GameDate objects
      const aDate = 'year' in a.date ? a.date : { year: 0, season: 'spring' };
      const bDate = 'year' in b.date ? b.date : { year: 0, season: 'spring' };
      
      if (aDate.year !== bDate.year) {
        return bDate.year - aDate.year;
      }
      
      const seasonOrder = { spring: 0, summer: 1, fall: 2, winter: 3 };
      return seasonOrder[bDate.season] - seasonOrder[aDate.season];
    })
    .slice(0, maxEvents);

  // Helper to format date
  const formatDate = (date: Date | any) => {
    if (date instanceof Date) {
      return date.toLocaleDateString();
    }
    if (typeof date === 'object' && 'year' in date && 'season' in date) {
      return formatGameDate(date);
    }
    return 'Date inconnue';
  };

  // Helper to determine badge color based on importance
  const getImportanceBadge = (importance: string) => {
    switch (importance.toLowerCase()) {
      case 'critical':
      case 'critique':
        return "destructive";
      case 'high':
      case 'haute':
        return "destructive";
      case 'medium':
      case 'normale':
        return "secondary";
      case 'low':
      case 'faible':
      default:
        return "default";
    }
  };

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Événement</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Importance</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedEvents.length > 0 ? (
            sortedEvents.map((event) => (
              <TableRow key={event.id}>
                <TableCell className="whitespace-nowrap">
                  {formatDate(event.date)}
                </TableCell>
                <TableCell className="font-medium">{event.title}</TableCell>
                <TableCell>{event.type}</TableCell>
                <TableCell>
                  <Badge variant={getImportanceBadge(event.importance)}>
                    {event.importance}
                  </Badge>
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
