
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'sonner';
import { Building, ConstructionProject, MaintenanceTask, BuildingRevenue, BuildingType, BuildingCondition } from '../types/batiments';
import { GameDate } from '../types/common';

// Types d'actions possibles
type Action = 'view' | 'add' | 'edit' | 'delete' | 'maintain' | 'revenue';

interface UseBuildingManagementProps {
  initialBuildings?: Building[];
  initialConstructions?: ConstructionProject[];
  initialMaintenanceTasks?: MaintenanceTask[];
  initialRevenues?: BuildingRevenue[];
  currentDate: GameDate;
}

export function useBuildingManagement({
  initialBuildings = [],
  initialConstructions = [],
  initialMaintenanceTasks = [],
  initialRevenues = [],
  currentDate
}: UseBuildingManagementProps) {
  // État des bâtiments et projets
  const [buildings, setBuildings] = useState<Building[]>(initialBuildings);
  const [constructions, setConstructions] = useState<ConstructionProject[]>(initialConstructions);
  const [maintenanceTasks, setMaintenanceTasks] = useState<MaintenanceTask[]>(initialMaintenanceTasks);
  const [revenues, setRevenues] = useState<BuildingRevenue[]>(initialRevenues);
  
  // État de l'interface
  const [selectedBuilding, setSelectedBuilding] = useState<Building | null>(null);
  const [selectedConstruction, setSelectedConstruction] = useState<ConstructionProject | null>(null);
  const [selectedTask, setSelectedTask] = useState<MaintenanceTask | null>(null);
  const [currentAction, setCurrentAction] = useState<Action>('view');
  
  // Ajouter un nouveau projet de construction
  const addConstructionProject = (project: Omit<ConstructionProject, 'id' | 'progress' | 'approved'>) => {
    const newProject: ConstructionProject = {
      ...project,
      id: uuidv4(),
      progress: 0,
      approved: false,
      payments: []
    };
    
    setConstructions(prev => [...prev, newProject]);
    toast.success(`Projet de construction de ${project.buildingName} ajouté`);
    return newProject.id;
  };
  
  // Approuver un projet de construction
  const approveConstruction = (projectId: string) => {
    setConstructions(prev => 
      prev.map(proj => 
        proj.id === projectId 
          ? { ...proj, approved: true, startDate: currentDate }
          : proj
      )
    );
    toast.success('Projet de construction approuvé');
  };
  
  // Mettre à jour la progression d'un projet
  const updateConstructionProgress = (projectId: string, progress: number) => {
    setConstructions(prev => 
      prev.map(proj => 
        proj.id === projectId 
          ? { ...proj, progress: Math.max(0, Math.min(100, progress)) }
          : proj
      )
    );
    
    const project = constructions.find(p => p.id === projectId);
    if (progress >= 100 && project) {
      completeConstruction(projectId);
    }
  };
  
  // Terminer un projet de construction
  const completeConstruction = (projectId: string) => {
    const project = constructions.find(p => p.id === projectId);
    if (!project) return;
    
    // Créer le nouveau bâtiment
    const newBuilding: Building = {
      id: uuidv4(),
      name: project.buildingName,
      type: project.buildingType,
      description: project.description,
      location: project.location,
      condition: 'excellent',
      constructionYear: currentDate.year,
      lastMaintenance: currentDate,
      maintenanceCost: Math.round(project.totalCost * 0.05), // 5% du coût initial
      maintenanceInterval: 12, // 1 an par défaut
      revenue: 0, // À définir
      cost: 0, // À définir
      capacity: 0, // À définir
      isPublic: true,
      ownerId: null,
      slaves: 0,
      slaveCost: 0,
      tags: [],
      attributes: {}
    };
    
    // Ajouter le bâtiment et marquer le projet comme terminé
    setBuildings(prev => [...prev, newBuilding]);
    setConstructions(prev => 
      prev.map(proj => 
        proj.id === projectId 
          ? { ...proj, progress: 100, endDate: currentDate }
          : proj
      )
    );
    
    toast.success(`Construction de ${project.buildingName} terminée`);
    return newBuilding.id;
  };
  
  // Planifier une tâche de maintenance
  const scheduleMaintenance = (task: Omit<MaintenanceTask, 'id'>) => {
    const newTask: MaintenanceTask = {
      ...task,
      id: uuidv4()
    };
    
    setMaintenanceTasks(prev => [...prev, newTask]);
    
    // Mettre à jour la date de dernière maintenance du bâtiment
    updateBuilding(task.buildingId, {
      lastMaintenance: task.startDate
    });
    
    toast.success('Maintenance planifiée');
    return newTask.id;
  };
  
  // Ajouter un nouveau bâtiment
  const addBuilding = (building: Omit<Building, 'id'>) => {
    const newBuilding: Building = {
      ...building,
      id: uuidv4()
    };
    
    setBuildings(prev => [...prev, newBuilding]);
    toast.success(`Bâtiment ${building.name} ajouté`);
    return newBuilding.id;
  };
  
  // Mettre à jour un bâtiment
  const updateBuilding = (buildingId: string, updates: Partial<Building>) => {
    setBuildings(prev => 
      prev.map(building => 
        building.id === buildingId 
          ? { ...building, ...updates }
          : building
      )
    );
    
    toast.success('Bâtiment mis à jour');
  };
  
  // Supprimer un bâtiment
  const deleteBuilding = (buildingId: string) => {
    setBuildings(prev => prev.filter(b => b.id !== buildingId));
    toast.success('Bâtiment supprimé');
  };
  
  // Enregistrer un revenu pour un bâtiment
  const recordRevenue = (revenueData: Omit<BuildingRevenue, 'id'>) => {
    const newRevenue: BuildingRevenue = {
      ...revenueData,
      id: uuidv4()
    };
    
    setRevenues(prev => [...prev, newRevenue]);
    toast.success('Revenu enregistré');
    return newRevenue.id;
  };
  
  // Calculer les revenus totaux d'un bâtiment pour une période donnée
  const calculateTotalRevenue = (buildingId: string, startDate: GameDate, endDate: GameDate) => {
    const buildingRevenues = revenues.filter(r => 
      r.buildingId === buildingId && 
      r.collected && 
      ((r.year > startDate.year) || (r.year === startDate.year && r.season >= startDate.season)) &&
      ((r.year < endDate.year) || (r.year === endDate.year && r.season <= endDate.season))
    );
    
    return buildingRevenues.reduce((total, r) => total + r.amount, 0);
  };
  
  // Sélectionner un bâtiment pour une action
  const selectBuilding = (building: Building, action: Action = 'view') => {
    setSelectedBuilding(building);
    setCurrentAction(action);
  };
  
  return {
    // État
    buildings,
    constructions,
    maintenanceTasks,
    revenues,
    selectedBuilding,
    selectedConstruction,
    selectedTask,
    currentAction,
    
    // Actions bâtiments
    addBuilding,
    updateBuilding,
    deleteBuilding,
    selectBuilding,
    
    // Actions construction
    addConstructionProject,
    approveConstruction,
    updateConstructionProgress,
    completeConstruction,
    
    // Actions maintenance
    scheduleMaintenance,
    
    // Actions revenus
    recordRevenue,
    calculateTotalRevenue,
    
    // Actions UI
    setCurrentAction,
    setSelectedBuilding,
    setSelectedConstruction,
    setSelectedTask
  };
}
