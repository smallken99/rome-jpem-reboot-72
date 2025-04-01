
import { useState, useEffect, useCallback } from 'react';
import { equilibreService } from '@/services/equilibreService';
import { Equilibre } from '@/components/maitrejeu/types/equilibre';
import { toast } from 'sonner';

/**
 * Hook pour interagir avec le service d'équilibre
 */
export function useEquilibre() {
  const [equilibre, setEquilibre] = useState<Equilibre>(equilibreService.getEquilibre());
  const [impactLog, setImpactLog] = useState<Array<{ type: string; changes: Partial<Equilibre>; impact: Record<string, number>; timestamp: Date }>>([]);

  // S'abonner aux changements d'équilibre
  useEffect(() => {
    const unsubscribe = equilibreService.subscribe(newEquilibre => {
      setEquilibre(newEquilibre);
    });
    
    const unsubscribeEvents = equilibreService.subscribeToChangeEvents(event => {
      setImpactLog(prev => [
        {
          ...event,
          timestamp: new Date()
        },
        ...prev.slice(0, 9) // Garder seulement les 10 derniers événements
      ]);
      
      // Afficher un toast pour les changements significatifs
      const significantImpact = Object.entries(event.impact).find(([_, value]) => Math.abs(value) > 20);
      if (significantImpact) {
        const [key, value] = significantImpact;
        const isPositive = value > 0;
        toast[isPositive ? 'success' : 'warning'](
          `Impact important sur ${key}: ${isPositive ? '+' : ''}${value}%`,
          { description: `Suite à un ajustement ${event.type}` }
        );
      }
    });
    
    return () => {
      unsubscribe();
      unsubscribeEvents();
    };
  }, []);

  // Mettre à jour l'équilibre politique
  const updatePoliticalBalance = useCallback((populaires: number, optimates: number, moderates: number) => {
    equilibreService.updatePoliticalBalance(populaires, optimates, moderates);
  }, []);

  // Mettre à jour l'équilibre social
  const updateSocialBalance = useCallback((patriciens: number, plebeiens: number, esclaves?: number, cohesion?: number) => {
    equilibreService.updateSocialBalance(patriciens, plebeiens, esclaves, cohesion);
  }, []);

  // Mettre à jour l'équilibre économique
  const updateEconomicBalance = useCallback((stabilite: number, croissance: number, commerce: number, agriculture: number) => {
    equilibreService.updateEconomicBalance(stabilite, croissance, commerce, agriculture);
  }, []);

  // Mettre à jour l'équilibre militaire
  const updateMilitaryBalance = useCallback((moral: number, effectifs: number, equipement: number, discipline: number) => {
    equilibreService.updateMilitaryBalance(moral, effectifs, equipement, discipline);
  }, []);

  // Mettre à jour l'équilibre religieux
  const updateReligiousBalance = useCallback((piete: number, traditions: number, superstition: number) => {
    equilibreService.updateReligiousBalance(piete, traditions, superstition);
  }, []);

  // Mettre à jour l'équilibre global
  const updateEquilibre = useCallback((updates: Partial<Equilibre>, source?: string) => {
    equilibreService.updateEquilibre(updates, source);
  }, []);

  // Calculer l'impact d'un changement potentiel
  const simulateImpact = useCallback((changes: Partial<Equilibre>): Record<string, number> => {
    return equilibreService.calculateImpact(changes);
  }, []);

  return {
    equilibre,
    impactLog,
    updatePoliticalBalance,
    updateSocialBalance,
    updateEconomicBalance,
    updateMilitaryBalance,
    updateReligiousBalance,
    updateEquilibre,
    simulateImpact
  };
}
