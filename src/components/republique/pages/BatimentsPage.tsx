
import React from 'react';
import { RomanCard } from '@/components/ui-custom/RomanCard';
import { PageHeader } from '@/components/ui-custom/PageHeader';
import { BatimentsStats } from '@/components/republique/batiments/BatimentsStats';
import { Separator } from '@/components/ui/separator';

export const BatimentsPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <PageHeader 
        title="Bâtiments Publics" 
      />
      
      <BatimentsStats />
      
      <RomanCard>
        <RomanCard.Header>
          <h2 className="font-cinzel text-lg">Gestion des Infrastructures Publiques</h2>
        </RomanCard.Header>
        <RomanCard.Content>
          <div className="space-y-4">
            <p>
              Les bâtiments publics sont essentiels à la grandeur de Rome. Supervisez la construction et 
              l'entretien des aqueducs, thermes, temples et autres édifices qui font la gloire de la République.
            </p>
            <Separator className="my-4 border-rome-gold/30" />
            <p className="text-sm text-muted-foreground">
              Chaque construction renforce le prestige et la puissance de Rome, tout en améliorant 
              la vie quotidienne des citoyens.
            </p>
          </div>
        </RomanCard.Content>
      </RomanCard>
    </div>
  );
};
