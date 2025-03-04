
import React from 'react';
import { RomanCard } from '@/components/ui-custom/RomanCard';
import { characters } from '@/data/characters';
import { CharacterSheet } from '@/components/famille/CharacterSheet';
import { Users } from 'lucide-react';

export const FamilyHeadCard: React.FC = () => {
  // Récupérer le chef de famille (premier personnage dans notre liste)
  const familyHead = characters.find(char => char.isPlayer) || characters[0];
  
  return (
    <RomanCard className="bg-white/90 backdrop-blur-sm border border-rome-gold/30 hover:border-rome-gold/50 transition-all duration-300">
      <RomanCard.Header className="bg-gradient-to-r from-rome-navy/20 via-rome-navy/10 to-transparent border-b border-rome-navy/30 flex items-center">
        <Users className="h-5 w-5 mr-2 text-rome-navy" />
        <h3 className="font-cinzel text-lg text-rome-navy">Chef de la Gens Aurelia</h3>
      </RomanCard.Header>
      <RomanCard.Content>
        <CharacterSheet character={familyHead} />
      </RomanCard.Content>
    </RomanCard>
  );
};
