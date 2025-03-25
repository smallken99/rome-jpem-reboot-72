
import { useState } from 'react';
import { useBuildingInventory } from '@/components/proprietes/hooks/building/useBuildingInventory';
import { useBuildingSale } from '@/components/proprietes/hooks/building/useBuildingSale';
import { useUrbanPropertyCalculator } from './useUrbanPropertyCalculator';
import { BuildingPurchaseOptions, OwnedBuilding } from '@/components/proprietes/hooks/building/types';
import { toast } from 'sonner';

export const useUrbanPropertiesTab = () => {
  const [selectedBuildingId, setSelectedBuildingId] = useState<string>('');
  const [selectedBuildingType, setSelectedBuildingType] = useState<string>('');
  const [isPurchaseDialogOpen, setIsPurchaseDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { ownedBuildings, buildings, addBuilding, toggleBuildingMaintenance, performBuildingMaintenance } = useBuildingInventory();
  const { sellBuilding, calculateBuildingValue } = useBuildingSale();
  const { buildings: urbanBuildings, handleAddProperty } = useUrbanPropertyCalculator();
  
  // Filtrer les bâtiments urbains
  const filteredOwnedBuildings = buildings.filter(b => b.buildingType === 'urban');
  
  // Récupérer les détails du bâtiment sélectionné
  const selectedBuildingDetails = selectedBuildingId 
    ? buildings.find(b => b.id === selectedBuildingId) 
    : null;

  // Valeur du compte (simulée pour le moment)
  const balance = 10000;
  
  // Gérer l'achat d'un bâtiment urbain
  const handlePurchase = async (options: BuildingPurchaseOptions) => {
    setIsLoading(true);
    try {
      // Extract the building type from options or use the provided type
      const type = options.buildingType || options.type;
      // Extract the custom name if provided
      const customName = options.customName || options.name;
      
      // Appeler la fonction d'achat
      const success = handleAddProperty(
        options.buildingId,
        type as "urban" | "rural" | "religious" | "public",
        options.location,
        customName
      );
      
      if (success) {
        toast.success(`Propriété ${options.buildingType || options.type} achetée avec succès !`);
        setIsPurchaseDialogOpen(false);
        return true;
      } else {
        toast.error("Échec de l'achat. Vérifiez vos ressources.");
        return false;
      }
    } catch (error) {
      console.error("Erreur lors de l'achat:", error);
      toast.error("Une erreur est survenue lors de l'achat");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Gérer la vente d'un bâtiment
  const handleSell = (buildingId: string | number) => {
    if (sellBuilding(buildingId)) {
      toast.success("Propriété vendue avec succès !");
    } else {
      toast.error("Échec de la vente.");
    }
  };

  // Gérer l'activation/désactivation de la maintenance
  const handleToggleMaintenance = (buildingId: string | number) => {
    toggleBuildingMaintenance(buildingId);
    toast.info("Statut de maintenance mis à jour.");
  };

  // Gérer la réalisation de la maintenance
  const handlePerformMaintenance = (buildingId: string | number) => {
    if (performBuildingMaintenance(buildingId)) {
      toast.success("Maintenance effectuée avec succès !");
    } else {
      toast.error("Échec de la maintenance. Ressources insuffisantes.");
    }
  };

  // Add missing properties needed by UrbanPropertiesTab
  const availableSlaves = 10; // Example value
  const assignSlaves = (buildingId: string | number, slaveCount: number) => {
    // Implementation for assigning slaves
    console.log(`Assigning ${slaveCount} slaves to building ${buildingId}`);
    return true;
  };
  
  const purchaseDialogOpen = isPurchaseDialogOpen;
  const setPurchaseDialogOpen = setIsPurchaseDialogOpen;

  return {
    buildings: filteredOwnedBuildings,
    selectedBuildingId,
    setSelectedBuildingId,
    isPurchaseDialogOpen,
    setIsPurchaseDialogOpen,
    isLoading,
    selectedBuildingType,
    setSelectedBuildingType,
    balance,
    selectedBuildingDetails,
    filteredOwnedBuildings,
    handlePurchase,
    sellBuilding: handleSell,
    toggleMaintenance: handleToggleMaintenance,
    performMaintenance: handlePerformMaintenance,
    calculateBuildingValue,
    // Additional properties for UrbanPropertiesTab
    purchaseDialogOpen,
    setPurchaseDialogOpen,
    availableSlaves,
    assignSlaves
  };
};
