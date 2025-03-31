
import { useState } from 'react';
import { useMaitreJeu } from '../context';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'sonner';
import { ECONOMIE_TYPES, ECONOMIE_CATEGORIES, ECONOMIE_SOURCE } from '../types/economie';

// Types
interface Building {
  id: string;
  name: string;
  type: string;
  location: string;
  status: string;
  constructionYear: number;
  description: string;
  cost: number;
  maintenance: number;
  revenue: number;
  capacity: number;
  owner: string;
}

export const useBatimentsManagement = () => {
  const { economieRecords, addEconomieRecord, treasury, setTreasury, currentYear, currentSeason } = useMaitreJeu();
  
  // État local
  const [buildings, setBuildings] = useState<Building[]>([]);
  const [constructionProjects, setConstructionProjects] = useState<any[]>([]);
  const [maintenanceRecords, setMaintenanceRecords] = useState<any[]>([]);
  const [revenueRecords, setRevenueRecords] = useState<any[]>([]);
  const [isAddBuildingModalOpen, setIsAddBuildingModalOpen] = useState(false);
  const [selectedBuilding, setSelectedBuilding] = useState<Building | undefined>();
  
  // Filtres
  const [filter, setFilter] = useState({
    types: [] as string[],
    locations: [] as string[],
    status: 'all',
    minRevenue: 0,
    maxMaintenance: 0,
    searchTerm: ''
  });
  
  // CRUD operations
  const addBuilding = (buildingData: Omit<Building, "id">) => {
    const newBuilding = {
      ...buildingData,
      id: uuidv4()
    };
    
    setBuildings(prev => [...prev, newBuilding]);
    
    // Ajouter un enregistrement économique pour la construction
    if (buildingData.cost > 0) {
      addEconomieRecord({
        id: uuidv4(),
        amount: buildingData.cost,
        description: `Construction de ${buildingData.name}`,
        date: { year: currentYear, season: currentSeason },
        type: ECONOMIE_TYPES.EXPENSE,
        category: ECONOMIE_CATEGORIES.CONSTRUCTION,
        source: ECONOMIE_SOURCE.TREASURY,
        recurring: false
      });
      
      // Mettre à jour le trésor
      setTreasury(prev => ({
        ...prev,
        balance: prev.balance - buildingData.cost,
        expenses: prev.expenses + buildingData.cost,
        surplus: prev.income - (prev.expenses + buildingData.cost)
      }));
    }
    
    toast.success(`Le bâtiment ${buildingData.name} a été ajouté avec succès`);
    return newBuilding.id;
  };
  
  const updateBuilding = (id: string, updates: Partial<Building>) => {
    setBuildings(prev => 
      prev.map(building => 
        building.id === id ? { ...building, ...updates } : building
      )
    );
    
    toast.success(`Le bâtiment a été mis à jour avec succès`);
  };
  
  const deleteBuilding = (id: string) => {
    setBuildings(prev => prev.filter(building => building.id !== id));
    toast.success(`Le bâtiment a été supprimé avec succès`);
  };
  
  // Maintenance and Revenue
  const updateMaintenance = (buildingId: string, level: number) => {
    setBuildings(prev => 
      prev.map(building => 
        building.id === buildingId 
          ? { 
              ...building, 
              maintenance: Math.round(building.cost * (level / 100) * 10) / 10,
              status: level < 30 ? 'poor' : level < 60 ? 'fair' : 'good'
            } 
          : building
      )
    );
    
    // Ajouter un enregistrement de maintenance
    const building = buildings.find(b => b.id === buildingId);
    if (building) {
      const maintenanceCost = Math.round(building.cost * (level / 100) * 10) / 10;
      
      addEconomieRecord({
        id: uuidv4(),
        amount: maintenanceCost,
        description: `Maintenance de ${building.name} (niveau ${level}%)`,
        date: { year: currentYear, season: currentSeason },
        type: ECONOMIE_TYPES.EXPENSE,
        category: ECONOMIE_CATEGORIES.MAINTENANCE,
        source: ECONOMIE_SOURCE.TREASURY,
        recurring: true,
        recurringInterval: 'seasonal'
      });
      
      // Mettre à jour le trésor
      setTreasury(prev => ({
        ...prev,
        balance: prev.balance - maintenanceCost,
        expenses: prev.expenses + maintenanceCost,
        surplus: prev.income - (prev.expenses + maintenanceCost)
      }));
      
      toast.success(`Niveau de maintenance mis à jour pour ${building.name}`);
    }
  };
  
  const updateWorkers = (buildingId: string, workers: number) => {
    setBuildings(prev => 
      prev.map(building => 
        building.id === buildingId 
          ? { 
              ...building, 
              workers,
              revenue: calculateRevenue(building.type, building.cost, workers)
            } 
          : building
      )
    );
    
    const building = buildings.find(b => b.id === buildingId);
    if (building) {
      toast.success(`Nombre de travailleurs mis à jour pour ${building.name}`);
    }
  };
  
  const calculateRevenue = (type: string, cost: number, workers: number) => {
    // Logique simplifiée pour calculer le revenu
    const baseRevenue = cost * 0.05; // 5% du coût initial
    const workerFactor = workers / 100; // Impact des travailleurs (0 à 1)
    
    switch (type) {
      case 'commercial':
        return Math.round(baseRevenue * 1.5 * workerFactor * 100) / 100;
      case 'industrial':
        return Math.round(baseRevenue * 1.2 * workerFactor * 100) / 100;
      case 'residential':
        return Math.round(baseRevenue * 0.8 * workerFactor * 100) / 100;
      case 'agricultural':
        return Math.round(baseRevenue * 1.1 * workerFactor * 100) / 100;
      default:
        return Math.round(baseRevenue * workerFactor * 100) / 100;
    }
  };
  
  const collectRevenue = (buildingId: string) => {
    const building = buildings.find(b => b.id === buildingId);
    if (building && building.revenue > 0) {
      // Ajouter un enregistrement de revenu
      addEconomieRecord({
        id: uuidv4(),
        amount: building.revenue,
        description: `Revenu de ${building.name}`,
        date: { year: currentYear, season: currentSeason },
        type: ECONOMIE_TYPES.INCOME,
        category: ECONOMIE_CATEGORIES.OTHER,
        source: ECONOMIE_SOURCE.TREASURY,
        recurring: false
      });
      
      // Mettre à jour le trésor
      setTreasury(prev => ({
        ...prev,
        balance: prev.balance + building.revenue,
        income: prev.income + building.revenue,
        surplus: (prev.income + building.revenue) - prev.expenses
      }));
      
      toast.success(`Revenu de ${building.revenue} as collecté pour ${building.name}`);
      
      // Ajouter à l'historique des revenus
      setRevenueRecords(prev => [
        ...prev,
        {
          id: uuidv4(),
          buildingId: building.id,
          buildingName: building.name,
          amount: building.revenue,
          date: { year: currentYear, season: currentSeason }
        }
      ]);
    }
  };
  
  const startConstruction = (projectData: any) => {
    const newProject = {
      ...projectData,
      id: uuidv4(),
      startDate: { year: currentYear, season: currentSeason },
      progress: 0,
      status: 'in_progress'
    };
    
    setConstructionProjects(prev => [...prev, newProject]);
    
    // Ajouter un enregistrement économique pour le début de la construction
    if (projectData.cost > 0) {
      addEconomieRecord({
        id: uuidv4(),
        amount: projectData.cost * 0.3, // 30% initial payment
        description: `Début de construction: ${projectData.name}`,
        date: { year: currentYear, season: currentSeason },
        type: ECONOMIE_TYPES.EXPENSE,
        category: ECONOMIE_CATEGORIES.CONSTRUCTION,
        source: ECONOMIE_SOURCE.TREASURY,
        recurring: false
      });
      
      // Mettre à jour le trésor
      setTreasury(prev => ({
        ...prev,
        balance: prev.balance - (projectData.cost * 0.3),
        expenses: prev.expenses + (projectData.cost * 0.3),
        surplus: prev.income - (prev.expenses + (projectData.cost * 0.3))
      }));
    }
    
    toast.success(`Construction de ${projectData.name} démarrée`);
    return newProject.id;
  };
  
  const updateConstructionProgress = (projectId: string, progress: number) => {
    setConstructionProjects(prev => 
      prev.map(project => {
        if (project.id !== projectId) return project;
        
        const newProgress = Math.min(100, Math.max(0, progress));
        const isCompleted = newProgress >= 100;
        
        return {
          ...project,
          progress: newProgress,
          status: isCompleted ? 'completed' : 'in_progress',
          completionDate: isCompleted ? { year: currentYear, season: currentSeason } : undefined
        };
      })
    );
    
    const project = constructionProjects.find(p => p.id === projectId);
    if (project) {
      // Si le projet est terminé, ajouter le bâtiment
      if (progress >= 100 && project.status !== 'completed') {
        addBuilding({
          name: project.name,
          type: project.type,
          location: project.location,
          status: 'good',
          constructionYear: currentYear,
          description: project.description || '',
          cost: project.cost,
          maintenance: project.cost * 0.05, // 5% par défaut
          revenue: 0,
          capacity: project.capacity || 50,
          owner: 'république'
        });
        
        // Paiement final
        addEconomieRecord({
          id: uuidv4(),
          amount: project.cost * 0.7, // 70% final payment
          description: `Finalisation de construction: ${project.name}`,
          date: { year: currentYear, season: currentSeason },
          type: ECONOMIE_TYPES.EXPENSE,
          category: ECONOMIE_CATEGORIES.CONSTRUCTION,
          source: ECONOMIE_SOURCE.TREASURY,
          recurring: false
        });
        
        // Mettre à jour le trésor
        setTreasury(prev => ({
          ...prev,
          balance: prev.balance - (project.cost * 0.7),
          expenses: prev.expenses + (project.cost * 0.7),
          surplus: prev.income - (prev.expenses + (project.cost * 0.7))
        }));
        
        toast.success(`Construction de ${project.name} terminée!`);
      } else {
        toast.info(`Progression de construction mise à jour: ${progress}%`);
      }
    }
  };
  
  return {
    buildings,
    constructionProjects,
    maintenanceRecords,
    revenueRecords,
    filter,
    setFilter,
    isAddBuildingModalOpen,
    setIsAddBuildingModalOpen,
    selectedBuilding,
    setSelectedBuilding,
    addBuilding,
    updateBuilding,
    deleteBuilding,
    updateMaintenance,
    updateWorkers,
    collectRevenue,
    startConstruction,
    updateConstructionProgress
  };
};
