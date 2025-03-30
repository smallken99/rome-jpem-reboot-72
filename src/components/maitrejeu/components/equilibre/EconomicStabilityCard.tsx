
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { CoinsIcon, TrendingUp, ShoppingCart, Wheat } from 'lucide-react';

interface EconomicStabilityCardProps {
  stabilite: number;
  croissance: number;
  commerce: number;
  agriculture: number;
  onUpdate: (values: { stabilite: number; croissance: number; commerce: number; agriculture: number }) => void;
}

export const EconomicStabilityCard: React.FC<EconomicStabilityCardProps> = ({
  stabilite,
  croissance,
  commerce,
  agriculture,
  onUpdate
}) => {
  const handleStabiliteChange = (value: number[]) => {
    onUpdate({ stabilite: value[0], croissance, commerce, agriculture });
  };

  const handleCroissanceChange = (value: number[]) => {
    onUpdate({ stabilite, croissance: value[0], commerce, agriculture });
  };

  const handleCommerceChange = (value: number[]) => {
    onUpdate({ stabilite, croissance, commerce: value[0], agriculture });
  };

  const handleAgricultureChange = (value: number[]) => {
    onUpdate({ stabilite, croissance, commerce, agriculture: value[0] });
  };

  const economyAverage = Math.round((stabilite + croissance + commerce + agriculture) / 4);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <CoinsIcon className="h-5 w-5 mr-2 text-rome-gold" />
          Économie
        </CardTitle>
        <CardDescription>
          Niveau global: {economyAverage}%
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm font-medium flex items-center">
                <CoinsIcon className="h-4 w-4 mr-1 text-rome-gold" />
                Stabilité
              </span>
              <span className="text-sm font-medium">{stabilite}%</span>
            </div>
            <Slider
              value={[stabilite]}
              min={0}
              max={100}
              step={1}
              onValueChange={handleStabiliteChange}
              className="cursor-pointer"
            />
          </div>

          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm font-medium flex items-center">
                <TrendingUp className="h-4 w-4 mr-1 text-green-600" />
                Croissance
              </span>
              <span className="text-sm font-medium">{croissance}%</span>
            </div>
            <Slider
              value={[croissance]}
              min={0}
              max={100}
              step={1}
              onValueChange={handleCroissanceChange}
              className="cursor-pointer"
            />
          </div>

          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm font-medium flex items-center">
                <ShoppingCart className="h-4 w-4 mr-1 text-blue-600" />
                Commerce
              </span>
              <span className="text-sm font-medium">{commerce}%</span>
            </div>
            <Slider
              value={[commerce]}
              min={0}
              max={100}
              step={1}
              onValueChange={handleCommerceChange}
              className="cursor-pointer"
            />
          </div>

          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm font-medium flex items-center">
                <Wheat className="h-4 w-4 mr-1 text-amber-600" />
                Agriculture
              </span>
              <span className="text-sm font-medium">{agriculture}%</span>
            </div>
            <Slider
              value={[agriculture]}
              min={0}
              max={100}
              step={1}
              onValueChange={handleAgricultureChange}
              className="cursor-pointer"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
