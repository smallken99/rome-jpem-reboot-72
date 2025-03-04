
import React from 'react';
import { RomanCard } from '@/components/ui-custom/RomanCard';
import { AllianceItem } from '@/components/features/AllianceItem';
import { familyAlliances } from '@/data/alliances';

export const AlliancesCard: React.FC = () => {
  // Only get matrimonial alliances
  const marriageAlliances = familyAlliances.filter(alliance => alliance.type === 'matrimoniale');

  return (
    <RomanCard className="bg-white/90 backdrop-blur-sm border border-rome-gold/30 hover:border-rome-gold/50 transition-all duration-300">
      <RomanCard.Header className="bg-gradient-to-r from-rome-gold/20 via-rome-gold/10 to-transparent border-b border-rome-gold/30">
        <h3 className="font-cinzel text-lg text-rome-navy">Alliances matrimoniales de la Gens</h3>
      </RomanCard.Header>
      <RomanCard.Content>
        <div className="space-y-2">
          {marriageAlliances.map((alliance, index) => (
            <AllianceItem 
              key={alliance.id || index}
              name={alliance.name}
              type={alliance.type}
              status={alliance.status}
              benefits={alliance.benefits}
            />
          ))}
        </div>
        <div className="mt-6 text-center">
          <button className="roman-btn-outline text-sm hover:bg-rome-terracotta/10 transition-colors">Gérer les alliances</button>
        </div>
      </RomanCard.Content>
    </RomanCard>
  );
};
