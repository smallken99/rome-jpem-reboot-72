
import { useState } from 'react';
import { useRuralPropertyCalculator } from './useRuralPropertyCalculator';
import { useBuildingPurchase } from '@/components/proprietes/hooks/building/useBuildingPurchase';
import { useSlaveAssignment } from '@/components/proprietes/hooks/building/useSlaveAssignment';
import { useBuildingMaintenance } from '@/components/proprietes/hooks/building/useBuildingMaintenance';
import { BuildingPurchaseOptions } from '@/components/proprietes/hooks/building/types';
import { ruralProperties } from '@/components/proprietes/data/buildings/ruralProperties';

export const useRuralPropertiesTab = () => {
  const [selectedBuildingId, setSelectedBuildingId] = useState<string | null>(null);
  const [isPurchaseDialogOpen, setIsPurchaseDialogOpen] = useState(false);
  const [isAssignDialogOpen, setIsAssignDialogOpen] = useState(false);
  const [isMaintenanceDialogOpen, setIsMaintenanceDialogOpen] = useState(false);
  
  const { buildings, calculateBuildingValue, sellBuilding } = useRuralPropertyCalculator();
  const { purchaseBuilding, isLoading } = useBuildingPurchase();
  const { assignSlaves } = useSlaveAssignment();
  const { toggleMaintenance } = useBuildingMaintenance();
  
  const handlePurchase = (options: BuildingPurchaseOptions) => {
    return purchaseBuilding(options);
  };
  
  const availableSlaves = 10; // Valeur fictive pour l'exemple
  
  const handleMaintenance = (buildingId: number, enabled: boolean) => {
    return toggleMaintenance(buildingId, enabled);
  };
  
  const getAvailableBuildings = () => {
    return ruralProperties;
  };
  
  return {
    buildings,
    selectedBuildingId,
    setSelectedBuildingId,
    isPurchaseDialogOpen,
    setIsPurchaseDialogOpen,
    isAssignDialogOpen,
    setIsAssignDialogOpen,
    isMaintenanceDialogOpen,
    setIsMaintenanceDialogOpen,
    handlePurchase,
    sellBuilding,
    calculateBuildingValue,
    assignSlaves,
    availableSlaves,
    handleMaintenance,
    getAvailableBuildings,
    isLoading
  };
};
