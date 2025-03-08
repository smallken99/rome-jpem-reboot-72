
// Mise à jour du MaitreJeuTabs
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { GestionEquilibre } from './GestionEquilibre';
import { GestionHistoire } from './GestionHistoire';
import { GestionPolitique } from './GestionPolitique';
import { GestionProvinces } from './GestionProvinces';
import { GestionSenateurs } from './GestionSenateurs';
import { TimeManagement } from './components/TimeManagement';
import { useContext } from 'react';
import { MaitreJeuContext } from './context/MaitreJeuContext';
import { GamePhase } from './types/common';

export const MaitreJeuTabs = () => {
  const [activeTab, setActiveTab] = useState('equilibre');
  const { 
    currentYear, 
    currentSeason, 
    currentPhase,
    advanceTime, 
    changePhase 
  } = useContext(MaitreJeuContext);

  const handlePhaseChange = (newPhase: GamePhase) => {
    changePhase(newPhase);
  };

  return (
    <div className="p-4">
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold font-cinzel">Console du Maître de Jeu</h1>
        <TimeManagement 
          currentYear={currentYear}
          currentSeason={currentSeason}
          currentPhase={currentPhase}
          onAdvance={advanceTime}
          onPhaseChange={handlePhaseChange}
        />
      </div>

      <Tabs defaultValue="equilibre" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="w-full">
          <TabsTrigger value="equilibre">Équilibre & Événements</TabsTrigger>
          <TabsTrigger value="politique">Politique & Sénat</TabsTrigger>
          <TabsTrigger value="provinces">Provinces & Gouverneurs</TabsTrigger>
          <TabsTrigger value="senateurs">Sénateurs & Joueurs</TabsTrigger>
          <TabsTrigger value="histoire">Histoire & Journal</TabsTrigger>
        </TabsList>
        
        <TabsContent value="equilibre">
          <GestionEquilibre />
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
        
        <TabsContent value="histoire">
          <GestionHistoire />
        </TabsContent>
      </Tabs>
    </div>
  );
};
