
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { ChevronUp, ChevronDown, Minus } from 'lucide-react';
import { PoliticalEvent } from '@/components/maitrejeu/types/equilibre';

interface RecentEventsTableProps {
  events: PoliticalEvent[];
  formatDate: (date: Date) => string;
}

export const RecentEventsTable: React.FC<RecentEventsTableProps> = ({ events, formatDate }) => {
  const getImpactIcon = (value: number) => {
    if (value > 0) return <ChevronUp className="h-4 w-4 text-green-500" />;
    if (value < 0) return <ChevronDown className="h-4 w-4 text-red-500" />;
    return <Minus className="h-4 w-4 text-gray-400" />;
  };
  
  const getImpactLabel = (key: string, value: number) => {
    let label = '';
    
    switch (key) {
      case 'populares':
        label = 'Populares';
        break;
      case 'optimates':
        label = 'Optimates';
        break;
      case 'armée':
        label = 'Armée';
        break;
      case 'morale':
        label = 'Morale';
        break;
      case 'plébéiens':
        label = 'Plébéiens';
        break;
      case 'patriciens':
        label = 'Patriciens';
        break;
      default:
        label = key.charAt(0).toUpperCase() + key.slice(1);
    }
    
    return (
      <Badge variant="outline" className="flex items-center gap-1">
        {label}
        <span className="flex items-center">
          {getImpactIcon(value)}
          {Math.abs(value)}
        </span>
      </Badge>
    );
  };

  // Fonction pour gérer différents formats de date  
  const formatEventDate = (date: Date | { year: number; season: string } | undefined): string => {
    if (!date) return 'Date inconnue';
    if (date instanceof Date) return formatDate(date);
    
    // Gérer le format { year, season }
    return `${date.season} ${date.year}`;
  };
  
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Événement</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Impact</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {events.length === 0 ? (
          <TableRow>
            <TableCell colSpan={3} className="text-center">
              Aucun événement récent enregistré.
            </TableCell>
          </TableRow>
        ) : (
          events.map((event) => (
            <TableRow key={event.id}>
              <TableCell className="font-medium text-sm">{event.title || event.name}</TableCell>
              <TableCell>{formatEventDate(event.date)}</TableCell>
              <TableCell>
                <div className="flex flex-wrap gap-1">
                  {event.impact && Object.entries(event.impact).map(([key, value]) => (
                    <div key={key} className="mb-1">
                      {getImpactLabel(key, Number(value))}
                    </div>
                  ))}
                </div>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
};
