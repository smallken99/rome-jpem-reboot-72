
import { useState } from 'react';
import { OwnedBuilding } from '@/components/proprietes/types/property';
import { useEconomy } from '@/hooks/useEconomy';
import { toast } from 'sonner';

export function useBuildingInventory() {
  // Accès au système économique
  const { receivePayment } = useEconomy();
  
  // Initial building inventory state
  const [ownedBuildings, setOwnedBuildings] = useState<OwnedBuilding[]>([
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
      purchaseDate: new Date(2023, 1, 15),
      income: 2500,
      value: 25000,
      maintenance: 1200,
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
      purchaseDate: new Date(2022, 5, 10),
      income: 12000,
      value: 120000,
      maintenance: 6000,
    },
    {
      id: 3,
      buildingId: 'villa_urbana',
      buildingType: 'urban',
      name: 'Villa Urbana du Palatin',
      location: 'Rome - Palatin',
      maintenanceEnabled: true,
      maintenanceCost: 5000,
      slaves: 12,
      condition: 95,
      purchaseDate: new Date(2022, 3, 20),
      income: 8000,
      value: 80000,
      maintenance: 5000,
    },
    {
      id: 4,
      buildingId: 'temple',
      buildingType: 'religious',
      name: 'Temple de Minerve',
      location: 'Rome - Forum',
      maintenanceEnabled: false,
      maintenanceCost: 4000,
      slaves: 0,
      condition: 75,
      purchaseDate: new Date(2023, 8, 5),
      income: 0,
      value: 40000,
      maintenance: 4000,
    }
  ]);

  // Function to add a new building to inventory
  const addBuilding = (newBuilding: OwnedBuilding) => {
    setOwnedBuildings(prev => [...prev, newBuilding]);
  };

  // Function to remove a building from inventory
  const removeBuilding = (buildingId: number | string) => {
    setOwnedBuildings(prev => prev.filter(b => b.id !== buildingId));
  };

  // Function to update a building in inventory
  const updateBuilding = (updatedBuilding: OwnedBuilding) => {
    setOwnedBuildings(prev => 
      prev.map(building => 
        building.id === updatedBuilding.id ? updatedBuilding : building
      )
    );
  };

  // Function to update a specific property of a building
  const updateBuildingProperty = <K extends keyof OwnedBuilding>(
    buildingId: number | string, 
    property: K, 
    value: OwnedBuilding[K]
  ) => {
    setOwnedBuildings(prev => 
      prev.map(building => 
        building.id === buildingId 
          ? { ...building, [property]: value }
          : building
      )
    );
  };

  // Fonction pour collecter les revenus de tous les bâtiments
  const collectAllBuildingIncomes = () => {
    let totalIncome = 0;
    
    ownedBuildings.forEach(building => {
      if (building.income && building.income > 0) {
        // Ajustement du revenu en fonction de l'état du bâtiment
        const conditionFactor = building.condition / 100;
        const adjustedIncome = Math.round(building.income * conditionFactor);
        
        // Ajouter au revenu total
        totalIncome += adjustedIncome;
        
        // Enregistrer la transaction pour ce bâtiment
        receivePayment(
          adjustedIncome,
          building.name,
          "Revenus immobiliers",
          `Revenus de ${building.name}`
        );
      }
    });
    
    if (totalIncome > 0) {
      toast.success(`Revenus immobiliers collectés: ${totalIncome.toLocaleString()} As`);
    } else {
      toast.info("Aucun revenu à collecter pour le moment");
    }
    
    return totalIncome;
  };

  // Fonction pour collecter les revenus d'un bâtiment spécifique
  const collectBuildingIncome = (buildingId: number | string) => {
    const building = ownedBuildings.find(b => b.id === buildingId);
    
    if (!building || !building.income || building.income <= 0) {
      toast.error("Ce bâtiment ne génère pas de revenus");
      return 0;
    }
    
    // Ajustement du revenu en fonction de l'état du bâtiment
    const conditionFactor = building.condition / 100;
    const adjustedIncome = Math.round(building.income * conditionFactor);
    
    // Enregistrer la transaction
    receivePayment(
      adjustedIncome,
      building.name,
      "Revenus immobiliers",
      `Revenus de ${building.name}`
    );
    
    toast.success(`Revenus collectés: ${adjustedIncome.toLocaleString()} As de ${building.name}`);
    
    return adjustedIncome;
  };

  // Add the missing methods for compatibility
  const toggleBuildingMaintenance = (buildingId: number | string) => {
    const building = ownedBuildings.find(b => b.id === buildingId);
    if (building) {
      updateBuildingProperty(buildingId, 'maintenanceEnabled', !building.maintenanceEnabled);
      return true;
    }
    return false;
  };

  const performBuildingMaintenance = (buildingId: number | string) => {
    const building = ownedBuildings.find(b => b.id === buildingId);
    if (building) {
      updateBuildingProperty(buildingId, 'condition', Math.min(100, building.condition + 20));
      updateBuildingProperty(buildingId, 'lastMaintenance', new Date());
      return true;
    }
    return false;
  };

  // Alias buildings to ownedBuildings for compatibility
  const buildings = ownedBuildings;

  return {
    ownedBuildings,
    buildings,  // Alias for compatibility
    addBuilding,
    removeBuilding,
    updateBuilding,
    updateBuildingProperty,
    toggleBuildingMaintenance,
    performBuildingMaintenance,
    collectAllBuildingIncomes,
    collectBuildingIncome
  };
}
