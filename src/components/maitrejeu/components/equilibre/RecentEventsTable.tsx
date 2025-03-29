
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
import { Button } from '@/components/ui/button';
import { Eye, Flag, AlertTriangle, Shield } from 'lucide-react';
import { RecentEventsTableProps, GameDate } from '../../types/equilibre';

const getSeverityColor = (severity: string) => {
  switch (severity.toLowerCase()) {
    case 'low':
      return 'bg-green-100 text-green-800 hover:bg-green-200';
    case 'medium':
      return 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200';
    case 'high':
      return 'bg-orange-100 text-orange-800 hover:bg-orange-200';
    case 'critical':
      return 'bg-red-100 text-red-800 hover:bg-red-200';
    default:
      return 'bg-gray-100 text-gray-800 hover:bg-gray-200';
  }
};

const getEventTypeIcon = (type: string) => {
  switch (type.toLowerCase()) {
    case 'political':
      return <Flag className="h-4 w-4" />;
    case 'military':
      return <Shield className="h-4 w-4" />;
    case 'disaster':
      return <AlertTriangle className="h-4 w-4" />;
    default:
      return null;
  }
};

const formatEventDate = (date: GameDate | string | Date): string => {
  if (!date) return 'Unknown';
  
  if (typeof date === 'string') {
    try {
      return new Date(date).toLocaleDateString();
    } catch (e) {
      return date;
    }
  }
  
  if (date instanceof Date) {
    return date.toLocaleDateString();
  }
  
  return `${date.season}, Year ${date.year}`;
};

const RecentEventsTable: React.FC<RecentEventsTableProps> = ({ events, formatDate }) => {
  return (
    <Table>
      <TableCaption>Événements récents affectant la République</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Date</TableHead>
          <TableHead>Événement</TableHead>
          <TableHead>Sévérité</TableHead>
          <TableHead className="text-right">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {events.length > 0 ? (
          events.map((event) => (
            <TableRow key={event.id}>
              <TableCell className="font-medium">
                {formatDate ? formatDate(event.date) : formatEventDate(event.date)}
              </TableCell>
              <TableCell>
                <div className="flex items-center space-x-2">
                  {getEventTypeIcon(event.type)}
                  <span>{event.title || event.description}</span>
                </div>
              </TableCell>
              <TableCell>
                <Badge className={getSeverityColor(event.severity)}>
                  {event.severity}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <Button variant="ghost" size="sm">
                  <Eye className="mr-2 h-4 w-4" />
                  Détails
                </Button>
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={4} className="text-center py-6 text-muted-foreground">
              Aucun événement récent à afficher
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default RecentEventsTable;
