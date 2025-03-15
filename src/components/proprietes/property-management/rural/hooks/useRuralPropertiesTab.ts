
import { useState, useEffect } from 'react';
import { useBuildingInventory } from '@/components/proprietes/hooks/building/useBuildingInventory';
import { useBuildingSale } from '@/components/proprietes/hooks/building/useBuildingSale';
import { useRuralPropertyCalculator } from '@/components/proprietes/property-management/rural/hooks/useRuralPropertyCalculator';
import { toast } from 'sonner';
import { BuildingPurchaseOptions, OwnedBuilding } from '@/components/proprietes/hooks/building/types';

export const useRuralPropertiesTab = () => {
  const [selectedPropertyId, setSelectedPropertyId] = useState<string>('');
  const [propertySize, setPropertySize] = useState<string>('moyen');
  const [propertyLocation, setPropertyLocation] = useState<string>('latium');
  const [purchaseDialogOpen, setPurchaseDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { ownedBuildings, addBuilding } = useBuildingInventory();
  const { sellBuilding, calculateBuildingValue } = useBuildingSale();
  
  // Récupérer les propriétés rurales
  const ownedRuralProperties = ownedBuildings.filter(b => b.buildingType === 'rural');
  
  // Récupérer les détails de la propriété sélectionnée
  const propertyDetails = useRuralPropertyCalculator(
    selectedPropertyId
  );

  // Valeur du compte (simulée pour le moment)
  const balance = 10000;
  
  // Liste des propriétés rurales disponibles (simulée)
  const ruralProperties = {
    'ferme': { 
      id: 'ferme',
      name: 'Ferme', 
      description: 'Un domaine agricole',
      advantages: ['Production de céréales', 'Stabilité'],
      initialCost: 5000,
      maintenanceCost: 500,
      prestige: 1,
      basePrice: 5000,
      type: "rural" as "rural"
    },
    'vignoble': { 
      id: 'vignoble',
      name: 'Vignoble', 
      description: 'Produisant du vin',
      advantages: ['Production de vin', 'Prestige'],
      initialCost: 8000,
      maintenanceCost: 800,
      prestige: 2,
      basePrice: 8000,
      type: "rural" as "rural"
    },
    'oliveraie': { 
      id: 'oliveraie',
      name: 'Oliveraie', 
      description: 'Produisant de l\'huile d\'olive',
      advantages: ['Production d\'huile', 'Commerce'],
      initialCost: 7000,
      maintenanceCost: 700,
      prestige: 2,
      basePrice: 7000,
      type: "rural" as "rural"
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

  // Adapter pour la compatibilité avec les IDs de type string | number
  const toggleMaintenance = (buildingId: string | number, enabled: boolean): boolean => {
    const numericId = typeof buildingId === 'string' ? parseInt(buildingId, 10) : buildingId;
    // Implémentation fictive
    console.log(`Toggle maintenance for building ${numericId} to ${enabled}`);
    return true;
  };

  // Adapter pour la compatibilité
  const performMaintenance = (buildingId: string | number): boolean => {
    const numericId = typeof buildingId === 'string' ? parseInt(buildingId, 10) : buildingId;
    // Implémentation fictive
    console.log(`Perform maintenance for building ${numericId}`);
    return true;
  };

  // Adapter pour la compatibilité
  const handleSellBuilding = (buildingId: string | number, value: number): boolean => {
    const numericId = typeof buildingId === 'string' ? parseInt(buildingId, 10) : buildingId;
    sellBuilding(numericId);
    toast.success("Propriété vendue avec succès !");
    return true;
  };

  // Adapter pour la compatibilité
  const handleCalculateBuildingValue = (buildingId: number): number => {
    const building = ownedRuralProperties.find(b => Number(b.id) === buildingId);
    if (building) {
      return calculateBuildingValue(building);
    }
    return 0;
  };

  // Fonction adaptée pour la compatibilité avec l'interface attendue
  const adaptedHandlePurchase = (
    buildingId: string, 
    buildingType: "urban" | "rural" | "religious" | "public", 
    location: string, 
    customName?: string
  ): boolean => {
    // Adapter à BuildingPurchaseOptions
    const options: BuildingPurchaseOptions = {
      buildingId,
      type: buildingType,
      name: customName || `Propriété ${buildingType}`,
      location,
      initialCost: 5000, // Valeur par défaut
      maintenanceCost: 500, // Valeur par défaut
      customName
    };

    // Appeler la fonction handlePurchase (qui est asynchrone)
    handlePurchase(options);
    return true;
  };

  // Adapter pour la compatibilité
  const assignSlaves = (buildingId: string | number, slaveCount: number): boolean => {
    // Implémentation pour assigner des esclaves
    console.log(`Assigning ${slaveCount} slaves to building ${buildingId}`);
    return true;
  };

  // Add any missing properties that might be used by RuralPropertiesTab
  const selectedBuildingId = selectedPropertyId;
  const setSelectedBuildingId = setSelectedPropertyId;
  const isPurchaseDialogOpen = purchaseDialogOpen;
  const setIsPurchaseDialogOpen = setPurchaseDialogOpen;
  const availableSlaves = 10; // Example value

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
    sellBuilding: handleSellBuilding,
    toggleMaintenance,
    performMaintenance,
    calculateBuildingValue: handleCalculateBuildingValue,
    // Pour la compatibilité avec RuralPropertiesTab
    selectedPropertyId,
    setSelectedPropertyId,
    purchaseDialogOpen,
    setPurchaseDialogOpen,
    assignSlaves,
    availableSlaves
  };
};
