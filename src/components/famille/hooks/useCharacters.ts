
import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Character } from '@/types/character';
import { toast } from 'sonner';

const STORAGE_KEY = 'character-store';

export const useCharacters = () => {
  const [localCharacters, setLocalCharacters] = useState<Character[]>([]);
  
  // Load characters from local storage on component mount
  useEffect(() => {
    const storedCharacters = localStorage.getItem(STORAGE_KEY);
    
    if (storedCharacters) {
      try {
        setLocalCharacters(JSON.parse(storedCharacters));
      } catch (e) {
        console.error('Error parsing stored characters:', e);
        setLocalCharacters([]);
      }
    }
  }, []);

  // Save characters to local storage whenever they change
  useEffect(() => {
    if (localCharacters.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(localCharacters));
    }
  }, [localCharacters]);

  // Add a new character
  const addCharacter = (characterData: Partial<Character>): Character => {
    const newCharacter: Character = {
      id: uuidv4(),
      name: characterData.name || 'Sans Nom',
      firstName: characterData.firstName,
      lastName: characterData.lastName,
      gender: characterData.gender || 'male',
      age: characterData.age || 30,
      role: characterData.role || 'member',
      status: characterData.status || 'alive',
      biography: characterData.biography || '',
      birthYear: characterData.birthYear || -80,
      deathYear: characterData.deathYear,
      relationshipStatus: characterData.relationshipStatus || 'single',
      parentId: characterData.parentId,
      spouseId: characterData.spouseId,
      education: characterData.education || {
        completed: false,
        specialties: []
      },
      stats: characterData.stats || {
        oratory: 5,
        martial: 5,
        politics: 5,
        popularity: 5,
        loyalty: 5,
        intellect: 5,
        piety: 5,
        charm: 5,
      },
      traits: characterData.traits || [],
      portrait: characterData.portrait,
      titles: characterData.titles || [],
      educationType: characterData.educationType || 'none',
      currentEducation: characterData.currentEducation,
    };

    setLocalCharacters((prev) => [...prev, newCharacter]);
    toast.success(`${newCharacter.name} a été ajouté à votre famille.`);
    return newCharacter;
  };

  // Update an existing character
  const updateCharacter = (characterId: string, updates: Partial<Character>) => {
    setLocalCharacters((prev) =>
      prev.map((character) =>
        character.id === characterId ? { ...character, ...updates } : character
      )
    );
    toast.success(`Les informations ont été mises à jour.`);
  };

  // Remove a character
  const removeCharacter = (characterId: string) => {
    const characterToRemove = localCharacters.find(c => c.id === characterId);
    if (!characterToRemove) {
      toast.error("Personnage non trouvé.");
      return;
    }
    
    setLocalCharacters((prev) => prev.filter((character) => character.id !== characterId));
    toast.success(`${characterToRemove.name} a été retiré de votre famille.`);
  };
  
  // Handle child birth between parents
  const handleChildBirth = (parentIds?: string[]): Character => {
    let father: Character | undefined;
    let mother: Character | undefined;
    
    if (parentIds && parentIds.length === 2) {
      father = localCharacters.find(c => c.id === parentIds[0] && c.gender === 'male');
      mother = localCharacters.find(c => c.id === parentIds[1] && c.gender === 'female');
      
      if (!father || !mother) {
        father = localCharacters.find(c => c.id === parentIds[1] && c.gender === 'male');
        mother = localCharacters.find(c => c.id === parentIds[0] && c.gender === 'female');
      }
    }
    
    // If parents aren't found, use default values
    const lastName = father ? father.lastName || father.name.split(' ').pop() : "Romanus";
    const gender = Math.random() > 0.5 ? 'male' : 'female';
    const firstName = gender === 'male' ? "Gaius" : "Julia";
    
    const newChild = addCharacter({
      name: `${firstName} ${lastName}`,
      firstName,
      lastName,
      gender,
      age: 0,
      birthYear: -30, // Current year in the game setting
      role: 'child',
      parentId: father?.id,
      stats: {
        oratory: 2,
        martial: 2,
        politics: 2,
        popularity: 2,
        loyalty: 5,
        intellect: 3,
        piety: 3,
        charm: 4,
      }
    });
    
    toast.success(`Un${gender === 'female' ? 'e' : ''} ${gender === 'female' ? 'fille' : 'garçon'} est né${gender === 'female' ? 'e' : ''} !`);
    return newChild;
  };

  return {
    localCharacters,
    addCharacter,
    updateCharacter,
    removeCharacter,
    handleChildBirth
  };
};
