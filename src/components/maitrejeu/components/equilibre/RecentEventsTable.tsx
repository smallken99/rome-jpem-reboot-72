
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { HistoriqueEntry } from '@/types/equilibre';
import { Badge } from '@/components/ui/badge';

interface RecentEventsTableProps {
  events: HistoriqueEntry[];
}

export const RecentEventsTable: React.FC<RecentEventsTableProps> = ({ events }) => {
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });
  };

  const getImpactColor = (impact: Record<string, number>) => {
    const totalImpact = Object.values(impact).reduce((sum, value) => sum + value, 0);
    if (totalImpact > 15) return "destructive";
    if (totalImpact > 5) return "warning";
    if (totalImpact > 0) return "default";
    if (totalImpact < -15) return "destructive";
    if (totalImpact < -5) return "warning";
    return "secondary";
  };

  const getImportanceColor = (importance: string) => {
    switch (importance.toLowerCase()) {
      case 'high':
      case 'critical':
        return "destructive";
      case 'medium':
        return "warning";
      default:
        return "secondary";
    }
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Événements récents</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Événement</TableHead>
              <TableHead>Type</TableHead>
              <TableHead className="text-right">Importance</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {events.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-6 text-muted-foreground">
                  Aucun événement récent
                </TableCell>
              </TableRow>
            ) : (
              events.map((event) => (
                <TableRow key={event.id}>
                  <TableCell className="font-medium">
                    {formatDate(event.date)}
                  </TableCell>
                  <TableCell>{event.title}</TableCell>
                  <TableCell>{event.type}</TableCell>
                  <TableCell className="text-right">
                    <Badge variant={getImportanceColor(event.importance)}>
                      {event.importance}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
