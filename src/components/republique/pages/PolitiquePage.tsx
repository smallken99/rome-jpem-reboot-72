
import React from 'react';
import { RomanCard } from '@/components/ui-custom/RomanCard';
import { PageHeader } from '@/components/ui-custom/PageHeader';
import { PolitiqueStats } from '@/components/republique/politique/PolitiqueStats';
import { Separator } from '@/components/ui/separator';

export const PolitiquePage: React.FC = () => {
  return (
    <div className="space-y-6">
      <PageHeader 
        title="Gestion Politique" 
      />
      
      <PolitiqueStats />
      
      <RomanCard>
        <RomanCard.Header>
          <h2 className="font-cinzel text-lg">Direction Politique de la République</h2>
        </RomanCard.Header>
        <RomanCard.Content>
          <div className="space-y-4">
            <p>
              En tant que Consul, vous dirigez la politique intérieure et extérieure de Rome. 
              Vous êtes responsable des alliances avec d'autres peuples et des réformes majeures.
            </p>
            <Separator className="my-4 border-rome-gold/30" />
            <p className="text-sm text-muted-foreground">
              Votre habileté politique sera jugée par le Sénat et le peuple. Maintenez la balance 
              entre les différentes factions pour assurer la stabilité de la République.
            </p>
          </div>
        </RomanCard.Content>
      </RomanCard>
    </div>
  );
};
