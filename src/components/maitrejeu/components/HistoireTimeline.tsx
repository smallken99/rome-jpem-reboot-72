import React from 'react';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { formatGameDate } from '../types/common';
import { HistoireEntry } from '../types/histoire';
import { ScrollArea } from '@/components/ui/scroll-area';

interface HistoireTimelineProps {
  entries: HistoireEntry[];
  onEdit?: (entry: HistoireEntry) => void;
  onDelete?: (id: string) => void;
  viewMode?: 'full' | 'compact';
}

export const HistoireTimeline: React.FC<HistoireTimelineProps> = ({ 
  entries, 
  onEdit, 
  onDelete, 
  viewMode = 'full' 
}) => {
  // Sort entries chronologically
  const sortedEntries = [...entries].sort((a, b) => {
    if (a.date.year !== b.date.year) {
      return b.date.year - a.date.year; // Latest year first
    }
    
    // If years are the same, compare by seasons
    const seasonOrder = { 'Ver': 0, 'Aestas': 1, 'Autumnus': 2, 'Hiems': 3 };
    const seasonA = typeof a.date.season === 'string' ? a.date.season : 'Ver';
    const seasonB = typeof b.date.season === 'string' ? b.date.season : 'Ver';
    
    return seasonOrder[seasonB as keyof typeof seasonOrder] - seasonOrder[seasonA as keyof typeof seasonOrder];
  });

  const getImportanceBadge = (importance: string) => {
    switch(importance.toLowerCase()) {
      case 'critique':
      case 'critical':
        return 'destructive';
      case 'majeur':
      case 'major':
        return 'destructive';
      case 'standard':
        return 'secondary';
      case 'mineur':
      case 'minor':
        return 'outline';
      default:
        return 'secondary';
    }
  };

  const renderPeople = (entry: HistoireEntry) => {
    if (!entry.personnesImpliquées || entry.personnesImpliquées.length === 0) {
      return null;
    }
    
    return (
      <div className="mb-2">
        <strong>Personnes impliquées : </strong>
        {entry.personnesImpliquées.join(', ')}
      </div>
    );
  };
  
  const renderAuthor = (entry: HistoireEntry) => {
    if (!entry.auteur) {
      return null;
    }
    
    return (
      <div className="text-sm text-muted-foreground mt-2">
        Écrit par <em>{entry.auteur}</em>
      </div>
    );
  };

  return (
    <Card className={viewMode === 'compact' ? 'h-[500px]' : ''}>
      <CardHeader>
        <CardTitle>Chroniques de la République</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className={viewMode === 'compact' ? 'h-[400px] pr-4' : ''}>
          <VerticalTimeline layout={viewMode === 'compact' ? '1-column-left' : '2-columns'} lineColor="#888">
            {sortedEntries.map((entry) => (
              <VerticalTimelineElement
                key={entry.id}
                className="vertical-timeline-element--work"
                contentStyle={{ background: 'var(--background)', borderTop: '3px solid var(--primary)' }}
                contentArrowStyle={{ borderRight: '7px solid var(--primary)' }}
                date={formatGameDate(entry.date)}
                iconStyle={{ background: 'var(--primary)', color: '#fff' }}
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="vertical-timeline-element-title text-xl font-semibold">
                    {entry.titre}
                  </h3>
                  <Badge variant={getImportanceBadge(entry.importanceLevel)}>
                    {entry.importanceLevel}
                  </Badge>
                </div>
                
                <Badge className="mb-2" variant="outline">{entry.type}</Badge>
                
                <p className="mb-3 vertical-timeline-element-subtitle">
                  {entry.contenu}
                </p>
                
                {renderPeople(entry)}
                
                {entry.tags && entry.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-3">
                    {entry.tags.map((tag, idx) => (
                      <Badge key={idx} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}
                
                {renderAuthor(entry)}
                
                {(onEdit || onDelete) && (
                  <div className="flex justify-end gap-2 mt-4">
                    {onEdit && (
                      <Button size="sm" variant="outline" onClick={() => onEdit(entry)}>
                        Modifier
                      </Button>
                    )}
                    {onDelete && (
                      <Button size="sm" variant="destructive" onClick={() => onDelete(entry.id)}>
                        Supprimer
                      </Button>
                    )}
                  </div>
                )}
              </VerticalTimelineElement>
            ))}
          </VerticalTimeline>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};
