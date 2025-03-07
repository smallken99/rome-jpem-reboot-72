
import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tractor } from 'lucide-react';
import { allBuildingTypes } from '../../data/buildings';

export interface RuralPropertySelectorProps {
  selectedId: string;
  onSelect: (id: string) => void;
  propertySize: string;
  setPropertySize: (size: string) => void;
  propertyLocation: string;
  setPropertyLocation: (location: string) => void;
}

export const RuralPropertySelector: React.FC<RuralPropertySelectorProps> = ({
  selectedId,
  onSelect,
  propertySize,
  setPropertySize,
  propertyLocation,
  setPropertyLocation
}) => {
  const buildings = allBuildingTypes.rural as {
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
                <Tractor className="h-4 w-4" />
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
