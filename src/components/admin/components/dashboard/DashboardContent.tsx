
import React from 'react';
import { SystemStatusCard } from './SystemStatusCard';
import { GameStatsCard } from './GameStatsCard';
import { UserStatsCard } from './UserStatsCard';
import { RefreshStatsButton } from './RefreshStatsButton';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, BarChartHorizontal, PieChart } from 'lucide-react';

export const DashboardContent: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-medium">Tableau de bord</h2>
        <RefreshStatsButton />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <SystemStatusCard />
        <GameStatsCard />
        <UserStatsCard />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">Visites du site</CardTitle>
              <BarChart className="h-4 w-4 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[200px] w-full flex items-center justify-center bg-muted/20 rounded-md">
              <p className="text-muted-foreground text-sm">Graphique des visites (derniers 30 jours)</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">Distribution des utilisateurs</CardTitle>
              <PieChart className="h-4 w-4 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[200px] w-full flex items-center justify-center bg-muted/20 rounded-md">
              <p className="text-muted-foreground text-sm">Graphique de distribution des utilisateurs</p>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base">Activités récentes</CardTitle>
            <BarChartHorizontal className="h-4 w-4 text-muted-foreground" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-[150px] w-full flex items-center justify-center bg-muted/20 rounded-md">
            <p className="text-muted-foreground text-sm">Graphique d'activités par catégorie</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
