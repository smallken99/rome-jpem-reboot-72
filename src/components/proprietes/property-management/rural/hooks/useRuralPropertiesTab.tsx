
import { useState } from 'react';
import { useBuildingInventory } from '@/components/proprietes/hooks/building/useBuildingInventory';
import { useBuildingPurchase } from '@/components/proprietes/hooks/building/useBuildingPurchase';
import { useBuildingSale } from './useBuildingSale';
import { useBuildingMaintenance } from '@/components/proprietes/hooks/building/useBuildingMaintenance';
import { useSlaveAssignment } from '@/components/proprietes/hooks/building/useSlaveAssignment';
import { usePatrimoine } from '@/hooks/usePatrimoine';
import { OwnedBuilding } from '@/components/proprietes/hooks/building/types';
import { ruralProperties } from '../../../data/buildings/ruralProperties';

export const useRuralPropertiesTab = () => {
  // États
  const [selectedPropertyId, setSelectedPropertyId] = useState<string | null>(null);
  const [purchaseDialogOpen, setPurchaseDialogOpen] = useState(false);
  const [propertySize, setPropertySize] = useState('medium');
  const [propertyLocation, setPropertyLocation] = useState('latium');

  // Hooks
  const { ownedBuildings } = useBuildingInventory();
  const { handlePurchase } = useBuildingPurchase();
  const { saleBuilding, estimateBuildingValue, sellBuilding } = useBuildingSale();
  const { toggleMaintenance, performMaintenance } = useBuildingMaintenance();
  const { assignSlaves, availableSlaves } = useSlaveAssignment();
  const { balance } = usePatrimoine();

  // Propriétés filtrées
  const ownedRuralProperties = ownedBuildings.filter(building => building.buildingType === 'rural');
  
  // Trouver les détails d'une propriété sélectionnée
  const propertyDetails = selectedPropertyId 
    ? ruralProperties.find(prop => prop.id === selectedPropertyId) 
    : null;

  // Fonction pour calculer la valeur d'un bâtiment
  const calculateBuildingValue = (buildingId: number): number => {
    return estimateBuildingValue(buildingId);
  };

  return {
    // États
    selectedPropertyId,
    setSelectedPropertyId,
    purchaseDialogOpen,
    setPurchaseDialogOpen,
    propertySize,
    setPropertySize,
    propertyLocation,
    setPropertyLocation,
    
    // Données
    propertyDetails,
    ownedRuralProperties,
    ruralProperties,
    balance,
    
    // Fonctions
    toggleMaintenance,
    performMaintenance: (buildingId: number): boolean => {
      performMaintenance(buildingId);
      return true; // Pour la compatibilité avec l'interface
    },
    sellBuilding,
    calculateBuildingValue,
    assignSlaves,
    handlePurchase,
    availableSlaves,
    
    // Compatibilité useRuralPropertyCalculator
    buildings: ownedBuildings,
    handleAddProperty: (buildingId: string, buildingType: "rural" | "urban" | "religious" | "public", location: string, customName?: string): boolean => {
      // Implémentation simplifiée
      return true;
    }
  };
};
