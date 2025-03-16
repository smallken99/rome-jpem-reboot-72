
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
    addPublicBuilding,
    updateBuildingCondition
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

  // Gérer la maintenance des bâtiments
  const handleMaintainBuilding = (buildingId: string, level: 'minimal' | 'standard' | 'excellent') => {
    // Coûts de maintenance par niveau
    const maintenanceCosts = {
      minimal: 0.01, // 1% du coût de construction
      standard: 0.03, // 3% du coût de construction
      excellent: 0.05 // 5% du coût de construction
    };
    
    // Trouver le bâtiment
    const building = publicBuildings.find(b => b.id === buildingId);
    if (!building) {
      toast.error("Bâtiment introuvable");
      return false;
    }
    
    // Calculer le coût de maintenance
    const maintenanceCost = Math.round(building.investmentAmount * maintenanceCosts[level]);
    
    // Simuler une dépense du trésor public
    // (Dans une application réelle, vérifier les fonds disponibles)
    
    // Mettre à jour le niveau de maintenance
    maintainBuilding(buildingId, level);
    
    // Améliorer la condition du bâtiment
    const conditionImprovement = level === 'minimal' ? 5 : level === 'standard' ? 15 : 30;
    updateBuildingCondition(buildingId, conditionImprovement);
    
    toast.success(`Maintenance effectuée: ${building.name} (${level})`);
    return true;
  };

  return {
    publicBuildings,
    constructionProjects,
    startConstructionProject,
    approveConstructionProject,
    advanceConstruction: handleAdvanceConstruction,
    maintainBuilding: handleMaintainBuilding,
    degradeBuildings
  };
};

// Réexportation des types pour faciliter l'importation
export * from '../types/buildingTypes';
