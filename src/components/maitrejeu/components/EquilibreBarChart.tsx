
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Equilibre } from '../types/equilibre';
import { ResponsiveBar } from '@nivo/bar';

interface EquilibreBarChartProps {
  equilibre: Equilibre;
}

export const EquilibreBarChart: React.FC<EquilibreBarChartProps> = ({ equilibre }) => {
  const [activeTab, setActiveTab] = useState('global');
  
  // Helper function to safely get numeric values with defaults
  const getEquilibreValue = (key: keyof Equilibre, defaultValue: number = 50): number => {
    return (equilibre[key] as number) || defaultValue;
  };
  
  // Prepare data for the chart
  const globalData = [
    { name: 'Population', value: getEquilibreValue('population', 1000000) / 20000 }, // Scale down for chart
    { name: 'Armée', value: getEquilibreValue('armée', 65) },
    { name: 'Économie', value: getEquilibreValue('économie', 70) },
    { name: 'Morale', value: getEquilibreValue('morale', 60) },
    { name: 'Loyauté', value: getEquilibreValue('loyauté', 75) }
  ];
  
  const politicalData = [
    { name: 'Patriciens', value: getEquilibreValue('patriciens', 80) },
    { name: 'Plébéiens', value: getEquilibreValue('plébéiens', 60) },
    { name: 'Populares', value: getEquilibreValue('populares', 35) },
    { name: 'Optimates', value: getEquilibreValue('optimates', 45) },
    { name: 'Neutres', value: getEquilibreValue('neutrales', 20) }
  ];
  
  const getBarColor = (value: number) => {
    if (value < 30) return '#ef4444'; // red
    if (value < 50) return '#f97316'; // orange
    if (value < 75) return '#eab308'; // yellow
    return '#22c55e'; // green
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>État de la République</CardTitle>
        <CardDescription>Vue d'ensemble des indicateurs clés et de l'équilibre politique</CardDescription>
      </CardHeader>
      
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="global">Indicateurs Globaux</TabsTrigger>
            <TabsTrigger value="political">Équilibre Politique</TabsTrigger>
          </TabsList>
          
          <TabsContent value="global" className="pt-4">
            <div className="h-80">
              <ResponsiveBar
                data={globalData}
                keys={['value']}
                indexBy="name"
                margin={{ top: 20, right: 30, bottom: 50, left: 60 }}
                padding={0.3}
                valueScale={{ type: 'linear' }}
                indexScale={{ type: 'band', round: true }}
                colors={({ data }) => getBarColor(data.value as number)}
                borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
                axisTop={null}
                axisRight={null}
                axisBottom={{
                  tickSize: 5,
                  tickPadding: 5,
                  tickRotation: -45,
                  legend: 'Indicateur',
                  legendPosition: 'middle',
                  legendOffset: 40
                }}
                axisLeft={{
                  tickSize: 5,
                  tickPadding: 5,
                  tickRotation: 0,
                  legend: 'Score',
                  legendPosition: 'middle',
                  legendOffset: -50
                }}
                labelSkipWidth={12}
                labelSkipHeight={12}
                labelTextColor={{ from: 'color', modifiers: [['darker', 3]] }}
                animate={true}
                motionConfig="gentle"
                role="application"
                ariaLabel="État global de la République"
              />
            </div>
          </TabsContent>
          
          <TabsContent value="political" className="pt-4">
            <div className="h-80">
              <ResponsiveBar
                data={politicalData}
                keys={['value']}
                indexBy="name"
                margin={{ top: 20, right: 30, bottom: 50, left: 60 }}
                padding={0.3}
                valueScale={{ type: 'linear' }}
                indexScale={{ type: 'band', round: true }}
                colors={({ data }) => getBarColor(data.value as number)}
                borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
                axisTop={null}
                axisRight={null}
                axisBottom={{
                  tickSize: 5,
                  tickPadding: 5,
                  tickRotation: -45,
                  legend: 'Faction',
                  legendPosition: 'middle',
                  legendOffset: 40
                }}
                axisLeft={{
                  tickSize: 5,
                  tickPadding: 5,
                  tickRotation: 0,
                  legend: 'Influence',
                  legendPosition: 'middle',
                  legendOffset: -50
                }}
                labelSkipWidth={12}
                labelSkipHeight={12}
                labelTextColor={{ from: 'color', modifiers: [['darker', 3]] }}
                animate={true}
                motionConfig="gentle"
                role="application"
                ariaLabel="Équilibre politique de la République"
              />
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};
