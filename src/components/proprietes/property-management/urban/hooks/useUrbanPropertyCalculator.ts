
import { useState } from 'react';
import { OwnedBuilding } from '@/components/proprietes/hooks/building/types';
import { useBuildingSale } from '@/components/proprietes/hooks/building/useBuildingSale';
import { useBuildingInventory } from '@/components/proprietes/hooks/building/useBuildingInventory';
import { toast } from 'sonner';

export const useUrbanPropertyCalculator = () => {
  const { sellBuilding, calculateBuildingValue, calculateBuildingValueById } = useBuildingSale();
  const { buildings, addBuilding } = useBuildingInventory();
  
  const urbanBuildings = buildings.filter(b => b.buildingType === 'urban');

  const handleAddProperty = (
    buildingId: string,
    buildingType: "urban" | "rural" | "religious" | "public",
    location: string,
    customName?: string
  ): boolean => {
    try {
      // Générer un ID unique 
      const newId = `${buildingType}-${Date.now()}`;
      
      // Ajouter le bâtiment à l'inventaire
      addBuilding({
        id: newId,
        name: customName || `Bâtiment ${buildingType} à ${location}`,
        buildingType,
        location,
        status: 'good',
        maintenanceNeeded: false,
        lastMaintenance: new Date().toISOString()
      });
      
      toast.success(`Propriété ${buildingType} ajoutée avec succès!`);
      return true;
    } catch (error) {
      console.error("Erreur lors de l'ajout de la propriété:", error);
      toast.error("Échec de l'ajout de la propriété");
      return false;
    }
  };

  return {
    buildings: urbanBuildings,
    handleAddProperty,
    sellBuilding,
    calculateBuildingValue,
    calculateBuildingValueById
  };
};
