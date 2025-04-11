
import { useState, useCallback } from 'react';
import { Character } from '@/types/character';
import { generateUniqueId } from '@/utils/idGenerator';
import { useGameTime } from '@/hooks/useGameTime';

type BirthHandler = (characterData: any) => Character;

export const useAllianceBirths = (characters: Character[], addNewCharacter: BirthHandler) => {
  const { year } = useGameTime();
  const [lastBirthYear, setLastBirthYear] = useState<number | null>(
    Math.max(
      ...characters
        .filter(char => char.lastChildBirthYear)
        .map(char => char.lastChildBirthYear || 0),
      0
    ) || null
  );
  
  // Function to check for potential births based on marriages
  const checkForBirths = useCallback(() => {
    // Get married women of child-bearing age
    const marriedWomen = characters.filter(
      char => char.gender === 'female' && 
             char.age >= 16 && 
             char.age <= 45 && 
             char.spouseId && 
             char.marriageStatus === 'married'
    );
    
    if (marriedWomen.length === 0) return false;
    
    // Chance calculation
    const birthChance = Math.random(); // 0-1
    
    // If chance is favorable, create a birth
    if (birthChance > 0.7) { // 30% chance of birth
      // Pick a random married woman
      const randomIndex = Math.floor(Math.random() * marriedWomen.length);
      const mother = marriedWomen[randomIndex];
      const father = characters.find(c => c.id === mother.spouseId);
      
      if (!father) return false;
      
      // Name generation based on father's name
      const lastName = father.lastName || father.name.split(' ')[1] || '';
      const gender = Math.random() > 0.5 ? 'male' : 'female';
      const firstNameOptions = gender === 'male' 
        ? ['Marcus', 'Gaius', 'Lucius', 'Publius', 'Quintus', 'Titus'] 
        : ['Julia', 'Cornelia', 'Claudia', 'Livia', 'Valeria', 'Aurelia'];
      
      const firstName = firstNameOptions[Math.floor(Math.random() * firstNameOptions.length)];
      
      // Create the child
      const newChild = {
        name: `${firstName} ${lastName}`,
        firstName: firstName,
        lastName: lastName,
        gender,
        age: 0,
        parentIds: [father.id, mother.id],
        relation: gender === 'male' ? 'Fils' : 'Fille',
        stats: {
          popularity: 1,
          oratory: 1,
          piety: 1,
          martialEducation: 1
        },
        health: 100,
        status: 'alive',
        traits: []
      };
      
      // Add the child to the family
      addNewCharacter(newChild);
      
      // Update the last birth year for the mother
      if (onCharacterUpdate) {
        onCharacterUpdate(mother.id, { 
          ...mother,
          lastChildBirthYear: year 
        });
      }
      
      setLastBirthYear(year);
      return true;
    }
    
    return false;
  }, [characters, year, addNewCharacter]);
  
  const onCharacterUpdate = (id: string, updates: Partial<Character>) => {
    // Implement if needed
    console.log("Character update would happen here", id, updates);
  };
  
  return {
    lastBirthYear,
    checkForBirths
  };
};
