
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { PoliticalEvent } from '@/types/equilibre';
import { formatDate } from '@/utils/dateFormatters';

interface RecentEventsTableProps {
  events: PoliticalEvent[];
}

export const RecentEventsTable: React.FC<RecentEventsTableProps> = ({ events }) => {
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
        {events.map((event) => (
          <TableRow key={event.id}>
            <TableCell className="font-medium">{formatDate(event.date)}</TableCell>
            <TableCell>{event.title}</TableCell>
            <TableCell>
              {event.impact && Object.entries(event.impact).map(([key, value]) => (
                <div key={key} className="text-xs">
                  {key}: {value > 0 ? `+${value}` : value}
                </div>
              ))}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
