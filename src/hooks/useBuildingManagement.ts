
import { useState, useEffect, useCallback } from 'react';
import { useBuildings } from './useBuildings';
import { useBuildingPurchase } from '@/components/proprietes/hooks/building/useBuildingPurchase';
import { useBuildingSale } from '@/components/proprietes/hooks/building/useBuildingSale';
import { useSenatorConstruction } from '@/components/proprietes/hooks/building/useSenatorConstruction';
import { adaptOwnedBuilding, adaptToPropertyBuilding } from '@/utils/buildingAdapter';
import { toast } from 'sonner';
import { OwnedBuilding } from '@/components/proprietes/types/property';

export const useBuildingManagement = () => {
  const {
    buildings,
    stats,
    addBuilding,
    removeBuilding,
    updateBuilding,
    updateBuildingProperty,
    getBuilding,
    getBuildingsByType
  } = useBuildings();
  
  const { purchaseBuilding, isLoading: isPurchasing } = useBuildingPurchase();
  const { sellBuilding, isLoading: isSelling } = useBuildingSale();
  const senatorConstruction = useSenatorConstruction();
  const [selectedBuilding, setSelectedBuilding] = useState<OwnedBuilding | null>(buildings[0] || null);
  
  useEffect(() => {
    if (buildings.length > 0 && !selectedBuilding) {
      setSelectedBuilding(buildings[0]);
    }
  }, [buildings, selectedBuilding]);
  
  const handleAddProperty = useCallback((
    buildingId: string,
    buildingType: 'urban' | 'rural' | 'religious' | 'public',
    location: string,
    customName?: string
  ) => {
    if (!buildingId) return false;
    
    try {
      // Récupérer les détails du bâtiment depuis une source de données
      const buildingDetails = {
        buildingId,
        type: buildingType,
        name: customName || `Nouveau bâtiment ${buildingType}`,
        location,
        initialCost: 50000, // À remplacer par des valeurs réelles
        maintenanceCost: 2000, // À remplacer par des valeurs réelles
      };
      
      // Appel à la fonction d'achat
      return purchaseBuilding(buildingDetails);
    } catch (error) {
      console.error("Erreur lors de l'ajout de la propriété:", error);
      toast.error("Une erreur est survenue lors de l'ajout de la propriété");
      return false;
    }
  }, [purchaseBuilding]);
  
  // Fonction pour mettre à jour la condition d'un bâtiment
  const updateBuildingCondition = useCallback((buildingId: string): boolean => {
    const building = getBuilding(String(buildingId));
    if (!building) return false;
    
    try {
      updateBuildingProperty(String(buildingId), 'condition', 100);
      toast.success("Bâtiment entièrement rénové");
      return true;
    } catch (error) {
      console.error("Erreur lors de la mise à jour de l'état du bâtiment:", error);
      toast.error("Une erreur est survenue lors de la rénovation");
      return false;
    }
  }, [getBuilding, updateBuildingProperty]);
  
  // Assigner des esclaves à un bâtiment
  const assignSlaves = useCallback((buildingId: string, slaveCount: number): boolean => {
    try {
      updateBuildingProperty(buildingId, 'slaves', slaveCount);
      toast.success(`${slaveCount} esclaves assignés au bâtiment`);
      return true;
    } catch (error) {
      console.error("Erreur lors de l'assignation d'esclaves:", error);
      toast.error("Une erreur est survenue");
      return false;
    }
  }, [updateBuildingProperty]);
  
  return {
    buildings,
    selectedBuilding,
    setSelectedBuilding,
    stats,
    addBuilding,
    removeBuilding,
    sellBuilding,
    updateBuildingProperty,
    updateBuildingCondition,
    getBuilding,
    handleAddProperty,
    assignSlaves,
    isPurchasing,
    isSelling,
    // Fonctions de construction des sénateurs
    senatorConstruction
  };
};
