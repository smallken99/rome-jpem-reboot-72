
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { PageHeader } from '@/components/ui-custom/PageHeader';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { ReputationChart } from './ReputationChart';
import { ReputationHistory } from './ReputationHistory';
import { ReputationStatus } from './ReputationStatus';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RepFactorSelector } from './RepFactorSelector';
import { useLocalStorage } from '@/hooks/useLocalStorage';

// Type pour les données de réputation
interface ReputationData {
  overall: number;
  plebs: number;
  patricians: number;
  senate: number;
  military: number;
  history: {
    year: string;
    event: string;
    change: string;
  }[];
  chartData: {
    year: string;
    value: number;
  }[];
}

// Données initiales
const initialReputationData: ReputationData = {
  overall: 65,
  plebs: 50,
  patricians: 70,
  senate: 65,
  military: 55,
  history: [
    { year: '750', event: 'Fondation de la famille', change: '+25' },
    { year: '748', event: 'Alliance avec les Aemilii', change: '+10' },
    { year: '747', event: 'Échec de proposition au Sénat', change: '-5' },
    { year: '745', event: 'Victoire militaire en Étrurie', change: '+15' },
    { year: '743', event: 'Scandale familial', change: '-10' },
    { year: '741', event: 'Construction d\'un temple', change: '+8' }
  ],
  chartData: [
    { year: '750', value: 25 },
    { year: '749', value: 30 },
    { year: '748', value: 40 },
    { year: '747', value: 35 },
    { year: '746', value: 38 },
    { year: '745', value: 53 },
    { year: '744', value: 55 },
    { year: '743', value: 45 },
    { year: '742', value: 50 },
    { year: '741', value: 58 },
    { year: '740', value: 60 },
    { year: '739', value: 65 },
  ]
};

export const FamilyReputation: React.FC = () => {
  const navigate = useNavigate();
  const [reputationData, setReputationData] = useLocalStorage<ReputationData>(
    'family-reputation', 
    initialReputationData
  );
  const [activeTab, setActiveTab] = useState<string>('overview');
  
  const handleAddEvent = (event: string, impact: number) => {
    // Simuler l'ajout d'un nouvel événement
    const currentYear = '738'; // À remplacer par l'année actuelle du jeu
    const change = impact >= 0 ? `+${impact}` : `${impact}`;
    
    setReputationData(prev => {
      // Mettre à jour l'historique
      const newHistory = [
        { year: currentYear, event, change },
        ...prev.history
      ];
      
      // Mettre à jour le graphique
      const lastValue = prev.chartData[prev.chartData.length - 1]?.value || 0;
      const newValue = Math.max(0, Math.min(100, lastValue + impact));
      const newChartData = [
        ...prev.chartData,
        { year: currentYear, value: newValue }
      ];
      
      // Mettre à jour le score global
      const newOverall = Math.max(0, Math.min(100, prev.overall + impact));
      
      return {
        ...prev,
        overall: newOverall,
        history: newHistory,
        chartData: newChartData
      };
    });
  };
  
  return (
    <Layout>
      <PageHeader 
        title="Réputation Familiale"
        subtitle="Gérez et suivez la réputation de votre famille à Rome"
      />
      
      <div className="mb-6">
        <div className="flex justify-end space-x-4">
          <Button variant="outline" onClick={() => navigate('/famille')}>
            Retour au menu
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Évolution de la Réputation</CardTitle>
            <CardDescription>
              L'évolution de la réputation de votre famille au fil du temps
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ReputationChart data={reputationData.chartData} />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Statut Actuel</CardTitle>
            <CardDescription>
              Votre réputation auprès des différentes factions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ReputationStatus 
              overall={reputationData.overall}
              plebs={reputationData.plebs}
              patricians={reputationData.patricians}
              senate={reputationData.senate}
              military={reputationData.military}
            />
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Gestion de la Réputation</CardTitle>
          <CardDescription>
            Analysez et influencez la réputation de votre famille
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-6">
              <TabsTrigger value="overview">Historique</TabsTrigger>
              <TabsTrigger value="actions">Actions</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview">
              <ReputationHistory events={reputationData.history} />
            </TabsContent>
            
            <TabsContent value="actions">
              <RepFactorSelector onSelectAction={handleAddEvent} />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </Layout>
  );
};
