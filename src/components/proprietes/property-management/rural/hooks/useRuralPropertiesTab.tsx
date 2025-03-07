
import { useState } from 'react';
import { ruralProperties } from '../../../data/buildings';
import { useBuildingManagement } from '../../../hooks/useBuildingManagement';
import { usePatrimoine } from '@/hooks/usePatrimoine';
import { BuildingDescription } from '../../../data/types/buildingTypes';

export const useRuralPropertiesTab = () => {
  const [selectedPropertyId, setSelectedPropertyId] = useState<string | null>(null);
  const [purchaseDialogOpen, setPurchaseDialogOpen] = useState(false);
  const [propertySize, setPropertySize] = useState('medium');
  const [propertyLocation, setPropertyLocation] = useState('countryside');
  
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
  
  // Récupération des détails de la propriété sélectionnée
  const propertyDetails = selectedPropertyId ? ruralProperties[selectedPropertyId] || null : null;
  
  // Filtrer les propriétés rurales possédées
  const ownedRuralProperties = ownedBuildings.filter(building => building.buildingType === 'rural');
  
  // Fonction pour traiter l'achat
  const handlePurchase = (
    buildingId: string, 
    buildingType: 'urban' | 'rural' | 'religious' | 'public', 
    location: string, 
    customName?: string
  ) => {
    if (!propertyDetails) return false;
    
    return purchaseBuilding(propertyDetails, buildingId, buildingType, location, customName);
  };
  
  // Nombre total d'esclaves disponibles
  const totalAssignedSlaves = ownedBuildings.reduce((sum, building) => sum + building.slaves, 0);
  const totalSlaves = 25; // Simulé - à remplacer par la source réelle
  const availableSlaves = totalSlaves - totalAssignedSlaves;

  return {
    selectedPropertyId,
    setSelectedPropertyId,
    purchaseDialogOpen,
    setPurchaseDialogOpen,
    propertySize,
    setPropertySize,
    propertyLocation,
    setPropertyLocation,
    propertyDetails,
    ownedRuralProperties,
    ruralProperties,
    balance,
    toggleMaintenance,
    performMaintenance,
    sellBuilding,
    calculateBuildingValue,
    assignSlaves,
    handlePurchase,
    availableSlaves
  };
};
