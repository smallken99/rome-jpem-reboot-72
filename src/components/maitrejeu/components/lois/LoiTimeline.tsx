
import React from 'react';
import { Timeline, TimelineItem } from '@/components/ui/timeline';
import { formatDate } from '@/utils/dateUtils';
import { Loi } from '@/components/maitrejeu/types/lois';

export interface LoiTimelineProps {
  loi: Loi;
  lois?: Loi[];
}

export interface TimelineItemProps {
  title: string;
  content?: React.ReactNode;
  date?: { year: number; season: string } | string;
  description?: string;
}

export const LoiTimeline: React.FC<LoiTimelineProps> = ({ loi, lois }) => {
  const items: TimelineItemProps[] = [];
  const loiItems = lois || (loi ? [loi] : []);
  
  if (loiItems.length === 0) {
    return <div>Aucune loi à afficher</div>;
  }
  
  // Combine all timeline events from all laws
  loiItems.forEach(currentLoi => {
    // Proposition event
    items.push({
      title: "Proposition",
      content: 
        <div>
          <p className="text-sm">{currentLoi.description}</p>
          <p className="text-xs text-muted-foreground">Par: {currentLoi.proposeur}</p>
        </div>,
      date: currentLoi.dateProposition || currentLoi.date,
      description: `Loi proposée par ${currentLoi.proposeur}`
    });
    
    // Implementation event if implemented
    if (currentLoi.état === "implemented" || currentLoi.status === "implemented") {
      items.push({
        title: "Mise en application",
        content: <p className="text-sm">La loi a été votée et mise en application</p>,
        date: currentLoi.implementationDate || currentLoi.date,
        description: "Loi mise en application"
      });
    }
    
    // Rejection event if rejected
    if (currentLoi.état === "rejected" || currentLoi.status === "rejected") {
      items.push({
        title: "Rejet",
        content: <p className="text-sm">La loi a été rejetée par le Sénat</p>,
        date: currentLoi.date,
        description: "Loi rejetée"
      });
    }
  });
  
  // Sort items by date
  items.sort((a, b) => {
    if (!a.date || !b.date) return 0;
    if (typeof a.date === 'string' && typeof b.date === 'string') {
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    }
    if (typeof a.date === 'object' && typeof b.date === 'object') {
      return a.date.year === b.date.year 
        ? (a.date.season > b.date.season ? 1 : -1) 
        : (a.date.year - b.date.year);
    }
    return 0;
  });
  
  return (
    <Timeline>
      {items.map((item, index) => (
        <TimelineItem 
          key={index}
          title={item.title}
          content={item.content}
          date={
            item.date 
              ? (typeof item.date === 'string' 
                  ? item.date 
                  : `Année ${item.date.year}, ${item.date.season}`)
              : undefined
          }
        />
      ))}
    </Timeline>
  );
};
