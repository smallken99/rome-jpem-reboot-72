
import { useState, useCallback } from 'react';
import { OwnedBuilding } from '@/types/buildings';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'sonner';

export const useBuildingManagement = () => {
  const [buildings, setBuildings] = useState<OwnedBuilding[]>([]);

  // Ajouter un nouveau bâtiment
  const addBuilding = useCallback((building: Omit<OwnedBuilding, 'id'>) => {
    const newBuilding: OwnedBuilding = {
      ...building,
      id: uuidv4(), // Générer un ID string
      purchaseDate: new Date(),
      condition: 100,
      maintenanceLevel: 2, // Niveau standard par défaut
      securityLevel: 1, // Niveau basique par défaut
    };
    
    setBuildings(prev => [...prev, newBuilding]);
    toast.success(`Bâtiment "${building.name}" ajouté avec succès.`);
    return newBuilding.id;
  }, []);

  // Mettre à jour un bâtiment existant
  const updateBuilding = useCallback((id: string, updates: Partial<OwnedBuilding>) => {
    setBuildings(prev => 
      prev.map(building => 
        building.id === id ? { ...building, ...updates } : building
      )
    );
    toast.success(`Bâtiment mis à jour.`);
  }, []);

  // Supprimer un bâtiment
  const removeBuilding = useCallback((id: string) => {
    setBuildings(prev => prev.filter(building => building.id !== id));
    toast.success(`Bâtiment supprimé.`);
  }, []);

  // Mise à jour du niveau d'entretien
  const updateMaintenanceLevel = useCallback((id: string, level: number) => {
    setBuildings(prev => 
      prev.map(building => 
        building.id === id ? { ...building, maintenanceLevel: level } : building
      )
    );
    toast.success(`Niveau d'entretien mis à jour.`);
  }, []);

  // Mise à jour du niveau de sécurité
  const updateSecurityLevel = useCallback((id: string, level: number) => {
    setBuildings(prev => 
      prev.map(building => 
        building.id === id ? { ...building, securityLevel: level } : building
      )
    );
    toast.success(`Niveau de sécurité mis à jour.`);
  }, []);

  // Mise à jour du nombre de travailleurs
  const updateWorkers = useCallback((id: string, count: number) => {
    setBuildings(prev => 
      prev.map(building => 
        building.id === id ? { ...building, workers: count } : building
      )
    );
    toast.success(`Nombre de travailleurs mis à jour.`);
  }, []);

  // Rénovation d'un bâtiment
  const renovateBuilding = useCallback((id: string) => {
    setBuildings(prev => 
      prev.map(building => 
        building.id === id ? { ...building, condition: Math.min(100, building.condition + 25) } : building
      )
    );
    toast.success(`Bâtiment rénové avec succès.`);
  }, []);

  return {
    buildings,
    addBuilding,
    updateBuilding,
    removeBuilding,
    updateMaintenanceLevel,
    updateSecurityLevel,
    updateWorkers,
    renovateBuilding
  };
};
