
import { useState, useCallback } from 'react';
import { Character } from '@/types/character';
import { useGameTime } from '@/hooks/useGameTime';
import { SEASONAL_BIRTH_MODIFIERS, BASE_BIRTH_CHANCE_PER_YEAR } from '../utils/fertility/birthConstants';

export const useAllianceBirths = (
  characters: Character[],
  onChildBirth?: (parentIds?: string[]) => void
) => {
  const { year, season } = useGameTime();
  const [lastBirthYear, setLastBirthYear] = useState<number | null>(null);
  
  // Get all active marriages (represented by characters with relation "Épouse")
  const activeAlliances = characters.filter(c => c.relation === 'Épouse');
  
  const checkForBirths = useCallback(() => {
    // Basic implementation: check for each marriage if a birth occurs
    for (const spouse of activeAlliances) {
      const husband = spouse.parentIds ? 
        characters.find(c => c.id === spouse.parentIds[0]) : 
        characters.find(c => c.isHeadOfFamily);
        
      if (!husband) continue;
      
      // Calculate birth chance
      const baseChance = BASE_BIRTH_CHANCE_PER_YEAR / 4; // Per season
      const seasonalModifier = SEASONAL_BIRTH_MODIFIERS[season] || 0;
      const adjustedChance = baseChance + (seasonalModifier / 100);
      
      // Check if birth occurs
      if (Math.random() < adjustedChance) {
        // Birth occurred!
        if (onChildBirth) {
          onChildBirth([husband.id, spouse.id]);
          setLastBirthYear(year);
          return true;
        }
      }
    }
    
    return false;
  }, [characters, activeAlliances, year, season, onChildBirth]);
  
  return {
    lastBirthYear,
    activeAlliances,
    checkForBirths
  };
};
