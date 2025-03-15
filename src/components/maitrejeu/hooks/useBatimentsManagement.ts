
import { useState } from 'react';
import { 
  Building, 
  BuildingCreationData, 
  ConstructionProject, 
  MaintenanceTask,
  MaintenanceRecord
} from '../types/batiments';
import { v4 as uuidv4 } from 'uuid';
import { useMaitreJeu } from '../context';
import { GameDate } from '../types/common';

// Mock data for buildings
const mockBuildings: Building[] = [
  {
    id: '1',
    name: 'Temple de Jupiter',
    type: 'temple',
    location: 'Capitole',
    status: 'good',
    constructionYear: 720,
    description: 'Temple principal dédié à Jupiter Optimus Maximus',
    cost: 500000,
    maintenanceCost: 5000,
    revenue: 10000,
    capacity: 1000,
    owner: 'république'
  },
  {
    id: '2',
    name: 'Forum Romanum',
    type: 'forum',
    location: 'Centre de Rome',
    status: 'excellent',
    constructionYear: 650,
    description: 'Place publique principale de Rome',
    cost: 1000000,
    maintenanceCost: 10000,
    revenue: 50000,
    capacity: 5000,
    owner: 'république'
  }
];

// Mock data for construction projects
const mockProjects: ConstructionProject[] = [
  {
    id: '1',
    buildingType: 'aqueduct',
    name: 'Aqua Claudia',
    buildingName: 'Aqua Claudia',
    location: 'Nord-est de Rome',
    description: 'Nouvel aqueduc pour approvisionner Rome en eau',
    cost: 700000,
    totalCost: 700000,
    estimatedCompletionDate: { year: 755, season: 'SUMMER' },
    startDate: { year: 752, season: 'SPRING' },
    progress: 35,
    approved: true,
    sponsor: 'Sénat',
    workers: 500,
    expectedCompletionYear: 755
  }
];

// Mock data for maintenance tasks
const mockMaintenanceTasks: MaintenanceTask[] = [
  {
    id: '1',
    buildingId: '1',
    buildingName: 'Temple de Jupiter',
    deadline: { year: 752, season: 'FALL' },
    estimatedCost: 2000,
    priority: 'high',
    status: 'scheduled',
    description: 'Réparation de la toiture et des colonnes'
  }
];

// Mock data for maintenance records
const mockMaintenanceRecords: MaintenanceRecord[] = [
  {
    id: '1',
    buildingId: '2',
    date: { year: 751, season: 'SPRING' },
    cost: 5000,
    description: 'Rénovation complète des pavés',
    performedBy: 'Édile Marcus Porcius',
    repairLevel: 'major',
    previousStatus: 'damaged',
    newStatus: 'excellent'
  }
];

export const useBatimentsManagement = () => {
  const { currentYear, currentSeason } = useMaitreJeu();
  const [buildings, setBuildings] = useState<Building[]>(mockBuildings);
  const [constructionProjects, setConstructionProjects] = useState<ConstructionProject[]>(mockProjects);
  const [maintenanceTasks, setMaintenanceTasks] = useState<MaintenanceTask[]>(mockMaintenanceTasks);
  const [maintenanceRecords, setMaintenanceRecords] = useState<MaintenanceRecord[]>(mockMaintenanceRecords);
  
  const [isAddBuildingModalOpen, setIsAddBuildingModalOpen] = useState(false);
  const [selectedBuilding, setSelectedBuilding] = useState<Building | undefined>();
  
  // Ajouter un nouveau bâtiment
  const addBuilding = (buildingData: BuildingCreationData) => {
    const newBuilding: Building = {
      ...buildingData,
      id: uuidv4()
    };
    setBuildings([...buildings, newBuilding]);
    return newBuilding.id;
  };
  
  // Mettre à jour un bâtiment existant
  const updateBuilding = (id: string, buildingData: Partial<Building>) => {
    setBuildings(buildings.map(building => 
      building.id === id ? { ...building, ...buildingData } : building
    ));
  };
  
  // Supprimer un bâtiment
  const deleteBuilding = (id: string) => {
    setBuildings(buildings.filter(building => building.id !== id));
  };
  
  // Ajouter un nouveau projet de construction
  const addConstructionProject = (projectData: Omit<ConstructionProject, "id" | "approved" | "progress">) => {
    const newProject: ConstructionProject = {
      ...projectData,
      id: uuidv4(),
      approved: false,
      progress: 0
    };
    setConstructionProjects([...constructionProjects, newProject]);
    return newProject.id;
  };
  
  // Mettre à jour un projet de construction
  const updateConstructionProject = (id: string, projectData: Partial<ConstructionProject>) => {
    setConstructionProjects(constructionProjects.map(project => 
      project.id === id ? { ...project, ...projectData } : project
    ));
  };
  
  // Approuver un projet de construction
  const approveConstructionProject = (id: string) => {
    setConstructionProjects(constructionProjects.map(project => 
      project.id === id ? { ...project, approved: true } : project
    ));
  };
  
  // Mettre à jour le progrès d'un projet de construction
  const updateConstructionProgress = (id: string, progress: number) => {
    setConstructionProjects(constructionProjects.map(project => {
      if (project.id === id) {
        const updatedProject = { ...project, progress };
        
        // Si le projet est terminé, créer un nouveau bâtiment
        if (progress >= 100) {
          const newBuilding: Building = {
            id: uuidv4(),
            name: project.buildingName || project.name,
            type: project.buildingType,
            location: project.location,
            status: 'good',
            constructionYear: currentYear,
            description: project.description,
            cost: project.totalCost || project.cost,
            maintenanceCost: Math.round(project.cost * 0.01), // 1% du coût pour l'entretien
            revenue: 0, // À définir selon le type de bâtiment
            capacity: 0, // À définir selon le type de bâtiment
            owner: 'république',
            condition: 'good'
          };
          
          setBuildings([...buildings, newBuilding]);
        }
        
        return updatedProject;
      }
      return project;
    }));
  };
  
  // Ajouter une tâche de maintenance
  const addMaintenanceTask = (taskData: Omit<MaintenanceTask, "id">) => {
    const newTask: MaintenanceTask = {
      ...taskData,
      id: uuidv4()
    };
    setMaintenanceTasks([...maintenanceTasks, newTask]);
    return newTask.id;
  };
  
  // Mettre à jour une tâche de maintenance
  const updateMaintenanceTask = (id: string, taskData: Partial<MaintenanceTask>) => {
    setMaintenanceTasks(maintenanceTasks.map(task => 
      task.id === id ? { ...task, ...taskData } : task
    ));
  };
  
  // Compléter une tâche de maintenance
  const completeMaintenanceTask = (id: string) => {
    // Trouver la tâche
    const task = maintenanceTasks.find(t => t.id === id);
    if (!task) return;
    
    // Trouver le bâtiment associé
    const building = buildings.find(b => b.id === task.buildingId);
    if (!building) return;
    
    // Créer un enregistrement de maintenance
    const maintenanceRecord: MaintenanceRecord = {
      id: uuidv4(),
      buildingId: task.buildingId,
      date: { year: currentYear, season: currentSeason },
      cost: task.estimatedCost,
      description: task.description,
      performedBy: 'Édile en charge', // À remplacer par l'information réelle
      repairLevel: task.priority === 'critical' ? 'major' : 
                  task.priority === 'high' ? 'moderate' : 'minor',
      previousStatus: building.status,
      newStatus: 'good'
    };
    
    // Mettre à jour le bâtiment
    updateBuilding(building.id, { 
      status: 'good',
      lastMaintenance: { year: currentYear, season: currentSeason },
      nextMaintenanceNeeded: { 
        year: currentYear + 2, 
        season: currentSeason 
      }
    });
    
    // Ajouter l'enregistrement et mettre à jour la tâche
    setMaintenanceRecords([...maintenanceRecords, maintenanceRecord]);
    updateMaintenanceTask(id, { status: 'completed' });
  };
  
  // Obtenir les bâtiments par type
  const getBuildingsByType = () => {
    return {
      temples: buildings.filter(b => b.type === 'temple'),
      government: buildings.filter(b => ['basilica', 'forum'].includes(b.type)),
      entertainment: buildings.filter(b => ['theater', 'amphitheater', 'circus'].includes(b.type)),
      infrastructure: buildings.filter(b => ['aqueduct', 'bridge', 'road'].includes(b.type)),
      commercial: buildings.filter(b => ['market', 'port', 'warehouse'].includes(b.type)),
      other: buildings.filter(b => b.type === 'other' || b.type === 'villa')
    };
  };
  
  // Obtenir la répartition des conditions des bâtiments
  const getBuildingConditionStats = () => {
    return {
      excellent: buildings.filter(b => b.status === 'excellent').length,
      good: buildings.filter(b => b.status === 'good').length,
      damaged: buildings.filter(b => b.status === 'damaged').length,
      poor: buildings.filter(b => b.status === 'poor').length,
      ruined: buildings.filter(b => b.status === 'ruined').length
    };
  };
  
  return {
    buildings,
    constructionProjects,
    maintenanceTasks,
    maintenanceRecords,
    isAddBuildingModalOpen,
    setIsAddBuildingModalOpen,
    selectedBuilding,
    setSelectedBuilding,
    addBuilding,
    updateBuilding,
    deleteBuilding,
    addConstructionProject,
    updateConstructionProject,
    approveConstructionProject,
    updateConstructionProgress,
    addMaintenanceTask,
    updateMaintenanceTask,
    completeMaintenanceTask,
    getBuildingsByType,
    getBuildingConditionStats
  };
};

export default useBatimentsManagement;
