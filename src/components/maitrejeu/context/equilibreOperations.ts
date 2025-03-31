
import { Equilibre } from '../types/equilibre';

export const createEquilibreOperations = (
  setEquilibre: React.Dispatch<React.SetStateAction<Equilibre | null>>
) => {
  const updateEquilibre = (updates: Partial<Equilibre>) => {
    setEquilibre(prev => prev ? { ...prev, ...updates } : updates as Equilibre);
  };

  // Add function to update faction balance
  const updateFactionBalance = (populares: number, optimates: number, moderates: number) => {
    setEquilibre(prev => {
      if (!prev) return null;
      return {
        ...prev,
        populares,
        populaires: populares, // Update both for compatibility
        optimates,
        moderates,
        politique: {
          ...prev.politique,
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
