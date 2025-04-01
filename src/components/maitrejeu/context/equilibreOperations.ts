
import { Equilibre } from '../types/equilibre';
import { normalizeEquilibre } from '../utils/equilibreAdapter';
import { equilibreService } from '@/services/equilibreService';

export const createEquilibreOperations = (
  setEquilibre: React.Dispatch<React.SetStateAction<Equilibre | null>>
) => {
  // S'abonner aux changements d'équilibre venant du service
  equilibreService.subscribe(newEquilibre => {
    setEquilibre(normalizeEquilibre(newEquilibre));
  });

  const updateEquilibre = (updates: Partial<Equilibre>, source?: string) => {
    // Mettre à jour l'équilibre via le service
    const newEquilibre = equilibreService.updateEquilibre(updates, source);
    setEquilibre(normalizeEquilibre(newEquilibre));
  };

  // Mise à jour de l'équilibre des factions
  const updateFactionBalance = (populaires: number, optimates: number, moderates: number) => {
    equilibreService.updatePoliticalBalance(populaires, optimates, moderates);
  };

  // Mise à jour de l'équilibre social
  const updateSocialBalance = (patriciens: number, plebeiens: number, esclaves?: number, cohesion?: number) => {
    equilibreService.updateSocialBalance(patriciens, plebeiens, esclaves, cohesion);
  };

  // Mise à jour de l'équilibre économique
  const updateEconomicBalance = (stabilite: number, croissance: number, commerce: number, agriculture: number) => {
    equilibreService.updateEconomicBalance(stabilite, croissance, commerce, agriculture);
  };

  // Mise à jour de l'équilibre militaire
  const updateMilitaryBalance = (moral: number, effectifs: number, equipement: number, discipline: number) => {
    equilibreService.updateMilitaryBalance(moral, effectifs, equipement, discipline);
  };

  // Mise à jour de l'équilibre religieux
  const updateReligiousBalance = (piete: number, traditions: number, superstition: number) => {
    equilibreService.updateReligiousBalance(piete, traditions, superstition);
  };

  // Simuler l'impact d'un changement d'équilibre
  const simulateEquilibreChange = (changes: Partial<Equilibre>) => {
    return equilibreService.calculateImpact(changes);
  };

  return {
    updateEquilibre,
    updateFactionBalance,
    updateSocialBalance,
    updateEconomicBalance,
    updateMilitaryBalance,
    updateReligiousBalance,
    simulateEquilibreChange
  };
};
