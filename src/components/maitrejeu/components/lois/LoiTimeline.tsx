
import React from 'react';
import { Timeline, TimelineItem, TimelineItemProps } from '@/components/ui/timeline';
import { Badge } from '@/components/ui/badge';
import { GavelIcon, FileTextIcon, CheckIcon, XIcon } from 'lucide-react';
import { Loi } from '../../types/lois';
import { formatAnyGameDate, ensureGameDate } from './utils/dateHelpers';

interface LoiTimelineProps {
  lois: Loi[];
}

export const LoiTimeline: React.FC<LoiTimelineProps> = ({ lois }) => {
  // Sort lois by date
  const sortedLois = [...lois].sort((a, b) => {
    const dateA = ensureGameDate(a.date);
    const dateB = ensureGameDate(b.date);
    
    if (dateA.year !== dateB.year) {
      return dateA.year - dateB.year;
    }
    
    const seasons = ['SPRING', 'SUMMER', 'AUTUMN', 'WINTER', 'Ver', 'Aestas', 'Autumnus', 'Hiems'];
    const seasonA = seasons.indexOf(dateA.season);
    const seasonB = seasons.indexOf(dateB.season);
    
    return seasonA - seasonB;
  });
  
  // Generate timeline items
  const timelineItems: TimelineItemProps[] = [];
  
  sortedLois.forEach(loi => {
    // Add law creation event
    timelineItems.push({
      title: `Proposition de loi : ${loi.titre || loi.title || ''}`,
      description: loi.description ? (loi.description.substring(0, 100) + (loi.description.length > 100 ? '...' : '')) : '',
      date: formatAnyGameDate(loi.dateProposition || loi.date),
      icon: <FileTextIcon className="h-4 w-4" />,
      badge: <Badge variant="outline">{loi.catégorie || loi.category || ''}</Badge>
    });
    
    // If the law is active or rejected, add that event
    const status = loi.status || loi.état || loi.statut || '';
    
    if (status === 'active' || status === 'Promulguée' || status === 'adoptée' || status === 'promulguée') {
      timelineItems.push({
        title: `Loi adoptée : ${loi.titre || loi.title || ''}`,
        description: `Cette loi a été promulguée avec ${loi.votesPositifs || loi.votesFor || (loi.votes?.pour || 0)} voix pour et ${loi.votesNégatifs || loi.votesAgainst || (loi.votes?.contre || 0)} voix contre.`,
        date: formatAnyGameDate(loi.implementationDate || loi.date),
        icon: <CheckIcon className="h-4 w-4" />,
        badge: <Badge variant="success">Promulguée</Badge>
      });
    } else if (status === 'rejected' || status === 'Rejetée' || status === 'rejetée') {
      timelineItems.push({
        title: `Loi rejetée : ${loi.titre || loi.title || ''}`,
        description: `Cette loi a été rejetée avec ${loi.votesNégatifs || loi.votesAgainst || (loi.votes?.contre || 0)} voix contre et ${loi.votesPositifs || loi.votesFor || (loi.votes?.pour || 0)} voix pour.`,
        date: formatAnyGameDate(loi.date),
        icon: <XIcon className="h-4 w-4" />,
        badge: <Badge variant="destructive">Rejetée</Badge>
      });
    }
  });
  
  // Sort all timeline items by date
  timelineItems.sort((a, b) => {
    if (!a.date || !b.date) return 0;
    return String(a.date).localeCompare(String(b.date));
  });
  
  return (
    <div className="space-y-4">
      {timelineItems.length > 0 ? (
        <Timeline items={timelineItems} />
      ) : (
        <div className="text-center py-8 text-muted-foreground">
          Aucun événement législatif à afficher
        </div>
      )}
    </div>
  );
};
