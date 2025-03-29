
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { HistoriqueEntry } from '@/types/equilibre';

interface RecentEventsTableProps {
  events: HistoriqueEntry[];
}

export const RecentEventsTable: React.FC<RecentEventsTableProps> = ({ events }) => {
  // Formatter la date
  const formatDate = (date: Date) => {
    return date instanceof Date
      ? date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })
      : 'Date inconnue';
  };

  // Déterminer la couleur du badge en fonction de l'impact
  const getImpactColor = (impact: number) => {
    if (impact > 10) return "bg-green-100 text-green-800 hover:bg-green-200";
    if (impact > 0) return "bg-blue-100 text-blue-800 hover:bg-blue-200";
    if (impact > -10) return "bg-yellow-100 text-yellow-800 hover:bg-yellow-200";
    return "bg-red-100 text-red-800 hover:bg-red-200";
  };

  // Texte de l'impact
  const getImpactText = (impact: number) => {
    if (impact > 10) return `+${impact} (Majeur)`;
    if (impact > 0) return `+${impact} (Positif)`;
    if (impact > -10) return `${impact} (Mineur)`;
    return `${impact} (Critique)`;
  };

  return (
    <div>
      <h3 className="text-lg font-medium mb-4">Événements récents</h3>
      <div className="border rounded-md">
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
              events.map((event) => (
                <TableRow key={event.id}>
                  <TableCell>{formatDate(event.date)}</TableCell>
                  <TableCell>{event.event}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{event.type}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={getImpactColor(event.impact)}>
                      {getImpactText(event.impact)}
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
