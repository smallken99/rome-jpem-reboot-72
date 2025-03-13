
import React from 'react';
import { MagistratureBureau } from '../MagistratureBureau';
import { magistracies } from '@/data/magistracies';
import { ConsulFunctions } from '@/components/republique/functions/ConsulFunctions';
import { BureauxNavigator } from '@/components/republique/BureauxNavigator';

export const ConsulBureau: React.FC = () => {
  const consul = magistracies.find(m => m.id === 'consul');
  
  if (!consul) {
    return <div>Erreur: Magistrature introuvable</div>;
  }
  
  return (
    <div className="space-y-6">
      <BureauxNavigator currentBureau="consul" />
      <MagistratureBureau magistrate={consul}>
        <ConsulFunctions />
      </MagistratureBureau>
    </div>
  );
};
