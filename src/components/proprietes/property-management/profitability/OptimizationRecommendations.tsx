
import React from 'react';
import { Tractor, TrendingUp, User } from 'lucide-react';
import { OptimizationRecommendationsProps } from '../types/profitabilityTypes';

export const OptimizationRecommendations: React.FC<OptimizationRecommendationsProps> = ({ recommendations }) => {
  return (
    <div className="border border-rome-gold/30 rounded-md p-4 bg-white">
      <h4 className="font-cinzel text-rome-navy mb-4">Recommandations d'Optimisation</h4>
      <div className="space-y-4">
        {recommendations.map((recommendation) => (
          <div key={recommendation.id} className="flex items-start gap-3">
            <div className={`p-2 rounded-full border ${
              recommendation.impact === 'high' 
                ? 'bg-green-50 border-green-200' 
                : recommendation.impact === 'medium'
                  ? 'bg-amber-50 border-amber-200'
                  : 'bg-blue-50 border-blue-200'
            }`}>
              {recommendation.impact === 'high' ? (
                <TrendingUp className="h-5 w-5 text-green-600" />
              ) : recommendation.impact === 'medium' ? (
                <User className="h-5 w-5 text-amber-600" />
              ) : (
                <Tractor className="h-5 w-5 text-blue-600" />
              )}
            </div>
            <div>
              <h5 className="font-medium">{recommendation.title}</h5>
              <p className="text-sm text-muted-foreground">
                {recommendation.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
