
import React from 'react';
import { PageHeader } from '@/components/ui-custom/PageHeader';
import { useGameTime } from '@/hooks/useGameTime';

export const FamilyHeader: React.FC = () => {
  // Get current year from the time system
  const { year } = useGameTime();
  
  return (
    <div className="bg-gradient-to-r from-rome-navy/10 to-transparent p-6 rounded-lg border border-rome-gold/20">
      <PageHeader 
        title="Gens Aurelia" 
        subtitle={`Status: Patricien - Ancienneté: 293 AUC (depuis ${year-293} AUC)`} 
      />
    </div>
  );
};
