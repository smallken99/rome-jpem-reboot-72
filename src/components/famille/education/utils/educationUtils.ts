
import { EducationType, EducationPath } from '../types/educationTypes';

/**
 * Safely access bonuses from education path outcomes
 */
export const getOutcomeBonuses = (path: EducationPath, statKey: string): number => {
  if (!path.outcomes) return 0;
  
  if (Array.isArray(path.outcomes)) {
    // If outcomes is an array of strings, there are no direct bonuses
    return 0;
  } else {
    // If outcomes is an object, check for bonuses
    return path.outcomes.bonuses?.[statKey] || 0;
  }
};

/**
 * Safely access skills from education path outcomes
 */
export const getOutcomeSkills = (path: EducationPath): string[] => {
  if (!path.outcomes) return [];
  
  if (Array.isArray(path.outcomes)) {
    // If outcomes is an array of strings, return it directly
    return path.outcomes;
  } else {
    // If outcomes is an object, return the skills array or empty array
    return path.outcomes.skills || [];
  }
};

/**
 * Check if an education type is valid (allowing string or EducationType)
 */
export const isValidEducationType = (type: string): type is EducationType => {
  const validTypes: EducationType[] = [
    'military', 
    'political', 
    'religious', 
    'artistic', 
    'philosophical', 
    'rhetoric', 
    'academic', 
    'none'
  ];
  
  return validTypes.includes(type as EducationType);
};

/**
 * Gets a display name for an education type
 */
export const getEducationTypeName = (type: string): string => {
  const names: Record<string, string> = {
    'military': 'Militaire',
    'political': 'Politique',
    'religious': 'Religieuse',
    'artistic': 'Artistique',
    'philosophical': 'Philosophique',
    'rhetoric': 'Rhétorique',
    'academic': 'Académique',
    'none': 'Aucune'
  };
  
  return names[type] || type;
};
