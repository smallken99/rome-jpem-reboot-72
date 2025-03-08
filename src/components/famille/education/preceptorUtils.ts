
import { Preceptor, PreceptorsByType } from './types/educationTypes';

/**
 * Filter preceptors by type and sort by quality
 */
export const filterPreceptorsByType = (
  preceptors: PreceptorsByType,
  type: string
): Preceptor[] => {
  if (!preceptors || !type || !(type in preceptors)) {
    return [];
  }

  // Safely check if preceptors[type] is an array before accessing length
  const typePreceptors = preceptors[type];
  if (!Array.isArray(typePreceptors)) {
    return [];
  }

  return [...typePreceptors].sort((a, b) => b.quality - a.quality);
};

/**
 * Get available preceptors from all types
 */
export const getAllAvailablePreceptors = (preceptors: PreceptorsByType): Preceptor[] => {
  if (!preceptors) return [];
  
  const allAvailablePreceptors: Preceptor[] = [];
  
  // Loop through all preceptor types
  Object.keys(preceptors).forEach(type => {
    if (Array.isArray(preceptors[type])) {
      const availableFromType = preceptors[type].filter(p => p.available);
      allAvailablePreceptors.push(...availableFromType);
    }
  });
  
  return allAvailablePreceptors.sort((a, b) => b.quality - a.quality);
};

// Add these functions to support useEducationSystem
export const generateRomanName = (): string => {
  // This is a simplified implementation for now
  const praenomina = ['Marcus', 'Lucius', 'Gaius', 'Publius', 'Quintus', 'Titus', 'Aulus'];
  const nomina = ['Cornelius', 'Junius', 'Claudius', 'Valerius', 'Aurelius', 'Flavius', 'Servilius'];
  const cognomina = ['Scipio', 'Cicero', 'Caesar', 'Cato', 'Brutus', 'Sulla', 'Maximus'];
  
  const randomPraenomen = praenomina[Math.floor(Math.random() * praenomina.length)];
  const randomNomen = nomina[Math.floor(Math.random() * nomina.length)];
  const randomCognomen = cognomina[Math.floor(Math.random() * cognomina.length)];
  
  return `${randomPraenomen} ${randomNomen} ${randomCognomen}`;
};

export const generateSpeciality = (): string => {
  const specialities = ['Rhétorique', 'Philosophie', 'Droit', 'Art Militaire', 'Histoire', 'Mathématiques', 'Littérature'];
  return specialities[Math.floor(Math.random() * specialities.length)];
};

export const generateReputation = (): "Excellent" | "Bon" | "Moyen" => {
  const reputations: ["Excellent", "Bon", "Moyen"] = ["Excellent", "Bon", "Moyen"];
  return reputations[Math.floor(Math.random() * reputations.length)];
};

export const generateFee = (): number => {
  // Random fee between 500 and 2000
  return Math.floor(Math.random() * 1500) + 500;
};

export const generateTitle = (): string => {
  const titles = ['Docteur', 'Professeur', 'Maître', 'Sage'];
  return titles[Math.floor(Math.random() * titles.length)];
};

export const generateStatBonus = (): number => {
  // Generate a stat bonus between 1 and 5
  return Math.floor(Math.random() * 5) + 1;
};

export const generateGender = (): string => {
  return Math.random() > 0.5 ? 'male' : 'female';
};
