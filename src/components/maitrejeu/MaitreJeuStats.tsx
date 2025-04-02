
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useMaitreJeu } from './context';
import { StatsRepartitionTab } from './components/stats/StatsRepartitionTab';
import { StatsRepubliqueTab } from './components/stats/StatsRepubliqueTab';
import { StatsResourcesTab } from './components/stats/StatsResourcesTab';

export const MaitreJeuStats = () => {
  const { equilibre } = useMaitreJeu();

  return (
    <div className="p-4 container mx-auto space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Politique</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {/* Using optimates score as an approximation for stability */}
              {equilibre.politique.optimates}/100
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              <span className="mr-2">Optimates: {equilibre.politique.optimates}/100</span>
              <span>Populares: {equilibre.politique.populares}/100</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Économie</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {/* Using economic value as prosperity approximation */}
              {equilibre.economie.value}/100
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              <span className="mr-2">Croissance: {equilibre.economie.production || 0}%</span>
              <span>Stabilité: {equilibre.economie.stabilite || 0}%</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Militaire</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {/* Using morale as readiness approximation */}
              {equilibre.militaire.morale}/100
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              <span className="mr-2">Morale: {equilibre.militaire.morale}/100</span>
              <span>Force: {equilibre.militaire.force || 0}/100</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="republic">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="republic">République</TabsTrigger>
          <TabsTrigger value="distribution">Répartition des pouvoirs</TabsTrigger>
          <TabsTrigger value="resources">Ressources</TabsTrigger>
        </TabsList>
        <TabsContent value="republic">
          <Card>
            <CardContent className="pt-6">
              <StatsRepubliqueTab />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="distribution">
          <Card>
            <CardContent className="pt-6">
              <StatsRepartitionTab />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="resources">
          <Card>
            <CardContent className="pt-6">
              <StatsResourcesTab />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
