
import React from 'react';
import { RomanCard } from '@/components/ui-custom/RomanCard';
import { PublicBuilding } from '../hooks/useBatimentsPublics';
import { BatimentsTable } from '../BatimentsTable';
import { militaryBuildings } from '@/components/proprietes/data/buildings/militaryBuildings';
import { Badge } from '@/components/ui/badge';
import { Shield } from 'lucide-react';

interface MilitaryBuildingsTabContentProps {
  buildings: PublicBuilding[];
  onViewDetails: (building: PublicBuilding) => void;
  onMaintain: (buildingId: string) => void;
}

export const MilitaryBuildingsTabContent: React.FC<MilitaryBuildingsTabContentProps> = ({
  buildings,
  onViewDetails,
  onMaintain
}) => {
  // Filtrer les bâtiments militaires
  const militaryStructures = buildings.filter(building => 
    Object.keys(militaryBuildings).some(key => 
      building.buildingTypeId === key || building.name.toLowerCase().includes('militaire')
    )
  );

  return (
    <RomanCard>
      <RomanCard.Header>
        <div className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-rome-navy" />
          <h2 className="font-cinzel text-lg">Structures Militaires</h2>
        </div>
      </RomanCard.Header>
      <RomanCard.Content>
        <div className="mb-4 flex items-center gap-2">
          <p className="text-muted-foreground">
            Structures militaires et bâtiments stratégiques de la République.
          </p>
          <Badge variant="outline" className="border-rome-gold text-rome-gold">
            Défense Nationale
          </Badge>
        </div>
        
        {militaryStructures.length === 0 ? (
          <div className="text-center py-8 border border-dashed rounded-md">
            <p className="text-muted-foreground">
              Aucune structure militaire n'est actuellement répertoriée.
            </p>
          </div>
        ) : (
          <BatimentsTable 
            buildings={militaryStructures}
            type="buildings"
            onViewDetails={onViewDetails}
            onMaintain={onMaintain}
          />
        )}
      </RomanCard.Content>
    </RomanCard>
  );
};
