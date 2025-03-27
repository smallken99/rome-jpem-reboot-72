
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Coins } from 'lucide-react';

interface EconomicStabilityCardProps {
  stability: number;
  factors: {
    name: string;
    value: number;
    impact: string;
  }[];
}

export const EconomicStabilityCard: React.FC<EconomicStabilityCardProps> = ({
  stability,
  factors
}) => {
  const getStabilityColor = () => {
    if (stability >= 75) return 'text-green-600';
    if (stability >= 50) return 'text-yellow-600';
    if (stability >= 25) return 'text-orange-600';
    return 'text-red-600';
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2">
          <Coins className="h-5 w-5" />
          Stabilité Économique
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm font-medium">Indice Économique</span>
              <span className={`text-lg font-bold ${getStabilityColor()}`}>
                {stability}%
              </span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className={`h-full ${
                  stability >= 75 ? 'bg-green-500' : 
                  stability >= 50 ? 'bg-yellow-500' : 
                  stability >= 25 ? 'bg-orange-500' : 
                  'bg-red-500'
                }`}
                style={{ width: `${stability}%` }}
              />
            </div>
          </div>
          
          <div className="space-y-3">
            <h3 className="text-sm font-medium">Facteurs Influents</h3>
            {factors.map((factor, index) => (
              <div key={index} className="flex justify-between items-center text-sm">
                <span>{factor.name}</span>
                <div className="flex items-center">
                  <span 
                    className={
                      factor.value > 0 ? 'text-green-600' : 
                      factor.value < 0 ? 'text-red-600' : 
                      'text-gray-600'
                    }
                  >
                    {factor.value > 0 ? '+' : ''}{factor.value}%
                  </span>
                  <span className="text-xs text-muted-foreground ml-2">({factor.impact})</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EconomicStabilityCard;
