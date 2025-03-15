
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { formatCurrency } from '@/lib/utils';
import { OptimizationRecommendationsProps } from './types/profitabilityTypes';

export const OptimizationRecommendations: React.FC<OptimizationRecommendationsProps> = ({ recommendations }) => {
  const getImpactColor = (impact: 'high' | 'medium' | 'low') => {
    switch (impact) {
      case 'high':
        return 'bg-red-500';
      case 'medium':
        return 'bg-orange-500';
      case 'low':
        return 'bg-blue-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className="space-y-4">
      {recommendations.map((recommendation) => (
        <Card key={recommendation.id}>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">{recommendation.property}</CardTitle>
              <Badge className={getImpactColor(recommendation.impact)}>
                Impact {recommendation.impact === 'high' ? 'élevé' : recommendation.impact === 'medium' ? 'moyen' : 'faible'}
              </Badge>
            </div>
            <CardDescription>
              {recommendation.action}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>{recommendation.description}</p>
          </CardContent>
          <CardFooter className="pt-0">
            <p className="text-sm text-muted-foreground">
              Bénéfice estimé: <span className="font-medium">{formatCurrency(recommendation.estimatedBenefit)}</span>
            </p>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};
