
import React from 'react';
import { MagistratureBureau } from '../MagistratureBureau';
import { magistracies } from '@/data/magistracies';
import { QuesteurFunctions } from '@/components/republique/functions/QuesteurFunctions';
import { BureauxNavigator } from '@/components/republique/BureauxNavigator';

export const QuesteurBureau: React.FC = () => {
  const questeur = magistracies.find(m => m.id === 'questeur');
  
  if (!questeur) {
    return <div>Erreur: Magistrature introuvable</div>;
  }
  
  return (
    <div className="space-y-6">
      <BureauxNavigator currentBureau="questeur" />
      <MagistratureBureau magistrate={questeur}>
        <QuesteurFunctions />
      </MagistratureBureau>
    </div>
  );
};
