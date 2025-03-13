
import React from 'react';
import { MagistratureBureau } from '../MagistratureBureau';
import { magistracies } from '@/data/magistracies';
import { CenseurFunctions } from '@/components/republique/functions/CenseurFunctions';
import { BureauxNavigator } from '@/components/republique/BureauxNavigator';

export const CenseurBureau: React.FC = () => {
  const censeur = magistracies.find(m => m.id === 'censeur');
  
  if (!censeur) {
    return <div>Erreur: Magistrature introuvable</div>;
  }
  
  return (
    <div className="space-y-6">
      <BureauxNavigator currentBureau="censeur" />
      <MagistratureBureau magistrate={censeur}>
        <CenseurFunctions />
      </MagistratureBureau>
    </div>
  );
};
