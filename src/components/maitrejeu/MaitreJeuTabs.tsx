
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { GestionEquilibre } from './GestionEquilibre';
import { GestionHistoire } from './GestionHistoire';
import { GestionPolitique } from './GestionPolitique';
import { GestionProvinces } from './GestionProvinces';
import { GestionSenateurs } from './GestionSenateurs';
import { TimeManagement } from './components/TimeManagement';
import { useMaitreJeu } from './context/MaitreJeuContext';
import { GamePhase } from './types/maitreJeuTypes';

export const MaitreJeuTabs: React.FC = () => {
  const { 
    gameState,
    changePhase
  } = useMaitreJeu();
  
  const { year, season, phase } = gameState;
  
  const handlePhaseChange = (newPhase: GamePhase) => {
    changePhase(newPhase);
  };
  
  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">Console du Maître de Jeu</h1>
        
        <TimeManagement 
          year={year}
          season={season}
          currentPhase={phase}
          onPhaseChange={handlePhaseChange}
        />
      </div>
      
      <Tabs defaultValue="equilibre">
        <TabsList className="grid grid-cols-5 w-full">
          <TabsTrigger value="equilibre">Équilibre</TabsTrigger>
          <TabsTrigger value="histoire">Histoire</TabsTrigger>
          <TabsTrigger value="politique">Politique</TabsTrigger>
          <TabsTrigger value="provinces">Provinces</TabsTrigger>
          <TabsTrigger value="senateurs">Sénateurs</TabsTrigger>
        </TabsList>
        <TabsContent value="equilibre">
          <GestionEquilibre />
        </TabsContent>
        <TabsContent value="histoire">
          <GestionHistoire />
        </TabsContent>
        <TabsContent value="politique">
          <GestionPolitique />
        </TabsContent>
        <TabsContent value="provinces">
          <GestionProvinces />
        </TabsContent>
        <TabsContent value="senateurs">
          <GestionSenateurs />
        </TabsContent>
      </Tabs>
    </div>
  );
};
