
import React from 'react';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { PropertyCard } from '../../PropertyCard';
import { OwnedBuilding, BuildingDescription } from '../../../hooks/building/types';

interface OwnedUrbanPropertiesSectionProps {
  buildings: OwnedBuilding[];
  onSell: (id: number | string) => boolean;
  estimatedValue: (building: OwnedBuilding) => number;
}

export const OwnedUrbanPropertiesSection: React.FC<OwnedUrbanPropertiesSectionProps> = ({
  buildings,
  onSell,
  estimatedValue
}) => {
  // Convertir un ID de type string en number si nécessaire
  const handleSell = (id: number | string) => {
    return onSell(id);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="font-cinzel text-lg text-rome-navy">Mes Propriétés Urbaines</h3>
      </div>
      
      {buildings.length === 0 ? (
        <div className="bg-white border border-rome-gold/30 rounded-md p-8 text-center">
          <p className="text-muted-foreground">
            Vous ne possédez pas encore de propriétés urbaines.
          </p>
          <Button 
            className="roman-btn mt-4"
          >
            <PlusCircle className="mr-1 h-4 w-4" />
            Acquérir votre première propriété
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {buildings.map((building) => {
            const value = estimatedValue(building);
            
            return (
              <PropertyCard
                key={building.id}
                name={building.name}
                location={building.location}
                value={`${value.toLocaleString()} As`}
                type={"Résidence principale" as any}
                status={building.condition > 90 ? "Excellent" : building.condition > 70 ? "Bon" : building.condition > 50 ? "Moyen" : "Mauvais"}
                revenue={`${(value * 0.05).toLocaleString()} As/an`}
                maintenance={`${building.maintenanceCost.toLocaleString()} As/an`}
                benefits={[]}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};
