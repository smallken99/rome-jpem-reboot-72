
import { useState } from 'react';
import { useMaitreJeu } from '../context';
import { v4 as uuidv4 } from 'uuid';
import { 
  Building, 
  BuildingType, 
  BuildingStatus,
  BuildingFilter,
  ConstructionProject,
  MaintenanceTask,
  BuildingCreationData,
  BuildingPriority
} from '../types/batiments';
import { toast } from 'sonner';

export const useBuildingManagement = () => {
  // Mock data for development - in a real app this would come from context or API
  const [buildings, setBuildings] = useState<Building[]>([
    {
      id: "building-1",
      name: "Temple de Jupiter",
      type: BuildingType.TEMPLE,
      location: "Capitole",
      owner: "république",
      value: 100000,
      maintenance: 2000,
      maintenanceCost: 2000,
      condition: 95,
      status: BuildingStatus.EXCELLENT,
      description: "Temple principal dédié à Jupiter Optimus Maximus",
      constructionYear: 509,
      cost: 150000,
      revenue: 0,
      capacity: 1000
    },
    {
      id: "building-2",
      name: "Forum Romanum",
      type: BuildingType.FORUM,
      location: "Centre ville",
      owner: "république",
      value: 200000,
      maintenance: 5000,
      maintenanceCost: 5000,
      condition: 90,
      status: BuildingStatus.GOOD,
      description: "Centre politique et commercial de Rome",
      constructionYear: 600,
      cost: 300000,
      revenue: 10000,
      capacity: 5000
    }
  ]);
  
  const [constructionProjects, setConstructionProjects] = useState<ConstructionProject[]>([]);
  const [maintenanceTasks, setMaintenanceTasks] = useState<MaintenanceTask[]>([]);
  const [maintenanceRecords, setMaintenanceRecords] = useState<any[]>([]);
  const [revenueRecords, setRevenueRecords] = useState<any[]>([]);
  
  const [filter, setFilter] = useState<BuildingFilter>({
    types: [],
    locations: [],
    status: 'all',
    minRevenue: 0,
    maxMaintenance: 100000,
    searchTerm: ''
  });
  
  // Access treasury from context
  const { treasury, setTreasury, currentDate } = useMaitreJeu();
  
  // Ajouter un nouveau bâtiment
  const addBuilding = (buildingData: BuildingCreationData): string => {
    const newBuilding: Building = {
      ...buildingData,
      id: uuidv4(),
      constructionYear: buildingData.constructionYear || currentDate.year,
      value: buildingData.value || 10000,
      maintenance: buildingData.maintenance,
      maintenanceCost: buildingData.maintenanceCost || buildingData.maintenance || 0,
      condition: buildingData.condition || 100,
      cost: buildingData.cost || 0,
      capacity: buildingData.capacity || 0,
      owner: buildingData.owner || 'république',
      status: buildingData.status || BuildingStatus.GOOD,
      revenue: buildingData.revenue || 0,
      workers: buildingData.workers || 0,
    };
    
    setBuildings(prev => [...prev, newBuilding]);
    return newBuilding.id;
  };
  
  // Ajouter un projet de construction
  const addConstructionProject = (project: Omit<ConstructionProject, "id" | "progress" | "approved">): string => {
    const newProject: ConstructionProject = {
      ...project,
      id: uuidv4(),
      progress: 0,
      startDate: new Date().toISOString(),
      approved: true
    };
    
    setConstructionProjects(prev => [...prev, newProject]);
    return newProject.id;
  };
  
  // Mettre à jour un bâtiment existant
  const updateBuilding = (id: string, updates: Partial<Building>) => {
    setBuildings(prev =>
      prev.map(building =>
        building.id === id ? { ...building, ...updates } : building
      )
    );
  };
  
  // Planifier une tâche de maintenance
  const scheduleMaintenanceTask = (task: Omit<MaintenanceTask, 'id'>): string => {
    const newTask: MaintenanceTask = {
      ...task,
      id: uuidv4(),
      status: 'pending'
    };
    
    setMaintenanceTasks(prev => [...prev, newTask]);
    return newTask.id;
  };
  
  // Mettre à jour l'état d'un bâtiment en fonction de sa maintenance
  const updateBuildingCondition = (buildingId: string, additionalCondition: number = 10) => {
    setBuildings(prev => 
      prev.map(building => {
        if (building.id === buildingId) {
          // Assurer que la condition reste entre 0 et 100
          const newCondition = Math.min(100, Math.max(0, building.condition + additionalCondition));
          return { 
            ...building, 
            condition: newCondition,
            status: getStatusFromCondition(newCondition)
          };
        }
        return building;
      })
    );
  };
  
  // Détériorer l'état des bâtiments avec le temps
  const deteriorateBuildings = (rate: number = 1) => {
    setBuildings(prev => 
      prev.map(building => {
        // Ne détériore pas les bâtiments en construction
        if (building.status === BuildingStatus.UNDER_CONSTRUCTION || building.status === 'planned') {
          return building;
        }
        
        // Calculer le taux de détérioration en fonction de la maintenance
        const maintenanceFactor = building.maintenanceLevel ? (1 - building.maintenanceLevel / 100) : 0.5;
        const deteriorationAmount = rate * maintenanceFactor;
        
        // Assurer que la condition reste supérieure à 0
        const newCondition = Math.max(0, building.condition - deteriorationAmount);
        
        return {
          ...building,
          condition: newCondition,
          status: getStatusFromCondition(newCondition)
        };
      })
    );
  };
  
  // Déterminer le statut en fonction de la condition
  const getStatusFromCondition = (condition: number): BuildingStatus => {
    if (condition >= 90) return BuildingStatus.EXCELLENT;
    if (condition >= 75) return BuildingStatus.GOOD;
    if (condition >= 50) return BuildingStatus.AVERAGE;
    if (condition >= 30) return BuildingStatus.POOR;
    if (condition >= 10) return BuildingStatus.FAIR;
    return BuildingStatus.RUINED;
  };
  
  // Collecter les revenus des bâtiments
  const collectBuildingRevenues = (date: any) => {
    const revenueBuildingTypes = ['market', 'villa', 'domus', 'insula', 'port', 'warehouse'];
    const revenues: any[] = [];
    let totalRevenue = 0;
    
    buildings.forEach(building => {
      if (revenueBuildingTypes.includes(building.type) && building.income && building.income > 0) {
        const conditionFactor = building.condition / 100;
        
        // Ajuster le revenu en fonction de l'état du bâtiment
        const adjustedRevenue = Math.round(building.income * conditionFactor);
        
        totalRevenue += adjustedRevenue;
        
        // Enregistrer le revenu pour ce bâtiment
        revenues.push({
          id: uuidv4(),
          buildingId: building.id,
          amount: adjustedRevenue,
          date: new Date(),
          source: 'Loyers et revenus réguliers',
          description: `Revenus de ${building.name}`,
          year: date.year,
          season: date.season
        });
      }
    });
    
    // Mettre à jour le trésor avec les revenus collectés
    if (totalRevenue > 0 && setTreasury) {
      const updatedTreasury = {
        ...treasury,
        balance: treasury.balance + totalRevenue,
        income: treasury.income + totalRevenue
      };
      setTreasury(updatedTreasury);
      
      toast.success(`Revenus collectés: ${totalRevenue.toLocaleString()} As`);
    }
    
    return { revenues, totalRevenue };
  };
  
  // Mise à jour des projets de construction
  const updateConstructionProgress = (projectId: string, progress: number) => {
    setConstructionProjects(prev => 
      prev.map(project => {
        if (project.id === projectId) {
          const newProgress = Math.min(100, project.progress + progress);
          
          // Vérifier si le projet est terminé
          if (newProgress >= 100) {
            // Créer le nouveau bâtiment
            const newBuilding: Building = {
              id: uuidv4(),
              name: project.name,
              type: project.type,
              location: project.location,
              owner: 'république',
              value: project.estimatedCost ? project.estimatedCost * 1.2 : 10000, // Valeur supérieure au coût
              maintenance: project.estimatedCost ? project.estimatedCost * 0.05 : 500, // 5% du coût comme maintenance
              maintenanceCost: project.estimatedCost ? project.estimatedCost * 0.05 : 500,
              condition: 100, // Nouveau bâtiment en parfait état
              status: BuildingStatus.EXCELLENT,
              constructionYear: currentDate.year,
              description: project.description || '',
              cost: project.estimatedCost || 10000,
              revenue: 0,
              capacity: 0
            };
            
            // Ajouter le bâtiment
            setBuildings(prev => [...prev, newBuilding]);
            
            // Notifier l'utilisateur
            toast.success(`Construction de ${project.name} terminée!`);
            
            // Retourner null pour supprimer ce projet
            return {
              ...project,
              progress: 100,
              status: 'completed'
            };
          }
          
          return {
            ...project,
            progress: newProgress
          };
        }
        return project;
      })
    );
  };
  
  // Effectuer un paiement pour la maintenance des bâtiments
  const payBuildingMaintenance = (buildingIds: string[] | 'all') => {
    const buildingsToMaintain = buildingIds === 'all' 
      ? buildings 
      : buildings.filter(b => buildingIds.includes(b.id));
    
    const totalMaintenanceCost = buildingsToMaintain.reduce(
      (sum, building) => sum + (building.maintenanceCost || 0),
      0
    );
    
    // Vérifier si le trésor a assez de fonds
    if (treasury.balance < totalMaintenanceCost) {
      toast.error(`Fonds insuffisants pour la maintenance (coût: ${totalMaintenanceCost.toLocaleString()} As)`);
      return false;
    }
    
    // Effectuer le paiement
    if (setTreasury) {
      const updatedTreasury = {
        ...treasury,
        balance: treasury.balance - totalMaintenanceCost,
        expenses: treasury.expenses + totalMaintenanceCost
      };
      setTreasury(updatedTreasury);
    }
    
    // Améliorer l'état des bâtiments maintenus
    buildingsToMaintain.forEach(building => {
      updateBuildingCondition(building.id, 15); // +15% condition
    });
    
    toast.success(`Maintenance effectuée pour ${buildingsToMaintain.length} bâtiments`);
    return true;
  };
  
  // Récupérer les bâtiments filtrés
  const getFilteredBuildings = () => {
    return buildings.filter(building => {
      // Filtrer par type
      if (filter.types.length > 0 && !filter.types.includes(building.type)) {
        return false;
      }
      
      // Filtrer par emplacement
      if (filter.locations.length > 0 && !filter.locations.includes(building.location)) {
        return false;
      }
      
      // Filtrer par statut
      if (filter.status !== 'all' && building.status !== filter.status) {
        return false;
      }
      
      // Filtrer par revenu minimum
      if (building.income && building.income < filter.minRevenue) {
        return false;
      }
      
      // Filtrer par coût de maintenance maximum
      if (building.maintenanceCost > filter.maxMaintenance) {
        return false;
      }
      
      // Filtrer par terme de recherche
      if (filter.searchTerm && !building.name.toLowerCase().includes(filter.searchTerm.toLowerCase())) {
        return false;
      }
      
      return true;
    });
  };
  
  // Supprimer un bâtiment
  const deleteBuilding = (id: string) => {
    setBuildings(prev => prev.filter(building => building.id !== id));
    toast.success('Bâtiment supprimé avec succès');
  };
  
  // Compléter une tâche de maintenance
  const completeMaintenanceTask = (taskId: string) => {
    // Find the task
    const task = maintenanceTasks.find(t => t.id === taskId);
    if (!task) return false;
    
    // Update the building condition
    updateBuildingCondition(task.buildingId, task.type === 'repair' ? 30 : 15);
    
    // Mark task as completed
    setMaintenanceTasks(prev => 
      prev.map(t => t.id === taskId 
        ? { ...t, status: 'completed', completionDate: new Date().toISOString() } 
        : t
      )
    );
    
    return true;
  };
  
  // Add a new maintenance task
  const addMaintenanceTask = (task: Omit<MaintenanceTask, 'id'>) => {
    const newTask: MaintenanceTask = {
      ...task,
      id: uuidv4(),
      status: 'pending'
    };
    
    setMaintenanceTasks(prev => [...prev, newTask]);
    return newTask.id;
  };

  // Cancel a maintenance task
  const cancelMaintenanceTask = (taskId: string) => {
    setMaintenanceTasks(prev => 
      prev.map(t => t.id === taskId 
        ? { ...t, status: 'cancelled' } 
        : t
      )
    );
    return true;
  };
  
  return {
    buildings,
    constructionProjects,
    maintenanceTasks,
    maintenanceRecords,
    revenueRecords,
    filter,
    setFilter,
    addBuilding,
    updateBuilding,
    deleteBuilding,
    addConstructionProject,
    updateConstructionProgress,
    scheduleMaintenanceTask,
    updateBuildingCondition,
    deteriorateBuildings,
    collectBuildingRevenues,
    payBuildingMaintenance,
    getFilteredBuildings,
    completeMaintenanceTask,
    cancelMaintenanceTask,
    addMaintenanceTask,
    setMaintenanceTasks
  };
};
