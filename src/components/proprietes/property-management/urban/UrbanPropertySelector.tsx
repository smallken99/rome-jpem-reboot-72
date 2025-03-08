
import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Building } from 'lucide-react';
import { allBuildingTypes } from '../../data/buildings';

export interface UrbanPropertySelectorProps {
  buildingType: 'residential' | 'religious' | 'public' | 'military';
  selectedId: string;
  onSelect: (id: string) => void;
}

export const UrbanPropertySelector: React.FC<UrbanPropertySelectorProps> = ({
  buildingType,
  selectedId,
  onSelect,
}) => {
  const buildings = allBuildingTypes[
    buildingType === 'residential'
      ? 'urbanResidential'
      : buildingType
  ] as {
    [key: string]: {
      name: string;
      description: string;
    };
  };

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Object.entries(buildings).map(([id, building]) => (
          <Card
            key={id}
            className={`cursor-pointer hover:bg-accent hover:text-accent-foreground ${
              selectedId === id ? 'bg-accent text-accent-foreground' : ''
            }`}
            onClick={() => onSelect(id)}
          >
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building className="h-4 w-4" />
                {building.name}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>{building.description}</CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
