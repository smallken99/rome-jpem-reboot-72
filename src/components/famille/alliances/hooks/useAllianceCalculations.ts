
import { useState, useEffect } from 'react';
import { Character } from '@/types/character';

type Family = {
  id: string;
  name: string;
  prestige: string;
  influence: string;
  wealth: string;
};

export const useAllianceCalculations = (
  selectedFamily: string, 
  potentialFamilies: Family[]
) => {
  const [benefits, setBenefits] = useState<string[]>([]);

  useEffect(() => {
    if (selectedFamily) {
      setBenefits(calculateBenefits(selectedFamily, potentialFamilies));
    } else {
      setBenefits([]);
    }
  }, [selectedFamily, potentialFamilies]);

  const calculateBenefits = (familyId: string, families: Family[]): string[] => {
    const family = families.find(f => f.id === familyId);
    
    if (!family) return [];
    
    const benefits = [
      `Alliance avec une famille de prestige ${family.prestige.toLowerCase()}`,
    ];
    
    // Add benefits based on family influence
    if (family.influence === '++++') {
      benefits.push('Influence politique majeure au Sénat');
      benefits.push('Accès aux magistratures supérieures');
    } else if (family.influence === '+++') {
      benefits.push('Influence politique significative');
      benefits.push('Soutien dans les votes populaires');
    } else {
      benefits.push('Réseau de contacts politiques');
    }
    
    // Add benefits based on family wealth
    if (family.wealth === '++++' || family.wealth === '+++') {
      benefits.push('Opportunités commerciales lucratives');
    }
    
    return benefits;
  };

  return { benefits };
};
