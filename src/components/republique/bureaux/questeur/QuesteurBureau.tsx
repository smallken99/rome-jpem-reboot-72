
import React from 'react';
import { MagistratureBureau } from '../MagistratureBureau';
import { magistracies } from '@/data/magistracies';
import { QuesteurFunctions } from '@/components/republique/functions/QuesteurFunctions';

export const QuesteurBureau: React.FC = () => {
  const questeur = magistracies.find(m => m.id === 'questeur');
  
  if (!questeur) {
    return <div>Erreur: Magistrature introuvable</div>;
  }
  
  return (
    <MagistratureBureau magistrate={questeur}>
      <QuesteurFunctions />
    </MagistratureBureau>
  );
};
