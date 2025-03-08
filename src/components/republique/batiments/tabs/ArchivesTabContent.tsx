
import React from 'react';
import { RomanCard } from '@/components/ui-custom/RomanCard';
import { Archive } from 'lucide-react';

export const ArchivesTabContent: React.FC = () => {
  return (
    <RomanCard>
      <RomanCard.Header>
        <h2 className="font-cinzel text-lg">Archives des constructions</h2>
      </RomanCard.Header>
      <RomanCard.Content>
        <p className="text-muted-foreground mb-4">
          L'histoire architecturale de Rome s'étend sur des siècles. 
          Consultez ici les archives des constructions passées et leur impact sur la République.
        </p>
        <div className="flex flex-col items-center justify-center p-8 text-center">
          <Archive className="h-16 w-16 text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium mb-2">Archives en construction</h3>
          <p className="text-muted-foreground">
            Cette section est en cours de développement. Les archives seront bientôt disponibles.
          </p>
        </div>
      </RomanCard.Content>
    </RomanCard>
  );
};
