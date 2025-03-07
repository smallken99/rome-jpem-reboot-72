
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ResponsivePie } from '@nivo/pie';
import { RevenueSourceData } from '../types/profitabilityTypes';

interface RevenueSourcesChartProps {
  data: RevenueSourceData[];
}

export const RevenueSourcesChart: React.FC<RevenueSourcesChartProps> = ({ data }) => {
  return (
    <Card className="border-rome-gold/30">
      <CardHeader className="pb-2">
        <CardTitle className="font-cinzel text-lg">Sources de Revenus</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsivePie
            data={data}
            margin={{ top: 30, right: 80, bottom: 30, left: 80 }}
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
            colors={{ scheme: 'nivo' }}
            legends={[
              {
                anchor: 'right',
                direction: 'column',
                justify: false,
                translateX: 70,
                translateY: 0,
                itemsSpacing: 2,
                itemWidth: 100,
                itemHeight: 20,
                itemTextColor: '#999',
                itemDirection: 'left-to-right',
                itemOpacity: 1,
                symbolSize: 10,
                symbolShape: 'circle',
                effects: [
                  {
                    on: 'hover',
                    style: {
                      itemTextColor: '#000',
                    },
                  },
                ],
              },
            ]}
          />
        </div>
      </CardContent>
    </Card>
  );
};
