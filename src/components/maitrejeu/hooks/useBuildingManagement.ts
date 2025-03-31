
import { useState, useEffect } from 'react';
import { useMaitreJeu } from '../context';
import { v4 as uuidv4 } from 'uuid';
import { 
  Building, 
  BuildingType, 
  BuildingFilter, 
  ConstructionProject,
  MaintenanceTask,
  BuildingStatus,
  BuildingCreationData
} from '../types/batiments';
import { GameDate, Season } from '../types/common';
import { toast } from 'sonner';

export const useBuildingManagement = () => {
  const {
    buildings,
    setBuildings,
    constructionProjects,
    setConstructionProjects,
    maintenanceTasks,
    setMaintenanceTasks,
    treasury,
    setTreasury,
    currentDate
  } = useMaitreJeu();
  
  const [filter, setFilter] = useState<BuildingFilter>({
    types: [],
    locations: [],
    status: 'all',
    minRevenue: 0,
    maxMaintenance: 100000,
    searchTerm: ''
  });
  
  // Ajouter un nouveau bâtiment
  const addBuilding = (building: Omit<Building, 'id'>): string => {
    const newBuilding: Building = {
      ...building,
      id: uuidv4(),
      constructionYear: currentDate.year,
      value: building.value || 10000,
      maintenance: building.maintenance || building.maintenanceCost || 0,
      maintenanceCost: building.maintenanceCost || building.maintenance || 0,
      condition: building.condition || 100,
      workers: building.workers || 0,
      cost: building.cost || 0,
      capacity: building.capacity || 0,
      owner: building.owner || 'république'
    };
    
    setBuildings(prev => [...prev, newBuilding]);
    return newBuilding.id;
  };
  
  // Ajouter un projet de construction
  const addConstructionProject = (project: Omit<ConstructionProject, 'id' | 'progress' | 'approved'>): string => {
    const newProject: ConstructionProject = {
      ...project,
      id: uuidv4(),
      progress: 0,
      startDate: new Date(),
      estimatedEndDate: project.estimatedEndDate || {
        year: currentDate.year + 1,
        season: currentDate.season
      },
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
        if (building.status === 'construction' || building.status === 'renovation') {
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
    if (condition >= 90) return 'excellent';
    if (condition >= 75) return 'good';
    if (condition >= 50) return 'fair';
    if (condition >= 30) return 'poor';
    if (condition >= 10) return 'damaged';
    return 'ruined';
  };
  
  // Collecter les revenus des bâtiments
  const collectBuildingRevenues = (date: GameDate) => {
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
    if (totalRevenue > 0) {
      setTreasury((prev: any) => ({
        ...prev,
        balance: prev.balance + totalRevenue,
        income: prev.income + totalRevenue
      }));
      
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
              type: project.type as BuildingType,
              location: project.location,
              value: project.cost * 1.2, // Valeur supérieure au coût
              maintenance: project.cost * 0.05, // 5% du coût comme maintenance
              maintenanceCost: project.cost * 0.05,
              condition: 100, // Nouveau bâtiment en parfait état
              status: 'excellent',
              workers: project.workers,
              constructionYear: currentDate.year,
              description: project.description
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
    setTreasury((prev: any) => ({
      ...prev,
      balance: prev.balance - totalMaintenanceCost,
      expenses: prev.expenses + totalMaintenanceCost
    }));
    
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
  
  return {
    buildings,
    constructionProjects,
    maintenanceTasks,
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
    getFilteredBuildings
  };
};
