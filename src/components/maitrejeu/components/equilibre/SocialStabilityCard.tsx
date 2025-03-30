
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Users, Crown, Gavel, Lock } from 'lucide-react';

interface SocialStabilityCardProps {
  plebeiens: number;
  patriciens: number;
  esclaves: number;
  cohesion: number;
  onUpdate: (values: { plebeiens: number; patriciens: number; esclaves: number; cohesion: number }) => void;
}

export const SocialStabilityCard: React.FC<SocialStabilityCardProps> = ({
  plebeiens,
  patriciens,
  esclaves,
  cohesion,
  onUpdate
}) => {
  const handlePlebeiensChange = (value: number[]) => {
    onUpdate({ plebeiens: value[0], patriciens, esclaves, cohesion });
  };

  const handlePatriciensChange = (value: number[]) => {
    onUpdate({ plebeiens, patriciens: value[0], esclaves, cohesion });
  };

  const handleEsclavesChange = (value: number[]) => {
    onUpdate({ plebeiens, patriciens, esclaves: value[0], cohesion });
  };

  const handleCohesionChange = (value: number[]) => {
    onUpdate({ plebeiens, patriciens, esclaves, cohesion: value[0] });
  };

  const socialAverage = Math.round((plebeiens + patriciens + esclaves + cohesion) / 4);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Users className="h-5 w-5 mr-2 text-blue-600" />
          Social
        </CardTitle>
        <CardDescription>
          Niveau global: {socialAverage}%
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm font-medium flex items-center">
                <Users className="h-4 w-4 mr-1 text-blue-600" />
                Plébéiens
              </span>
              <span className="text-sm font-medium">{plebeiens}%</span>
            </div>
            <Slider
              value={[plebeiens]}
              min={0}
              max={100}
              step={1}
              onValueChange={handlePlebeiensChange}
              className="cursor-pointer"
            />
          </div>

          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm font-medium flex items-center">
                <Crown className="h-4 w-4 mr-1 text-rome-purple" />
                Patriciens
              </span>
              <span className="text-sm font-medium">{patriciens}%</span>
            </div>
            <Slider
              value={[patriciens]}
              min={0}
              max={100}
              step={1}
              onValueChange={handlePatriciensChange}
              className="cursor-pointer"
            />
          </div>

          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm font-medium flex items-center">
                <Lock className="h-4 w-4 mr-1 text-gray-600" />
                Esclaves
              </span>
              <span className="text-sm font-medium">{esclaves}%</span>
            </div>
            <Slider
              value={[esclaves]}
              min={0}
              max={100}
              step={1}
              onValueChange={handleEsclavesChange}
              className="cursor-pointer"
            />
          </div>

          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm font-medium flex items-center">
                <Gavel className="h-4 w-4 mr-1 text-rome-navy" />
                Cohésion Sociale
              </span>
              <span className="text-sm font-medium">{cohesion}%</span>
            </div>
            <Slider
              value={[cohesion]}
              min={0}
              max={100}
              step={1}
              onValueChange={handleCohesionChange}
              className="cursor-pointer"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
