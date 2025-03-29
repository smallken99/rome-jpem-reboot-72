
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ScrollArea } from '@/components/ui/scroll-area';
import { PoliticalEvent, RecentEventsTableProps } from '../../types/equilibre';
import { formatGameDate } from '../../components/lois/utils/dateConverter';

export const RecentEventsTable: React.FC<RecentEventsTableProps> = ({ events }) => {
  return (
    <div className="border rounded-md">
      <ScrollArea className="h-[300px]">
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
            {events.length > 0 ? (
              events.map((event, index) => (
                <TableRow key={event.id || index}>
                  <TableCell>{formatGameDate(event.date)}</TableCell>
                  <TableCell>{event.title || event.description}</TableCell>
                  <TableCell>
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      event.type === 'positive' ? 'bg-green-100 text-green-800' :
                      event.type === 'negative' ? 'bg-red-100 text-red-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {event.type}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className={`${
                      event.impact > 0 ? 'text-green-600' :
                      event.impact < 0 ? 'text-red-600' :
                      'text-gray-600'
                    }`}>
                      {event.impact > 0 ? '+' : ''}{event.impact}
                    </span>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-4 text-muted-foreground">
                  Aucun événement récent à afficher
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </ScrollArea>
    </div>
  );
};

export default RecentEventsTable;
