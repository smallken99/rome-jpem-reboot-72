
import { useState, useEffect, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useMaitreJeu } from '../context/MaitreJeuContext';
import { 
  Building, 
  ConstructionProject, 
  MaintenanceRecord, 
  MaintenanceTask,
  BuildingRevenueRecord
} from '../types/batiments';
import { GameDate } from '../types/common';

export const useBuildingManagement = () => {
  const { currentYear, currentSeason } = useMaitreJeu();
  
  // États
  const [buildings, setBuildings] = useState<Building[]>([]);
  const [constructionProjects, setConstructionProjects] = useState<ConstructionProject[]>([]);
  const [maintenanceRecords, setMaintenanceRecords] = useState<MaintenanceRecord[]>([]);
  const [maintenanceTasks, setMaintenanceTasks] = useState<MaintenanceTask[]>([]);
  const [revenueRecords, setRevenueRecords] = useState<BuildingRevenueRecord[]>([]);

  // Charger les données (simulation)
  useEffect(() => {
    // Dans une vraie application, les données seraient chargées depuis une API
    // Pour l'instant, nous utilisons des données fictives
    setBuildings([
      // Exemple de bâtiments
      {
        id: "b1",
        name: "Forum Romanum",
        type: "forum",
        location: "Centre de Rome",
        status: "good",
        constructionYear: 650,
        description: "Centre civique et politique de Rome",
        cost: 500000,
        maintenanceCost: 20000,
        revenue: 30000,
        capacity: 5000,
        owner: "république"
      },
      // ... autres bâtiments
    ]);
  }, []);

  // Créer un nouveau projet de construction
  const createConstructionProject = useCallback((projectData: Omit<ConstructionProject, "id" | "approved" | "progress">) => {
    const newProject: ConstructionProject = {
      id: uuidv4(),
      ...projectData,
      progress: 0,
      approved: false,
      expectedCompletionYear: projectData.estimatedCompletionDate.year
    };
    
    setConstructionProjects(prev => [...prev, newProject]);
    
    return newProject.id;
  }, []);

  // Mettre à jour un projet de construction
  const updateConstructionProject = useCallback((id: string, updates: Partial<ConstructionProject>) => {
    setConstructionProjects(prev => 
      prev.map(project => project.id === id ? { ...project, ...updates } : project)
    );
  }, []);

  // Ajouter un nouvel enregistrement de maintenance
  const addMaintenanceRecord = useCallback((buildingId: string, data: Omit<MaintenanceRecord, "id">) => {
    const newRecord: MaintenanceRecord = {
      id: uuidv4(),
      buildingId,
      ...data
    };
    
    setMaintenanceRecords(prev => [...prev, newRecord]);
    
    // Mettre à jour l'état du bâtiment concerné
    setBuildings(prev => 
      prev.map(building => 
        building.id === buildingId 
          ? { 
              ...building, 
              status: data.newStatus,
              lastMaintenance: data.date,
              condition: 'good'
            } 
          : building
      )
    );
    
    return newRecord.id;
  }, []);

  // Planifier une tâche de maintenance
  const scheduleMaintenanceTask = useCallback((data: Omit<MaintenanceTask, "id">) => {
    const newTask: MaintenanceTask = {
      id: uuidv4(),
      ...data,
      startDate: data.startDate || { year: currentYear, season: currentSeason }
    };
    
    setMaintenanceTasks(prev => [...prev, newTask]);
    
    return newTask.id;
  }, [currentYear, currentSeason]);

  // Terminer une tâche de maintenance
  const completeMaintenanceTask = useCallback((taskId: string, performance?: string) => {
    setMaintenanceTasks(prev => 
      prev.map(task => 
        task.id === taskId 
          ? { ...task, status: 'completed' } 
          : task
      )
    );
    
    // Récupérer la tâche
    const task = maintenanceTasks.find(t => t.id === taskId);
    
    if (task) {
      // Créer un enregistrement de maintenance correspondant
      const record: Omit<MaintenanceRecord, "id"> = {
        buildingId: task.buildingId,
        date: { year: currentYear, season: currentSeason },
        cost: task.estimatedCost,
        description: `Maintenance planifiée: ${task.description}`,
        performedBy: "Équipe de maintenance",
        repairLevel: task.priority === 'critical' ? 'major' : 
                    task.priority === 'high' ? 'moderate' : 'minor',
        previousStatus: 'poor',
        newStatus: 'good'
      };
      
      addMaintenanceRecord(task.buildingId, record);
    }
  }, [maintenanceTasks, currentYear, currentSeason, addMaintenanceRecord]);

  // Ajouter un enregistrement de revenu de bâtiment
  const addRevenueRecord = useCallback((data: Omit<BuildingRevenueRecord, "id">) => {
    const newRecord: BuildingRevenueRecord = {
      id: uuidv4(),
      ...data
    };
    
    setRevenueRecords(prev => [...prev, newRecord]);
    
    return newRecord.id;
  }, []);

  // Calculer le revenu pour un bâtiment spécifique
  const calculateBuildingRevenue = useCallback((buildingId: string, year: number, season: string) => {
    const building = buildings.find(b => b.id === buildingId);
    
    if (!building) return 0;
    
    // Prendre en compte l'état du bâtiment pour le calcul du revenu
    let modifier = 1.0;
    
    switch (building.status) {
      case 'excellent':
        modifier = 1.2;
        break;
      case 'good':
        modifier = 1.0;
        break;
      case 'damaged':
        modifier = 0.7;
        break;
      case 'poor':
        modifier = 0.4;
        break;
      case 'ruined':
        modifier = 0.0;
        break;
      default:
        modifier = 1.0;
    }
    
    const calculatedRevenue = Math.round(building.revenue * modifier);
    
    return calculatedRevenue;
  }, [buildings]);

  // Simuler l'avancement du temps pour les projets de construction
  const advanceConstructionProjects = useCallback(() => {
    setConstructionProjects(prev => 
      prev.map(project => {
        if (project.progress >= 100) return project;
        
        // Calculer la progression en fonction de la saison et d'autres facteurs
        const progressIncrement = Math.random() * 10 + 5; // Entre 5 et 15%
        const newProgress = Math.min(100, project.progress + progressIncrement);
        
        // Si le projet est maintenant terminé, créer le bâtiment correspondant
        if (newProgress >= 100 && project.buildingType) {
          // Créer le bâtiment
          const newBuilding: Building = {
            id: uuidv4(),
            name: project.buildingName || project.name,
            type: project.buildingType,
            location: project.location,
            status: 'excellent',
            constructionYear: currentYear,
            description: project.description,
            cost: project.totalCost || project.cost,
            maintenanceCost: Math.round(project.cost * 0.02),
            revenue: ['market', 'port', 'warehouse', 'forum'].includes(project.buildingType) 
              ? Math.round(project.cost * 0.05)
              : 0,
            capacity: Math.round(project.cost / 100),
            owner: project.sponsor === 'République' ? 'république' : 'private'
          };
          
          setBuildings(prev => [...prev, newBuilding]);
        }
        
        return {
          ...project,
          progress: newProgress
        };
      })
    );
  }, [currentYear]);

  // Ajout d'un nouveau bâtiment
  const addBuilding = useCallback((buildingData: Omit<Building, "id">) => {
    const newBuilding: Building = {
      id: uuidv4(),
      ...buildingData
    };
    
    setBuildings(prev => [...prev, newBuilding]);
    
    return newBuilding.id;
  }, []);

  // Suppression d'un bâtiment
  const deleteBuilding = useCallback((buildingId: string) => {
    setBuildings(prev => prev.filter(building => building.id !== buildingId));
  }, []);

  // Mettre à jour un bâtiment
  const updateBuilding = useCallback((id: string, updates: Partial<Building>) => {
    setBuildings(prev => 
      prev.map(building => building.id === id ? { ...building, ...updates } : building)
    );
  }, []);

  return {
    buildings,
    constructionProjects,
    maintenanceRecords,
    maintenanceTasks,
    revenueRecords,
    createConstructionProject,
    updateConstructionProject,
    addMaintenanceRecord,
    scheduleMaintenanceTask,
    completeMaintenanceTask,
    addRevenueRecord,
    calculateBuildingRevenue,
    advanceConstructionProjects,
    addBuilding,
    deleteBuilding,
    updateBuilding
  };
};
