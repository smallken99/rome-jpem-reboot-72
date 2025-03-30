
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { TrendingUp, TrendingDown, Flag } from 'lucide-react';

interface PoliticalBalanceCardProps {
  populaires: number;
  optimates: number;
  moderates: number;
  onUpdate: (values: { populaires: number; optimates: number; moderates: number }) => void;
}

export const PoliticalBalanceCard: React.FC<PoliticalBalanceCardProps> = ({
  populaires,
  optimates,
  moderates,
  onUpdate
}) => {
  const handlePopulairesChange = (value: number[]) => {
    onUpdate({ populaires: value[0], optimates, moderates });
  };

  const handleOptimatesChange = (value: number[]) => {
    onUpdate({ populaires, optimates: value[0], moderates });
  };

  const handleModeratesChange = (value: number[]) => {
    onUpdate({ populaires, optimates, moderates: value[0] });
  };

  const total = populaires + optimates + moderates;
  const populairesPct = total > 0 ? Math.round((populaires / total) * 100) : 0;
  const optimatesPct = total > 0 ? Math.round((optimates / total) * 100) : 0;
  const moderatesPct = total > 0 ? Math.round((moderates / total) * 100) : 0;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Flag className="h-5 w-5 mr-2 text-rome-red" />
          Balance Politique
        </CardTitle>
        <CardDescription>
          Répartition des factions au Sénat
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm font-medium">Populares</span>
              <span className="text-sm font-medium">{populaires} sénateurs ({populairesPct}%)</span>
            </div>
            <Slider
              value={[populaires]}
              min={0}
              max={100}
              step={1}
              onValueChange={handlePopulairesChange}
              className="cursor-pointer"
            />
          </div>

          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm font-medium">Optimates</span>
              <span className="text-sm font-medium">{optimates} sénateurs ({optimatesPct}%)</span>
            </div>
            <Slider
              value={[optimates]}
              min={0}
              max={100}
              step={1}
              onValueChange={handleOptimatesChange}
              className="cursor-pointer"
            />
          </div>

          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm font-medium">Modérés</span>
              <span className="text-sm font-medium">{moderates} sénateurs ({moderatesPct}%)</span>
            </div>
            <Slider
              value={[moderates]}
              min={0}
              max={100}
              step={1}
              onValueChange={handleModeratesChange}
              className="cursor-pointer"
            />
          </div>

          <div className="pt-4 border-t">
            <div className="flex justify-between">
              <span className="font-medium">Total</span>
              <span className="font-medium">{total} sénateurs</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
