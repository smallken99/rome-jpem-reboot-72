
import { useState, useCallback } from 'react';
import { toast } from 'sonner';
import { Building, MaintenanceTask } from '@/components/maitrejeu/types/batiments';
import { calculateBuildingValue, getBuildingStatusFromCondition } from '@/utils/buildingUtils';
import { useEconomy } from './useEconomy';

/**
 * Hook pour les opérations de bâtiments (maintenance, réparation, améliorations)
 */
export function useBuildingOperations(initialBuildings: Building[] = []) {
  const [buildings, setBuildings] = useState<Building[]>(initialBuildings);
  const [maintenanceTasks, setMaintenanceTasks] = useState<MaintenanceTask[]>([]);
  const { makePayment, canAfford } = useEconomy();
  
  /**
   * Ajoute une tâche de maintenance
   */
  const addMaintenanceTask = useCallback((task: Omit<MaintenanceTask, 'id'>) => {
    const newTask: MaintenanceTask = {
      ...task,
      id: `task-${Date.now()}`
    };
    
    setMaintenanceTasks(prev => [...prev, newTask]);
    toast.success(`Nouvelle tâche de maintenance planifiée`);
    return newTask.id;
  }, []);
  
  /**
   * Termine une tâche de maintenance et applique ses effets
   */
  const completeMaintenanceTask = useCallback((taskId: string) => {
    const task = maintenanceTasks.find(t => t.id === taskId);
    
    if (!task) {
      toast.error("Tâche introuvable");
      return false;
    }
    
    // Vérifier si le paiement est possible
    if (!canAfford(task.cost)) {
      toast.error(`Fonds insuffisants pour compléter cette tâche (${task.cost} As requis)`);
      return false;
    }
    
    // Effectuer le paiement
    makePayment(
      task.cost,
      `Maintenance: ${task.buildingName}`,
      'Dépenses immobilières',
      `${task.type === 'repair' ? 'Réparation' : task.type === 'upgrade' ? 'Amélioration' : 'Maintenance'} de ${task.buildingName}`
    );
    
    // Trouver le bâtiment concerné
    const buildingIndex = buildings.findIndex(b => b.id === task.buildingId);
    
    if (buildingIndex === -1) {
      toast.error("Bâtiment introuvable");
      setMaintenanceTasks(prev => prev.filter(t => t.id !== taskId));
      return false;
    }
    
    // Appliquer les effets en fonction du type de tâche
    const building = buildings[buildingIndex];
    let conditionImprovement = 0;
    
    switch (task.type) {
      case 'repair':
        conditionImprovement = 30;
        break;
      case 'upgrade':
        conditionImprovement = 10;
        // Augmenter également la valeur et d'autres attributs lors d'une amélioration
        building.value = Math.round(building.value * 1.1);
        building.revenue = Math.round((building.revenue || 0) * 1.1);
        building.capacity = Math.round((building.capacity || 0) * 1.1);
        break;
      case 'maintenance':
        conditionImprovement = 15;
        break;
    }
    
    // Mettre à jour la condition et le statut du bâtiment
    const newCondition = Math.min(100, building.condition + conditionImprovement);
    const newStatus = getBuildingStatusFromCondition(newCondition);
    
    const updatedBuilding = {
      ...building,
      condition: newCondition,
      status: newStatus
    };
    
    // Mettre à jour le bâtiment
    setBuildings(prev => [
      ...prev.slice(0, buildingIndex),
      updatedBuilding,
      ...prev.slice(buildingIndex + 1)
    ]);
    
    // Marquer la tâche comme terminée
    setMaintenanceTasks(prev => 
      prev.map(t => t.id === taskId 
        ? { ...t, status: 'completed', completionDate: new Date().toISOString() } 
        : t
      )
    );
    
    toast.success(`Tâche de ${task.type === 'repair' ? 'réparation' : task.type === 'upgrade' ? 'amélioration' : 'maintenance'} terminée avec succès!`);
    return true;
  }, [buildings, maintenanceTasks, canAfford, makePayment]);
  
  /**
   * Met à jour la propriété d'un bâtiment
   */
  const updateBuildingProperty = useCallback(<K extends keyof Building>(
    buildingId: string,
    property: K,
    value: Building[K]
  ): boolean => {
    const buildingIndex = buildings.findIndex(b => b.id === buildingId);
    
    if (buildingIndex === -1) {
      toast.error("Bâtiment introuvable");
      return false;
    }
    
    const updatedBuilding = {
      ...buildings[buildingIndex],
      [property]: value
    };
    
    setBuildings(prev => [
      ...prev.slice(0, buildingIndex),
      updatedBuilding,
      ...prev.slice(buildingIndex + 1)
    ]);
    
    return true;
  }, [buildings]);
  
  /**
   * Exécute un entretien complet sur un bâtiment
   */
  const performFullMaintenance = useCallback((buildingId: string): boolean => {
    const building = buildings.find(b => b.id === buildingId);
    
    if (!building) {
      toast.error("Bâtiment introuvable");
      return false;
    }
    
    // Calculer le coût de la maintenance complète
    const maintenanceCost = Math.round(building.maintenanceCost * 1.5);
    
    // Vérifier si le paiement est possible
    if (!canAfford(maintenanceCost)) {
      toast.error(`Fonds insuffisants pour la maintenance complète (${maintenanceCost} As requis)`);
      return false;
    }
    
    // Effectuer le paiement
    makePayment(
      maintenanceCost,
      `Maintenance complète: ${building.name}`,
      'Dépenses immobilières',
      `Maintenance complète de ${building.name}`
    );
    
    // Mettre à jour la condition et le statut du bâtiment
    const newCondition = 100; // Condition maximale après maintenance complète
    const newStatus = 'excellent';
    
    updateBuildingProperty(buildingId, 'condition', newCondition);
    updateBuildingProperty(buildingId, 'status', newStatus);
    
    toast.success(`Maintenance complète effectuée sur ${building.name}`);
    return true;
  }, [buildings, canAfford, makePayment, updateBuildingProperty]);
  
  return {
    buildings,
    setBuildings,
    maintenanceTasks,
    setMaintenanceTasks,
    addMaintenanceTask,
    completeMaintenanceTask,
    updateBuildingProperty,
    performFullMaintenance
  };
}
