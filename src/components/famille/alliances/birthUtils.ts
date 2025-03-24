
import { Character } from '@/types/character';
import { checkForBirth, generateChild } from '../utils/birthSystem';
import { Season } from '@/utils/timeSystem';

export const checkAllianceForBirths = (
  alliance: { member?: string; spouse?: string },
  characters: Character[],
  season: Season,
  year: number,
  onChildBirth?: (child: Character) => void,
  onBirthOccurred?: (year: number) => void
) => {
  // Find the characters in this alliance
  const husband = characters.find(char => char.name === alliance.member);
  const wife = characters.find(char => char.name === alliance.spouse);
  
  if (husband && wife) {
    // Vérifier si la femme a déjà eu un enfant cette année
    if (wife.lastChildBirthYear === year) {
      return false; // Déjà une naissance cette année
    }
    
    // Check if a birth occurs, passing both husband and wife plus the current season
    if (checkForBirth(wife, husband, season, year)) {
      // Génération d'un enfant
      const newChild = generateChild(husband, wife);
      
      // Update the parent component about the new child
      if (onChildBirth) {
        onChildBirth(newChild);
      }
      
      // Update the last birth year for the wife
      wife.lastChildBirthYear = year;
      
      // Update the last birth year in parent component
      if (onBirthOccurred) {
        onBirthOccurred(year);
      }
      
      // Vérifier la possibilité de jumeaux (environ 3% de chance)
      const twinBirth = Math.random() < 0.03;
      
      if (twinBirth) {
        // Générer un jumeau
        const twinChild = generateChild(husband, wife);
        
        // Informer le composant parent du jumeau
        if (onChildBirth) {
          onChildBirth(twinChild);
        }
      }
      
      return true;
    }
  }
  
  return false;
};
