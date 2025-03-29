
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
import { HistoriqueEntry } from '@/components/maitrejeu/types/equilibre';
import { gameDateToString } from '@/components/maitrejeu/components/lois/utils/dateConverter';

interface RecentEventsTableProps {
  events: HistoriqueEntry[];
}

const RecentEventsTable: React.FC<RecentEventsTableProps> = ({ events }) => {
  if (!events || events.length === 0) {
    return (
      <div className="text-center py-4 text-muted-foreground">
        Aucun événement récent
      </div>
    );
  }

  return (
    <div className="border rounded-md overflow-hidden">
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
          {events.map((event) => (
            <TableRow key={event.id}>
              <TableCell>{gameDateToString(event.date)}</TableCell>
              <TableCell>{event.event}</TableCell>
              <TableCell>
                <Badge 
                  variant={
                    event.type === 'politique' ? 'default' : 
                    event.type === 'social' ? 'secondary' : 
                    event.type === 'militaire' ? 'destructive' : 
                    'outline'
                  }
                >
                  {event.type}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <span className={
                  event.impact > 0 ? 'text-green-500' : 
                  event.impact < 0 ? 'text-red-500' : 
                  'text-gray-500'
                }>
                  {event.impact > 0 ? '+' : ''}{event.impact}
                </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default RecentEventsTable;
