
import { useState, useCallback } from 'react';
import { OwnedBuilding, BuildingPurchaseOptions, BuildingStatistics } from '@/types/buildings';
import { usePatrimoine } from './usePatrimoine';
import { toast } from 'sonner';
import { v4 as uuidv4 } from 'uuid';

export const useBuildingsManager = () => {
  const [buildings, setBuildings] = useState<OwnedBuilding[]>([
    {
      id: 'building-1',
      buildingId: 'domus-1',
      name: 'Domus Palatina',
      buildingType: 'urban',
      location: 'Rome',
      maintenanceEnabled: true,
      maintenanceCost: 1200,
      slaves: 3,
      condition: 85,
      purchaseDate: new Date(2023, 1, 15),
      maintenanceLevel: 2,
      securityLevel: 1,
      income: 1500
    },
    {
      id: 'building-2',
      buildingId: 'domaine_vignoble',
      buildingType: 'rural',
      location: 'Campanie',
      maintenanceEnabled: true,
      maintenanceCost: 6000,
      slaves: 25,
      condition: 92,
      purchaseDate: new Date(2022, 5, 10),
      maintenanceLevel: 3,
      securityLevel: 2,
      income: 15000
    }
  ]);
  
  const { balance, buildingPurchased, buildingSold } = usePatrimoine();

  // Gestion des bâtiments
  const addBuilding = useCallback((building: OwnedBuilding) => {
    setBuildings(prev => [...prev, building]);
    return building.id;
  }, []);

  const removeBuilding = useCallback((id: string) => {
    setBuildings(prev => prev.filter(b => b.id !== id));
  }, []);

  // Achat et vente de bâtiments
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
      name: options.customName || options.name,
      location: options.location,
      maintenanceEnabled: true,
      maintenanceCost: options.maintenanceCost,
      slaves: options.slaves || 0,
      condition: 100, // Nouveau bâtiment en parfait état
      purchaseDate: new Date(),
      maintenanceLevel: 2, // Niveau standard par défaut
      securityLevel: 1, // Niveau basique par défaut
      income: Math.round(options.initialCost * 0.02) // Revenu par défaut (2% de la valeur initiale)
    };
    
    // Ajouter le bâtiment à l'inventaire
    addBuilding(newBuilding);
    
    // Enregistrer la transaction financière
    buildingPurchased(options.name, options.initialCost);
    
    toast.success(`${options.name} acquis avec succès!`);
    return true;
  }, [balance, addBuilding, buildingPurchased]);

  const sellBuilding = useCallback((id: string): boolean => {
    const building = buildings.find(b => b.id === id);
    
    if (!building) {
      toast.error("Bâtiment introuvable");
      return false;
    }
    
    // Calculer le prix de vente (condition * valeur d'origine)
    const sellingPrice = Math.round(building.maintenanceCost * 20 * (building.condition / 100));
    
    // Vendre le bâtiment
    removeBuilding(id);
    
    // Enregistrer la transaction
    buildingSold(building.name, sellingPrice);
    
    toast.success(`${building.name} vendu pour ${sellingPrice} As`);
    return true;
  }, [buildings, removeBuilding, buildingSold]);

  // Calcul des statistiques
  const getBuildingStatistics = useCallback((): BuildingStatistics => {
    const totalValue = buildings.reduce((sum, b) => sum + (b.maintenanceCost * 20 * (b.condition / 100)), 0);
    const totalIncome = buildings.reduce((sum, b) => sum + (b.income || 0), 0);
    const totalMaintenance = buildings.reduce((sum, b) => 
      sum + (b.maintenanceEnabled ? b.maintenanceCost : 0), 0);
    const propertyCount = buildings.length;
    const conditionSum = buildings.reduce((sum, b) => sum + b.condition, 0);
    const averageCondition = buildings.length > 0 ? Math.round(conditionSum / buildings.length) : 0;
    
    return {
      totalValue,
      totalIncome,
      totalMaintenance,
      propertyCount,
      averageCondition
    };
  }, [buildings]);

  // Maintenance des bâtiments
  const updateBuildingCondition = useCallback((id: string, newCondition: number) => {
    setBuildings(prev => 
      prev.map(building => 
        building.id === id 
          ? { ...building, condition: Math.max(0, Math.min(100, newCondition)) } 
          : building
      )
    );
  }, []);

  const updateMaintenanceEnabled = useCallback((id: string, enabled: boolean) => {
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

  const updateMaintenanceLevel = useCallback((id: string, level: number) => {
    setBuildings(prev => 
      prev.map(building => 
        building.id === id 
          ? { ...building, maintenanceLevel: level } 
          : building
      )
    );
    
    const building = buildings.find(b => b.id === id);
    if (building) {
      toast.success(`Niveau d'entretien mis à jour pour ${building.name}`);
    }
  }, [buildings]);

  const updateSecurityLevel = useCallback((id: string, level: number) => {
    setBuildings(prev => 
      prev.map(building => 
        building.id === id 
          ? { ...building, securityLevel: level } 
          : building
      )
    );
    
    const building = buildings.find(b => b.id === id);
    if (building) {
      toast.success(`Niveau de sécurité mis à jour pour ${building.name}`);
    }
  }, [buildings]);

  const assignSlaves = useCallback((buildingId: string, slaveCount: number) => {
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
    getBuildingStatistics,
    updateBuildingCondition,
    updateMaintenanceEnabled,
    updateMaintenanceLevel,
    updateSecurityLevel,
    assignSlaves,
    getBuilding: useCallback((id: string) => buildings.find(b => b.id === id), [buildings])
  };
};
