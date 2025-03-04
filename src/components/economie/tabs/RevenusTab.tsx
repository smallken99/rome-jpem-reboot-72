
import React from 'react';
import { RomanCard } from '@/components/ui-custom/RomanCard';
import { ResourcesTable } from '@/components/economie/ResourcesTable';
import { RevenueChart } from '@/components/economie/RevenueChart';

export const RevenusTab: React.FC = () => {
  return (
    <>
      <RomanCard className="mb-6">
        <RomanCard.Header>
          <h3 className="font-cinzel text-lg text-rome-navy">Revenus Détaillés</h3>
        </RomanCard.Header>
        <RomanCard.Content>
          <ResourcesTable />
        </RomanCard.Content>
      </RomanCard>
      
      <RomanCard className="mb-6">
        <RomanCard.Header>
          <h3 className="font-cinzel text-lg text-rome-navy">Tendances des Revenus</h3>
        </RomanCard.Header>
        <RomanCard.Content>
          <RevenueChart />
        </RomanCard.Content>
      </RomanCard>
    </>
  );
};
