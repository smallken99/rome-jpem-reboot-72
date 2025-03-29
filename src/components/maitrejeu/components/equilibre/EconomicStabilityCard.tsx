
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Equilibre } from '@/types/equilibre';

interface EconomicStabilityCardProps {
  economie: number;
  onUpdate: (economie: number) => void;
  equilibre: Equilibre;
}

export const EconomicStabilityCard: React.FC<EconomicStabilityCardProps> = ({
  economie,
  onUpdate,
  equilibre
}) => {
  // Gérer les changements
  const handleEconomyChange = (value: number[]) => {
    onUpdate(value[0]);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Économie</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between">
              <label className="text-sm font-medium">Stabilité économique</label>
              <span className="text-sm">{economie}%</span>
            </div>
            <Slider
              defaultValue={[economie]}
              max={100}
              min={0}
              step={1}
              onValueChange={handleEconomyChange}
            />
          </div>

          <div className="mt-4 text-sm text-muted-foreground">
            <p>Facteurs d'influence:</p>
            <ul className="list-disc pl-5 mt-1 space-y-1">
              <li>Trésor public: {equilibre.economie > 70 ? "Excédentaire" : (equilibre.economie > 40 ? "Stable" : "Déficitaire")}</li>
              <li>Commerce: {equilibre.economie > 60 ? "Florissant" : (equilibre.economie > 30 ? "Normal" : "En difficulté")}</li>
              <li>Récoltes: {equilibre.economie > 50 ? "Bonnes" : (equilibre.economie > 25 ? "Moyennes" : "Mauvaises")}</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
