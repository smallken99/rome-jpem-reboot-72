
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

export interface PoliticalEvent {
  id: string;
  title: string;
  date: Date | string;
  type: string;
  impact: number;
  description: string;
}

interface RecentEventsTableProps {
  events: PoliticalEvent[];
}

export const RecentEventsTable: React.FC<RecentEventsTableProps> = ({ events }) => {
  // Impact badge color based on severity
  const getImpactColor = (impact: number): string => {
    if (impact >= 8) return "bg-red-500";
    if (impact >= 6) return "bg-orange-500";
    if (impact >= 4) return "bg-yellow-500";
    if (impact >= 2) return "bg-blue-500";
    return "bg-green-500";
  };
  
  // Type badge color
  const getTypeColor = (type: string): string => {
    switch (type.toLowerCase()) {
      case 'politique': return 'bg-blue-500';
      case 'militaire': return 'bg-red-500';
      case 'économique': return 'bg-green-500';
      case 'social': return 'bg-purple-500';
      case 'religieux': return 'bg-amber-500';
      default: return 'bg-gray-500';
    }
  };
  
  // Format date for display
  const formatEventDate = (date: Date | string): string => {
    if (typeof date === 'string') return date;
    return date.toLocaleDateString();
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Événements Récents</CardTitle>
      </CardHeader>
      <CardContent>
        {events.length > 0 ? (
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
              {events.map((event) => (
                <TableRow key={event.id}>
                  <TableCell className="whitespace-nowrap">
                    {formatEventDate(event.date)}
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{event.title}</div>
                      <div className="text-sm text-muted-foreground">{event.description}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getTypeColor(event.type)}>
                      {event.type}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={getImpactColor(event.impact)}>
                      {event.impact}/10
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="text-center py-6 text-muted-foreground">
            <p>Aucun événement récent à afficher</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
