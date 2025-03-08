
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
  if (!Array.isArray(typePreceptors) || typePreceptors.length === 0) {
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
