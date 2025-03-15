
import { useState } from 'react';
import { useBuildingInventory } from '../../hooks/building/useBuildingInventory';
import { useBuildingPurchase } from '../../hooks/building/useBuildingPurchase';
import { useBuildingSale } from '../../hooks/building/useBuildingSale';
import { useBuildingMaintenance } from '../../hooks/building/useBuildingMaintenance';
import { useSlaveAssignment } from '../../hooks/building/useSlaveAssignment';
import { usePatrimoine } from '@/hooks/usePatrimoine';
import { OwnedBuilding } from '../../hooks/building/types';
import { urbanResidentialBuildingsMock } from '../../../data/buildings/urbanResidentialBuildings';
import { publicBuildingsMock } from '../../../data/buildings/publicBuildings';
import { religiousBuildingsMock } from '../../../data/buildings/religiousBuildings';
import { militaryBuildingsMock } from '../../../data/buildings/militaryBuildings';

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
    if (selectedBuildingType === 'military') return building.category === 'military';
    return false;
  });

  // Obtenir les détails du bâtiment sélectionné
  const getBuildingsList = () => {
    switch (selectedBuildingType) {
      case 'residential': return urbanResidentialBuildingsMock;
      case 'religious': return religiousBuildingsMock;
      case 'public': return publicBuildingsMock;
      case 'military': return militaryBuildingsMock;
      default: return [];
    }
  };

  const selectedBuildingDetails = selectedBuildingId 
    ? getBuildingsList().find(b => b.id === selectedBuildingId) 
    : null;
  
  // Fonction d'adaptation pour maintenir la compatibilité
  const calculateBuildingValue = (buildingId: number) => {
    const building = ownedBuildings.find(b => b.id === buildingId.toString());
    if (!building) return 0;
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
    sellBuilding: (buildingId: number) => {
      return saleBuilding(buildingId);
    },
    calculateBuildingValue,
    toggleMaintenance,
    performMaintenance: (buildingId: number) => {
      performMaintenance(buildingId);
      return true; // Pour la compatibilité de l'interface
    },
    assignSlaves,
    
    // Compatibilité
    buildings: ownedBuildings,
    handleAddProperty: (buildingId: string, buildingType: "rural" | "urban" | "religious" | "public", location: string, customName?: string) => {
      // Implémentation simplifiée
      return true;
    }
  };
};
