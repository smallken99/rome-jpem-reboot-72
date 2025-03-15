
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { OptimizationRecommendationsProps } from './types/profitabilityTypes';

export const OptimizationRecommendations: React.FC<OptimizationRecommendationsProps> = ({ recommendations }) => {
  const getPriorityColor = (type: 'high' | 'medium' | 'low') => {
    switch (type) {
      case 'high':
        return 'bg-red-100 text-red-800 hover:bg-red-200';
      case 'medium':
        return 'bg-amber-100 text-amber-800 hover:bg-amber-200';
      case 'low':
        return 'bg-green-100 text-green-800 hover:bg-green-200';
      default:
        return 'bg-blue-100 text-blue-800 hover:bg-blue-200';
    }
  };

  const getPriorityText = (type: 'high' | 'medium' | 'low') => {
    switch (type) {
      case 'high':
        return 'Priorité haute';
      case 'medium':
        return 'Priorité moyenne';
      case 'low':
        return 'Priorité basse';
      default:
        return 'Non défini';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recommandations d'optimisation</CardTitle>
        <CardDescription>Suggestions pour améliorer la rentabilité de vos propriétés</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recommendations.map((recommendation) => (
            <div key={recommendation.id} className="border rounded-lg p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-medium text-lg">{recommendation.title}</h3>
                <Badge className={getPriorityColor(recommendation.type)}>
                  {getPriorityText(recommendation.type)}
                </Badge>
              </div>
              <p className="text-muted-foreground mb-2">{recommendation.description}</p>
              {recommendation.impact && (
                <p className="text-sm font-semibold text-green-600">{recommendation.impact}</p>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
