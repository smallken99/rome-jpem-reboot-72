
import React from 'react';
import { PageHeader } from '@/components/ui-custom/PageHeader';
import { RomanCard } from '@/components/ui-custom/RomanCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ImpotsStats } from './ImpotsStats';
import { ImpotsTable } from './ImpotsTable';
import { ImpotsForecast } from './ImpotsForecast';

export const ImpotsPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <PageHeader 
        title="Gestion des Impôts" 
        subtitle="Administration fiscale de la République romaine" 
      />
      
      <ImpotsStats />
      
      <Tabs defaultValue="current" className="space-y-4">
        <TabsList className="border border-rome-gold/30 bg-white">
          <TabsTrigger value="current">Impôts Actuels</TabsTrigger>
          <TabsTrigger value="forecast">Prévisions</TabsTrigger>
          <TabsTrigger value="exemptions">Exemptions</TabsTrigger>
        </TabsList>
        
        <TabsContent value="current">
          <RomanCard>
            <RomanCard.Header>
              <h2 className="font-cinzel text-lg">Tributs et Taxes</h2>
            </RomanCard.Header>
            <RomanCard.Content>
              <ImpotsTable />
            </RomanCard.Content>
          </RomanCard>
        </TabsContent>
        
        <TabsContent value="forecast">
          <RomanCard>
            <RomanCard.Header>
              <h2 className="font-cinzel text-lg">Prévisions Fiscales</h2>
            </RomanCard.Header>
            <RomanCard.Content>
              <ImpotsForecast />
            </RomanCard.Content>
          </RomanCard>
        </TabsContent>
        
        <TabsContent value="exemptions">
          <RomanCard>
            <RomanCard.Header>
              <h2 className="font-cinzel text-lg">Exemptions Fiscales</h2>
            </RomanCard.Header>
            <RomanCard.Content>
              <p className="text-muted-foreground">
                En tant que questeur, vous pouvez accorder des exemptions d'impôts à certains citoyens ou communautés en récompense de services rendus à Rome.
              </p>
              {/* Table des exemptions fiscales à implémenter */}
            </RomanCard.Content>
          </RomanCard>
        </TabsContent>
      </Tabs>
    </div>
  );
};
