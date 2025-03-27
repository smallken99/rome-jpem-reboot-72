
import { useState, useEffect } from 'react';

interface Family {
  id: string;
  name: string;
  prestige: string;
  influence: string;
  wealth: string;
}

export const useAllianceCalculations = (
  selectedFamilyId: string,
  families: Family[]
) => {
  const [benefits, setBenefits] = useState<string[]>([]);
  
  useEffect(() => {
    if (!selectedFamilyId) {
      setBenefits([]);
      return;
    }
    
    const selectedFamily = families.find(f => f.id === selectedFamilyId);
    if (!selectedFamily) {
      setBenefits([]);
      return;
    }
    
    // Generate benefits based on family traits
    const newBenefits: string[] = [];
    
    // Base benefits for all alliances
    newBenefits.push("Renforcement des liens entre les familles");
    
    // Benefits based on prestige
    if (selectedFamily.prestige.includes('Très')) {
      newBenefits.push("Amélioration significative du prestige de votre famille par association");
      newBenefits.push("Accès aux plus hautes sphères de la société romaine");
    } else if (selectedFamily.prestige.includes('Haute') || selectedFamily.prestige.includes('élevé')) {
      newBenefits.push("Amélioration du prestige de votre famille");
      newBenefits.push("Meilleure réputation dans les cercles aristocratiques");
    }
    
    // Benefits based on influence
    if (selectedFamily.influence.includes('++++')) {
      newBenefits.push("Soutien politique majeur au Sénat et dans les assemblées");
      newBenefits.push("Accès privilégié aux magistratures importantes");
    } else if (selectedFamily.influence.includes('+++')) {
      newBenefits.push("Soutien politique significatif dans les votes");
      newBenefits.push("Meilleures chances d'obtenir des postes politiques");
    } else if (selectedFamily.influence.includes('++')) {
      newBenefits.push("Soutien politique modéré dans certaines affaires");
    }
    
    // Benefits based on wealth
    if (selectedFamily.wealth.includes('++++')) {
      newBenefits.push("Accès à d'importantes ressources financières");
      newBenefits.push("Opportunités commerciales exclusives et lucratives");
    } else if (selectedFamily.wealth.includes('+++')) {
      newBenefits.push("Soutien financier pour vos projets");
      newBenefits.push("Nouvelles opportunités commerciales");
    } else if (selectedFamily.wealth.includes('++')) {
      newBenefits.push("Partage de ressources économiques");
    }
    
    // Set a max of 5 benefits to display
    setBenefits(newBenefits.slice(0, 5));
  }, [selectedFamilyId, families]);
  
  return { benefits };
};
