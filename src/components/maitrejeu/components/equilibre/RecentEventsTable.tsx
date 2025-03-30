
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { ArrowUp, ArrowDown, Minus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PoliticalEvent } from '@/types/equilibre';
import { formatGameDate } from '@/components/maitrejeu/lois/utils/dateConverter';

interface RecentEventsTableProps {
  events: PoliticalEvent[];
  onViewEvent?: (event: PoliticalEvent) => void;
}

export const RecentEventsTable: React.FC<RecentEventsTableProps> = ({
  events,
  onViewEvent
}) => {
  if (events.length === 0) {
    return (
      <div className="text-center py-4">
        <p className="text-muted-foreground">Aucun événement récent à afficher</p>
      </div>
    );
  }

  const getImpactIcon = (impact: number | undefined) => {
    if (!impact) return <Minus className="h-4 w-4" />;
    if (impact > 0) return <ArrowUp className="h-4 w-4 text-green-500" />;
    if (impact < 0) return <ArrowDown className="h-4 w-4 text-red-500" />;
    return <Minus className="h-4 w-4" />;
  };

  const getImpactValue = (impact: number | undefined) => {
    if (!impact) return "-";
    return Math.abs(impact).toString();
  };

  const getImportanceBadge = (importance: string) => {
    switch (importance.toLowerCase()) {
      case 'high':
      case 'haute':
      case 'critical':
      case 'critique':
        return <Badge variant="destructive">Important</Badge>;
      case 'medium':
      case 'moyenne':
      case 'normal':
      case 'normale':
        return <Badge variant="secondary">Normal</Badge>;
      default:
        return <Badge variant="outline">Mineur</Badge>;
    }
  };

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Événement</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Importance</TableHead>
            <TableHead className="text-right">Impact</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {events.map((event) => {
            // Extraire un impact principal pour l'affichage
            const mainImpact = event.impact ? 
              Object.values(event.impact)[0] : undefined;
            
            return (
              <TableRow key={event.id}>
                <TableCell>
                  {formatGameDate(event.date)}
                </TableCell>
                <TableCell className="font-medium">{event.title}</TableCell>
                <TableCell>{event.type}</TableCell>
                <TableCell>
                  {getImportanceBadge(event.importance)}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end">
                    {getImpactIcon(mainImpact)}
                    <span className="ml-1">{getImpactValue(mainImpact)}</span>
                  </div>
                </TableCell>
                <TableCell>
                  {onViewEvent && (
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => onViewEvent(event)}
                    >
                      Détails
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};
