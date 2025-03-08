
import React from 'react';
import { PageHeader } from '@/components/ui-custom/PageHeader';
import { RomanCard } from '@/components/ui-custom/RomanCard';
import { useCeremonies } from '../ceremonies/hooks/useCeremonies';
import { FeaturedCeremonies } from '../ceremonies/components/FeaturedCeremonies';
import { CeremonyTable } from '../ceremonies/components/CeremonyTable';

export const CeremoniesPage: React.FC = () => {
  const { ceremonies } = useCeremonies();
  
  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader title="Cérémonies religieuses" subtitle="Rites et célébrations de Rome" />
      
      <FeaturedCeremonies ceremonies={ceremonies} />
      
      <RomanCard>
        <RomanCard.Header>
          <h3 className="font-cinzel text-lg">Calendrier des cérémonies</h3>
        </RomanCard.Header>
        <RomanCard.Content>
          <CeremonyTable ceremonies={ceremonies} />
        </RomanCard.Content>
      </RomanCard>
    </div>
  );
};
