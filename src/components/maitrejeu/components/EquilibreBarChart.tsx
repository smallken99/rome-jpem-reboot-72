
import React from 'react';
import { Bar } from '@nivo/bar';
import { Equilibre } from '../types/equilibre';

interface EquilibreChartProps {
  equilibre: Equilibre;
}

export const EquilibreBarChart: React.FC<EquilibreChartProps> = ({ equilibre }) => {
  const chartData = [
    {
      name: 'Population',
      value: equilibre.population
    },
    {
      name: 'Armée',
      value: equilibre.armée
    },
    {
      name: 'Morale',
      value: equilibre.morale
    },
    {
      name: 'Loyauté',
      value: equilibre.loyauté
    }
  ];
  
  return (
    <div className="h-80 mt-6">
      <Bar
        data={chartData}
        keys={['value']}
        indexBy="name"
        margin={{ top: 10, right: 30, bottom: 50, left: 60 }}
        padding={0.3}
        valueScale={{ type: 'linear' }}
        indexScale={{ type: 'band', round: true }}
        colors={{ scheme: 'nivo' }}
        borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'Domaine',
          legendPosition: 'middle',
          legendOffset: 32
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'Niveau',
          legendPosition: 'middle',
          legendOffset: -40
        }}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
        legends={[
          {
            dataFrom: 'keys',
            anchor: 'bottom-right',
            direction: 'column',
            justify: false,
            translateX: 120,
            translateY: 0,
            itemsSpacing: 2,
            itemWidth: 100,
            itemHeight: 20,
            itemDirection: 'left-to-right',
            itemOpacity: 0.85,
            symbolSize: 20,
            effects: [
              {
                on: 'hover',
                style: {
                  itemOpacity: 1
                }
              }
            ]
          }
        ]}
        role="application"
        ariaLabel="État de la République"
      />
    </div>
  );
};
