
import React from 'react';
import { MagistratureBureau } from '../MagistratureBureau';
import { magistracies } from '@/data/magistracies';
import { CenseurFunctions } from '@/components/republique/functions/CenseurFunctions';

export const CenseurBureau: React.FC = () => {
  const censeur = magistracies.find(m => m.id === 'censeur');
  
  if (!censeur) {
    return <div>Erreur: Magistrature introuvable</div>;
  }
  
  return (
    <MagistratureBureau magistrate={censeur}>
      <CenseurFunctions />
    </MagistratureBureau>
  );
};
