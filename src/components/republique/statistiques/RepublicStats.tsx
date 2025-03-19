
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { EquilibreBarChart } from '@/components/maitrejeu/components/EquilibreBarChart';
import { PartisGraph } from '@/components/maitrejeu/components/PartisGraph';
import { useRepublicData } from '@/hooks/useRepublicData';

export const RepublicStats: React.FC = () => {
  const { equiplibre, getPoliticalFactions, getRepublicStatistics } = useRepublicData();
  const stats = getRepublicStatistics();
  
  // Transformer les factions pour le graphique
  const factionData = getPoliticalFactions().map(faction => ({
    name: faction.name,
    value: faction.influence,
    color: faction.color
  }));
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>État actuel de la République</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatsCard 
              title="Population" 
              value={stats.population.total.toLocaleString()} 
              subtext={`Croissance: ${stats.population.growth}%`}
            />
            <StatsCard 
              title="Trésor" 
              value={`${stats.economy.treasury.toLocaleString()} as`} 
              subtext={`Revenus annuels: ${stats.economy.annualRevenue.toLocaleString()} as`}
            />
            <StatsCard 
              title="Armée" 
              value={`${stats.military.legions} légions`} 
              subtext={`${stats.military.totalSoldiers.toLocaleString()} soldats`}
            />
            <StatsCard 
              title="Stabilité politique" 
              value={`${stats.politics.politicalStability}%`} 
              subtext={`Approbation du Sénat: ${stats.politics.senateApproval}%`}
            />
          </div>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <EquilibreBarChart 
          equilibre={equiplibre} 
          title="Indicateurs de la République" 
          description="État des forces et de l'équilibre politique"
        />
        <PartisGraph factions={factionData} />
      </div>
    </div>
  );
};

interface StatsCardProps {
  title: string;
  value: string;
  subtext: string;
}

const StatsCard: React.FC<StatsCardProps> = ({ title, value, subtext }) => (
  <div className="bg-white rounded-lg p-4 shadow border">
    <h3 className="text-sm font-medium text-gray-500">{title}</h3>
    <p className="text-2xl font-bold mt-1">{value}</p>
    <p className="text-xs text-gray-500 mt-1">{subtext}</p>
  </div>
);
