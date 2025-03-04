
import React from 'react';
import { FamilyHeader } from '@/components/features/FamilyHeader';
import { FamilyStatsSection } from '@/components/features/FamilyStatsSection';
import { PoliticalPartyCard } from '@/components/features/PoliticalPartyCard';
import { MagistrateCard } from '@/components/features/MagistrateCard';
import { FamilyHeadCard } from '@/components/features/FamilyHeadCard';

export const DashboardLayout: React.FC = () => {
  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <FamilyHeader />
      <FamilyStatsSection />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PoliticalPartyCard />
        <MagistrateCard />
      </div>
      
      <FamilyHeadCard />
    </div>
  );
};
