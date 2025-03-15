
import { useState } from 'react';
import { useMaitreJeu } from '../context';
import { toast } from 'sonner';

// Types pour la gestion des bâtiments
interface Building {
  id: string;
  name: string;
  type: string;
  location: string;
  status: 'good' | 'average' | 'poor';
  constructionYear: number;
  description: string;
  cost: number;
  maintenanceCost: number;
  revenue: number;
  lastMaintenance?: string;
  capacity: number;
  owner: string;
}

interface ConstructionProject {
  id: string;
  buildingType: string;
  name: string;
  location: string;
  startDate: {
    year: number;
    season: string;
  };
  estimatedEndDate: {
    year: number;
    season: string;
  };
  status: 'planning' | 'in_progress' | 'paused' | 'completed' | 'cancelled';
  cost: {
    estimated: number;
    spent: number;
    remaining: number;
  };
  progress: number;
  description: string;
}

interface MaintenanceTask {
  id: string;
  buildingId: string;
  type: 'routine' | 'repair' | 'emergency';
  description: string;
  scheduledDate: {
    year: number;
    season: string;
  };
  completedDate?: {
    year: number;
    season: string;
  };
  status: 'scheduled' | 'in_progress' | 'completed' | 'overdue';
  cost: {
    estimated: number;
    actual?: number;
  };
  priority: 'low' | 'medium' | 'high' | 'critical';
}

export const useBatimentsManagement = () => {
  const { currentYear, currentSeason } = useMaitreJeu();
  
  // États
  const [buildings, setBuildings] = useState<Building[]>([]);
  const [constructionProjects, setConstructionProjects] = useState<ConstructionProject[]>([]);
  const [maintenanceTasks, setMaintenanceTasks] = useState<MaintenanceTask[]>([]);
  const [isAddBuildingModalOpen, setIsAddBuildingModalOpen] = useState(false);
  const [selectedBuilding, setSelectedBuilding] = useState<Building | undefined>(undefined);
  
  // Gestion des bâtiments
  const addBuilding = (buildingData: Omit<Building, 'id'>) => {
    const newBuilding: Building = {
      ...buildingData,
      id: crypto.randomUUID(),
    };
    
    setBuildings(prev => [...prev, newBuilding]);
    toast.success(`Bâtiment "${newBuilding.name}" ajouté avec succès`);
    return newBuilding.id;
  };
  
  const updateBuilding = (id: string, updates: Partial<Building>) => {
    setBuildings(prev => 
      prev.map(building => 
        building.id === id ? { ...building, ...updates } : building
      )
    );
    toast.success('Bâtiment mis à jour avec succès');
  };
  
  const deleteBuilding = (id: string) => {
    setBuildings(prev => prev.filter(building => building.id !== id));
    toast.success('Bâtiment supprimé avec succès');
  };
  
  // Gestion des projets de construction
  const addConstructionProject = (projectData: Omit<ConstructionProject, 'id'>) => {
    const newProject: ConstructionProject = {
      ...projectData,
      id: crypto.randomUUID(),
    };
    
    setConstructionProjects(prev => [...prev, newProject]);
    toast.success(`Projet de construction "${newProject.name}" ajouté avec succès`);
    return newProject.id;
  };
  
  const updateConstructionProject = (id: string, updates: Partial<ConstructionProject>) => {
    setConstructionProjects(prev => 
      prev.map(project => 
        project.id === id ? { ...project, ...updates } : project
      )
    );
    toast.success('Projet de construction mis à jour avec succès');
  };
  
  const completeConstructionProject = (id: string, finalBuildingData: Partial<Building>) => {
    // Trouver le projet
    const project = constructionProjects.find(p => p.id === id);
    
    if (project) {
      // Créer un nouveau bâtiment
      const newBuilding: Building = {
        id: crypto.randomUUID(),
        name: project.name,
        type: project.buildingType,
        location: project.location,
        status: 'good',
        constructionYear: currentYear,
        description: project.description,
        cost: project.cost.spent,
        maintenanceCost: 0,
        revenue: 0,
        capacity: 0,
        owner: 'république',
        ...finalBuildingData
      };
      
      // Ajouter le bâtiment
      setBuildings(prev => [...prev, newBuilding]);
      
      // Marquer le projet comme terminé
      updateConstructionProject(id, {
        status: 'completed',
        progress: 100,
        cost: {
          ...project.cost,
          remaining: 0
        }
      });
      
      toast.success(`Construction de "${project.name}" terminée avec succès`);
    }
  };
  
  // Gestion des tâches de maintenance
  const addMaintenanceTask = (taskData: Omit<MaintenanceTask, 'id'>) => {
    const newTask: MaintenanceTask = {
      ...taskData,
      id: crypto.randomUUID(),
    };
    
    setMaintenanceTasks(prev => [...prev, newTask]);
    toast.success('Tâche de maintenance ajoutée avec succès');
    return newTask.id;
  };
  
  const updateMaintenanceTask = (id: string, updates: Partial<MaintenanceTask>) => {
    setMaintenanceTasks(prev => 
      prev.map(task => 
        task.id === id ? { ...task, ...updates } : task
      )
    );
    toast.success('Tâche de maintenance mise à jour avec succès');
  };
  
  const completeMaintenanceTask = (id: string, actualCost: number) => {
    // Mettre à jour la tâche de maintenance
    updateMaintenanceTask(id, {
      status: 'completed',
      completedDate: {
        year: currentYear,
        season: currentSeason
      },
      cost: {
        ...maintenanceTasks.find(t => t.id === id)?.cost || { estimated: 0 },
        actual: actualCost
      }
    });
    
    // Mettre à jour le bâtiment
    const task = maintenanceTasks.find(t => t.id === id);
    if (task) {
      const building = buildings.find(b => b.id === task.buildingId);
      if (building) {
        updateBuilding(building.id, {
          status: 'good',
          lastMaintenance: `${currentYear} AUC, ${currentSeason}`
        });
      }
    }
    
    toast.success('Tâche de maintenance terminée avec succès');
  };
  
  // Calculer les revenus et dépenses des bâtiments
  const calculateFinancials = () => {
    const totalRevenue = buildings.reduce((sum, building) => sum + building.revenue, 0);
    const totalMaintenanceCost = buildings.reduce((sum, building) => sum + building.maintenanceCost, 0);
    const constructionCosts = constructionProjects
      .filter(p => p.status === 'in_progress')
      .reduce((sum, p) => sum + (p.cost.estimated / 4), 0); // Divisé par 4 pour obtenir le coût trimestriel
    
    return {
      totalRevenue,
      totalMaintenanceCost,
      constructionCosts,
      netIncome: totalRevenue - totalMaintenanceCost - constructionCosts
    };
  };
  
  // Appliquer la dégradation naturelle des bâtiments
  const applyNaturalDegradation = () => {
    setBuildings(prev => 
      prev.map(building => {
        // Déterminer si le bâtiment se dégrade
        const shouldDegrade = Math.random() < 0.3; // 30% de chance de dégradation
        
        if (shouldDegrade) {
          if (building.status === 'good') {
            return { ...building, status: 'average' };
          } else if (building.status === 'average') {
            return { ...building, status: 'poor' };
          }
        }
        
        return building;
      })
    );
    
    toast.success('Dégradation naturelle des bâtiments appliquée');
  };
  
  return {
    buildings,
    constructionProjects,
    maintenanceTasks,
    isAddBuildingModalOpen,
    selectedBuilding,
    setIsAddBuildingModalOpen,
    setSelectedBuilding,
    addBuilding,
    updateBuilding,
    deleteBuilding,
    addConstructionProject,
    updateConstructionProject,
    completeConstructionProject,
    addMaintenanceTask,
    updateMaintenanceTask,
    completeMaintenanceTask,
    calculateFinancials,
    applyNaturalDegradation
  };
};
