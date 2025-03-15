
import { useState } from 'react';
import { useBuildingInventory } from '@/components/proprietes/hooks/building/useBuildingInventory';
import { useBuildingPurchase } from '@/components/proprietes/hooks/building/useBuildingPurchase';
import { useBuildingSale } from '@/components/proprietes/hooks/building/useBuildingSale';
import { useBuildingMaintenance } from '@/components/proprietes/hooks/building/useBuildingMaintenance';
import { useSlaveAssignment } from '@/components/proprietes/hooks/building/useSlaveAssignment';
import { usePatrimoine } from '@/hooks/usePatrimoine';
import { OwnedBuilding } from '@/components/proprietes/hooks/building/types';
import { urbanResidentialBuildings } from '../../../data/buildings/urbanResidentialBuildings';
import { publicBuildings } from '../../../data/buildings/publicBuildings';
import { religiousBuildings } from '../../../data/buildings/religiousBuildings';
import { militaryBuildings } from '../../../data/buildings/militaryBuildings';

// Type pour les bâtiments urbains
type AllowedBuildingType = 'residential' | 'religious' | 'public' | 'military';

export const useUrbanPropertiesTab = () => {
  // États
  const [selectedBuildingType, setSelectedBuildingType] = useState<AllowedBuildingType>('residential');
  const [selectedBuildingId, setSelectedBuildingId] = useState<string | null>(null);
  const [purchaseDialogOpen, setPurchaseDialogOpen] = useState(false);
  
  // Hooks
  const { ownedBuildings } = useBuildingInventory();
  const { handlePurchase } = useBuildingPurchase();
  const { saleBuilding, estimateBuildingValue, sellBuilding } = useBuildingSale();
  const { toggleMaintenance, performMaintenance } = useBuildingMaintenance();
  const { assignSlaves, availableSlaves } = useSlaveAssignment();
  const { balance } = usePatrimoine();

  // Filtrer les bâtiments selon le type
  const filteredOwnedBuildings = ownedBuildings.filter(building => {
    if (selectedBuildingType === 'residential') return building.buildingType === 'urban';
    if (selectedBuildingType === 'religious') return building.buildingType === 'religious';
    if (selectedBuildingType === 'public') return building.buildingType === 'public';
    if (selectedBuildingType === 'military') return building.buildingType === 'military';
    return false;
  });

  // Obtenir les détails du bâtiment sélectionné
  const getBuildingsList = () => {
    switch (selectedBuildingType) {
      case 'residential': return urbanResidentialBuildings;
      case 'religious': return religiousBuildings;
      case 'public': return publicBuildings;
      case 'military': return militaryBuildings;
      default: return [];
    }
  };

  const selectedBuildingDetails = selectedBuildingId 
    ? getBuildingsList().find(b => b.id === selectedBuildingId) 
    : null;
  
  // Fonction pour calculer la valeur d'un bâtiment
  const calculateBuildingValue = (buildingId: number): number => {
    return estimateBuildingValue(buildingId);
  };

  return {
    // États
    selectedBuildingType,
    setSelectedBuildingType,
    selectedBuildingId,
    setSelectedBuildingId,
    selectedBuildingDetails,
    purchaseDialogOpen,
    setPurchaseDialogOpen,
    
    // Données
    balance,
    availableSlaves,
    filteredOwnedBuildings,
    
    // Fonctions
    sellBuilding,
    calculateBuildingValue,
    toggleMaintenance,
    performMaintenance: (buildingId: number): boolean => {
      performMaintenance(buildingId);
      return true; // Pour la compatibilité de l'interface
    },
    assignSlaves,
    
    // Compatibilité
    buildings: ownedBuildings,
    handleAddProperty: (buildingId: string, buildingType: "rural" | "urban" | "religious" | "public", location: string, customName?: string): boolean => {
      // Implémentation simplifiée
      return true;
    }
  };
};
