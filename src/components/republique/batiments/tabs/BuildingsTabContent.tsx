
import React from 'react';
import { RomanCard } from '@/components/ui-custom/RomanCard';
import { PublicBuilding } from '../hooks/useBatimentsPublics';
import { BatimentsTable } from '../BatimentsTable';

interface BuildingsTabContentProps {
  buildings: PublicBuilding[];
  onViewDetails: (building: PublicBuilding) => void;
  onMaintain: (buildingId: string) => void;
}

export const BuildingsTabContent: React.FC<BuildingsTabContentProps> = ({
  buildings,
  onViewDetails,
  onMaintain
}) => {
  return (
    <RomanCard>
      <RomanCard.Header>
        <h2 className="font-cinzel text-lg">Infrastructure publique de Rome</h2>
      </RomanCard.Header>
      <RomanCard.Content>
        <p className="text-muted-foreground mb-4">
          Les bâtiments publics sont essentiels au bon fonctionnement et au prestige de la République. 
          En tant que magistrat, vous avez la responsabilité de veiller à leur entretien.
        </p>
        <BatimentsTable 
          buildings={buildings}
          type="buildings"
          onViewDetails={onViewDetails}
          onMaintain={onMaintain}
        />
      </RomanCard.Content>
    </RomanCard>
  );
};
