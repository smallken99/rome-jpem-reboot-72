
import React from 'react';
import { RomanCard } from '@/components/ui-custom/RomanCard';
import { PageHeader } from '@/components/ui-custom/PageHeader';
import { DomainesPublics } from '@/components/republique/domaines/DomainesPublics';
import { AttributionTerres } from '@/components/republique/domaines/AttributionTerres';
import { Separator } from '@/components/ui/separator';

export const DomainesPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <PageHeader 
        title="Terres Publiques" 
      />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DomainesPublics />
        <AttributionTerres />
      </div>
      
      <RomanCard>
        <RomanCard.Header>
          <h2 className="font-cinzel text-lg">Gestion de l'Ager Publicus</h2>
        </RomanCard.Header>
        <RomanCard.Content>
          <div className="space-y-4">
            <p>
              L'Ager Publicus représente l'ensemble des terres appartenant à la République romaine.
              En tant que magistrat, vous êtes responsable de leur attribution et gestion.
            </p>
            <Separator className="my-4 border-rome-gold/30" />
            <p className="text-sm text-muted-foreground">
              Une distribution équitable des terres publiques contribue à la stabilité sociale et 
              à la prospérité économique de Rome.
            </p>
          </div>
        </RomanCard.Content>
      </RomanCard>
    </div>
  );
};
