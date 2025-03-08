
import React from 'react';
import { PageHeader } from '@/components/ui-custom/PageHeader';
import { RomanCard } from '@/components/ui-custom/RomanCard';

export const AuguresPage: React.FC = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader title="Collège des Augures" subtitle="Interprètes des signes divins" />
      <RomanCard>
        <RomanCard.Content>
          <p>Contenu des augures en construction...</p>
        </RomanCard.Content>
      </RomanCard>
    </div>
  );
};
