
import React from 'react';
import { RomanCard } from '@/components/ui-custom/RomanCard';
import { PageHeader } from '@/components/ui-custom/PageHeader';
import { TresorStats } from '@/components/republique/tresor/TresorStats';
import { TresorChart } from '@/components/republique/tresor/TresorChart';
import { TresorTable } from '@/components/republique/tresor/TresorTable';
import { Separator } from '@/components/ui/separator';

export const TresorPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <PageHeader 
        title="Trésor Public" 
      />
      
      <TresorStats />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RomanCard>
          <RomanCard.Header>
            <h2 className="font-cinzel text-lg">Revenus et Dépenses</h2>
          </RomanCard.Header>
          <RomanCard.Content>
            <TresorChart />
          </RomanCard.Content>
        </RomanCard>
        
        <RomanCard>
          <RomanCard.Header>
            <h2 className="font-cinzel text-lg">Transactions Récentes</h2>
          </RomanCard.Header>
          <RomanCard.Content>
            <TresorTable />
          </RomanCard.Content>
        </RomanCard>
      </div>
      
      <RomanCard>
        <RomanCard.Header>
          <h2 className="font-cinzel text-lg">Gestion Financière de la République</h2>
        </RomanCard.Header>
        <RomanCard.Content>
          <div className="space-y-4">
            <p>
              En tant que Questeur, vous êtes responsable de la gestion des finances publiques de Rome. 
              Surveillez les revenus et les dépenses pour maintenir l'équilibre du trésor.
            </p>
            <Separator className="my-4 border-rome-gold/30" />
            <p className="text-sm text-muted-foreground">
              Un trésor bien géré est essentiel pour financer les armées, les travaux publics et 
              l'administration de la République.
            </p>
          </div>
        </RomanCard.Content>
      </RomanCard>
    </div>
  );
};
