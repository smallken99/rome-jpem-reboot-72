
import { useEffect, useState } from 'react';
import { equilibreService } from '@/services/equilibreService';
import { useEconomy } from '@/hooks/useEconomy';
import { useBuildings } from '@/hooks/useBuildings';

/**
 * Hook pour appliquer les effets de l'équilibre sur les autres systèmes du jeu
 */
export function useEquilibreEffects() {
  const { updateBuildingIncome, updateMaintenanceCost } = useBuildings();
  const { balance, receivePayment, makePayment } = useEconomy();
  const [lastAppliedEffects, setLastAppliedEffects] = useState<Date | null>(null);

  // Appliquer les effets de l'équilibre
  useEffect(() => {
    // S'abonner aux changements d'équilibre
    const unsubscribe = equilibreService.subscribeToChangeEvents(event => {
      applyEconomicEffects(event.impact);
      applyBuildingEffects(event.impact);
      applyMilitaryEffects(event.impact);
      applyPoliticalEffects(event.impact);
      
      setLastAppliedEffects(new Date());
    });
    
    return unsubscribe;
  }, [balance]);

  // Appliquer les effets sur l'économie
  const applyEconomicEffects = (impact: Record<string, number>) => {
    // Si l'impact sur la prospérité est significatif, ajouter des revenus
    if (impact.prosperity && impact.prosperity > 10) {
      const amount = Math.round((impact.prosperity / 100) * 1000);
      if (amount > 0) {
        receivePayment(amount, "Prospérité économique", "Revenus", "Effet de la prospérité économique");
      }
    }
    
    // Si l'impact sur la croissance est significatif, ajouter des revenus
    if (impact.income && impact.income > 5) {
      const amount = Math.round((impact.income / 100) * 500);
      if (amount > 0) {
        receivePayment(amount, "Croissance économique", "Revenus", "Effet de la croissance économique");
      }
    }
    
    // Si l'impact sur l'agitation religieuse est élevé, créer des dépenses
    if (impact.religiousUnrest && impact.religiousUnrest > 20) {
      const amount = Math.round((impact.religiousUnrest / 100) * 800);
      if (amount > 0) {
        makePayment(amount, "Mesures d'apaisement religieux", "Dépenses", "Conséquence de l'agitation religieuse");
      }
    }
  };

  // Appliquer les effets sur les bâtiments
  const applyBuildingEffects = (impact: Record<string, number>) => {
    // La prospérité économique augmente les revenus des bâtiments
    if (impact.prosperity && Math.abs(impact.prosperity) > 5) {
      // Multiplier les revenus par un facteur basé sur la prospérité
      const factor = 1 + (impact.prosperity / 200); // +/- 50% max
      updateBuildingIncome(factor);
    }
    
    // L'agitation sociale augmente les coûts d'entretien
    if (impact.rebellionRisk && impact.rebellionRisk > 10) {
      // Augmenter les coûts d'entretien en fonction du risque de rébellion
      const factor = 1 + (impact.rebellionRisk / 100); // +100% max
      updateMaintenanceCost(factor);
    }
  };

  // Appliquer les effets sur les forces militaires
  const applyMilitaryEffects = (impact: Record<string, number>) => {
    // Pour l'instant, pas d'effets directs sur les systèmes militaires existants
    // Ces effets seraient implémentés lorsque les systèmes militaires seront développés
  };

  // Appliquer les effets sur le système politique
  const applyPoliticalEffects = (impact: Record<string, number>) => {
    // Pour l'instant, pas d'effets directs sur les systèmes politiques existants
    // Ces effets seraient implémentés lorsque les systèmes politiques seront développés
  };

  return {
    lastAppliedEffects
  };
}
