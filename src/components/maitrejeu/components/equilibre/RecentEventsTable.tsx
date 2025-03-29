
import React from 'react';
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Equilibre } from '../../types/equilibre';
import { gameDateToString } from '../lois/utils/dateConverter';

interface RecentEventsTableProps {
  equilibre: Equilibre;
}

export default function RecentEventsTable({ equilibre }: RecentEventsTableProps) {
  // If the events aren't proper objects, create a default structure
  const formattedEvents = equilibre.evenements.map((event, index) => {
    if (typeof event === 'string') {
      return {
        id: `event-${index}`,
        date: { year: equilibre.year, season: equilibre.season },
        description: event,
        impact: 'medium',
        type: 'political'
      };
    }
    return event;
  });

  return (
    <Table>
      <TableCaption>Événements récents affectant l'équilibre de la République</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[120px]">Date</TableHead>
          <TableHead>Description</TableHead>
          <TableHead className="w-[100px]">Impact</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {formattedEvents.length > 0 ? (
          formattedEvents.map((event, index) => (
            <TableRow key={`event-${index}`}>
              <TableCell className="font-medium">
                {typeof event === 'string' ? 
                  `${equilibre.season} ${equilibre.year}` : 
                  gameDateToString(event.date || { year: equilibre.year, season: equilibre.season })}
              </TableCell>
              <TableCell>{typeof event === 'string' ? event : event.description}</TableCell>
              <TableCell>
                <Badge 
                  variant="outline" 
                  className={
                    typeof event === 'string' ? 'bg-yellow-100 text-yellow-800' :
                    event.impact === 'high' ? 'bg-red-100 text-red-800' : 
                    event.impact === 'medium' ? 'bg-yellow-100 text-yellow-800' : 
                    'bg-green-100 text-green-800'
                  }
                >
                  {typeof event === 'string' ? 'Medium' : 
                   (event.impact || 'Medium')}
                </Badge>
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={3} className="text-center text-muted-foreground">
              Aucun événement récent
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
