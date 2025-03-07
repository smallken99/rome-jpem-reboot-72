
import { useState } from 'react';
import { urbanResidentialBuildings, religiousBuildings, publicBuildings } from '../../../data/buildings';
import { useBuildingManagement } from '../../../hooks/useBuildingManagement';
import { usePatrimoine } from '@/hooks/usePatrimoine';
import { BuildingDescription } from '../../../data/types/buildingTypes';

export const useUrbanPropertiesTab = () => {
  const [selectedBuildingType, setSelectedBuildingType] = useState<'residential' | 'religious' | 'public'>('residential');
  const [selectedBuildingId, setSelectedBuildingId] = useState<string | null>(null);
  const [purchaseDialogOpen, setPurchaseDialogOpen] = useState(false);
  
  const { 
    ownedBuildings, 
    purchaseBuilding, 
    sellBuilding, 
    toggleMaintenance, 
    performMaintenance, 
    calculateBuildingValue,
    assignSlaves 
  } = useBuildingManagement();
  
  const { balance } = usePatrimoine();
  
  // Récupération des données du bâtiment sélectionné
  const getBuildingDetails = (): BuildingDescription | null => {
    if (!selectedBuildingId) return null;
    
    switch (selectedBuildingType) {
      case 'residential':
        return urbanResidentialBuildings[selectedBuildingId] || null;
      case 'religious':
        return religiousBuildings[selectedBuildingId] || null;
      case 'public':
        return publicBuildings[selectedBuildingId] || null;
      default:
        return null;
    }
  };
  
  const selectedBuildingDetails = getBuildingDetails();
  
  // Filtrer les bâtiments possédés selon le type
  const filteredOwnedBuildings = ownedBuildings.filter(building => {
    switch (selectedBuildingType) {
      case 'residential':
        return building.buildingType === 'urban';
      case 'religious':
        return building.buildingType === 'religious';
      case 'public':
        return building.buildingType === 'public';
      default:
        return false;
    }
  });
  
  // Fonction pour traiter l'achat
  const handlePurchase = (
    buildingId: string, 
    buildingType: 'urban' | 'rural' | 'religious' | 'public', 
    location: string, 
    customName?: string
  ) => {
    const buildingDetails = getBuildingDetails();
    
    if (!buildingDetails) return false;
    
    return purchaseBuilding(buildingDetails, buildingId, buildingType, location, customName);
  };
  
  // Nombre total d'esclaves disponibles
  const totalAssignedSlaves = ownedBuildings.reduce((sum, building) => sum + building.slaves, 0);
  const totalSlaves = 25; // Simulé - à remplacer par la source réelle
  const availableSlaves = totalSlaves - totalAssignedSlaves;
  
  return {
    selectedBuildingType,
    setSelectedBuildingType,
    selectedBuildingId,
    setSelectedBuildingId,
    purchaseDialogOpen,
    setPurchaseDialogOpen,
    selectedBuildingDetails,
    filteredOwnedBuildings,
    handlePurchase,
    balance,
    toggleMaintenance,
    performMaintenance,
    sellBuilding,
    calculateBuildingValue,
    assignSlaves,
    availableSlaves
  };
};
