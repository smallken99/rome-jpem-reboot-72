
import React from 'react';
import { Card } from '@/components/ui/card';
import { formatDate } from '@/utils/dateUtils';
import { Loi } from '@/components/maitrejeu/types/lois';
import { Badge } from '@/components/ui/badge';

interface LoiTimelineProps {
  lois: Loi[];
}

export const LoiTimeline: React.FC<LoiTimelineProps> = ({ lois }) => {
  const formatGameDate = (date: any) => {
    if (!date) return 'Date inconnue';
    if (typeof date === 'string') return date;
    return `An ${date.year}, ${date.season}`;
  };
  
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'proposed':
      case 'proposée':
        return 'bg-blue-100 text-blue-800';
      case 'voted':
      case 'votée':
        return 'bg-green-100 text-green-800';
      case 'rejected':
      case 'rejetée':
        return 'bg-red-100 text-red-800';
      case 'implemented':
      case 'implémentée':
      case 'promulguée':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (!lois || lois.length === 0) {
    return <div className="text-center py-6 text-muted-foreground">Aucune loi à afficher</div>;
  }

  return (
    <div className="space-y-4">
      {lois.map((loi, index) => (
        <Card key={loi.id || index} className="p-4 relative overflow-hidden border-l-4 border-l-primary">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-medium">{loi.titre}</h3>
              <p className="text-sm text-muted-foreground mt-1">
                {loi.description.substring(0, 100)}
                {loi.description.length > 100 ? '...' : ''}
              </p>
            </div>
            <Badge className={getStatusColor(loi.état)}>
              {loi.état}
            </Badge>
          </div>
          
          <div className="flex justify-between items-center mt-3 text-xs text-muted-foreground">
            <div>
              Proposé par: <span className="font-medium">{loi.proposeur}</span>
            </div>
            <div>
              {formatGameDate(loi.date)}
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};
