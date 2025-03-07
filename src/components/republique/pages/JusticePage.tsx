
import React from 'react';
import { RomanCard } from '@/components/ui-custom/RomanCard';
import { PageHeader } from '@/components/ui-custom/PageHeader';
import { JudiciaryStats } from '@/components/republique/justice/JudiciaryStats';
import { ProcesTable } from '@/components/republique/justice/ProcesTable';
import { Separator } from '@/components/ui/separator';

export const JusticePage: React.FC = () => {
  return (
    <div className="space-y-6">
      <PageHeader 
        title="Justice & Tribunaux" 
      />
      
      <JudiciaryStats />
      
      <RomanCard>
        <RomanCard.Header>
          <h2 className="font-cinzel text-lg">Procès en Cours</h2>
        </RomanCard.Header>
        <RomanCard.Content>
          <ProcesTable />
        </RomanCard.Content>
      </RomanCard>
      
      <RomanCard>
        <RomanCard.Header>
          <h2 className="font-cinzel text-lg">Administration de la Justice</h2>
        </RomanCard.Header>
        <RomanCard.Content>
          <div className="space-y-4">
            <p>
              En tant que Préteur, vous êtes responsable de l'administration de la justice à Rome.
              Supervisez les tribunaux et assurez-vous que la loi est appliquée équitablement.
            </p>
            <Separator className="my-4 border-rome-gold/30" />
            <p className="text-sm text-muted-foreground">
              Le respect de la justice est fondamental pour maintenir l'ordre social et la confiance 
              des citoyens dans les institutions de la République.
            </p>
          </div>
        </RomanCard.Content>
      </RomanCard>
    </div>
  );
};
