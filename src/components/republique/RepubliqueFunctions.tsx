
import React from 'react';
import { RomanCard } from '@/components/ui-custom/RomanCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { QuesteurFunctions } from '@/components/republique/functions/QuesteurFunctions';
import { EdileFunctions } from '@/components/republique/functions/EdileFunctions';
import { PreteurFunctions } from '@/components/republique/functions/PreteurFunctions';
import { ConsulFunctions } from '@/components/republique/functions/ConsulFunctions';
import { CenseurFunctions } from '@/components/republique/functions/CenseurFunctions';
import { currentMagistracy } from '@/data/magistracies';

export const RepubliqueFunctions: React.FC = () => {
  // Détermine les fonctions disponibles selon la magistrature actuelle
  const getMagistrateFunctions = () => {
    switch (currentMagistracy.id) {
      case 'questeur':
        return <QuesteurFunctions />;
      case 'edile':
        return <EdileFunctions />;
      case 'preteur':
        return <PreteurFunctions />;
      case 'consul':
        return <ConsulFunctions />;
      case 'censeur':
        return <CenseurFunctions />;
      default:
        return (
          <div className="p-6 text-center text-muted-foreground">
            <p>Vous n'occupez actuellement aucune magistrature.</p>
          </div>
        );
    }
  };

  return (
    <RomanCard>
      <RomanCard.Header>
        <h2 className="font-cinzel text-lg">Fonctions Disponibles</h2>
      </RomanCard.Header>
      <RomanCard.Content>
        {getMagistrateFunctions()}
      </RomanCard.Content>
    </RomanCard>
  );
};
