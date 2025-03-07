
import React from 'react';
import { Card } from '@/components/ui/card';
import { RomanCard } from '@/components/ui-custom/RomanCard';
import { PageHeader } from '@/components/ui-custom/PageHeader';
import { MagistratesOverview } from '@/components/republique/MagistratesOverview';
import { currentMagistracy } from '@/data/magistracies';
import { RepubliqueStats } from '@/components/republique/RepubliqueStats';
import { RepubliqueFunctions } from '@/components/republique/RepubliqueFunctions';
import { Separator } from '@/components/ui/separator';

export const RepubliqueMain: React.FC = () => {
  return (
    <div className="space-y-6">
      <PageHeader 
        title="Gestion de la République" 
        description={`En tant que ${currentMagistracy.name}, vous avez accès à certaines fonctions de l'administration romaine. Gérez Rome selon vos prérogatives.`}
      />
      
      <RepubliqueStats />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RepubliqueFunctions />
        </div>
        <div>
          <MagistratesOverview />
        </div>
      </div>
      
      <RomanCard>
        <RomanCard.Header>
          <h2 className="font-cinzel text-lg">À propos de votre magistrature</h2>
        </RomanCard.Header>
        <RomanCard.Content>
          <div className="space-y-4">
            <p>{currentMagistracy.description}</p>
            <Separator className="my-4 border-rome-gold/30" />
            <p className="text-sm text-muted-foreground">
              Votre mandat s'achèvera aux prochaines élections. Assurez-vous d'accomplir vos objectifs 
              pour renforcer votre prestige et votre influence au Sénat.
            </p>
          </div>
        </RomanCard.Content>
      </RomanCard>
    </div>
  );
};
