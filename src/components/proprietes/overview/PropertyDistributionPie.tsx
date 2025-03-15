
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ResponsivePie } from '@nivo/pie';
import { OwnedBuilding } from '../hooks/building/types';
import { formatMoney } from '@/utils/formatUtils';

interface PropertyDistributionPieProps {
  buildings: OwnedBuilding[];
}

export const PropertyDistributionPie: React.FC<PropertyDistributionPieProps> = ({ buildings }) => {
  // Calculer la valeur totale par type de propriété
  const getPropertyTypeData = () => {
    const typeData: Record<string, number> = {};
    
    buildings.forEach(building => {
      const type = building.buildingType;
      if (!typeData[type]) {
        typeData[type] = 0;
      }
      
      // Estimation simpliste de la valeur
      // Dans une application réelle, cela serait calculé en fonction de plusieurs facteurs
      const estimatedValue = building.income ? building.income * 24 : 10000;
      typeData[type] += estimatedValue;
    });
    
    const colors = {
      urban: '#4338ca',
      rural: '#16a34a',
      religious: '#b45309',
      public: '#a21caf',
      military: '#b91c1c'
    };
    
    return Object.entries(typeData).map(([id, value]) => ({
      id,
      label: getTypeLabel(id),
      value,
      color: (colors as any)[id] || '#64748b'
    }));
  };
  
  const getTypeLabel = (type: string): string => {
    switch (type) {
      case 'urban': return 'Urbain';
      case 'rural': return 'Rural';
      case 'religious': return 'Religieux';
      case 'public': return 'Public';
      case 'military': return 'Militaire';
      default: return type;
    }
  };
  
  const data = getPropertyTypeData();
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Distribution du patrimoine</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          {data.length > 0 ? (
            <ResponsivePie
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
              tooltip={({ datum }) => {
                const numValue = Number(datum.value);
                return (
                  <div className="bg-white p-2 shadow border rounded text-sm">
                    <strong>{datum.label}:</strong> {formatMoney(numValue)}
                  </div>
                );
              }}
            />
          ) : (
            <div className="flex items-center justify-center h-full text-muted-foreground">
              Aucune donnée disponible
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
