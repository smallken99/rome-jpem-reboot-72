
import { useState } from 'react';
import { toast } from 'sonner';
import { BuildingDescription } from '../data/types/buildingTypes';
import { usePatrimoine } from '@/hooks/usePatrimoine';

export interface OwnedBuilding {
  id: number;
  buildingId: string;
  buildingType: 'urban' | 'rural' | 'religious' | 'public';
  name: string;
  location: string;
  maintenanceEnabled: boolean;
  maintenanceCost: number;
  slaves: number;
  condition: number; // 0-100
  purchaseDate: Date;
  lastMaintenance?: Date;
}

export function useBuildingManagement() {
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
      purchaseDate: new Date(2022, 3, 20)
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
      purchaseDate: new Date(2023, 8, 5)
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const { balance, updateBalance } = usePatrimoine();
  
  // Acheter un nouveau bâtiment
  const purchaseBuilding = (
    building: BuildingDescription, 
    buildingId: string,
    buildingType: 'urban' | 'rural' | 'religious' | 'public',
    location: string,
    customName?: string
  ) => {
    setIsLoading(true);
    
    // Vérifier si le solde est suffisant
    if (balance < building.initialCost) {
      toast.error("Fonds insuffisants pour cette acquisition");
      setIsLoading(false);
      return false;
    }
    
    setTimeout(() => {
      // Créer le nouveau bâtiment
      const newBuilding: OwnedBuilding = {
        id: Math.max(0, ...ownedBuildings.map(b => b.id)) + 1,
        buildingId,
        buildingType,
        name: customName || building.name,
        location,
        maintenanceEnabled: true,
        maintenanceCost: building.maintenanceCost,
        slaves: building.slaves ? building.slaves.required : 0,
        condition: 100, // Nouveau bâtiment en parfait état
        purchaseDate: new Date()
      };
      
      // Ajouter à la liste des bâtiments possédés
      setOwnedBuildings(prev => [...prev, newBuilding]);
      
      // Déduire le coût du solde
      updateBalance(-building.initialCost);
      
      toast.success(`Acquisition de "${newBuilding.name}" réalisée avec succès`);
      setIsLoading(false);
      return true;
    }, 1000);
    
    return true;
  };
  
  // Vendre un bâtiment existant
  const sellBuilding = (buildingId: number, estimatedValue: number) => {
    setIsLoading(true);
    
    setTimeout(() => {
      // Trouver le bâtiment
      const buildingToSell = ownedBuildings.find(b => b.id === buildingId);
      
      if (!buildingToSell) {
        toast.error("Bâtiment introuvable");
        setIsLoading(false);
        return false;
      }
      
      // Supprimer le bâtiment de la liste
      setOwnedBuildings(prev => prev.filter(b => b.id !== buildingId));
      
      // Ajouter le montant de la vente au solde
      updateBalance(estimatedValue);
      
      toast.success(`Vente de "${buildingToSell.name}" réalisée pour ${estimatedValue.toLocaleString()} As`);
      setIsLoading(false);
      return true;
    }, 1000);
    
    return true;
  };
  
  // Activer/désactiver l'entretien d'un bâtiment
  const toggleMaintenance = (buildingId: number, enabled: boolean) => {
    setOwnedBuildings(prev => 
      prev.map(building => 
        building.id === buildingId 
          ? { ...building, maintenanceEnabled: enabled, lastMaintenance: enabled ? new Date() : building.lastMaintenance }
          : building
      )
    );
    
    const building = ownedBuildings.find(b => b.id === buildingId);
    if (building) {
      toast.success(`Entretien ${enabled ? 'activé' : 'désactivé'} pour ${building.name}`);
    }
  };
  
  // Effectuer l'entretien d'un bâtiment
  const performMaintenance = (buildingId: number) => {
    setIsLoading(true);
    
    const building = ownedBuildings.find(b => b.id === buildingId);
    
    if (!building) {
      toast.error("Bâtiment introuvable");
      setIsLoading(false);
      return false;
    }
    
    if (balance < building.maintenanceCost) {
      toast.error("Fonds insuffisants pour effectuer l'entretien");
      setIsLoading(false);
      return false;
    }
    
    setTimeout(() => {
      // Mettre à jour l'état et la date d'entretien
      setOwnedBuildings(prev => 
        prev.map(b => 
          b.id === buildingId 
            ? { ...b, condition: 100, lastMaintenance: new Date() }
            : b
        )
      );
      
      // Déduire le coût d'entretien du solde
      updateBalance(-building.maintenanceCost);
      
      toast.success(`Entretien de "${building.name}" effectué avec succès`);
      setIsLoading(false);
      return true;
    }, 1000);
    
    return true;
  };
  
  // Calculer la valeur marchande d'un bâtiment
  const calculateBuildingValue = (buildingId: number): number => {
    const building = ownedBuildings.find(b => b.id === buildingId);
    
    if (!building) return 0;
    
    // La valeur dépend de l'état du bâtiment et de sa localisation
    // Ici, on utilise une formule simplifiée
    const baseValue = building.maintenanceCost * 25; // Approximation de la valeur de base
    const conditionMultiplier = building.condition / 100;
    
    return Math.round(baseValue * conditionMultiplier);
  };
  
  // Assigner des esclaves à un bâtiment
  const assignSlaves = (buildingId: number, slaveCount: number) => {
    setOwnedBuildings(prev => 
      prev.map(building => 
        building.id === buildingId 
          ? { ...building, slaves: slaveCount }
          : building
      )
    );
    
    const building = ownedBuildings.find(b => b.id === buildingId);
    if (building) {
      toast.success(`${slaveCount} esclaves assignés à ${building.name}`);
    }
  };
  
  return {
    ownedBuildings,
    isLoading,
    purchaseBuilding,
    sellBuilding,
    toggleMaintenance,
    performMaintenance,
    calculateBuildingValue,
    assignSlaves
  };
}
