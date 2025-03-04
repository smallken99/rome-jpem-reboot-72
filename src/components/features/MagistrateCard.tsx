
import React from 'react';
import { RomanCard } from '@/components/ui-custom/RomanCard';
import { FamilyStatistic } from '@/components/ui-custom/FamilyStatistic';
import { currentMagistracy } from '@/data/magistracies';

export const MagistrateCard: React.FC = () => {
  // Create icon element from the currentMagistracy.icon component
  const MagistrateIcon = currentMagistracy.icon;
  const magistrateIconElement = <MagistrateIcon className="h-6 w-6" />;
  
  return (
    <RomanCard className="bg-white/90 backdrop-blur-sm border border-rome-gold/30 hover:border-rome-gold/50 transition-all duration-300">
      <RomanCard.Header className="bg-gradient-to-r from-rome-terracotta/20 via-rome-terracotta/10 to-transparent border-b border-rome-gold/30">
        <h3 className="font-cinzel text-lg text-rome-navy">Magistrature actuelle</h3>
      </RomanCard.Header>
      <RomanCard.Content>
        <FamilyStatistic 
          icon={magistrateIconElement}
          title={`Marcus Aurelius Cotta - ${currentMagistracy.name}`}
          description={`${currentMagistracy.description} Son mandat prend fin en Mars ${new Date().getFullYear() + 1} AUC.`}
          iconBgColor={currentMagistracy.iconBgColor}
          iconColor={currentMagistracy.iconColor}
        />
      </RomanCard.Content>
    </RomanCard>
  );
};
