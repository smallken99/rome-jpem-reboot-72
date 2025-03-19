
import { useState, useCallback } from 'react';
import { OwnedBuilding } from '@/types/buildings';
import { toast } from 'sonner';

export const useBuildings = (initialBuildings: OwnedBuilding[] = []) => {
  const [buildings, setBuildings] = useState<OwnedBuilding[]>(initialBuildings);

  const findBuildingById = useCallback((id: string): OwnedBuilding | undefined => {
    return buildings.find(building => building.id === id);
  }, [buildings]);

  const updateMaintenanceLevel = useCallback((buildingId: string, level: number) => {
    setBuildings(prev => 
      prev.map(building => 
        building.id === buildingId ? { ...building, maintenanceLevel: level } : building
      )
    );
    toast.success(`Niveau d'entretien mis à jour`);
  }, []);

  const updateSecurityLevel = useCallback((buildingId: string, level: number) => {
    setBuildings(prev => 
      prev.map(building => 
        building.id === buildingId ? { ...building, securityLevel: level } : building
      )
    );
    toast.success(`Niveau de sécurité mis à jour`);
  }, []);

  const updateWorkers = useCallback((buildingId: string, workers: number) => {
    setBuildings(prev => 
      prev.map(building => 
        building.id === buildingId ? { ...building, workers } : building
      )
    );
    toast.success(`Personnel mis à jour`);
  }, []);

  const renovateBuilding = useCallback((buildingId: string) => {
    setBuildings(prev => 
      prev.map(building => 
        building.id === buildingId ? 
          { ...building, condition: Math.min(100, building.condition + 25) } : 
          building
      )
    );
    toast.success(`Bâtiment rénové avec succès`);
  }, []);

  const sellBuilding = useCallback((buildingId: string) => {
    setBuildings(prev => prev.filter(building => building.id !== buildingId));
    toast.success(`Bâtiment vendu avec succès`);
    return true;
  }, []);

  return {
    buildings,
    findBuildingById,
    updateMaintenanceLevel,
    updateSecurityLevel,
    updateWorkers,
    renovateBuilding,
    sellBuilding
  };
};
