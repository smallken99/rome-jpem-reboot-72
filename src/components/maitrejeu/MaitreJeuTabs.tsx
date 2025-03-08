
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LayoutDashboard, Map, FileText, Users, GanttChart, Shield } from 'lucide-react';
import { MaitreJeuProvider } from './context/MaitreJeuContext';
import { GestionEquilibre } from './GestionEquilibre';
import { GestionHistoire } from './GestionHistoire';
import { GestionSenateurs } from './GestionSenateurs';
import { GestionProvinces } from './GestionProvinces';
import { GestionPolitique } from './GestionPolitique';
import { TimeManagement } from './components/TimeManagement';

export const MaitreJeuTabs: React.FC = () => {
  return (
    <MaitreJeuProvider>
      <div className="space-y-6">
        <TimeManagement />
        
        <Tabs defaultValue="equilibre" className="w-full">
          <TabsList className="grid w-full grid-cols-3 md:grid-cols-6 mb-8">
            <TabsTrigger value="equilibre" className="flex items-center gap-2">
              <LayoutDashboard className="h-4 w-4" />
              <span className="hidden sm:inline">Équilibre</span>
            </TabsTrigger>
            <TabsTrigger value="provinces" className="flex items-center gap-2">
              <Map className="h-4 w-4" />
              <span className="hidden sm:inline">Provinces</span>
            </TabsTrigger>
            <TabsTrigger value="histoire" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              <span className="hidden sm:inline">Histoire</span>
            </TabsTrigger>
            <TabsTrigger value="senateurs" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span className="hidden sm:inline">Sénateurs</span>
            </TabsTrigger>
            <TabsTrigger value="politique" className="flex items-center gap-2">
              <GanttChart className="h-4 w-4" />
              <span className="hidden sm:inline">Politique</span>
            </TabsTrigger>
            <TabsTrigger value="crises" className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              <span className="hidden sm:inline">Crises</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="equilibre">
            <GestionEquilibre />
          </TabsContent>
          
          <TabsContent value="provinces">
            <GestionProvinces />
          </TabsContent>
          
          <TabsContent value="histoire">
            <GestionHistoire />
          </TabsContent>
          
          <TabsContent value="senateurs">
            <GestionSenateurs />
          </TabsContent>
          
          <TabsContent value="politique">
            <GestionPolitique />
          </TabsContent>
          
          <TabsContent value="crises">
            <div className="text-center py-12 text-muted-foreground italic">
              Module de gestion des crises en cours de développement
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </MaitreJeuProvider>
  );
};
