
import { useState, useEffect } from 'react';
import { useMaitreJeu } from '../context/MaitreJeuContext';
import { 
  Building, 
  BuildingCreationData, 
  MaintenanceTask,
  ConstructionProject,
  MaintenanceRecord,
  BuildingRevenueRecord,
  PublicBuildingData
} from '../types/batiments';
import { useToast } from '@/components/ui/use-toast';
import { generateId } from '../types/common';

export const useBatimentsManagement = () => {
  // État du MaitreJeu
  const { 
    currentYear, 
    currentSeason,
    treasury,
    setTreasury,
    economieRecords,
    setEconomieRecords
  } = useMaitreJeu();
  
  // État local
  const [buildings, setBuildings] = useState<Building[]>([]);
  const [constructionProjects, setConstructionProjects] = useState<ConstructionProject[]>([]);
  const [maintenanceTasks, setMaintenanceTasks] = useState<MaintenanceTask[]>([]);
  const [maintenanceRecords, setMaintenanceRecords] = useState<MaintenanceRecord[]>([]);
  const [revenueRecords, setRevenueRecords] = useState<BuildingRevenueRecord[]>([]);
  
  // État UI
  const [isAddBuildingModalOpen, setIsAddBuildingModalOpen] = useState(false);
  const [selectedBuilding, setSelectedBuilding] = useState<Building | undefined>();
  const [isMaintenanceModalOpen, setIsMaintenanceModalOpen] = useState(false);
  const [selectedMaintenanceTask, setSelectedMaintenanceTask] = useState<MaintenanceTask | null>(null);
  const [isConstructionModalOpen, setIsConstructionModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<ConstructionProject | null>(null);
  
  const { toast } = useToast();
  
  // Méthodes CRUD pour les bâtiments
  const addBuilding = (buildingData: BuildingCreationData) => {
    const newBuilding: Building = {
      id: generateId(),
      ...buildingData,
      status: buildingData.status || 'good'
    };
    
    setBuildings(prev => [...prev, newBuilding]);
    
    toast({
      title: "Bâtiment ajouté",
      description: `${newBuilding.name} a été ajouté avec succès.`,
      variant: "default"
    });
    
    // Ajouter une dépense économique pour la construction du bâtiment
    addConstructionExpense(newBuilding);
    
    return newBuilding.id;
  };
  
  const updateBuilding = (id: string, updates: Partial<Building>) => {
    setBuildings(prev => prev.map(building => 
      building.id === id ? { ...building, ...updates } : building
    ));
    
    toast({
      title: "Bâtiment mis à jour",
      description: "Les informations du bâtiment ont été mises à jour.",
      variant: "default"
    });
  };
  
  const deleteBuilding = (id: string) => {
    setBuildings(prev => prev.filter(building => building.id !== id));
    
    // Supprimer les tâches de maintenance associées
    setMaintenanceTasks(prev => prev.filter(task => task.buildingId !== id));
    
    toast({
      title: "Bâtiment supprimé",
      description: "Le bâtiment a été supprimé avec succès.",
      variant: "default"
    });
  };
  
  // Méthodes pour les projets de construction
  const addConstructionProject = (projectData: Omit<ConstructionProject, "id" | "approved" | "progress">) => {
    const newProject: ConstructionProject = {
      id: generateId(),
      ...projectData,
      approved: false,
      progress: 0
    };
    
    setConstructionProjects(prev => [...prev, newProject]);
    
    toast({
      title: "Projet ajouté",
      description: `Le projet de construction de ${newProject.name} a été ajouté.`,
      variant: "default"
    });
    
    return newProject.id;
  };
  
  const approveProject = (id: string) => {
    setConstructionProjects(prev => prev.map(project => 
      project.id === id ? { ...project, approved: true } : project
    ));
    
    // Ajouter une dépense économique pour le début de la construction
    const project = constructionProjects.find(p => p.id === id);
    if (project) {
      addConstructionExpense(project);
    }
    
    toast({
      title: "Projet approuvé",
      description: "Le projet de construction a été approuvé et les travaux vont commencer.",
      variant: "default"
    });
  };
  
  const updateProjectProgress = (id: string, progress: number) => {
    setConstructionProjects(prev => prev.map(project => 
      project.id === id ? { ...project, progress } : project
    ));
    
    // Si le projet est terminé, créer un nouveau bâtiment
    if (progress >= 100) {
      const project = constructionProjects.find(p => p.id === id);
      if (project) {
        completeProject(project);
      }
    }
  };
  
  const completeProject = (project: ConstructionProject) => {
    // Créer un nouveau bâtiment à partir du projet terminé
    const newBuilding: Building = {
      id: generateId(),
      name: project.buildingName || project.name,
      type: project.buildingType,
      location: project.location,
      status: 'good',
      constructionYear: currentYear,
      description: project.description,
      cost: project.totalCost || project.cost,
      maintenanceCost: Math.round(project.cost * 0.05), // 5% du coût initial
      revenue: 0, // À définir selon le type de bâtiment
      capacity: 0, // À définir selon le type de bâtiment
      owner: 'république'
    };
    
    addBuilding(newBuilding);
    
    // Supprimer le projet de la liste des projets en cours
    setConstructionProjects(prev => prev.filter(p => p.id !== project.id));
    
    toast({
      title: "Construction terminée",
      description: `La construction de ${newBuilding.name} est terminée.`,
      variant: "default"
    });
  };
  
  // Méthodes pour la maintenance des bâtiments
  const addMaintenanceTask = (taskData: Omit<MaintenanceTask, "id">) => {
    const newTask: MaintenanceTask = {
      id: generateId(),
      ...taskData
    };
    
    setMaintenanceTasks(prev => [...prev, newTask]);
    
    toast({
      title: "Tâche de maintenance ajoutée",
      description: `Une tâche de maintenance a été programmée pour ${taskData.buildingName}.`,
      variant: "default"
    });
    
    return newTask.id;
  };
  
  const completeMaintenanceTask = (id: string, performedBy: string, description: string, cost: number) => {
    const task = maintenanceTasks.find(t => t.id === id);
    if (!task) return;
    
    const building = buildings.find(b => b.id === task.buildingId);
    if (!building) return;
    
    // Déterminer le nouveau statut en fonction de l'ancien statut et du niveau de réparation
    const previousStatus = building.status;
    let newStatus: Building['status'] = previousStatus;
    
    // Amélioration du statut selon le coût de la maintenance
    const costRatio = cost / task.estimatedCost;
    if (costRatio >= 1.5) {
      // Maintenance majeure
      if (previousStatus === 'ruined') newStatus = 'poor';
      else if (previousStatus === 'poor') newStatus = 'damaged';
      else if (previousStatus === 'damaged') newStatus = 'good';
      else if (previousStatus === 'good') newStatus = 'excellent';
    } else if (costRatio >= 1) {
      // Maintenance standard
      if (previousStatus === 'ruined') newStatus = 'poor';
      else if (previousStatus === 'poor') newStatus = 'damaged';
      else if (previousStatus === 'damaged') newStatus = 'good';
    } else {
      // Maintenance mineure
      if (previousStatus === 'ruined') newStatus = 'poor';
    }
    
    // Mettre à jour le bâtiment
    updateBuilding(building.id, {
      status: newStatus,
      lastMaintenance: { year: currentYear, season: currentSeason }
    });
    
    // Enregistrer la maintenance
    const maintenanceRecord: MaintenanceRecord = {
      id: generateId(),
      buildingId: building.id,
      date: { year: currentYear, season: currentSeason },
      cost,
      description,
      performedBy,
      repairLevel: costRatio >= 1.5 ? 'major' : costRatio >= 1 ? 'moderate' : 'minor',
      previousStatus,
      newStatus
    };
    
    setMaintenanceRecords(prev => [...prev, maintenanceRecord]);
    
    // Supprimer la tâche de maintenance
    setMaintenanceTasks(prev => prev.filter(t => t.id !== id));
    
    // Ajouter une dépense économique pour la maintenance
    addMaintenanceExpense(building, cost);
    
    toast({
      title: "Maintenance effectuée",
      description: `La maintenance de ${building.name} a été effectuée avec succès.`,
      variant: "default"
    });
  };
  
  // Méthodes pour les revenus des bâtiments
  const addBuildingRevenue = (buildingId: string, amount: number, source: string, taxRate: number, collectedBy: string) => {
    const building = buildings.find(b => b.id === buildingId);
    if (!building) return;
    
    const revenueRecord: BuildingRevenueRecord = {
      id: generateId(),
      buildingId,
      year: currentYear,
      season: currentSeason,
      amount,
      source,
      taxRate,
      collectedBy
    };
    
    setRevenueRecords(prev => [...prev, revenueRecord]);
    
    // Ajouter un revenu économique
    addBuildingRevenueIncome(building, amount);
    
    toast({
      title: "Revenu enregistré",
      description: `Un revenu de ${amount} deniers a été enregistré pour ${building.name}.`,
      variant: "default"
    });
  };
  
  // Méthodes auxiliaires
  const addConstructionExpense = (buildingOrProject: Building | ConstructionProject) => {
    const economieRecord = {
      amount: 'cost' in buildingOrProject ? buildingOrProject.cost : buildingOrProject.totalCost || buildingOrProject.cost,
      category: 'Construction',
      description: `Construction de ${buildingOrProject.name}`,
      date: { year: currentYear, season: currentSeason },
      type: 'expense' as const,
      source: 'Construction',
      approved: true,
      tags: ['construction', 'bâtiment'],
      isRecurring: false
    };
    
    setEconomieRecords(prev => [...prev, {
      id: generateId(),
      ...economieRecord,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }]);
    
    // Mettre à jour le trésor
    setTreasury(prev => ({
      ...prev,
      balance: prev.balance - economieRecord.amount,
      totalExpenses: prev.totalExpenses + economieRecord.amount
    }));
  };
  
  const addMaintenanceExpense = (building: Building, cost: number) => {
    const economieRecord = {
      amount: cost,
      category: 'maintenance',
      description: `Maintenance de ${building.name}`,
      date: { year: currentYear, season: currentSeason },
      type: 'expense' as const,
      source: 'Services d\'entretien',
      approved: true,
      tags: ['maintenance', 'bâtiment'],
      isRecurring: false
    };
    
    setEconomieRecords(prev => [...prev, {
      id: generateId(),
      ...economieRecord,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }]);
    
    // Mettre à jour le trésor
    setTreasury(prev => ({
      ...prev,
      balance: prev.balance - cost,
      totalExpenses: prev.totalExpenses + cost
    }));
  };
  
  const addBuildingRevenueIncome = (building: Building, amount: number) => {
    const economieRecord = {
      amount,
      category: 'Commerce',
      description: `Revenus de ${building.name}`,
      date: { year: currentYear, season: currentSeason },
      type: 'income' as const,
      source: 'Commerce extérieur',
      approved: true,
      tags: ['revenus', 'bâtiment'],
      isRecurring: true,
      recurringInterval: 'seasonal'
    };
    
    setEconomieRecords(prev => [...prev, {
      id: generateId(),
      ...economieRecord,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }]);
    
    // Mettre à jour le trésor
    setTreasury(prev => ({
      ...prev,
      balance: prev.balance + amount,
      totalIncome: prev.totalIncome + amount
    }));
  };
  
  return {
    // Données
    buildings,
    constructionProjects,
    maintenanceTasks,
    maintenanceRecords,
    revenueRecords,
    
    // État UI
    isAddBuildingModalOpen,
    setIsAddBuildingModalOpen,
    selectedBuilding,
    setSelectedBuilding,
    isMaintenanceModalOpen,
    setIsMaintenanceModalOpen,
    selectedMaintenanceTask,
    setSelectedMaintenanceTask,
    isConstructionModalOpen,
    setIsConstructionModalOpen,
    selectedProject,
    setSelectedProject,
    
    // Méthodes CRUD pour les bâtiments
    addBuilding,
    updateBuilding,
    deleteBuilding,
    
    // Méthodes pour les projets de construction
    addConstructionProject,
    approveProject,
    updateProjectProgress,
    completeProject,
    
    // Méthodes pour la maintenance des bâtiments
    addMaintenanceTask,
    completeMaintenanceTask,
    
    // Méthodes pour les revenus des bâtiments
    addBuildingRevenue
  };
};
