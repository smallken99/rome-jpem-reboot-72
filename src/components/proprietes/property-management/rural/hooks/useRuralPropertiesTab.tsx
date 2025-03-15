
import { useState } from 'react';
import { useBuildingInventory } from '../../hooks/building/useBuildingInventory';
import { useBuildingPurchase } from '../../hooks/building/useBuildingPurchase';
import { useBuildingSale } from '../hooks/useBuildingSale';
import { useBuildingMaintenance } from '../../hooks/building/useBuildingMaintenance';
import { useSlaveAssignment } from '../../hooks/building/useSlaveAssignment';
import { usePatrimoine } from '@/hooks/usePatrimoine';
import { OwnedBuilding } from '../../hooks/building/types';
import { ruralPropertiesMock } from '../../../data/buildings/ruralProperties';

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
    ? ruralPropertiesMock.find(prop => prop.id === selectedPropertyId) 
    : null;

  // Fonction d'adaptation pour maintenir la compatibilité avec l'interface
  const calculateBuildingValue = (buildingId: number) => {
    // Convertir l'ID en string pour la recherche
    const building = ownedBuildings.find(b => b.id === buildingId.toString());
    if (!building) return 0;
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
    ruralProperties: ruralPropertiesMock,
    balance,
    
    // Fonctions
    toggleMaintenance,
    performMaintenance: (buildingId: number) => {
      performMaintenance(buildingId);
      return true; // Pour la compatibilité avec l'interface
    },
    sellBuilding: (buildingId: number) => {
      return saleBuilding(buildingId);
    },
    calculateBuildingValue,
    assignSlaves,
    handlePurchase,
    availableSlaves,
    
    // Compatibilité useRuralPropertyCalculator
    buildings: ownedBuildings,
    handleAddProperty: (buildingId: string, buildingType: "rural" | "urban" | "religious" | "public", location: string, customName?: string) => {
      // Implémentation simplifiée
      return true;
    }
  };
};
