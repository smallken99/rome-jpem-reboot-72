
import React from 'react';
import { ResponsiveBar } from '@nivo/bar';
import { Equilibre } from '../types/equilibre';

interface EquilibreBarChartProps {
  equilibre: Equilibre;
}

export const EquilibreBarChart: React.FC<EquilibreBarChartProps> = ({ equilibre }) => {
  const data = [
    { name: 'Population', value: equilibre.population },
    { name: 'Armée', value: equilibre.armée },
    { name: 'Économie', value: equilibre.économie },
    { name: 'Morale', value: equilibre.morale },
    { name: 'Loyauté', value: equilibre.loyauté },
    { name: 'Patriciens', value: equilibre.patriciens },
    { name: 'Plébéiens', value: equilibre.plébéiens || equilibre.plebeiens || 0 },
  ];

  return (
    <div style={{ height: 300 }}>
      <ResponsiveBar
        data={data}
        keys={['value']}
        indexBy="name"
        margin={{ top: 20, right: 20, bottom: 40, left: 40 }}
        padding={0.3}
        valueScale={{ type: 'linear' }}
        indexScale={{ type: 'band', round: true }}
        colors={{ scheme: 'nivo' }}
        defs={[
          {
            id: 'dots',
            type: 'patternDots',
            background: 'inherit',
            color: '#38bcb2',
            size: 4,
            padding: 1,
            stagger: true
          },
          {
            id: 'lines',
            type: 'patternLines',
            background: 'inherit',
            color: '#eed312',
            rotation: -45,
            lineWidth: 6,
            spacing: 10
          }
        ]}
        fill={[{ match: { id: 'value' }, id: 'dots' }]}
        borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: -45,
          legend: 'Catégorie',
          legendPosition: 'middle',
          legendOffset: 32
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'Valeur',
          legendPosition: 'middle',
          legendOffset: -40
        }}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
        animate={true}
        motionStiffness={90}
        motionDamping={15}
        role="application"
        ariaLabel="Équilibre de la République"
      />
    </div>
  );
};
