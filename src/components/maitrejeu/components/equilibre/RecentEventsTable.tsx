
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { HistoriqueEntry } from '@/components/maitrejeu/types/equilibre';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

interface RecentEventsTableProps {
  events: HistoriqueEntry[];
}

const RecentEventsTable: React.FC<RecentEventsTableProps> = ({ events }) => {
  if (!events || events.length === 0) {
    return (
      <div className="text-center p-4 border rounded-md bg-muted">
        <p className="text-muted-foreground">Aucun événement récent</p>
      </div>
    );
  }

  // Sort events by date, most recent first
  const sortedEvents = [...events].sort((a, b) => {
    const dateA = a.date.year * 4 + (a.date.season === 'winter' ? 3 : a.date.season === 'autumn' ? 2 : a.date.season === 'summer' ? 1 : 0);
    const dateB = b.date.year * 4 + (b.date.season === 'winter' ? 3 : b.date.season === 'autumn' ? 2 : b.date.season === 'summer' ? 1 : 0);
    return dateB - dateA;
  });

  const getImpactClass = (impact: number) => {
    if (impact > 20) return "text-green-600 font-medium";
    if (impact > 0) return "text-green-500";
    if (impact === 0) return "text-gray-500";
    if (impact > -20) return "text-red-500";
    return "text-red-600 font-medium";
  };

  const formatSeason = (season: string) => {
    switch (season) {
      case 'spring': return 'Printemps';
      case 'summer': return 'Été';
      case 'autumn': return 'Automne';
      case 'winter': return 'Hiver';
      default: return season;
    }
  };

  return (
    <div className="border rounded-md overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Événement</TableHead>
            <TableHead>Type</TableHead>
            <TableHead className="text-right">Impact</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedEvents.slice(0, 10).map((event) => (
            <TableRow key={event.id}>
              <TableCell className="font-medium whitespace-nowrap">
                {event.date.year} ({formatSeason(event.date.season)})
              </TableCell>
              <TableCell>{event.event}</TableCell>
              <TableCell>
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100">
                  {event.type}
                </span>
              </TableCell>
              <TableCell className={`text-right ${getImpactClass(event.impact)}`}>
                {event.impact > 0 ? '+' : ''}{event.impact}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default RecentEventsTable;
