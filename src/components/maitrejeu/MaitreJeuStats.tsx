
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useMaitreJeu } from './context';
import { BarChart, Calendar, Users, Landmark, Gavel, ScrollText, Globe, Coins } from 'lucide-react';
import { StatsGeneralTab } from './components/stats/StatsGeneralTab';
import { StatsRepubliqueTab } from './components/stats/StatsRepubliqueTab';
import { StatsEconomieTab } from './components/stats/StatsEconomieTab';
import { StatsSenateurTab } from './components/stats/StatsSenateurTab';
import { StatsFamillesTab } from './components/stats/StatsFamillesTab';
import { StatsProvincesTab } from './components/stats/StatsProvincesTab';

export const MaitreJeuStats: React.FC = () => {
  const { currentDate, currentPhase } = useMaitreJeu();
  const currentYear = currentDate.year;
  const currentSeason = currentDate.season;

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Statistiques</h2>
          <p className="text-muted-foreground">
            Analyses et données sur l'état de la République Romaine
          </p>
        </div>
        <Card className="w-fit">
          <CardContent className="p-4 flex items-center space-x-4">
            <Calendar className="h-5 w-5 text-muted-foreground" />
            <div>
              <p className="text-sm font-medium">
                An {currentYear} AUC - {currentSeason}
              </p>
              <p className="text-xs text-muted-foreground">
                Phase: {currentPhase}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList>
          <TabsTrigger value="general" className="flex items-center gap-1">
            <BarChart className="h-4 w-4" /> Général
          </TabsTrigger>
          <TabsTrigger value="republic" className="flex items-center gap-1">
            <Landmark className="h-4 w-4" /> République
          </TabsTrigger>
          <TabsTrigger value="economy" className="flex items-center gap-1">
            <Coins className="h-4 w-4" /> Économie
          </TabsTrigger>
          <TabsTrigger value="senateurs" className="flex items-center gap-1">
            <Users className="h-4 w-4" /> Sénateurs
          </TabsTrigger>
          <TabsTrigger value="familles" className="flex items-center gap-1">
            <Gavel className="h-4 w-4" /> Familles
          </TabsTrigger>
          <TabsTrigger value="provinces" className="flex items-center gap-1">
            <Globe className="h-4 w-4" /> Provinces
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="general" className="space-y-4">
          <StatsGeneralTab />
        </TabsContent>
        
        <TabsContent value="republic" className="space-y-4">
          <StatsRepubliqueTab />
        </TabsContent>
        
        <TabsContent value="economy" className="space-y-4">
          <StatsEconomieTab />
        </TabsContent>
        
        <TabsContent value="senateurs" className="space-y-4">
          <StatsSenateurTab />
        </TabsContent>
        
        <TabsContent value="familles" className="space-y-4">
          <StatsFamillesTab />
        </TabsContent>
        
        <TabsContent value="provinces" className="space-y-4">
          <StatsProvincesTab />
        </TabsContent>
      </Tabs>
    </div>
  );
};
