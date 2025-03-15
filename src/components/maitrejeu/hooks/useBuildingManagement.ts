
import { useState, useCallback } from 'react';
import { useMaitreJeu } from '../context';
import { useBatimentsPublics, PublicBuilding, ConstructionProject } from '@/components/republique/batiments/hooks/useBatimentsPublics';
import { usePatrimoine } from '@/hooks/usePatrimoine';

export const useBuildingManagement = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const { 
    publicBuildings, 
    constructionProjects, 
    startConstructionProject, 
    advanceConstruction, 
    maintainBuilding 
  } = useBatimentsPublics();
  
  const { balance, buildingPurchased, buildingSold } = usePatrimoine();
  const { addEconomieRecord, economicFactors } = useMaitreJeu();
  
  const handleStartConstruction = useCallback((buildingData: any) => {
    // Create a new construction project
    const projectId = startConstructionProject({
      name: buildingData.name,
      buildingTypeId: buildingData.typeId,
      location: buildingData.location,
      estimatedCost: buildingData.cost,
      duration: buildingData.constructionTime || 4,
      progress: 0,
      estimatedCompletionYear: economicFactors.currentYear + Math.ceil(buildingData.constructionTime / 4),
      benefits: buildingData.benefits || [],
      type: buildingData.buildingType
    });
    
    // Record the initial payment in the economy system
    if (projectId) {
      const initialCost = Math.round(buildingData.cost * 0.3); // 30% upfront cost
      
      addEconomieRecord({
        amount: -initialCost,
        description: `Démarrage construction: ${buildingData.name}`,
        category: 'construction',
        type: 'expense',
        date: new Date(),
        source: 'Trésor Public',
        approved: true
      });
      
      buildingPurchased(buildingData.name, initialCost);
    }
    
    return projectId;
  }, [startConstructionProject, economicFactors, addEconomieRecord, buildingPurchased]);
  
  const handleAdvanceConstruction = useCallback((projectId: string, progressAmount: number) => {
    const project = constructionProjects.find(p => p.id === projectId);
    if (!project) return false;
    
    // Calculate cost based on progress
    const constructionCost = Math.round(
      project.estimatedCost * (progressAmount / 100) * 0.7 // Remaining 70% spread across progress
    );
    
    // Record the payment
    if (constructionCost > 0) {
      addEconomieRecord({
        amount: -constructionCost,
        description: `Progression construction: ${project.name}`,
        category: 'construction',
        type: 'expense',
        date: new Date(),
        source: 'Trésor Public',
        approved: true
      });
      
      // Advance the construction progress
      advanceConstruction(projectId, progressAmount);
      return true;
    }
    
    return false;
  }, [constructionProjects, advanceConstruction, addEconomieRecord]);
  
  const handleMaintenance = useCallback((buildingId: string) => {
    const building = publicBuildings.find(b => b.id === buildingId);
    if (!building) return false;
    
    // Record the maintenance payment
    addEconomieRecord({
      amount: -building.maintenanceCost,
      description: `Maintenance: ${building.name}`,
      category: 'maintenance',
      type: 'expense',
      date: new Date(),
      source: 'Services d\'entretien',
      approved: true
    });
    
    // Perform the maintenance
    maintainBuilding(buildingId);
    return true;
  }, [publicBuildings, maintainBuilding, addEconomieRecord]);
  
  const handleSellBuilding = useCallback((buildingId: string) => {
    const building = publicBuildings.find(b => b.id === buildingId);
    if (!building) return false;
    
    // Calculate sell value (based on condition and initial investment)
    const sellValue = Math.round(
      building.investmentAmount * (building.condition / 100) * 0.7 // 70% of original value adjusted by condition
    );
    
    // Record the sale
    addEconomieRecord({
      amount: sellValue,
      description: `Vente bâtiment: ${building.name}`,
      category: 'sale',
      type: 'income',
      date: new Date(),
      source: 'Vente immobilière',
      approved: true
    });
    
    buildingSold(building.name, sellValue);
    
    // TODO: Remove the building from the list
    // This would require adding a deleteBuilding method to useBatimentsPublics
    
    return true;
  }, [publicBuildings, addEconomieRecord, buildingSold]);
  
  return {
    isModalOpen,
    setIsModalOpen,
    publicBuildings,
    constructionProjects,
    balance,
    startConstruction: handleStartConstruction,
    advanceConstruction: handleAdvanceConstruction,
    maintainBuilding: handleMaintenance,
    sellBuilding: handleSellBuilding
  };
};
