
import React from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { PoliticalEvent } from '@/types/equilibre';
import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';

interface RecentEventsTableProps {
  events: PoliticalEvent[];
}

export const RecentEventsTable: React.FC<RecentEventsTableProps> = ({ events }) => {
  if (!events || events.length === 0) {
    return (
      <div className="py-4 text-center text-muted-foreground">
        Aucun événement récent à afficher.
      </div>
    );
  }

  const getImpactSummary = (impact: Record<string, number> = {}): string => {
    const impacts = Object.entries(impact);
    if (impacts.length === 0) return "Aucun impact";
    
    return impacts
      .map(([key, value]) => {
        const sign = value > 0 ? '+' : '';
        return `${key}: ${sign}${value}`;
      })
      .join(', ');
  };

  const getEventDate = (date: Date): string => {
    try {
      if (typeof date === 'string') {
        date = new Date(date);
      }
      return formatDistanceToNow(date, { addSuffix: true, locale: fr });
    } catch (error) {
      return "Date inconnue";
    }
  };

  const getImportanceBadge = (importance: string) => {
    let variant: "destructive" | "warning" | "secondary" = "secondary";
    
    switch (importance.toLowerCase()) {
      case 'critical':
      case 'critique':
        variant = "destructive";
        break;
      case 'high':
      case 'haute':
        variant = "destructive";
        break;
      case 'medium':
      case 'moyenne':
        variant = "warning";
        break;
      default:
        variant = "secondary";
    }
    
    return (
      <Badge variant={variant as any}>
        {importance}
      </Badge>
    );
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Événement</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Impact</TableHead>
          <TableHead>Importance</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {events.map((event) => (
          <TableRow key={event.id}>
            <TableCell className="font-medium">{event.title}</TableCell>
            <TableCell>{getEventDate(event.date)}</TableCell>
            <TableCell>{getImpactSummary(event.impact)}</TableCell>
            <TableCell>{getImportanceBadge(event.importance)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
