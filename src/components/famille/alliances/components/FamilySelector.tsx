
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

type Family = {
  id: string;
  name: string;
  prestige: string;
  influence: string;
  wealth: string;
};

interface FamilySelectorProps {
  families: Family[];
  selectedFamily: string;
  onSelectFamily: (familyId: string) => void;
}

export const FamilySelector: React.FC<FamilySelectorProps> = ({
  families,
  selectedFamily,
  onSelectFamily
}) => {
  return (
    <div className="space-y-4">
      <h3 className="font-cinzel text-lg mb-4">Familles Disponibles</h3>
      
      <RadioGroup value={selectedFamily} onValueChange={onSelectFamily}>
        <div className="space-y-3">
          {families.map(family => (
            <div
              key={family.id}
              className={`border rounded-lg p-4 transition-all ${
                selectedFamily === family.id 
                  ? 'border-primary bg-primary/5' 
                  : 'hover:border-slate-400'
              }`}
            >
              <RadioGroupItem 
                value={family.id} 
                id={`family-${family.id}`}
                className="peer sr-only"
              />
              <Label
                htmlFor={`family-${family.id}`}
                className="flex flex-col cursor-pointer"
              >
                <span className="text-lg font-medium">{family.name}</span>
                <span className="text-sm text-gray-500 mt-1">
                  Prestige: {family.prestige}
                </span>
                <div className="grid grid-cols-2 gap-x-4 gap-y-2 mt-3 text-sm">
                  <div>
                    <span className="text-gray-500">Influence:</span>
                    <span className="ml-2 font-medium">{family.influence}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Richesse:</span>
                    <span className="ml-2 font-medium">{family.wealth}</span>
                  </div>
                </div>
              </Label>
            </div>
          ))}
        </div>
      </RadioGroup>
    </div>
  );
};
