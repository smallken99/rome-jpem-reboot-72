
import { EducationPath } from '../types/educationTypes';

export const getOutcomeSkills = (educationPath: EducationPath): string[] => {
  // Retourne les compétences qu'un enfant acquiert pendant son éducation
  return educationPath.skills || [];
};

export const getOutcomeBonuses = (educationPath: EducationPath, statKey: string): number => {
  // Retourne le bonus pour une statistique spécifique
  if (educationPath.outcomes && statKey in educationPath.outcomes) {
    return educationPath.outcomes[statKey] || 0;
  }
  return 0;
};

export const calculateEducationProgress = (yearsCompleted: number, totalYears: number): number => {
  if (totalYears <= 0) return 0;
  return Math.min(100, Math.round((yearsCompleted / totalYears) * 100));
};

export const getEducationCost = (
  educationType: string, 
  withPreceptor: boolean = false, 
  preceptorQuality: number = 0
): number => {
  // Coût de base de l'éducation
  const baseCost = {
    military: 2000,
    rhetoric: 1500,
    political: 2500,
    religious: 1000,
    philosophical: 1500,
    administrative: 2000
  };
  
  // Coût de base pour ce type d'éducation
  const cost = (baseCost as Record<string, number>)[educationType] || 1500;
  
  // Ajout du coût du précepteur si applicable
  if (withPreceptor) {
    // Plus le précepteur est de qualité, plus il est cher
    const preceptorCost = 500 + (preceptorQuality * 10);
    return cost + preceptorCost;
  }
  
  return cost;
};

export const getEducationTimeReduction = (preceptorQuality: number): number => {
  // Un précepteur de haute qualité peut réduire le temps d'éducation
  if (preceptorQuality >= 90) return 0.3; // 30% de réduction de temps
  if (preceptorQuality >= 70) return 0.2; // 20% de réduction de temps
  if (preceptorQuality >= 50) return 0.1; // 10% de réduction de temps
  return 0;
};
