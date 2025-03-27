
import { useState, useCallback } from 'react';
import { Character } from '@/types/character';
import { FamilyAlliance } from '@/data/alliances';
import { useGameTime } from '@/hooks/useGameTime';

export const useAllianceBirths = (
  characters: Character[], 
  onChildBirth?: (parentIds?: string[]) => void
) => {
  const [lastBirthYear, setLastBirthYear] = useState<number | null>(null);
  const { year } = useGameTime();
  
  // Trouver les couples mariés
  const marriedCouples = characters.filter(c => 
    c.gender === 'female' && 
    ((c.relation && c.relation.includes('Épouse')) || c.spouseId)
  ).map(wife => {
    const husband = characters.find(h => 
      (h.id === wife.spouseId) || 
      (wife.parentIds && wife.parentIds.includes(h.id)) ||
      (h.isHeadOfFamily && h.gender === 'male')
    );
    return { wife, husband };
  }).filter(couple => couple.husband);
  
  // Vérifier s'il y a des naissances
  const checkForBirths = useCallback(() => {
    if (!onChildBirth || marriedCouples.length === 0) {
      return false;
    }
    
    // Pour chaque couple marié, vérifier s'il y a une naissance
    // Simplification: 20% de chance par vérification
    const couple = marriedCouples[Math.floor(Math.random() * marriedCouples.length)];
    const birthOccurs = Math.random() < 0.2;
    
    if (birthOccurs && couple.husband) {
      // S'il y a une naissance, appeler la fonction onChildBirth
      onChildBirth([couple.husband.id, couple.wife.id]);
      setLastBirthYear(year);
      return true;
    }
    
    return false;
  }, [marriedCouples, onChildBirth, year]);
  
  // Filtrer les alliances actives
  const activeAlliances = characters
    .filter(c => c.gender === 'female' && c.relation && c.relation.includes('Épouse'))
    .map(c => c.name.split(' ')[1])
    .filter(Boolean);
  
  return { lastBirthYear, checkForBirths, activeAlliances };
};
