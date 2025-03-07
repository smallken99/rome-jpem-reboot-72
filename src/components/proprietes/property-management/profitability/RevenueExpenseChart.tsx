
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ResponsiveBar } from '@nivo/bar';
import { RevenueExpenseChartProps } from '../types/profitabilityTypes';

export const RevenueExpenseChart: React.FC<RevenueExpenseChartProps> = ({ data, activeView }) => {
  return (
    <Card className="border-rome-gold/30">
      <CardHeader className="pb-2">
        <CardTitle className="font-cinzel text-lg">
          {activeView === 'yearly' ? 'Revenus et Dépenses Annuels' : 'Revenus et Dépenses Mensuels'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveBar
            data={data}
            keys={['revenus', 'dépenses', 'profit']}
            indexBy="name"
            margin={{ top: 10, right: 15, bottom: 50, left: 60 }}
            padding={0.3}
            valueScale={{ type: 'linear' }}
            indexScale={{ type: 'band', round: true }}
            colors={['#84cc16', '#ef4444', '#60a5fa']}
            borderWidth={1}
            borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
            axisBottom={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: activeView === 'yearly' ? 'Année' : 'Mois',
              legendPosition: 'middle',
              legendOffset: 40,
            }}
            axisLeft={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: 'Montant (As)',
              legendPosition: 'middle',
              legendOffset: -50,
            }}
            labelSkipWidth={12}
            labelSkipHeight={12}
            labelTextColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
            legends={[
              {
                dataFrom: 'keys',
                anchor: 'bottom',
                direction: 'row',
                justify: false,
                translateX: 0,
                translateY: 50,
                itemsSpacing: 2,
                itemWidth: 100,
                itemHeight: 20,
                itemDirection: 'left-to-right',
                itemOpacity: 0.85,
                symbolSize: 10,
                symbolShape: 'circle',
                effects: [
                  {
                    on: 'hover',
                    style: {
                      itemOpacity: 1,
                    },
                  },
                ],
              },
            ]}
            role="application"
            ariaLabel="Revenus et dépenses"
            barAriaLabel={function (e) {
              return e.id + ': ' + e.formattedValue + ' As en ' + e.indexValue;
            }}
          />
        </div>
      </CardContent>
    </Card>
  );
};
