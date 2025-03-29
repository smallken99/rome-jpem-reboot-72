
import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { HistoriqueEntry } from '@/types/game';
import { formatGameDateForRender } from '../lois/utils/dateConverter';
import { Badge } from '@/components/ui/badge';

interface RecentEventsTableProps {
  events: HistoriqueEntry[];
}

export function RecentEventsTable({ events }: RecentEventsTableProps) {
  // Fonction pour obtenir la classe de couleur basée sur l'impact
  const getImpactColor = (impact: number) => {
    if (impact > 10) return "bg-green-50 text-green-700 border-green-200";
    if (impact > 0) return "bg-emerald-50 text-emerald-700 border-emerald-200";
    if (impact === 0) return "bg-gray-50 text-gray-700 border-gray-200";
    if (impact > -10) return "bg-amber-50 text-amber-700 border-amber-200";
    return "bg-red-50 text-red-700 border-red-200";
  };

  // Fonction pour formatter la date
  const formatDate = (date: Date) => {
    if (date instanceof Date) {
      return date.toLocaleDateString();
    }
    return formatGameDateForRender(date);
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-24">Date</TableHead>
            <TableHead>Événement</TableHead>
            <TableHead>Type</TableHead>
            <TableHead className="text-right">Impact</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {events.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center text-muted-foreground py-6">
                Aucun événement récent
              </TableCell>
            </TableRow>
          ) : (
            events.map((event) => (
              <TableRow key={event.id}>
                <TableCell className="font-mono text-xs">
                  {formatDate(event.date)}
                </TableCell>
                <TableCell>{event.event}</TableCell>
                <TableCell>
                  <Badge variant="outline">{event.type}</Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Badge 
                    className={getImpactColor(event.impact)}
                    variant="outline"
                  >
                    {event.impact > 0 ? `+${event.impact}` : event.impact}
                  </Badge>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
