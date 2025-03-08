
import React from 'react';
import { ResponsivePie } from '@nivo/pie';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export interface PartisGraphProps {
  factions: { name: string; value: number; color: string }[];
}

export const PartisGraph: React.FC<PartisGraphProps> = ({ factions }) => {
  const data = factions.map(faction => ({
    id: faction.name,
    label: faction.name,
    value: faction.value,
    color: faction.color
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Équilibre des Partis</CardTitle>
      </CardHeader>
      <CardContent>
        <div style={{ height: 300 }}>
          <ResponsivePie
            data={data}
            margin={{ top: 40, right: 80, bottom: 40, left: 80 }}
            innerRadius={0.5}
            padAngle={0.7}
            cornerRadius={3}
            activeOuterRadiusOffset={8}
            colors={{ datum: 'data.color' }}
            borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
            arcLinkLabelsSkipAngle={10}
            arcLinkLabelsTextColor="#333333"
            arcLinkLabelsThickness={2}
            arcLinkLabelsColor={{ from: 'color' }}
            arcLabelsSkipAngle={10}
            arcLabelsTextColor={{ from: 'color', modifiers: [['darker', 2]] }}
            legends={[
              {
                anchor: 'right',
                direction: 'column',
                justify: false,
                translateX: 70,
                translateY: 0,
                itemsSpacing: 5,
                itemWidth: 100,
                itemHeight: 18,
                itemTextColor: '#999',
                itemDirection: 'left-to-right',
                itemOpacity: 1,
                symbolSize: 18,
                symbolShape: 'circle'
              }
            ]}
          />
        </div>
      </CardContent>
    </Card>
  );
};
