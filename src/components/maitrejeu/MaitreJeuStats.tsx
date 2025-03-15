
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { StatsGeneralTab } from './components/stats/StatsGeneralTab';
import { StatsFamillesTab } from './components/stats/StatsFamillesTab';
import { StatsEconomieTab } from './components/stats/StatsEconomieTab';
import { useMaitreJeu } from './context';

export const MaitreJeuStats: React.FC = () => {
  const [activeTab, setActiveTab] = useState('general');

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Statistiques de la République</h1>
        <p className="text-muted-foreground">
          Analyse des données et tendances de la République Romaine
        </p>
      </div>

      <Card>
        <CardContent className="p-6">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-3 mb-6">
              <TabsTrigger value="general">Général</TabsTrigger>
              <TabsTrigger value="familles">Familles</TabsTrigger>
              <TabsTrigger value="economie">Économie</TabsTrigger>
            </TabsList>

            <TabsContent value="general">
              <StatsGeneralTab />
            </TabsContent>

            <TabsContent value="familles">
              <StatsFamillesTab />
            </TabsContent>

            <TabsContent value="economie">
              <StatsEconomieTab />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};
