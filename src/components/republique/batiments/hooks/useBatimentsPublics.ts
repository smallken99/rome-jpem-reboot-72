
import { useState, useEffect, Dispatch, SetStateAction } from 'react';

export interface PublicBuilding {
  id: string;
  name: string;
  type: 'temple' | 'forum' | 'basilica' | 'thermes' | 'theatre' | 'amphitheatre' | 'aqueduc' | 'route';
  level: 'village' | 'city' | 'metropolis';
  condition: number; // 0 to 100
  maintenanceCost: number;
  effects: Record<string, number>;
  // Added required properties
  location: string;
  constructionYear: number;
  constructionStatus: 'planned' | 'in_progress' | 'completed' | 'damaged' | 'abandoned';
  maintenanceLevel: 'minimal' | 'normal' | 'excellent';
  lastMaintenance?: number;
  buildingTypeId: string;
  investmentAmount: number;
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
  proposedBy?: string; // Magistrat qui a proposé le projet
}

export const useBatimentsPublics = () => {
  const [publicBuildings, setPublicBuildings] = useState<PublicBuilding[]>([
    {
      id: 'temple-jupiter',
      name: 'Temple de Jupiter',
      type: 'temple',
      level: 'city',
      condition: 95,
      maintenanceCost: 5000,
      effects: {
        'bonheur': 15,
        'prestige': 10
      },
      location: 'Capitole',
      constructionYear: 650,
      constructionStatus: 'completed',
      maintenanceLevel: 'excellent',
      lastMaintenance: 703,
      buildingTypeId: 'temple',
      investmentAmount: 50000
    },
    {
      id: 'forum-romain',
      name: 'Forum Romain',
      type: 'forum',
      level: 'metropolis',
      condition: 80,
      maintenanceCost: 8000,
      effects: {
        'commerce': 20,
        'ordrePublic': 10
      },
      location: 'Centre de Rome',
      constructionYear: 500,
      constructionStatus: 'completed',
      maintenanceLevel: 'normal',
      lastMaintenance: 702,
      buildingTypeId: 'forum',
      investmentAmount: 100000
    }
  ]);

  const [constructionProjects, setConstructionProjects] = useState<ConstructionProject[]>([
    {
      id: 'project-amphitheatre',
      buildingTypeId: 'amphitheatre',
      name: 'Grand Amphithéâtre de Rome',
      location: 'Est de Rome',
      estimatedCost: 200000,
      duration: 8,
      progress: 30,
      startedYear: 702,
      expectedCompletionYear: 710,
      benefits: ['Divertissement public', 'Prestige impérial'],
      sponsors: ['Sénat', 'Ordre des patriciens'],
      approved: true,
      proposedBy: 'Consul Marcus'
    }
  ]);

  useEffect(() => {
    // Simulate degradation over time
    const degradationInterval = setInterval(() => {
      degradeBuildings();
    }, 365 * 24 * 60 * 60 * 1000); // Every year

    return () => clearInterval(degradationInterval);
  }, []);

  const maintainBuilding = (buildingId: string, level: 'minimal' | 'normal' | 'excellent') => {
    setPublicBuildings(prev => prev.map(building => {
      if (building.id !== buildingId) return building;
      
      let conditionIncrease = 0;
      switch (level) {
        case 'minimal':
          conditionIncrease = 1;
          break;
        case 'normal':
          conditionIncrease = 5;
          break;
        case 'excellent':
          conditionIncrease = 10;
          break;
      }
      return { ...building, condition: Math.min(100, building.condition + conditionIncrease), maintenanceLevel: level };
    }));
  };

  const degradeBuildings = (yearsPassed: number = 1) => {
    setPublicBuildings(prev => prev.map(building => {
      const degradationAmount = yearsPassed * 0.5;
      return { ...building, condition: Math.max(0, building.condition - degradationAmount) };
    }));
  };

  const addPublicBuilding = (building: PublicBuilding) => {
    setPublicBuildings(prev => [...prev, building]);
  };

  const updateBuildingCondition = (buildingId: string, newCondition: number) => {
    setPublicBuildings(prev => prev.map(building => 
      building.id === buildingId 
        ? { ...building, condition: Math.max(0, Math.min(100, newCondition)) }
        : building
    ));
  };

  // Add missing functions
  const startConstructionProject = (projectData: Partial<ConstructionProject>): string => {
    const newProject: ConstructionProject = {
      id: `project-${Date.now()}`,
      buildingTypeId: projectData.buildingTypeId || 'generic',
      name: projectData.name || 'Nouveau projet',
      location: projectData.location || 'Rome',
      estimatedCost: projectData.estimatedCost || 100000,
      duration: projectData.duration || 5,
      progress: 0,
      benefits: projectData.benefits || [],
      sponsors: projectData.sponsors || [],
      approved: false
    };
    
    setConstructionProjects(prev => [...prev, newProject]);
    return newProject.id;
  };

  const approveConstructionProject = (projectId: string) => {
    setConstructionProjects(prev => prev.map(project => {
      if (project.id === projectId) {
        return {
          ...project,
          approved: true,
          startedYear: 705, // Current year
          expectedCompletionYear: 705 + project.duration
        };
      }
      return project;
    }));
  };

  const advanceConstruction = (projectId: string, progressAmount: number) => {
    setConstructionProjects(prev => {
      const updated = prev.map(project => {
        if (project.id === projectId) {
          const newProgress = Math.min(100, project.progress + progressAmount);
          
          // If project is complete, add it to public buildings
          if (newProgress >= 100) {
            const newBuilding: PublicBuilding = {
              id: `building-${Date.now()}`,
              name: project.name,
              type: 'forum', // Default type, should be determined by buildingTypeId
              level: 'city',
              condition: 100,
              maintenanceCost: project.estimatedCost * 0.05, // 5% of cost as maintenance
              effects: {},
              location: project.location,
              constructionYear: 705, // Current year
              constructionStatus: 'completed',
              maintenanceLevel: 'normal',
              buildingTypeId: project.buildingTypeId,
              investmentAmount: project.estimatedCost
            };
            
            addPublicBuilding(newBuilding);
          }
          
          return { ...project, progress: newProgress };
        }
        return project;
      });
      
      return updated.filter(p => p.progress < 100); // Remove completed projects
    });
  };

  const updateBuilding = (buildingId: string, updates: Partial<PublicBuilding>) => {
    setPublicBuildings(prev => prev.map(building => 
      building.id === buildingId ? { ...building, ...updates } : building
    ));
  };

  return {
    publicBuildings,
    setPublicBuildings,
    maintainBuilding,
    degradeBuildings,
    addPublicBuilding,
    updateBuildingCondition,
    // Added properties and functions
    constructionProjects,
    startConstructionProject,
    approveConstructionProject,
    advanceConstruction,
    updateBuilding
  };
};
