
import React from 'react';
import { MagistratureBureau } from '../MagistratureBureau';
import { magistracies } from '@/data/magistracies';
import { PreteurFunctions } from '@/components/republique/functions/PreteurFunctions';
import { BureauxNavigator } from '@/components/republique/BureauxNavigator';

export const PreteurBureau: React.FC = () => {
  const preteur = magistracies.find(m => m.id === 'preteur');
  
  if (!preteur) {
    return <div>Erreur: Magistrature introuvable</div>;
  }
  
  return (
    <div className="space-y-6">
      <BureauxNavigator currentBureau="preteur" />
      <MagistratureBureau magistrate={preteur}>
        <PreteurFunctions />
      </MagistratureBureau>
    </div>
  );
};
