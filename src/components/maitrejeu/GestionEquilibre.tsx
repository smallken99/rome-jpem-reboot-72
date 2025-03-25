
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { EquilibreOverview } from './components/equilibre/EquilibreOverview';
import { PoliticalFactions } from './components/equilibre/PoliticalFactions';
import { SocialTensions } from './components/equilibre/SocialTensions';
import { MilitaryLoyalty } from './components/equilibre/MilitaryLoyalty';
import { Button } from '@/components/ui/button';
import { RefreshCw, Save, AlertTriangle } from 'lucide-react';
import { useRepublicData } from '@/hooks/useRepublicData';
import { useGameTime } from '@/hooks/useGameTime';

export const GestionEquilibre = () => {
  const [activeTab, setActiveTab] = useState('apercu');
  const { equiplibre, updateFactionBalance, updateRepublicFactor } = useRepublicData();
  const { formatDate } = useGameTime();
  
  // Événements récents qui ont influencé l'équilibre
  const recentEvents = [
    {
      id: '1',
      name: 'Discours de Gracchus au Sénat',
      date: new Date(2023, 1, 15),
      impact: { populares: 5, optimates: -3, armée: 0, morale: 2 }
    },
    {
      id: '2',
      name: 'Proposition de loi agraire',
      date: new Date(2023, 1, 10),
      impact: { populares: 8, optimates: -6, morale: -2, plébéiens: 10 }
    },
    {
      id: '3',
      name: 'Bataille contre les Gaulois',
      date: new Date(2023, 0, 28),
      impact: { armée: 5, patriciens: 2, morale: 3 }
    }
  ];
  
  // Menaces actuelles à l'équilibre
  const currentThreats = [
    {
      id: '1',
      name: 'Insatisfaction de la plèbe',
      severity: 'high',
      description: 'Les plébéiens sont mécontents des prix élevés du grain.'
    },
    {
      id: '2',
      name: 'Rivalité entre consuls',
      severity: 'medium',
      description: 'Les deux consuls sont en désaccord sur la politique militaire.'
    },
    {
      id: '3',
      name: 'Corruption au Sénat',
      severity: 'medium',
      description: 'Plusieurs sénateurs ont été accusés d\'accepter des pots-de-vin.'
    }
  ];
  
  const handleUpdateFactions = (populares: number, optimates: number, moderates: number) => {
    updateFactionBalance(populares, optimates, moderates);
  };
  
  const handleUpdateSocialFactors = (patriciens: number, plébéiens: number, économie: number) => {
    updateRepublicFactor('patriciens', patriciens);
    updateRepublicFactor('plébéiens', plébéiens);
    updateRepublicFactor('économie', économie);
  };
  
  const handleUpdateMilitaryFactors = (armée: number, loyauté: number, morale: number) => {
    updateRepublicFactor('armée', armée);
    updateRepublicFactor('loyauté', loyauté);
    updateRepublicFactor('morale', morale);
  };
  
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Équilibre des Pouvoirs</h1>
          <p className="text-muted-foreground">
            Surveillez et influencez l'équilibre politique et social de Rome
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            <RefreshCw className="h-4 w-4" />
            Actualiser
          </Button>
          <Button size="sm" className="flex items-center gap-1">
            <Save className="h-4 w-4" />
            Sauvegarder
          </Button>
        </div>
      </div>
      
      <Card className="border-amber-200 bg-amber-50">
        <CardContent className="p-4 flex items-center gap-3">
          <AlertTriangle className="h-5 w-5 text-amber-600" />
          <p className="text-amber-800 text-sm">
            Une instabilité politique est détectée. La faction des Populaires gagne en influence auprès de la plèbe.
          </p>
        </CardContent>
      </Card>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-4 w-full">
          <TabsTrigger value="apercu">Aperçu général</TabsTrigger>
          <TabsTrigger value="factions">Factions politiques</TabsTrigger>
          <TabsTrigger value="social">Tensions sociales</TabsTrigger>
          <TabsTrigger value="armee">Loyauté militaire</TabsTrigger>
        </TabsList>
        
        <TabsContent value="apercu">
          <EquilibreOverview 
            equilibre={equiplibre}
            recentEvents={recentEvents}
            currentThreats={currentThreats}
            formatDate={formatDate}
          />
        </TabsContent>
        
        <TabsContent value="factions">
          <PoliticalFactions 
            equilibre={equiplibre}
            onUpdate={handleUpdateFactions}
          />
        </TabsContent>
        
        <TabsContent value="social">
          <SocialTensions 
            equilibre={equiplibre}
            onUpdate={handleUpdateSocialFactors}
          />
        </TabsContent>
        
        <TabsContent value="armee">
          <MilitaryLoyalty 
            equilibre={equiplibre}
            onUpdate={handleUpdateMilitaryFactors}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};
