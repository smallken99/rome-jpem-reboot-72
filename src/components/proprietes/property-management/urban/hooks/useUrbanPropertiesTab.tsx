
import { useState } from 'react';
import { useUrbanPropertyCalculator } from './useUrbanPropertyCalculator';
import { useBuildingPurchase } from '@/components/proprietes/hooks/building/useBuildingPurchase';
import { useSlaveAssignment } from '@/components/proprietes/hooks/building/useSlaveAssignment';
import { useBuildingMaintenance } from '@/components/proprietes/hooks/building/useBuildingMaintenance';
import { BuildingPurchaseOptions } from '@/components/proprietes/hooks/building/types';
import { urbanResidentialBuildings } from '@/components/proprietes/data/buildings/urbanResidentialBuildings';

export const useUrbanPropertiesTab = () => {
  const [selectedBuildingId, setSelectedBuildingId] = useState<string | null>(null);
  const [isPurchaseDialogOpen, setIsPurchaseDialogOpen] = useState(false);
  const [isSaleDialogOpen, setIsSaleDialogOpen] = useState(false);
  const [isAssignDialogOpen, setIsAssignDialogOpen] = useState(false);
  const [isMaintenanceDialogOpen, setIsMaintenanceDialogOpen] = useState(false);
  
  const { buildings, calculateBuildingValue, sellBuilding } = useUrbanPropertyCalculator();
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
    return urbanResidentialBuildings.filter(b => b.buildingType === 'urban');
  };
  
  return {
    buildings,
    selectedBuildingId,
    setSelectedBuildingId,
    isPurchaseDialogOpen,
    setIsPurchaseDialogOpen,
    isSaleDialogOpen,
    setIsSaleDialogOpen,
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
