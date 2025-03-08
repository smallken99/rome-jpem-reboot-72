
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { GestionEquilibre } from './GestionEquilibre';
import { GestionPolitique } from './GestionPolitique';
import { GestionProvinces } from './GestionProvinces';
import { GestionSenateurs } from './GestionSenateurs';
import { GestionHistoire } from './GestionHistoire';
import { TimeManagement } from './components/TimeManagement';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useMaitreJeu } from './context';

export const MaitreJeuTabs = () => {
  const [activeTab, setActiveTab] = useState('time');
  const { 
    currentYear, 
    currentSeason, 
    currentPhase, 
    advanceTime, 
    changePhase 
  } = useMaitreJeu();
  
  return (
    <div className="p-4">
      <div className="mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Console Maître de Jeu</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-muted-foreground">
                  Année: <span className="font-medium">{currentYear} AUC</span> | 
                  Saison: <span className="font-medium">
                    {currentSeason === 'SPRING' ? 'Printemps' : 
                     currentSeason === 'SUMMER' ? 'Été' : 
                     currentSeason === 'AUTUMN' ? 'Automne' : 'Hiver'}
                  </span> | 
                  Phase: <span className="font-medium">{currentPhase}</span>
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="time">Temps</TabsTrigger>
          <TabsTrigger value="equilibre">Équilibre</TabsTrigger>
          <TabsTrigger value="politique">Politique</TabsTrigger>
          <TabsTrigger value="provinces">Provinces</TabsTrigger>
          <TabsTrigger value="senateurs">Sénateurs</TabsTrigger>
          <TabsTrigger value="histoire">Histoire</TabsTrigger>
        </TabsList>
        
        <TabsContent value="time">
          <TimeManagement />
        </TabsContent>
        
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
