
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { HistoriqueEntry } from '@/components/maitrejeu/types/equilibre';

interface RecentEventsTableProps {
  events: HistoriqueEntry[];
}

const RecentEventsTable: React.FC<RecentEventsTableProps> = ({ events }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Date</TableHead>
          <TableHead>Événement</TableHead>
          <TableHead>Impact</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {events.length > 0 ? (
          events.map((event, index) => (
            <TableRow key={index}>
              <TableCell>{event.date.season} {event.date.year}</TableCell>
              <TableCell>{event.event}</TableCell>
              <TableCell 
                className={
                  event.impact > 0 ? 'text-green-600' : 
                  event.impact < 0 ? 'text-red-600' : ''
                }
              >
                {event.impact > 0 ? '+' : ''}{event.impact}
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={3} className="text-center py-4 text-muted-foreground">
              Aucun événement récent
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default RecentEventsTable;
