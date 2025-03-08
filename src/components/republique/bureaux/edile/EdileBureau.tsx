
import React from 'react';
import { MagistratureBureau } from '../MagistratureBureau';
import { magistracies } from '@/data/magistracies';
import { EdileFunctions } from '@/components/republique/functions/EdileFunctions';

export const EdileBureau: React.FC = () => {
  const edile = magistracies.find(m => m.id === 'edile');
  
  if (!edile) {
    return <div>Erreur: Magistrature introuvable</div>;
  }
  
  return (
    <MagistratureBureau magistrate={edile}>
      <EdileFunctions />
    </MagistratureBureau>
  );
};
