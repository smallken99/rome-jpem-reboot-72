
import React from 'react';
import { MagistratureBureau } from '../MagistratureBureau';
import { magistracies } from '@/data/magistracies';
import { EdileFunctions } from '@/components/republique/functions/EdileFunctions';
import { BureauxNavigator } from '@/components/republique/BureauxNavigator';

export const EdileBureau: React.FC = () => {
  const edile = magistracies.find(m => m.id === 'edile');
  
  if (!edile) {
    return <div>Erreur: Magistrature introuvable</div>;
  }
  
  return (
    <div className="space-y-6">
      <BureauxNavigator currentBureau="edile" />
      <MagistratureBureau magistrate={edile}>
        <EdileFunctions />
      </MagistratureBureau>
    </div>
  );
};
