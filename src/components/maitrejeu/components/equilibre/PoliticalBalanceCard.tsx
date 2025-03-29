
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface PoliticalBalanceCardProps {
  populaires: number;
  optimates: number;
  moderates: number;
  onUpdate?: (values: { populaires: number; optimates: number; moderates: number }) => void;
}

export const PoliticalBalanceCard: React.FC<PoliticalBalanceCardProps> = ({
  populaires,
  optimates,
  moderates,
  onUpdate
}) => {
  // Calculate percentages for visualization
  const total = populaires + optimates + moderates;
  const populairesPercent = Math.round((populaires / total) * 100);
  const optimatesPercent = Math.round((optimates / total) * 100);
  const moderatesPercent = Math.round((moderates / total) * 100);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Équilibre Politique</CardTitle>
        <CardDescription>
          Répartition du pouvoir entre les différentes factions politiques
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium">Populares</span>
              <span className="text-sm text-muted-foreground">{populaires} ({populairesPercent}%)</span>
            </div>
            <Progress value={populairesPercent} className="h-2 bg-stone-200" indicatorClassName="bg-red-600" />
          </div>
          
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium">Optimates</span>
              <span className="text-sm text-muted-foreground">{optimates} ({optimatesPercent}%)</span>
            </div>
            <Progress value={optimatesPercent} className="h-2 bg-stone-200" indicatorClassName="bg-blue-600" />
          </div>
          
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium">Modérés</span>
              <span className="text-sm text-muted-foreground">{moderates} ({moderatesPercent}%)</span>
            </div>
            <Progress value={moderatesPercent} className="h-2 bg-stone-200" indicatorClassName="bg-green-600" />
          </div>
          
          <div className="bg-muted p-3 rounded-md mt-4">
            <p className="text-sm text-muted-foreground">
              L'équilibre des pouvoirs au Sénat détermine quelles lois sont susceptibles d'être adoptées.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
