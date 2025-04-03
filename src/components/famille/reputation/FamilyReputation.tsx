
import React from 'react';
import Layout from '@/components/layout/Layout';
import { PageHeader } from '@/components/ui-custom/PageHeader';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useCharacters } from '../hooks/useCharacters';
import { ReputationMetrics } from './ReputationMetrics';
import { ReputationHistory } from './ReputationHistory';
import { ReputationChart } from './ReputationChart';

export const FamilyReputation: React.FC = () => {
  const navigate = useNavigate();
  const { localCharacters } = useCharacters();
  
  // Calcul de la réputation basée sur les attributs des membres
  const calculateAverageReputation = () => {
    if (localCharacters.length === 0) return 0;
    
    const totalPopularity = localCharacters.reduce((sum, char) => {
      const popularity = typeof char.stats.popularity === 'number' 
        ? char.stats.popularity 
        : (char.stats.popularity as any)?.value || 0;
      return sum + popularity;
    }, 0);
    
    return Math.round(totalPopularity / localCharacters.length);
  };
  
  // Données fictives pour l'historique de réputation
  const reputationHistory = [
    { year: 'An 453', event: 'Victoire à la bataille d\'Hispanie', change: '+10' },
    { year: 'An 455', event: 'Soutien à la loi agraire', change: '+5' },
    { year: 'An 456', event: 'Alliance avec les Cornelii', change: '+15' },
    { year: 'An 457', event: 'Scandale de corruption', change: '-20' },
    { year: 'An 459', event: 'Réhabilitation publique', change: '+25' },
  ];
  
  // Données fictives pour le graphique
  const chartData = [
    { year: 'An 450', value: 30 },
    { year: 'An 452', value: 35 },
    { year: 'An 454', value: 45 },
    { year: 'An 456', value: 40 },
    { year: 'An 458', value: 20 },
    { year: 'An 460', value: 45 },
  ];
  
  const averageReputation = calculateAverageReputation();
  
  return (
    <Layout>
      <PageHeader 
        title="Réputation Familiale" 
        subtitle="Suivez l'évolution du prestige et de l'influence de votre famille"
      />
      
      <div className="mb-6">
        <Button variant="outline" onClick={() => navigate('/famille')}>
          Retour au menu
        </Button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Évolution de la Réputation</CardTitle>
              <CardDescription>
                Suivez l'évolution du prestige familial au fil des années
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ReputationChart data={chartData} />
            </CardContent>
          </Card>
        </div>
        
        <div>
          <ReputationMetrics 
            reputation={averageReputation}
            influence={Math.round(averageReputation * 0.8)}
            prestige={Math.round(averageReputation * 1.2)}
          />
        </div>
      </div>
      
      <ReputationHistory events={reputationHistory} />
    </Layout>
  );
};
