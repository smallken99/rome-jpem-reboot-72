
import React from 'react';
import { RomanCard } from '@/components/ui-custom/RomanCard';
import { PageHeader } from '@/components/ui-custom/PageHeader';
import { SecuriteStats } from '@/components/republique/securite/SecuriteStats';
import { Separator } from '@/components/ui/separator';

export const SecuritePage: React.FC = () => {
  return (
    <div className="space-y-6">
      <PageHeader 
        title="Sécurité & Ordre Public" 
      />
      
      <SecuriteStats />
      
      <RomanCard>
        <RomanCard.Header>
          <h2 className="font-cinzel text-lg">Maintien de l'ordre dans la République</h2>
        </RomanCard.Header>
        <RomanCard.Content>
          <div className="space-y-4">
            <p>
              En tant qu'Édile, vous êtes responsable du maintien de l'ordre public à Rome. 
              Organisez la milice urbaine et surveillez les activités criminelles.
            </p>
            <Separator className="my-4 border-rome-gold/30" />
            <p className="text-sm text-muted-foreground">
              Chaque incident non résolu diminue votre influence politique et augmente le mécontentement des citoyens.
            </p>
          </div>
        </RomanCard.Content>
      </RomanCard>
    </div>
  );
};
