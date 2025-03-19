
import { RepublicEquilibre } from '@/types/republic';

export const createEquilibreOperations = (
  setEquilibre: React.Dispatch<React.SetStateAction<RepublicEquilibre | null>>
) => {
  const updateEquilibre = (updates: Partial<RepublicEquilibre>) => {
    setEquilibre(prev => prev ? { ...prev, ...updates } : updates as RepublicEquilibre);
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
