
import { useState } from 'react';
import { useBuildingInventory } from '@/components/proprietes/hooks/building/useBuildingInventory';
import { useBuildingSale } from '@/components/proprietes/hooks/building/useBuildingSale';
import { useUrbanPropertyCalculator } from './useUrbanPropertyCalculator';
import { BuildingPurchaseOptions } from '@/components/proprietes/hooks/building/types';
import { toast } from 'sonner';

export const useUrbanPropertiesTab = () => {
  const [selectedBuildingId, setSelectedBuildingId] = useState<string>('');
  const [selectedBuildingType, setSelectedBuildingType] = useState<string>('');
  const [isPurchaseDialogOpen, setIsPurchaseDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { buildings, addBuilding, toggleBuildingMaintenance, performBuildingMaintenance } = useBuildingInventory();
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
      // Appeler la fonction d'achat (simulée pour le moment)
      const success = handleAddProperty(
        options.buildingId,
        options.buildingType,
        options.location,
        options.customName
      );
      
      if (success) {
        toast.success(`Propriété ${options.buildingType} achetée avec succès !`);
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
  const handleSell = (buildingId: string) => {
    if (sellBuilding(buildingId)) {
      toast.success("Propriété vendue avec succès !");
    } else {
      toast.error("Échec de la vente.");
    }
  };

  // Gérer l'activation/désactivation de la maintenance
  const handleToggleMaintenance = (buildingId: string) => {
    toggleBuildingMaintenance(buildingId);
    toast.info("Statut de maintenance mis à jour.");
  };

  // Gérer la réalisation de la maintenance
  const handlePerformMaintenance = (buildingId: string) => {
    if (performBuildingMaintenance(buildingId)) {
      toast.success("Maintenance effectuée avec succès !");
    } else {
      toast.error("Échec de la maintenance. Ressources insuffisantes.");
    }
  };

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
    handleSell,
    toggleMaintenance: handleToggleMaintenance,
    performMaintenance: handlePerformMaintenance,
    calculateBuildingValue
  };
};
