
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle, ScrollText, Calendar } from 'lucide-react';
import { Loi } from '../../types/lois';
import { formatSeasonDisplay } from '@/utils/timeSystem';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

interface LoiTimelineProps {
  lois: Loi[];
}

export const LoiTimeline: React.FC<LoiTimelineProps> = ({ lois }) => {
  // Fonction pour générer les événements de la timeline
  const generateTimelineEvents = (loi: Loi) => {
    const events = [
      {
        date: loi.dateProposition,
        title: 'Proposition',
        description: `Loi proposée par ${loi.proposeur}`,
        icon: <ScrollText className="h-4 w-4" />,
        status: 'proposée'
      }
    ];
    
    // Si la loi a été votée, ajouter l'événement
    if (loi.état === 'adoptée' || loi.état === 'Promulguée') {
      events.push({
        date: loi.date, // Date de vote
        title: 'Adoption',
        description: `La loi a été adoptée par le Sénat (${loi.votesPositifs} pour, ${loi.votesNégatifs} contre)`,
        icon: <CheckCircle className="h-4 w-4" />,
        status: 'adoptée'
      });
    } else if (loi.état === 'rejetée' || loi.état === 'Rejetée') {
      events.push({
        date: loi.date, // Date de vote
        title: 'Rejet',
        description: `La loi a été rejetée par le Sénat (${loi.votesPositifs} pour, ${loi.votesNégatifs} contre)`,
        icon: <XCircle className="h-4 w-4" />,
        status: 'rejetée'
      });
    }
    
    // Si la loi a été promulguée, ajouter l'événement
    if (loi.état === 'Promulguée') {
      events.push({
        date: { ...loi.date, season: loi.date.season }, // Date de promulgation
        title: 'Promulgation',
        description: 'La loi a été promulguée et est entrée en vigueur',
        icon: <Calendar className="h-4 w-4" />,
        status: 'Promulguée'
      });
    }
    
    return events;
  };
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'proposée': return 'bg-blue-100 text-blue-800';
      case 'adoptée': return 'bg-green-100 text-green-800';
      case 'rejetée': return 'bg-red-100 text-red-800';
      case 'Promulguée': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };
  
  const formatDate = (date: { year: number; season: string }) => {
    return `An ${date.year}, ${formatSeasonDisplay(date.season)}`;
  };
  
  // Fusionner les événements de toutes les lois
  const allEvents = lois.flatMap(loi => generateTimelineEvents(loi));
  
  return (
    <div className="relative space-y-6 before:absolute before:inset-0 before:left-3 before:h-full before:w-0.5 before:bg-muted pl-10">
      {allEvents.map((event, index) => (
        <div key={index} className="relative">
          <span className="absolute -left-7 flex h-6 w-6 items-center justify-center rounded-full bg-muted ring-8 ring-background">
            {event.icon}
          </span>
          
          <div className="flex flex-col space-y-2">
            <Badge 
              className={`self-start ${getStatusColor(event.status)}`}
              variant="outline"
            >
              {event.title}
            </Badge>
            
            <h6 className="text-sm font-medium">{formatDate(event.date)}</h6>
            <p className="text-sm text-muted-foreground">{event.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};
