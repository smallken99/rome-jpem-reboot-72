
import { useState, useEffect, useCallback } from 'react';
import { Character } from '@/types/character';
import { CharacterStat } from '@/types/character';
import { characters as initialCharacters } from '@/data/characters';
import { generateUniqueId } from '@/utils/idGenerator';

export type NewCharacterData = Omit<Character, "id"> & {
  name: string; // Make name required
  stats: {
    popularity: number | CharacterStat;
    oratory: number | CharacterStat;
    piety: number | CharacterStat;
    martialEducation: number | CharacterStat;
  };
};

export const useCharacters = () => {
  const [localCharacters, setLocalCharacters] = useState<Character[]>(() => {
    const savedCharacters = localStorage.getItem('familyCharacters');
    return savedCharacters ? JSON.parse(savedCharacters) : initialCharacters;
  });

  // Persist characters to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('familyCharacters', JSON.stringify(localCharacters));
  }, [localCharacters]);

  // Add a new character
  const addCharacter = useCallback((characterData: NewCharacterData): Character => {
    const newCharacter: Character = {
      id: generateUniqueId(),
      ...characterData,
      // Ensure the base stats are properly initialized
      stats: {
        popularity: characterData.stats?.popularity || 0,
        oratory: characterData.stats?.oratory || 0,
        piety: characterData.stats?.piety || 0,
        martialEducation: characterData.stats?.martialEducation || 0
      }
    };
    
    setLocalCharacters(prev => [...prev, newCharacter]);
    return newCharacter;
  }, []);

  // Update an existing character
  const updateCharacter = useCallback((updatedCharacter: Character): Character => {
    setLocalCharacters(prev => 
      prev.map(char => char.id === updatedCharacter.id ? updatedCharacter : char)
    );
    return updatedCharacter;
  }, []);

  // Remove a character by ID
  const removeCharacter = useCallback((characterId: string): string => {
    setLocalCharacters(prev => prev.filter(char => char.id !== characterId));
    return characterId;
  }, []);

  // Get character by ID
  const getCharacterById = useCallback((characterId: string): Character => {
    const character = localCharacters.find(char => char.id === characterId);
    if (!character) {
      throw new Error(`Character with ID ${characterId} not found`);
    }
    return character;
  }, [localCharacters]);

  // Get characters by relation type
  const getCharactersByRelation = useCallback((type: string, targetId?: string): Character[] => {
    return localCharacters.filter(char => {
      if (!targetId) return char.relation?.includes(type);
      // Additional filtering by target when implemented
      return char.relation?.includes(type);
    });
  }, [localCharacters]);

  // Import characters from external source
  const importCharacters = useCallback((characters: Character[]): void => {
    setLocalCharacters(characters);
  }, []);

  return {
    localCharacters,
    addCharacter,
    updateCharacter,
    removeCharacter,
    getCharacterById,
    getCharactersByRelation,
    importCharacters
  };
};
