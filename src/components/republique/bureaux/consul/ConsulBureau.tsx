
import React from 'react';
import { MagistratureBureau } from '../MagistratureBureau';
import { magistracies } from '@/data/magistracies';
import { ConsulFunctions } from '@/components/republique/functions/ConsulFunctions';

export const ConsulBureau: React.FC = () => {
  const consul = magistracies.find(m => m.id === 'consul');
  
  if (!consul) {
    return <div>Erreur: Magistrature introuvable</div>;
  }
  
  return (
    <MagistratureBureau magistrate={consul}>
      <ConsulFunctions />
    </MagistratureBureau>
  );
};
