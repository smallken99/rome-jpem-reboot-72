
import { useState, useEffect } from 'react';
import { useBuildingInventory } from '@/components/proprietes/hooks/building/useBuildingInventory';
import { useBuildingSale } from '@/components/proprietes/hooks/building/useBuildingSale';
import { useRuralPropertyCalculator } from '@/components/proprietes/property-management/hooks/useRuralPropertyCalculator';
import { toast } from 'sonner';
import { BuildingPurchaseOptions } from '@/components/proprietes/hooks/building/types';

export const useRuralPropertiesTab = () => {
  const [selectedPropertyId, setSelectedPropertyId] = useState<string>('');
  const [propertySize, setPropertySize] = useState<string>('moyen');
  const [propertyLocation, setPropertyLocation] = useState<string>('latium');
  const [purchaseDialogOpen, setPurchaseDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { buildings, addBuilding, toggleBuildingMaintenance, performBuildingMaintenance } = useBuildingInventory();
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
    'ferme': { name: 'Ferme', description: 'Un domaine agricole' },
    'vignoble': { name: 'Vignoble', description: 'Produisant du vin' },
    'oliveraie': { name: 'Oliveraie', description: 'Produisant de l\'huile d\'olive' }
  };

  // Gérer l'achat d'une propriété rurale
  const handlePurchase = async (options: BuildingPurchaseOptions) => {
    setIsLoading(true);
    try {
      // Simuler l'achat
      const success = true;
      
      if (success) {
        // Ajouter la propriété au bâtiment
        addBuilding({
          id: options.buildingId,
          name: options.customName || ruralProperties[options.buildingId]?.name || 'Propriété rurale',
          buildingType: 'rural',
          location: options.location,
          size: propertySize,
          status: 'good',
          maintenanceNeeded: false,
          lastMaintenance: new Date().toISOString()
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
    buildings: ownedRuralProperties,
    selectedBuildingId: selectedPropertyId,
    setSelectedBuildingId: setSelectedPropertyId,
    isPurchaseDialogOpen: purchaseDialogOpen,
    setIsPurchaseDialogOpen: setPurchaseDialogOpen,
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
    handleSell,
    toggleMaintenance: handleToggleMaintenance,
    performMaintenance: handlePerformMaintenance,
    calculateBuildingValue
  };
};
