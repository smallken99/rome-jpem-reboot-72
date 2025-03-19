
import { useState, useCallback } from 'react';
import { OwnedBuilding, BuildingPurchaseOptions } from '@/types/patrimoine';
import { usePatrimoine } from './usePatrimoine';
import { toast } from 'sonner';
import { v4 as uuidv4 } from 'uuid';

export const useBuildingManagement = () => {
  const [buildings, setBuildings] = useState<OwnedBuilding[]>([
    {
      id: 1,
      buildingId: 'insula',
      buildingType: 'urban',
      name: 'Insula de la Via Sacra',
      location: 'Rome - Via Sacra',
      maintenanceEnabled: true,
      maintenanceCost: 1200,
      slaves: 3,
      condition: 85,
      purchaseDate: new Date(2023, 1, 15)
    },
    {
      id: 2,
      buildingId: 'domaine_vignoble',
      buildingType: 'rural',
      name: 'Domaine viticole de Campanie',
      location: 'Campanie',
      maintenanceEnabled: true,
      maintenanceCost: 6000,
      slaves: 25,
      condition: 92,
      purchaseDate: new Date(2022, 5, 10)
    }
  ]);
  
  const { balance, buildingPurchased, buildingSold } = usePatrimoine();

  const addBuilding = useCallback((building: OwnedBuilding) => {
    setBuildings(prev => [...prev, building]);
    return building.id;
  }, []);

  const removeBuilding = useCallback((id: string | number) => {
    setBuildings(prev => prev.filter(b => b.id !== id));
  }, []);

  const purchaseBuilding = useCallback((options: BuildingPurchaseOptions): boolean => {
    // Vérifier si les fonds sont suffisants
    if (options.initialCost > balance) {
      toast.error("Fonds insuffisants pour acheter cette propriété");
      return false;
    }
    
    // Crée un nouveau bâtiment
    const newBuilding: OwnedBuilding = {
      id: uuidv4(),
      buildingId: options.buildingId,
      buildingType: options.type,
      name: options.name,
      location: options.location,
      maintenanceEnabled: true,
      maintenanceCost: options.maintenanceCost,
      slaves: options.slaves || 0,
      condition: 100, // Nouveau bâtiment en parfait état
      purchaseDate: new Date()
    };
    
    // Ajouter le bâtiment à l'inventaire
    addBuilding(newBuilding);
    
    // Enregistrer la transaction financière
    buildingPurchased(options.name, options.initialCost);
    
    toast.success(`${options.name} acquis avec succès!`);
    return true;
  }, [balance, addBuilding, buildingPurchased]);

  const sellBuilding = useCallback((id: string | number): boolean => {
    const building = buildings.find(b => b.id === id);
    
    if (!building) {
      toast.error("Bâtiment introuvable");
      return false;
    }
    
    // Calculer le prix de vente (simplifié)
    const sellingPrice = Math.round(building.maintenanceCost * 20 * (building.condition / 100));
    
    // Vendre le bâtiment
    removeBuilding(id);
    
    // Enregistrer la transaction
    buildingSold(building.name, sellingPrice);
    
    toast.success(`${building.name} vendu pour ${sellingPrice} As`);
    return true;
  }, [buildings, removeBuilding, buildingSold]);

  const updateBuildingCondition = useCallback((id: string | number, newCondition: number) => {
    setBuildings(prev => 
      prev.map(building => 
        building.id === id 
          ? { ...building, condition: Math.max(0, Math.min(100, newCondition)) } 
          : building
      )
    );
  }, []);

  const updateMaintenanceEnabled = useCallback((id: string | number, enabled: boolean) => {
    setBuildings(prev => 
      prev.map(building => 
        building.id === id 
          ? { ...building, maintenanceEnabled: enabled } 
          : building
      )
    );
    
    const building = buildings.find(b => b.id === id);
    if (building) {
      toast.success(`Maintenance ${enabled ? 'activée' : 'désactivée'} pour ${building.name}`);
    }
  }, [buildings]);

  const assignSlaves = useCallback((buildingId: string | number, slaveCount: number) => {
    setBuildings(prev => 
      prev.map(building => 
        building.id === buildingId 
          ? { ...building, slaves: slaveCount } 
          : building
      )
    );
    
    const building = buildings.find(b => b.id === buildingId);
    if (building) {
      toast.success(`${slaveCount} esclaves assignés à ${building.name}`);
    }
  }, [buildings]);

  return {
    buildings,
    addBuilding,
    removeBuilding,
    purchaseBuilding,
    sellBuilding,
    updateBuildingCondition,
    updateMaintenanceEnabled,
    assignSlaves
  };
};
