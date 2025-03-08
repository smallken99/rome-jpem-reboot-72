
import React from 'react';
import { PageHeader } from '@/components/ui-custom/PageHeader';
import { RomanCard } from '@/components/ui-custom/RomanCard';

export const TemplesPage: React.FC = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader title="Temples de Rome" subtitle="Édifices sacrés de la République" />
      <RomanCard>
        <RomanCard.Content>
          <p>Contenu des temples en construction...</p>
        </RomanCard.Content>
      </RomanCard>
    </div>
  );
};
