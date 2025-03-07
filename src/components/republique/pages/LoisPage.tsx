
import React from 'react';
import { RomanCard } from '@/components/ui-custom/RomanCard';
import { PageHeader } from '@/components/ui-custom/PageHeader';
import { LoisStats } from '@/components/republique/lois/LoisStats';
import { Separator } from '@/components/ui/separator';

export const LoisPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <PageHeader 
        title="Lois & Moralité" 
      />
      
      <LoisStats />
      
      <RomanCard>
        <RomanCard.Header>
          <h2 className="font-cinzel text-lg">Révision et Proposition des Lois</h2>
        </RomanCard.Header>
        <RomanCard.Content>
          <div className="space-y-4">
            <p>
              En tant que Censeur, vous avez la charge de surveiller la moralité des citoyens et 
              des magistrats. Vous pouvez proposer de nouvelles lois et réviser celles existantes.
            </p>
            <Separator className="my-4 border-rome-gold/30" />
            <p className="text-sm text-muted-foreground">
              La stabilité de la République dépend du respect de ses lois et traditions. 
              Assurez-vous que les citoyens et magistrats maintiennent les plus hauts standards.
            </p>
          </div>
        </RomanCard.Content>
      </RomanCard>
    </div>
  );
};
