
import React from 'react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { PoliticalEvent } from '@/types/equilibre';
import { formatGameDate } from '@/components/maitrejeu/lois/utils/dateConverter';

interface RecentEventsTableProps {
  events: PoliticalEvent[];
}

export const RecentEventsTable: React.FC<RecentEventsTableProps> = ({ events }) => {
  // Fonction pour formater un impact
  const formatImpact = (impact: Record<string, number> | undefined) => {
    if (!impact) return null;
    
    const entries = Object.entries(impact);
    if (entries.length === 0) return null;
    
    return entries.map(([key, value]) => {
      const formattedKey = key.split('.').pop() || key;
      const isPositive = value > 0;
      
      return (
        <Badge 
          key={key} 
          variant={isPositive ? "default" : "destructive"}
          className="mr-1 mb-1"
        >
          {formattedKey}: {isPositive ? '+' : ''}{value}
        </Badge>
      );
    });
  };
  
  // Fonction pour obtenir la variante du badge d'importance
  const getImportanceVariant = (importance: string) => {
    switch (importance.toLowerCase()) {
      case 'low':
      case 'faible':
        return 'secondary';
      case 'medium':
      case 'normale':
        return 'default';
      case 'high':
      case 'haute':
        return 'warning';
      case 'critical':
      case 'critique':
        return 'destructive';
      default:
        return 'secondary';
    }
  };
  
  return (
    <Table>
      <TableCaption>Événements récents qui ont affecté l'équilibre de Rome</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Date</TableHead>
          <TableHead className="w-[150px]">Type</TableHead>
          <TableHead>Événement</TableHead>
          <TableHead className="w-[150px]">Importance</TableHead>
          <TableHead className="w-[250px]">Impact</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {events.map((event) => (
          <TableRow key={event.id}>
            <TableCell className="font-medium">
              {event.date instanceof Date ? event.date.toLocaleDateString() : formatGameDate(event.date)}
            </TableCell>
            <TableCell>
              <Badge variant="outline">{event.type}</Badge>
            </TableCell>
            <TableCell>
              <div>
                <div className="font-medium">{event.title}</div>
                <div className="text-sm text-muted-foreground">{event.description}</div>
              </div>
            </TableCell>
            <TableCell>
              <Badge variant={getImportanceVariant(event.importance)}>
                {event.importance}
              </Badge>
            </TableCell>
            <TableCell>
              <div className="flex flex-wrap">
                {formatImpact(event.impact)}
              </div>
            </TableCell>
          </TableRow>
        ))}
        
        {events.length === 0 && (
          <TableRow>
            <TableCell colSpan={5} className="text-center py-4 text-muted-foreground">
              Aucun événement récent
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};
