
import { useState, useCallback } from 'react';
import { useBuildingInventory } from './building/useBuildingInventory';
import { useBuildingPurchase } from './building/useBuildingPurchase';
import { useBuildingSale } from './building/useBuildingSale';
import { useBuildingMaintenance } from './building/useBuildingMaintenance';
import { useSlaveAssignment } from './building/useSlaveAssignment';
import { OwnedBuilding, BuildingPurchaseOptions } from './building/types';
import { usePatrimoine } from '@/hooks/usePatrimoine';
import { toast } from 'sonner';

// Re-export the OwnedBuilding type
export type { OwnedBuilding } from './building/types';

// Unified hook that combines all building management hooks
export function useBuildingManagement() {
  const [selectedBuilding, setSelectedBuilding] = useState<OwnedBuilding | null>(null);
  const [isPurchaseDialogOpen, setIsPurchaseDialogOpen] = useState(false);
  const [isSaleDialogOpen, setIsSaleDialogOpen] = useState(false);
  const [isMaintenanceDialogOpen, setIsMaintenanceDialogOpen] = useState(false);
  const [isConstructionDialogOpen, setIsConstructionDialogOpen] = useState(false);
  
  // Use the individual hooks
  const { 
    ownedBuildings, addBuilding, removeBuilding, updateBuildingProperty
  } = useBuildingInventory();
  
  const { 
    isLoading: isPurchaseLoading, 
    purchaseBuilding 
  } = useBuildingPurchase();
  
  const { 
    isLoading: isSaleLoading, 
    calculateBuildingValue,
    sellBuilding,
    calculateBuildingValueById
  } = useBuildingSale();
  
  const { 
    isLoading: isMaintenanceLoading, 
    toggleMaintenance, 
    performMaintenance,
    needsMaintenance,
    calculateMaintenanceCost,
    getMaintenanceOptions
  } = useBuildingMaintenance();
  
  const { 
    assignSlaves 
  } = useSlaveAssignment();
  
  const { balance } = usePatrimoine();
  
  // Combine loading states
  const isLoading = isPurchaseLoading || isSaleLoading || isMaintenanceLoading;

  // Handle building purchase
  const handlePurchaseBuilding = async (options: BuildingPurchaseOptions): Promise<boolean> => {
    try {
      const result = await purchaseBuilding(options);
      if (result) {
        toast.success(`${options.name} acquis avec succès!`);
        return true;
      }
      return false;
    } catch (error) {
      console.error("Erreur lors de l'achat:", error);
      toast.error("Une erreur est survenue lors de l'achat");
      return false;
    }
  };
  
  // Handle adding a new property
  const handleAddProperty = (
    buildingId: string,
    buildingType: "urban" | "rural" | "religious" | "public",
    location: string,
    customName?: string
  ): boolean => {
    try {
      // Générer un ID unique 
      const newId = Date.now();
      
      // Ajouter le bâtiment à l'inventaire
      addBuilding({
        id: newId,
        buildingId,
        name: customName || `Bâtiment ${buildingType} à ${location}`,
        buildingType,
        location,
        maintenanceEnabled: true,
        maintenanceCost: 1000, // Default value
        slaves: 0,
        condition: 100,
        purchaseDate: new Date()
      });
      
      toast.success(`Propriété ${buildingType} ajoutée avec succès!`);
      return true;
    } catch (error) {
      console.error("Erreur lors de l'ajout de la propriété:", error);
      toast.error("Échec de l'ajout de la propriété");
      return false;
    }
  };
  
  // Handle building sale
  const handleSellBuilding = useCallback(async (buildingId: number | string): Promise<boolean> => {
    try {
      const building = ownedBuildings.find(b => b.id === buildingId);
      if (!building) return false;
      
      const result = sellBuilding(buildingId);
      if (result) {
        setSelectedBuilding(null);
        return true;
      }
      return false;
    } catch (error) {
      console.error("Erreur lors de la vente:", error);
      toast.error("Une erreur est survenue lors de la vente");
      return false;
    }
  }, [ownedBuildings, sellBuilding]);
  
  // Handle building maintenance
  const handleMaintenanceBuilding = useCallback(async (
    buildingId: number | string, 
    level: 'basic' | 'standard' | 'premium'
  ): Promise<boolean> => {
    return await performMaintenance(buildingId, level);
  }, [performMaintenance]);
  
  // Handle construction
  const handleStartConstruction = useCallback(async (constructionData: any): Promise<boolean> => {
    // Placeholder for construction logic
    toast.success(`Construction de ${constructionData.name} démarrée`);
    return true;
  }, []);
  
  // Rename a building
  const renameBuilding = useCallback((buildingId: number | string, newName: string): boolean => {
    try {
      updateBuildingProperty(buildingId, 'name', newName);
      toast.success("Propriété renommée avec succès");
      return true;
    } catch (error) {
      console.error("Erreur lors du renommage:", error);
      toast.error("Une erreur est survenue");
      return false;
    }
  }, [updateBuildingProperty]);
  
  return {
    // Building inventory
    ownedBuildings,
    buildings: ownedBuildings,
    
    // Dialog states
    selectedBuilding,
    setSelectedBuilding,
    isPurchaseDialogOpen,
    setIsPurchaseDialogOpen,
    isSaleDialogOpen,
    setIsSaleDialogOpen,
    isMaintenanceDialogOpen,
    setIsMaintenanceDialogOpen,
    isConstructionDialogOpen,
    setIsConstructionDialogOpen,
    
    // Action handlers
    isLoading,
    handlePurchaseBuilding,
    handleSellBuilding,
    handleMaintenanceBuilding,
    handleStartConstruction,
    handleAddProperty,
    toggleMaintenance,
    assignSlaves,
    sellBuilding,
    calculateBuildingValue,
    calculateBuildingValueById,
    needsMaintenance,
    calculateMaintenanceCost,
    getMaintenanceOptions,
    renameBuilding,
    
    // Financial info
    balance,
    
    // Building categories
    ruralBuildings: ownedBuildings.filter(b => b.buildingType === "rural"),
    urbanBuildings: ownedBuildings.filter(b => b.buildingType === "urban"),
    religiousBuildings: ownedBuildings.filter(b => b.buildingType === "religious"),
    publicBuildings: ownedBuildings.filter(b => b.buildingType === "public")
  };
}
