import React from 'react';
import { ResponsiveBar } from '@nivo/bar';
import { Equilibre, EquilibreChartProps } from '../types/compatibilityAdapter';

const EquilibreBarChart: React.FC<EquilibreChartProps> = ({ data }) => {
  const chartData = [
    {
      "parti": "Optimates",
      "valeur": data.optimates,
      "color": "hsl(62, 70%, 50%)"
    },
    {
      "parti": "Populares",
      "valeur": data.populares,
      "color": "hsl(179, 70%, 50%)"
    },
    {
      "parti": "Equites",
      "valeur": data.equites,
      "color": "hsl(344, 70%, 50%)"
    },
    {
      "parti": "Senat",
      "valeur": data.senat,
      "color": "hsl(122, 70%, 50%)"
    }
  ];

  return (
    <div style={{ height: '300px' }}>
      <ResponsiveBar
        data={chartData}
        keys={['valeur']}
        indexBy="parti"
        margin={{ top: 20, right: 20, bottom: 50, left: 60 }}
        padding={0.3}
        colors={({ data }) => data.color}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'Partis',
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
        legends={[]}
        tooltip={({ data, indexValue }) => (
          <div>
            <strong>{indexValue}</strong>: {data.valeur}
          </div>
        )}
        role="application"
        ariaLabel="Equilibre des Partis"
        barAriaLabel={e => `${e.id}: ${e.formattedValue} `}
      />
    </div>
  );
};

export { EquilibreBarChart };
