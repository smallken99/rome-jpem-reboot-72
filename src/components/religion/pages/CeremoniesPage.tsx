
import React from 'react';
import { PageHeader } from '@/components/ui-custom/PageHeader';
import { RomanCard } from '@/components/ui-custom/RomanCard';

export const CeremoniesPage: React.FC = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader title="Cérémonies religieuses" subtitle="Rites et célébrations de Rome" />
      <RomanCard>
        <RomanCard.Content>
          <p>Contenu des cérémonies en construction...</p>
        </RomanCard.Content>
      </RomanCard>
    </div>
  );
};
