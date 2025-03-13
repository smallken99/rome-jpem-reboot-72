
import { Equilibre } from '../types';

export const createEquilibreOperations = (
  setEquilibre: React.Dispatch<React.SetStateAction<Equilibre | null>>
) => {
  const updateEquilibre = (updates: Partial<Equilibre>) => {
    setEquilibre(prev => prev ? { ...prev, ...updates } : updates as Equilibre);
  };

  // Ajouter la fonction pour mettre à jour l'équilibre des factions
  const updateFactionBalance = (populaires: number, optimates: number, moderates: number) => {
    setEquilibre(prev => {
      if (!prev) return null;
      return {
        ...prev,
        populaires,
        populares: populaires, // Mettre à jour les deux pour la compatibilité
        optimates,
        moderates
      };
    });
  };

  return {
    updateEquilibre,
    updateFactionBalance
  };
};
