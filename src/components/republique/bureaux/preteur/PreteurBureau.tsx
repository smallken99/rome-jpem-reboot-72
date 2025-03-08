
import React from 'react';
import { MagistratureBureau } from '../MagistratureBureau';
import { magistracies } from '@/data/magistracies';
import { PreteurFunctions } from '@/components/republique/functions/PreteurFunctions';

export const PreteurBureau: React.FC = () => {
  const preteur = magistracies.find(m => m.id === 'preteur');
  
  if (!preteur) {
    return <div>Erreur: Magistrature introuvable</div>;
  }
  
  return (
    <MagistratureBureau magistrate={preteur}>
      <PreteurFunctions />
    </MagistratureBureau>
  );
};
