
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Badge } from '@/components/ui/badge';
import { PoliticalEvent } from '@/types/equilibre';

interface RecentEventsTableProps {
  events: PoliticalEvent[];
  formatDate?: (date: Date) => string;
}

export const RecentEventsTable: React.FC<RecentEventsTableProps> = ({ 
  events, 
  formatDate = (date) => format(date, 'PPP', { locale: fr }) 
}) => {
  const getImpactColor = (impact: number) => {
    if (impact > 50) return "bg-red-500";
    if (impact > 25) return "bg-orange-500";
    if (impact > 0) return "bg-yellow-500";
    if (impact < -25) return "bg-green-500";
    return "bg-blue-500";
  };

  return (
    <div className="border rounded-md">
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
                <TableCell className="font-medium">{formatDate(event.date)}</TableCell>
                <TableCell>{event.title}</TableCell>
                <TableCell>
                  <Badge variant="outline">{event.type}</Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Badge className={getImpactColor(event.impact)}>
                    {event.impact > 0 ? `+${event.impact}` : event.impact}
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
  );
};
