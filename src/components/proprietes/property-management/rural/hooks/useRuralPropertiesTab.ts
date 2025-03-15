
import { useState, useEffect } from 'react';
import { useBuildingInventory } from '@/components/proprietes/hooks/building/useBuildingInventory';
import { useBuildingSale } from '@/components/proprietes/hooks/building/useBuildingSale';
import { useRuralPropertyCalculator } from '@/components/proprietes/property-management/hooks/useRuralPropertyCalculator';
import { toast } from 'sonner';
import { BuildingPurchaseOptions, OwnedBuilding } from '@/components/proprietes/hooks/building/types';

export const useRuralPropertiesTab = () => {
  const [selectedPropertyId, setSelectedPropertyId] = useState<string>('');
  const [propertySize, setPropertySize] = useState<string>('moyen');
  const [propertyLocation, setPropertyLocation] = useState<string>('latium');
  const [purchaseDialogOpen, setPurchaseDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { ownedBuildings, buildings, addBuilding, toggleBuildingMaintenance, performBuildingMaintenance } = useBuildingInventory();
  const { sellBuilding, calculateBuildingValue } = useBuildingSale();
  
  // Récupérer les propriétés rurales
  const ownedRuralProperties = buildings.filter(b => b.buildingType === 'rural');
  
  // Récupérer les détails de la propriété sélectionnée
  const propertyDetails = useRuralPropertyCalculator(
    selectedPropertyId,
    propertySize,
    propertyLocation
  );

  // Valeur du compte (simulée pour le moment)
  const balance = 10000;
  
  // Liste des propriétés rurales disponibles (simulée)
  const ruralProperties = {
    'ferme': { 
      name: 'Ferme', 
      description: 'Un domaine agricole',
      advantages: ['Production de céréales', 'Stabilité'],
      initialCost: 5000,
      maintenanceCost: 500,
      prestige: 1
    },
    'vignoble': { 
      name: 'Vignoble', 
      description: 'Produisant du vin',
      advantages: ['Production de vin', 'Prestige'],
      initialCost: 8000,
      maintenanceCost: 800,
      prestige: 2
    },
    'oliveraie': { 
      name: 'Oliveraie', 
      description: 'Produisant de l\'huile d\'olive',
      advantages: ['Production d\'huile', 'Commerce'],
      initialCost: 7000,
      maintenanceCost: 700,
      prestige: 2
    }
  };

  // Gérer l'achat d'une propriété rurale
  const handlePurchase = async (options: BuildingPurchaseOptions): Promise<boolean> => {
    setIsLoading(true);
    try {
      // Simuler l'achat
      const success = true;
      
      if (success) {
        // Ajouter la propriété au bâtiment
        addBuilding({
          id: Date.now(),
          buildingId: options.buildingId,
          name: options.customName || ruralProperties[options.buildingId]?.name || 'Propriété rurale',
          buildingType: 'rural',
          location: options.location,
          size: propertySize,
          status: 'good',
          maintenanceEnabled: true,
          maintenanceCost: options.maintenanceCost,
          slaves: options.slaves || 0,
          condition: 100,
          purchaseDate: new Date()
        });
        
        toast.success(`Propriété rurale achetée avec succès !`);
        setPurchaseDialogOpen(false);
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

  // Gérer la vente d'une propriété
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

  // Add any missing properties that might be used by RuralPropertiesTab
  const selectedBuildingId = selectedPropertyId;
  const setSelectedBuildingId = setSelectedPropertyId;
  const isPurchaseDialogOpen = purchaseDialogOpen;
  const setIsPurchaseDialogOpen = setPurchaseDialogOpen;
  const availableSlaves = 10; // Example value
  const assignSlaves = (buildingId: string | number, slaveCount: number) => {
    // Implementation for assigning slaves
    console.log(`Assigning ${slaveCount} slaves to building ${buildingId}`);
    return true;
  };

  return {
    buildings: ownedRuralProperties,
    selectedBuildingId,
    setSelectedBuildingId,
    isPurchaseDialogOpen,
    setIsPurchaseDialogOpen,
    isLoading,
    propertySize,
    setPropertySize,
    propertyLocation,
    setPropertyLocation,
    propertyDetails,
    ownedRuralProperties,
    ruralProperties,
    balance,
    handlePurchase,
    sellBuilding: handleSell,
    toggleMaintenance: handleToggleMaintenance,
    performMaintenance: handlePerformMaintenance,
    calculateBuildingValue,
    // For compatibility with RuralPropertiesTab
    selectedPropertyId,
    setSelectedPropertyId,
    purchaseDialogOpen,
    setPurchaseDialogOpen,
    assignSlaves,
    availableSlaves
  };
};
