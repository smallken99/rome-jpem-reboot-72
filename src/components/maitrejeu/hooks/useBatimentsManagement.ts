
import { useState, useEffect } from 'react';
import { useMaitreJeu } from '@/components/maitrejeu/context';
import { 
  Building, 
  BuildingCondition,
  MaintenanceTask,
  ConstructionProject,
  BuildingRevenue 
} from '@/components/maitrejeu/types/batiments';
import { toast } from 'sonner';

// Données fictives pour l'exemple
const mockBuildings: Building[] = [
  {
    id: 'bld-1',
    name: 'Temple de Jupiter',
    type: 'temple',
    description: 'Le plus grand temple de Rome dédié à Jupiter Optimus Maximus',
    location: 'Forum Romanum',
    condition: 'excellent',
    constructionYear: 705,
    lastMaintenance: { year: 705, season: 'Ver' },
    maintenanceCost: 5000,
    maintenanceInterval: 12,
    revenue: 2000,
    cost: 50000,
    capacity: 1000,
    isPublic: true,
    ownerId: null,
    slaves: 20,
    slaveCost: 1000,
    tags: ['religieux', 'prestige'],
    attributes: {
      piete: 10,
      influence: 5
    }
  },
  // ...autres bâtiments
];

export const useBatimentsManagement = () => {
  const { currentYear, currentSeason } = useMaitreJeu();
  const [buildings, setBuildings] = useState<Building[]>(mockBuildings);
  const [selectedBuilding, setSelectedBuilding] = useState<Building | null>(null);
  const [maintenanceTasks, setMaintenanceTasks] = useState<MaintenanceTask[]>([]);
  const [constructionProjects, setConstructionProjects] = useState<ConstructionProject[]>([]);
  const [buildingRevenues, setBuildingRevenues] = useState<BuildingRevenue[]>([]);

  // Ajouter un nouveau bâtiment
  const addBuilding = (building: Omit<Building, 'id'>) => {
    const newBuilding: Building = {
      ...building,
      id: `bld-${Date.now()}`,
    };
    setBuildings(prev => [...prev, newBuilding]);
    toast.success(`Le bâtiment ${building.name} a été ajouté avec succès`);
    return newBuilding;
  };

  // Mettre à jour un bâtiment existant
  const updateBuilding = (id: string, updates: Partial<Building>) => {
    setBuildings(prev => 
      prev.map(building => 
        building.id === id ? { ...building, ...updates } : building
      )
    );
    toast.success('Bâtiment mis à jour avec succès');
  };

  // Supprimer un bâtiment
  const deleteBuilding = (id: string) => {
    setBuildings(prev => prev.filter(building => building.id !== id));
    toast.success('Bâtiment supprimé avec succès');
  };

  // Planifier une tâche de maintenance
  const scheduleMaintenance = (task: Omit<MaintenanceTask, 'id'>) => {
    const newTask: MaintenanceTask = {
      ...task,
      id: `task-${Date.now()}`
    };
    setMaintenanceTasks(prev => [...prev, newTask]);
    toast.success(`Maintenance planifiée pour ${task.description}`);
    return newTask;
  };

  // Démarrer un projet de construction
  const startConstruction = (project: Omit<ConstructionProject, 'id'>) => {
    const newProject: ConstructionProject = {
      ...project,
      id: `proj-${Date.now()}`
    };
    setConstructionProjects(prev => [...prev, newProject]);
    toast.success(`Projet de construction ${project.buildingName} démarré`);
    return newProject;
  };

  // Appliquer une dégradation naturelle à tous les bâtiments
  const applyNaturalDegradation = () => {
    const conditionOrder: BuildingCondition[] = [
      'excellent', 'bon', 'moyen', 'mauvais', 'critique'
    ];
    
    setBuildings(prev => 
      prev.map(building => {
        // Calcul basé sur l'âge du bâtiment et le temps écoulé depuis la dernière maintenance
        const yearsSinceConstruction = currentYear - building.constructionYear;
        const yearsSinceMaintenance = building.lastMaintenance 
          ? currentYear - building.lastMaintenance.year 
          : yearsSinceConstruction;
        
        let degradationChance = 0.1; // 10% de base
        
        // Augmenter la chance en fonction de l'âge
        degradationChance += yearsSinceConstruction * 0.01;
        degradationChance += yearsSinceMaintenance * 0.05;
        
        // Limiter à 50%
        degradationChance = Math.min(0.5, degradationChance);
        
        if (Math.random() < degradationChance) {
          const currentIndex = conditionOrder.indexOf(building.condition);
          if (currentIndex < conditionOrder.length - 1) {
            // Dégrader d'un niveau
            return {
              ...building,
              condition: conditionOrder[currentIndex + 1]
            };
          }
        }
        
        return building;
      })
    );
    
    toast.success('Dégradation naturelle appliquée à tous les bâtiments');
  };

  // Générer des revenus pour la période actuelle
  const generateCurrentRevenues = () => {
    const newRevenues = buildings.map(building => ({
      id: `rev-${Date.now()}-${building.id}`,
      buildingId: building.id,
      year: currentYear,
      season: currentSeason,
      amount: building.revenue,
      details: `Revenus standards de ${building.name}`,
      collected: false,
      collectedDate: null
    }));
    
    setBuildingRevenues(prev => [...prev, ...newRevenues]);
    toast.success('Revenus générés pour la période actuelle');
  };

  return {
    buildings,
    selectedBuilding,
    setSelectedBuilding,
    maintenanceTasks,
    constructionProjects,
    buildingRevenues,
    addBuilding,
    updateBuilding,
    deleteBuilding,
    scheduleMaintenance,
    startConstruction,
    applyNaturalDegradation,
    generateCurrentRevenues
  };
};
