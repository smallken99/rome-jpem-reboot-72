
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
    ownedBuildings, addBuilding, removeBuilding
  } = useBuildingInventory();
  
  const { 
    isLoading: isPurchaseLoading, 
    purchaseBuilding 
  } = useBuildingPurchase();
  
  const { 
    isLoading: isSaleLoading, 
    estimateBuildingValue,
    sellBuilding 
  } = useBuildingSale();
  
  const { 
    isLoading: isMaintenanceLoading, 
    toggleMaintenance, 
    performMaintenance 
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
  
  // Handle building sale
  const handleSellBuilding = useCallback(async (buildingId: number | string): Promise<boolean> => {
    try {
      const building = ownedBuildings.find(b => b.id === buildingId);
      if (!building) return false;
      
      const result = sellBuilding(buildingId as number);
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
    toggleMaintenance,
    assignSlaves,
    estimateBuildingValue,
    
    // Financial info
    balance,
    
    // Building categories
    ruralBuildings: ownedBuildings.filter(b => b.buildingType === "rural"),
    urbanBuildings: ownedBuildings.filter(b => b.buildingType === "urban"),
    religiousBuildings: ownedBuildings.filter(b => b.buildingType === "religious"),
    publicBuildings: ownedBuildings.filter(b => b.buildingType === "public")
  };
}
