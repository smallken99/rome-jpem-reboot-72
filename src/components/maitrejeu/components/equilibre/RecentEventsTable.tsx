
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { CalendarDays, Flag, Info, AlertTriangle, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PoliticalEvent } from '../../types/equilibre';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { gameDateToString } from '../lois/utils/dateConverter';

interface RecentEventsTableProps {
  events: PoliticalEvent[];
  formatDate: (date: any) => string;
}

export const RecentEventsTable: React.FC<RecentEventsTableProps> = ({ events, formatDate }) => {
  // Sort events by date (most recent first)
  const sortedEvents = [...events].sort((a, b) => {
    // Handle different date formats
    const dateA = typeof a.date === 'string' ? new Date(a.date) : 
      ('year' in a.date ? new Date(a.date.year, getSeasonMonth(a.date.season)) : new Date());
    
    const dateB = typeof b.date === 'string' ? new Date(b.date) : 
      ('year' in b.date ? new Date(b.date.year, getSeasonMonth(b.date.season)) : new Date());
    
    return dateB.getTime() - dateA.getTime();
  });

  // Helper function to convert season to month number (0-based)
  function getSeasonMonth(season: string): number {
    switch (season.toLowerCase()) {
      case 'spring':
      case 'printemps':
      case 'ver':
        return 2; // March
      case 'summer':
      case 'été':
      case 'aestas':
        return 5; // June
      case 'fall':
      case 'autumn':
      case 'automne':
      case 'autumnus':
        return 8; // September
      case 'winter':
      case 'hiver':
      case 'hiems':
        return 11; // December
      default:
        return 0; // January
    }
  }

  // Function to get severity icon and color
  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case 'low':
        return { icon: <Info className="h-4 w-4" />, color: "bg-blue-100 text-blue-800" };
      case 'medium':
        return { icon: <Flag className="h-4 w-4" />, color: "bg-yellow-100 text-yellow-800" };
      case 'high':
        return { icon: <AlertTriangle className="h-4 w-4" />, color: "bg-orange-100 text-orange-800" };
      case 'critical':
        return { icon: <AlertCircle className="h-4 w-4" />, color: "bg-red-100 text-red-800" };
      default:
        return { icon: <Info className="h-4 w-4" />, color: "bg-gray-100 text-gray-800" };
    }
  };

  const formatEventDate = (date: string | { year: number; season: string }) => {
    if (typeof date === 'string') {
      return formatDate(date);
    } else {
      return gameDateToString(date);
    }
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Sévérité</TableHead>
            <TableHead>Événement</TableHead>
            <TableHead className="w-[120px]">Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedEvents.length > 0 ? (
            sortedEvents.map((event) => {
              const { icon, color } = getSeverityBadge(event.severity);
              
              return (
                <TableRow key={event.id}>
                  <TableCell>
                    <Badge variant="outline" className={`${color} flex items-center gap-1`}>
                      {icon}
                      <span className="capitalize">{event.severity}</span>
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div className="font-medium">{event.title}</div>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="max-w-xs">{event.description}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </TableCell>
                  <TableCell className="flex items-center gap-1 text-muted-foreground">
                    <CalendarDays className="h-4 w-4" />
                    {formatEventDate(event.date)}
                  </TableCell>
                </TableRow>
              );
            })
          ) : (
            <TableRow>
              <TableCell colSpan={3} className="text-center py-6 text-muted-foreground">
                Aucun événement récent
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default RecentEventsTable;
