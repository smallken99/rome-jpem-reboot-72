
import React from 'react';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { PropertyCard } from '../../PropertyCard';
import { OwnedBuilding } from '../../../hooks/building/types';
import { BuildingDescription } from '../../../data/types/buildingTypes';
import { urbanResidentialBuildings, religiousBuildings, publicBuildings } from '../../../data/buildings';

interface OwnedUrbanPropertiesSectionProps {
  selectedBuildingType: 'residential' | 'religious' | 'public' | 'military';
  filteredOwnedBuildings: OwnedBuilding[];
  balance: number;
  availableSlaves: number;
  setPurchaseDialogOpen: (open: boolean) => void;
  toggleMaintenance: (buildingId: number) => boolean;
  performMaintenance: (buildingId: number) => boolean;
  assignSlaves: (buildingId: number, slaveCount: number) => void;
  sellBuilding: (buildingId: number, estimatedValue: number) => boolean;
  calculateBuildingValue: (buildingId: number) => number;
}

export const OwnedUrbanPropertiesSection: React.FC<OwnedUrbanPropertiesSectionProps> = ({
  selectedBuildingType,
  filteredOwnedBuildings,
  balance,
  availableSlaves,
  setPurchaseDialogOpen,
  toggleMaintenance,
  performMaintenance,
  assignSlaves,
  sellBuilding,
  calculateBuildingValue
}) => {
  // Titre de la section en fonction du type de bâtiment
  const getBuildingSectionTitle = () => {
    switch (selectedBuildingType) {
      case 'residential': return 'Résidentielles';
      case 'religious': return 'Religieuses';
      case 'public': return 'Publiques';
      case 'military': return 'Militaires';
      default: return '';
    }
  };

  // Fonction auxiliaire pour adapter l'ID de type string en numérique
  const adaptId = (id: string | number): number => {
    return typeof id === 'string' ? parseInt(id, 10) : id;
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="font-cinzel text-lg text-rome-navy">
          Mes Propriétés {getBuildingSectionTitle()}
        </h3>
        
        <Button
          variant="outline"
          size="sm"
          className="roman-btn-outline"
          onClick={() => setPurchaseDialogOpen(true)}
        >
          <PlusCircle className="mr-1 h-4 w-4" />
          Nouvelle acquisition
        </Button>
      </div>
      
      {filteredOwnedBuildings.length === 0 ? (
        <div className="bg-white border border-rome-gold/30 rounded-md p-8 text-center">
          <p className="text-muted-foreground">
            Vous ne possédez pas encore de propriétés de ce type.
          </p>
          <Button 
            className="roman-btn mt-4"
            onClick={() => setPurchaseDialogOpen(true)}
          >
            <PlusCircle className="mr-1 h-4 w-4" />
            Acquérir votre première propriété
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredOwnedBuildings.map((building) => {
            // Déterminer le type de bâtiment pour obtenir les détails
            let buildingDetails: BuildingDescription | null = null;
            
            if (building.buildingType === 'urban') {
              buildingDetails = urbanResidentialBuildings[building.buildingId] || null;
            } else if (building.buildingType === 'religious') {
              buildingDetails = religiousBuildings[building.buildingId] || null;
            } else if (building.buildingType === 'public') {
              buildingDetails = publicBuildings[building.buildingId] || null;
            }
            
            // Adapter l'ID pour les fonctions attendant un nombre
            const numericId = adaptId(building.id);
            
            return (
              <PropertyCard
                key={building.id}
                building={building}
                buildingDetails={buildingDetails}
                onToggleMaintenance={() => toggleMaintenance(numericId)}
                onPerformMaintenance={() => performMaintenance(numericId)}
                onAssignSlaves={(slaveCount) => assignSlaves(numericId, slaveCount)}
                onSell={() => sellBuilding(numericId, calculateBuildingValue(numericId))}
                balance={balance}
                totalAvailableSlaves={availableSlaves + building.slaves}
                buildingValue={calculateBuildingValue(numericId)}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};
