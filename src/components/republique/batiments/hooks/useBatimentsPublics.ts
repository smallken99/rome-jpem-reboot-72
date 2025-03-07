
import { useState } from 'react';
import { toast } from 'sonner';
import { BuildingDescription } from '@/components/proprietes/data/types/buildingTypes';

export interface PublicBuilding {
  id: string;
  buildingTypeId: string;
  name: string;
  location: string;
  constructionYear: number;
  condition: number; // 0-100
  maintenanceCost: number;
  maintenanceLevel: 'minimal' | 'standard' | 'excellent';
  lastMaintenance?: number; // année de dernière maintenance
  benefits: string[];
  capacity?: number;
  investmentAmount: number;
  constructionStatus: 'planned' | 'in_progress' | 'completed' | 'damaged' | 'abandoned';
  constructionProgress?: number; // 0-100
  image?: string;
}

export interface ConstructionProject {
  id: string;
  buildingTypeId: string;
  name: string;
  location: string;
  estimatedCost: number;
  duration: number; // en années
  progress: number; // 0-100
  startedYear?: number;
  expectedCompletionYear?: number;
  benefits: string[];
  sponsors: string[];
  approved: boolean;
}

export const useBatimentsPublics = () => {
  // Liste des bâtiments publics existants
  const [publicBuildings, setPublicBuildings] = useState<PublicBuilding[]>([
    {
      id: 'forum-romanum',
      buildingTypeId: 'forum',
      name: 'Forum Romanum',
      location: 'Centre de Rome',
      constructionYear: 450,
      condition: 85,
      maintenanceCost: 50000,
      maintenanceLevel: 'standard',
      lastMaintenance: 703,
      benefits: [
        'Centre de la vie politique romaine',
        'Augmente le prestige de la cité de 15%',
        'Facilite le commerce et les échanges'
      ],
      capacity: 10000,
      investmentAmount: 1500000,
      constructionStatus: 'completed'
    },
    {
      id: 'basilica-aemilia',
      buildingTypeId: 'basilica',
      name: 'Basilica Aemilia',
      location: 'Forum Romanum',
      constructionYear: 580,
      condition: 90,
      maintenanceCost: 30000,
      maintenanceLevel: 'excellent',
      lastMaintenance: 704,
      benefits: [
        'Tribunal et centre administratif',
        'Augmente l\'efficacité judiciaire de 10%',
        'Améliore la perception des impôts de 5%'
      ],
      investmentAmount: 800000,
      constructionStatus: 'completed'
    },
    {
      id: 'temple-jupiter',
      buildingTypeId: 'temple',
      name: 'Temple de Jupiter Optimus Maximus',
      location: 'Capitole',
      constructionYear: 509,
      condition: 78,
      maintenanceCost: 35000,
      maintenanceLevel: 'standard',
      lastMaintenance: 700,
      benefits: [
        'Centre religieux principal de Rome',
        'Augmente la piété des citoyens de 15%',
        'Améliore les relations avec les dieux'
      ],
      investmentAmount: 1200000,
      constructionStatus: 'completed'
    }
  ]);
  
  // Projets de construction en cours ou planifiés
  const [constructionProjects, setConstructionProjects] = useState<ConstructionProject[]>([
    {
      id: 'project-circus-flaminius',
      buildingTypeId: 'circus',
      name: 'Circus Flaminius',
      location: 'Champ de Mars',
      estimatedCost: 600000,
      duration: 3,
      progress: 65,
      startedYear: 702,
      expectedCompletionYear: 705,
      benefits: [
        'Divertissement pour les citoyens',
        'Augmente la popularité des magistrats de 10%',
        'Peut accueillir des jeux et des courses'
      ],
      sponsors: ['Gaius Flaminius', 'Famille Aemilia'],
      approved: true
    },
    {
      id: 'project-aqueduc-appia',
      buildingTypeId: 'aqueduct',
      name: 'Rénovation de l\'Aqueduc Appia',
      location: 'Sud-est de Rome',
      estimatedCost: 400000,
      duration: 2,
      progress: 30,
      startedYear: 703,
      expectedCompletionYear: 705,
      benefits: [
        'Améliore l\'approvisionnement en eau de 20%',
        'Réduit les risques de maladies et d\'épidémies',
        'Augmente la capacité d\'irrigation des terres agricoles'
      ],
      sponsors: ['Sénat romain'],
      approved: true
    },
    {
      id: 'project-temple-minerva',
      buildingTypeId: 'temple',
      name: 'Temple de Minerva',
      location: 'Aventine',
      estimatedCost: 350000,
      duration: 2,
      progress: 0,
      benefits: [
        'Renforce la piété des citoyens',
        'Honore la déesse de la sagesse et des arts',
        'Améliore le prestige du quartier de l\'Aventine'
      ],
      sponsors: ['Famille Claudia'],
      approved: false
    }
  ]);
  
  // Démarrer un nouveau projet de construction
  const startConstructionProject = (project: Omit<ConstructionProject, 'id' | 'progress' | 'approved'>) => {
    const currentYear = 705; // À remplacer par l'année actuelle du jeu
    const newProject: ConstructionProject = {
      ...project,
      id: `project-${Date.now()}`,
      progress: 0,
      startedYear: currentYear,
      expectedCompletionYear: currentYear + project.duration,
      approved: false
    };
    
    setConstructionProjects(prev => [...prev, newProject]);
    toast.success(`Projet de construction proposé: ${project.name}`);
    return newProject;
  };
  
  // Approuver un projet de construction
  const approveConstructionProject = (projectId: string) => {
    setConstructionProjects(prev => prev.map(project => {
      if (project.id === projectId) {
        return { ...project, approved: true };
      }
      return project;
    }));
    
    const project = constructionProjects.find(p => p.id === projectId);
    if (project) {
      toast.success(`Projet approuvé: ${project.name}`);
    }
  };
  
  // Faire progresser la construction d'un projet
  const advanceConstruction = (projectId: string, progressAmount: number) => {
    let completedProject: ConstructionProject | null = null;
    
    setConstructionProjects(prev => prev.map(project => {
      if (project.id !== projectId || !project.approved) return project;
      
      const newProgress = Math.min(100, project.progress + progressAmount);
      
      // Si le projet est terminé, le marquer comme tel
      if (newProgress >= 100) {
        completedProject = { ...project, progress: 100 };
      }
      
      return { ...project, progress: newProgress };
    }));
    
    // Si un projet est terminé, l'ajouter aux bâtiments publics
    if (completedProject) {
      const newBuilding: PublicBuilding = {
        id: completedProject.id.replace('project-', 'building-'),
        buildingTypeId: completedProject.buildingTypeId,
        name: completedProject.name,
        location: completedProject.location,
        constructionYear: completedProject.expectedCompletionYear || 705,
        condition: 100,
        maintenanceCost: Math.round(completedProject.estimatedCost * 0.03), // 3% du coût initial
        maintenanceLevel: 'standard',
        benefits: completedProject.benefits,
        investmentAmount: completedProject.estimatedCost,
        constructionStatus: 'completed',
      };
      
      setPublicBuildings(prev => [...prev, newBuilding]);
      
      // Supprimer le projet terminé
      setConstructionProjects(prev => prev.filter(p => p.id !== projectId));
      
      toast.success(`Construction terminée: ${completedProject.name}`);
    }
  };
  
  // Effectuer la maintenance d'un bâtiment
  const maintainBuilding = (buildingId: string, level: 'minimal' | 'standard' | 'excellent') => {
    setPublicBuildings(prev => prev.map(building => {
      if (building.id !== buildingId) return building;
      
      // Calculer l'amélioration de la condition selon le niveau de maintenance
      let conditionImprovement = 0;
      let costMultiplier = 1;
      
      switch (level) {
        case 'minimal':
          conditionImprovement = 5;
          costMultiplier = 0.7;
          break;
        case 'standard':
          conditionImprovement = 15;
          costMultiplier = 1;
          break;
        case 'excellent':
          conditionImprovement = 30;
          costMultiplier = 1.5;
          break;
      }
      
      const newCondition = Math.min(100, building.condition + conditionImprovement);
      const maintenanceCost = Math.round(building.maintenanceCost * costMultiplier);
      
      toast.success(`Maintenance effectuée: ${building.name}`, {
        description: `Condition améliorée de ${conditionImprovement}%. Coût: ${maintenanceCost} As.`
      });
      
      return {
        ...building,
        condition: newCondition,
        maintenanceLevel: level,
        lastMaintenance: 705 // Remplacer par l'année actuelle du jeu
      };
    }));
  };
  
  // Dégrader l'état des bâtiments avec le temps
  const degradeBuildings = (yearsPassed: number = 1) => {
    setPublicBuildings(prev => prev.map(building => {
      // Calculer la dégradation en fonction du niveau de maintenance
      let degradationRate = 0;
      
      switch (building.maintenanceLevel) {
        case 'minimal':
          degradationRate = 8 * yearsPassed;
          break;
        case 'standard':
          degradationRate = 5 * yearsPassed;
          break;
        case 'excellent':
          degradationRate = 2 * yearsPassed;
          break;
      }
      
      // Si le bâtiment n'a pas été entretenu depuis longtemps, augmenter la dégradation
      const currentYear = 705; // À remplacer par l'année actuelle du jeu
      const yearsSinceLastMaintenance = building.lastMaintenance 
        ? currentYear - building.lastMaintenance 
        : 0;
      
      if (yearsSinceLastMaintenance > 3) {
        degradationRate += (yearsSinceLastMaintenance - 3) * 2;
      }
      
      const newCondition = Math.max(0, building.condition - degradationRate);
      
      // Si la condition tombe en dessous de 30%, le bâtiment est endommagé
      let status = building.constructionStatus;
      if (newCondition < 30 && status === 'completed') {
        status = 'damaged';
        toast.warning(`Le bâtiment ${building.name} est en mauvais état et nécessite des réparations urgentes.`);
      }
      
      return {
        ...building,
        condition: newCondition,
        constructionStatus: status
      };
    }));
  };
  
  return {
    publicBuildings,
    constructionProjects,
    startConstructionProject,
    approveConstructionProject,
    advanceConstruction,
    maintainBuilding,
    degradeBuildings
  };
};
