
import { usePublicBuildings } from './usePublicBuildings';
import { useConstructionProjects } from './useConstructionProjects';
import { PublicBuilding, ConstructionProject } from '../types/buildingTypes';
import { toast } from 'sonner';

export type { PublicBuilding, ConstructionProject } from '../types/buildingTypes';

export const useBatimentsPublics = () => {
  const {
    publicBuildings,
    maintainBuilding,
    degradeBuildings,
    addPublicBuilding
  } = usePublicBuildings();
  
  const {
    constructionProjects,
    startConstructionProject,
    approveConstructionProject,
    advanceConstruction,
    removeConstructionProject
  } = useConstructionProjects();
  
  // Faire progresser la construction et créer un nouveau bâtiment si terminé
  const handleAdvanceConstruction = (projectId: string, progressAmount: number) => {
    const completedProject = advanceConstruction(projectId, progressAmount);
    
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
        population: Math.floor(Math.random() * 500) + 100, // Population aléatoire qui utilise le bâtiment
        publicApproval: 85 // Approbation initiale élevée pour un nouveau bâtiment
      };
      
      addPublicBuilding(newBuilding);
      
      // Supprimer le projet terminé
      removeConstructionProject(projectId);
      
      toast.success(`Construction terminée: ${completedProject.name}`);
    }
  };

  return {
    publicBuildings,
    constructionProjects,
    startConstructionProject,
    approveConstructionProject,
    advanceConstruction: handleAdvanceConstruction,
    maintainBuilding,
    degradeBuildings
  };
};

// Réexportation des types pour faciliter l'importation
export * from '../types/buildingTypes';
