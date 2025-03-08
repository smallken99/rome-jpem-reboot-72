
import { Equilibre } from '../types';

export const createEquilibreOperations = (
  setEquilibre: React.Dispatch<React.SetStateAction<Equilibre | null>>
) => {
  const updateEquilibre = (updates: Partial<Equilibre>) => {
    setEquilibre(prev => prev ? { ...prev, ...updates } : updates as Equilibre);
  };

  return {
    updateEquilibre
  };
};
