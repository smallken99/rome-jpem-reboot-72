import React from 'react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { HistoriqueEntry } from '../../types';
import { Badge } from '@/components/ui/badge';

// Import date conversion utility
import { gameDateToDate, extractLoiDateInfo } from '../../components/lois/utils/dateConverter';

interface RecentEventsTableProps {
  events: HistoriqueEntry[];
}

export const RecentEventsTable: React.FC<RecentEventsTableProps> = ({ events }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Date</TableHead>
          <TableHead>Event</TableHead>
          <TableHead>Impact Politique</TableHead>
          <TableHead>Impact Social</TableHead>
          <TableHead>Impact Economique</TableHead>
          <TableHead>Impact Stabilité</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {events.map((event, index) => (
          <TableRow key={index}>
            <TableCell className="font-medium">{
              // Fix the date formatting issue
              const formattedDate = typeof event.date === 'string' ? 
                event.date : // If it's already a string, use it as is
                formatHistoricalDate(event.date); // Otherwise format it
              
              return formattedDate;
            }</TableCell>
            <TableCell>{event.event}</TableCell>
            <TableCell>
              {event.impact.political !== undefined ? (
                <Badge variant={event.impact.political > 0 ? "positive" : "negative"}>
                  {event.impact.political > 0 ? "+" : ""}
                  {event.impact.political}
                </Badge>
              ) : (
                "-"
              )}
            </TableCell>
            <TableCell>
              {event.impact.social !== undefined ? (
                <Badge variant={event.impact.social > 0 ? "positive" : "negative"}>
                  {event.impact.social > 0 ? "+" : ""}
                  {event.impact.social}
                </Badge>
              ) : (
                "-"
              )}
            </TableCell>
            <TableCell>
              {event.impact.economic !== undefined ? (
                <Badge variant={event.impact.economic > 0 ? "positive" : "negative"}>
                  {event.impact.economic > 0 ? "+" : ""}
                  {event.impact.economic}
                </Badge>
              ) : (
                "-"
              )}
            </TableCell>
            <TableCell>
              {event.impact.stability !== undefined ? (
                <Badge variant={event.impact.stability > 0 ? "positive" : "negative"}>
                  {event.impact.stability > 0 ? "+" : ""}
                  {event.impact.stability}
                </Badge>
              ) : (
                "-"
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

// Helper function to format historical dates
function formatHistoricalDate(date: Date | { year: number; season: string }): string {
  if (date instanceof Date) {
    return date.toLocaleDateString();
  } else if (typeof date === 'object' && 'year' in date && 'season' in date) {
    return `An ${date.year}, ${date.season}`;
  }
  return 'Date inconnue';
}
