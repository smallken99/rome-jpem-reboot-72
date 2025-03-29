
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { RecentEventsTableProps } from '../../types/equilibre';
import { formatGameDate } from '../lois/utils/dateConverter';

export const RecentEventsTable: React.FC<RecentEventsTableProps> = ({ events }) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Événements Récents</h3>
      
      <div className="rounded-md border">
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
            {events.length > 0 ? (
              events.map((event) => (
                <TableRow key={event.id}>
                  <TableCell className="font-medium">
                    {formatGameDate(event.date)}
                  </TableCell>
                  <TableCell>{event.title}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="capitalize">
                      {event.type}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Badge className={`${event.impact > 0 ? 'bg-green-500' : event.impact < 0 ? 'bg-red-500' : 'bg-slate-500'}`}>
                      {event.impact > 0 ? '+' : ''}{event.impact}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-4 text-muted-foreground">
                  Aucun événement récent
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
