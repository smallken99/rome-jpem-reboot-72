
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { HistoriqueEntry } from '@/components/maitrejeu/types/equilibre';
import { format } from 'date-fns';

interface RecentEventsTableProps {
  events: HistoriqueEntry[];
}

export default function RecentEventsTable({ events }: RecentEventsTableProps) {
  // Sort events by date (most recent first)
  const sortedEvents = [...events].sort((a, b) => {
    const dateA = a.date instanceof Date ? a.date : new Date();
    const dateB = b.date instanceof Date ? b.date : new Date();
    return dateB.getTime() - dateA.getTime();
  });

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Événement</TableHead>
            <TableHead>Impact</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedEvents.length > 0 ? (
            sortedEvents.map((event, index) => (
              <TableRow key={index}>
                <TableCell>
                  {event.date instanceof Date 
                    ? format(event.date, 'dd/MM/yyyy')
                    : `An ${event.date.year}, ${event.date.season}`
                  }
                </TableCell>
                <TableCell>{event.event}</TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-2">
                    {event.impact.political && (
                      <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded">
                        Politique: {event.impact.political > 0 ? `+${event.impact.political}` : event.impact.political}
                      </span>
                    )}
                    {event.impact.social && (
                      <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded">
                        Social: {event.impact.social > 0 ? `+${event.impact.social}` : event.impact.social}
                      </span>
                    )}
                    {event.impact.economic && (
                      <span className="px-2 py-1 text-xs bg-yellow-100 text-yellow-800 rounded">
                        Économie: {event.impact.economic > 0 ? `+${event.impact.economic}` : event.impact.economic}
                      </span>
                    )}
                    {event.impact.stability && (
                      <span className="px-2 py-1 text-xs bg-purple-100 text-purple-800 rounded">
                        Stabilité: {event.impact.stability > 0 ? `+${event.impact.stability}` : event.impact.stability}
                      </span>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={3} className="text-center text-muted-foreground py-4">
                Aucun événement récent
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
