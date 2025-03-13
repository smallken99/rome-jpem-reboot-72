
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
    // Check if a birth occurs, passing both husband and wife plus the current season
    if (checkForBirth(wife, husband, season)) {
      // Generate a child
      const newChild = generateChild(husband, wife);
      
      // Update the parent component about the new child
      if (onChildBirth) {
        onChildBirth(newChild);
      }
      
      // Update the last birth year
      if (onBirthOccurred) {
        onBirthOccurred(year);
      }
      
      return true;
    }
  }
  
  return false;
};
