
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { PoliticalEvent } from '@/types/game';
import { gameDateToString } from '../lois/utils/dateConverter';

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
            <TableCell>{gameDateToString(event.date)}</TableCell>
            <TableCell>{event.title}</TableCell>
            <TableCell>
              {Object.entries(event.impact)
                .filter(([_, value]) => value !== undefined)
                .map(([key, value]) => (
                  <div key={key}>
                    {key}: {typeof value === 'object' ? JSON.stringify(value) : value}
                  </div>
                ))}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
