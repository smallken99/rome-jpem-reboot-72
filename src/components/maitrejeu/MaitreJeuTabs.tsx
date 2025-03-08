
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useMaitreJeu } from './context/MaitreJeuContext';
import { GestionEquilibre } from './GestionEquilibre';
import { GestionHistoire } from './GestionHistoire';
import { GestionPolitique } from './GestionPolitique';
import { GestionProvinces } from './GestionProvinces';
import { GestionSenateurs } from './GestionSenateurs';
import { TimeManagement } from './components/TimeManagement';

export const MaitreJeuTabs: React.FC = () => {
  const { 
    currentYear, 
    currentSeason, 
    currentPhase,
    advanceTime,
    changePhase
  } = useMaitreJeu();

  return (
    <div className="container mx-auto py-6 space-y-6">
      <TimeManagement 
        year={currentYear}
        season={currentSeason}
        phase={currentPhase}
        onAdvance={advanceTime}
        onPhaseChange={changePhase}
      />
      
      <Tabs defaultValue="histoire" className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-5">
          <TabsTrigger value="histoire">Histoire</TabsTrigger>
          <TabsTrigger value="politique">Politique</TabsTrigger>
          <TabsTrigger value="provinces">Provinces</TabsTrigger>
          <TabsTrigger value="equilibre">Équilibre</TabsTrigger>
          <TabsTrigger value="senateurs">Sénateurs</TabsTrigger>
        </TabsList>
        
        <TabsContent value="histoire" className="mt-6">
          <GestionHistoire />
        </TabsContent>
        
        <TabsContent value="politique" className="mt-6">
          <GestionPolitique />
        </TabsContent>
        
        <TabsContent value="provinces" className="mt-6">
          <GestionProvinces />
        </TabsContent>
        
        <TabsContent value="equilibre" className="mt-6">
          <GestionEquilibre />
        </TabsContent>
        
        <TabsContent value="senateurs" className="mt-6">
          <GestionSenateurs />
        </TabsContent>
      </Tabs>
    </div>
  );
};
