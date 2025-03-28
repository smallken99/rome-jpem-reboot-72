import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { formatGameDate } from '@/utils/dateUtils';
import { Loi } from '@/components/maitrejeu/types/lois';

// Define the TimelineItemProps interface
interface TimelineItemProps {
  title: string;
  content: React.ReactNode;
  date?: string | { year: number; season: string };
  status?: string;
  type?: string;
  description?: string;
}

const TimelineItem: React.FC<TimelineItemProps> = ({
  title,
  content,
  date,
  status,
  type,
}) => {
  return (
    <div className="flex mb-6">
      <div className="timeline-marker mr-4"></div>
      <div className="flex-1">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-medium">{title}</h3>
          {date && <span className="text-sm text-muted-foreground">
            {typeof date === 'string' ? date : `${date.year} - ${date.season}`}
          </span>}
        </div>
        <div className="text-sm mb-2">{content}</div>
        <Separator className="my-3" />
      </div>
    </div>
  );
};

interface LoiTimelineProps {
  loi: Loi;
}

export const LoiTimeline: React.FC<LoiTimelineProps> = ({ loi }) => {
  return (
    <div className="relative">
      <div className="timeline-line absolute left-4 top-0 h-full w-px bg-gray-300"></div>
      
      <TimelineItem
        title="Proposition"
        content={
          <>
            La loi a été proposée au Sénat.
            <br />
            <Badge variant="secondary" className="mt-2">
              {loi.catégorie}
            </Badge>
          </>
        }
        date={loi.dateProposition}
        status="proposée"
        type="proposition"
        description={loi.description}
      />
      
      {loi.statut === 'en_débat' && (
        <TimelineItem
          title="Débat"
          content="La loi est actuellement en discussion au Sénat."
          date={loi.dateProposition}
          status="en_débat"
          type="débat"
          description={loi.description}
        />
      )}
      
      {loi.statut === 'votée' && (
        <TimelineItem
          title="Vote"
          content={
            <>
              La loi a été soumise au vote du Sénat.
              <br />
              Résultat: Pour {loi.votesPositifs}, Contre {loi.votesNégatifs}, Abstention {loi.abstentions}
            </>
          }
          date={loi.date}
          status="votée"
          type="vote"
          description={loi.description}
        />
      )}
      
      {loi.statut === 'promulguée' && (
        <TimelineItem
          title="Promulgation"
          content="La loi a été officiellement promulguée et est désormais en vigueur."
          date={loi.date}
          status="promulguée"
          type="promulgation"
          description={loi.description}
        />
      )}
    </div>
  );
};
