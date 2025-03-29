
import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from '@/components/ui/badge';
import { RecentEventsTableProps } from '@/components/maitrejeu/types/equilibre';

const RecentEventsTable: React.FC<RecentEventsTableProps> = ({ events, formatDate }) => {
  if (!events || events.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        <p>Aucun événement récent n'a été enregistré.</p>
      </div>
    );
  }
  
  const getImpactType = (event: any) => {
    const impact = event.impact || {};
    
    if (impact.political && impact.political > 0) return { type: 'Politique', value: impact.political };
    if (impact.social && impact.social > 0) return { type: 'Social', value: impact.social };
    if (impact.economic && impact.economic > 0) return { type: 'Économique', value: impact.economic };
    if (impact.stability && impact.stability > 0) return { type: 'Stabilité', value: impact.stability };
    
    return { type: 'Divers', value: 0 };
  };
  
  const getImpactBadge = (event: any) => {
    const { type, value } = getImpactType(event);
    
    let variant = 'secondary';
    if (type === 'Politique') variant = 'default';
    if (type === 'Social') variant = 'outline';
    if (type === 'Économique') variant = 'destructive';
    if (type === 'Stabilité') variant = 'secondary';
    
    return (
      <Badge variant={variant as any}>
        {type} {value > 0 ? `+${value}` : value}
      </Badge>
    );
  };
  
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Date</TableHead>
          <TableHead>Événement</TableHead>
          <TableHead>Impact</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {events.map((event, index) => (
          <TableRow key={index}>
            <TableCell className="font-medium">{formatDate(event.date)}</TableCell>
            <TableCell>{event.event}</TableCell>
            <TableCell>{getImpactBadge(event)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default RecentEventsTable;
