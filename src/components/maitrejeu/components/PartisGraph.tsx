
import React from 'react';
import { Pie } from '@nivo/pie';
import { PartisGraphProps } from '../types/equilibre';

export const PartisGraph: React.FC<PartisGraphProps> = ({ 
  populares, 
  optimates, 
  neutrales 
}) => {
  const data = [
    {
      id: 'Populares',
      label: 'Populares',
      value: populares,
      color: '#ef4444'
    },
    {
      id: 'Optimates',
      label: 'Optimates',
      value: optimates,
      color: '#3b82f6'
    },
    {
      id: 'Neutrales',
      label: 'Modérés',
      value: neutrales,
      color: '#a3a3a3'
    }
  ];

  return (
    <div className="h-80 mt-6">
      <Pie
        data={data}
        margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
        innerRadius={0.5}
        padAngle={0.7}
        cornerRadius={3}
        activeOuterRadiusOffset={8}
        borderWidth={1}
        borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
        arcLinkLabelsSkipAngle={10}
        arcLinkLabelsTextColor="#333333"
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={{ from: 'color' }}
        arcLabelsSkipAngle={10}
        arcLabelsTextColor={{ from: 'color', modifiers: [['darker', 2]] }}
        legends={[
          {
            anchor: 'bottom',
            direction: 'row',
            justify: false,
            translateX: 0,
            translateY: 56,
            itemsSpacing: 0,
            itemWidth: 100,
            itemHeight: 18,
            itemTextColor: '#999',
            itemDirection: 'left-to-right',
            itemOpacity: 1,
            symbolSize: 18,
            symbolShape: 'circle',
            effects: [
              {
                on: 'hover',
                style: {
                  itemTextColor: '#000'
                }
              }
            ]
          }
        ]}
      />
    </div>
  );
};
