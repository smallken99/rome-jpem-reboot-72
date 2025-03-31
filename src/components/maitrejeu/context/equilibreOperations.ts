
import { Equilibre } from '../types/equilibre';
import { normalizeEquilibre } from '../utils/equilibreAdapter';

export const createEquilibreOperations = (
  setEquilibre: React.Dispatch<React.SetStateAction<Equilibre | null>>
) => {
  const updateEquilibre = (updates: Partial<Equilibre>) => {
    setEquilibre(prev => {
      if (!prev) return normalizeEquilibre(updates);
      return normalizeEquilibre({ ...prev, ...updates });
    });
  };

  // Add function to update faction balance
  const updateFactionBalance = (populares: number, optimates: number, moderates: number) => {
    setEquilibre(prev => {
      if (!prev) return null;
      
      const normalized = normalizeEquilibre(prev);
      
      return {
        ...normalized,
        populares,
        populaires: populares, // Update both for compatibility
        optimates,
        moderates,
        politique: {
          ...normalized.politique,
          populaires: populares,
          optimates,
          moderates
        }
      };
    });
  };

  return {
    updateEquilibre,
    updateFactionBalance
  };
};
