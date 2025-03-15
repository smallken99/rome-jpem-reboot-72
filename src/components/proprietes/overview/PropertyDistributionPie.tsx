
import React from 'react';
import { ResponsivePie } from '@nivo/pie';

export interface PropertyDistributionPieProps {
  urbanProperties: number;
  ruralProperties: number;
  otherProperties: number;
}

export const PropertyDistributionPie: React.FC<PropertyDistributionPieProps> = ({
  urbanProperties,
  ruralProperties,
  otherProperties
}) => {
  const data = [
    {
      id: 'urban',
      label: 'Urbaines',
      value: urbanProperties,
      color: 'hsl(210, 70%, 50%)'
    },
    {
      id: 'rural',
      label: 'Rurales',
      value: ruralProperties,
      color: 'hsl(120, 70%, 50%)'
    },
    {
      id: 'other',
      label: 'Autres',
      value: otherProperties,
      color: 'hsl(40, 70%, 50%)'
    }
  ];

  return (
    <div className="h-[250px]">
      <ResponsivePie
        data={data}
        margin={{ top: 40, right: 80, bottom: 40, left: 80 }}
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
            translateY: 30,
            itemsSpacing: 0,
            itemWidth: 80,
            itemHeight: 20,
            itemTextColor: '#999',
            itemDirection: 'left-to-right',
            itemOpacity: 1,
            symbolSize: 12,
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

export default PropertyDistributionPie;
