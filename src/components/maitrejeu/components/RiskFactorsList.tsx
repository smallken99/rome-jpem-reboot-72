
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertOctagon, TrendingDown, TrendingUp } from 'lucide-react';

interface RiskFactor {
  id: string;
  name: string;
  level: 'low' | 'medium' | 'high' | 'critical';
  type: 'political' | 'economic' | 'social' | 'military';
  description: string;
  impact: number;
  trend: 'improving' | 'stable' | 'worsening';
}

interface RiskFactorsListProps {
  factors: RiskFactor[];
}

export const RiskFactorsList: React.FC<RiskFactorsListProps> = ({
  factors
}) => {
  const getLevelColor = (level: string) => {
    switch (level) {
      case 'low': return 'text-green-600 bg-green-50';
      case 'medium': return 'text-yellow-600 bg-yellow-50';
      case 'high': return 'text-orange-600 bg-orange-50';
      case 'critical': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };
  
  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'improving': return <TrendingDown className="h-4 w-4 text-green-600" />;
      case 'worsening': return <TrendingUp className="h-4 w-4 text-red-600" />;
      default: return null;
    }
  };
  
  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'political': return 'Politique';
      case 'economic': return 'Économique';
      case 'social': return 'Social';
      case 'military': return 'Militaire';
      default: return type;
    }
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertOctagon className="h-5 w-5" />
          Facteurs de Risque
        </CardTitle>
      </CardHeader>
      <CardContent>
        {factors.length > 0 ? (
          <div className="space-y-4">
            {factors.map((factor) => (
              <div 
                key={factor.id}
                className="p-3 border rounded-md"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium">{factor.name}</h3>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${getLevelColor(factor.level)}`}>
                        {factor.level === 'low' ? 'Faible' : 
                         factor.level === 'medium' ? 'Moyen' : 
                         factor.level === 'high' ? 'Élevé' : 
                         'Critique'}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{factor.description}</p>
                  </div>
                  <div className="flex items-center gap-1 text-xs bg-gray-100 px-2 py-1 rounded">
                    {getTypeLabel(factor.type)}
                    {getTrendIcon(factor.trend)}
                  </div>
                </div>
                <div className="mt-2 text-xs">
                  <span className="text-muted-foreground">Impact: </span>
                  <span className="font-medium">{factor.impact}%</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            <p>Aucun facteur de risque identifié.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RiskFactorsList;
