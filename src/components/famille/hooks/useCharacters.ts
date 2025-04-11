
import { useState, useEffect, useCallback } from 'react';
import { Character, CharacterStat } from '@/types/character';
import { characters as initialCharacters } from '@/data/characters';
import { v4 as uuidv4 } from 'uuid';

// Type partiel pour créer un nouveau personnage
interface NewCharacterData {
  name: string;
  gender: 'male' | 'female';
  age?: number;
  traits?: string[];
  stats?: Partial<Record<string, CharacterStat>>;
  // Propriétés optionnelles
  biography?: string;
  birthYear?: number;
  deathYear?: number | null;
  relationshipStatus?: string;
  [key: string]: any;
}

export const useCharacters = () => {
  const [localCharacters, setLocalCharacters] = useState<Character[]>([]);
  
  // Charger les personnages au premier rendu
  useEffect(() => {
    // Vérifier le stockage local
    const savedCharacters = localStorage.getItem('characters');
    if (savedCharacters) {
      try {
        setLocalCharacters(JSON.parse(savedCharacters));
      } catch (e) {
        console.error('Failed to parse saved characters:', e);
        setLocalCharacters(initialCharacters);
      }
    } else {
      setLocalCharacters(initialCharacters);
    }
  }, []);
  
  // Sauvegarder les personnages quand ils changent
  useEffect(() => {
    if (localCharacters.length > 0) {
      localStorage.setItem('characters', JSON.stringify(localCharacters));
    }
  }, [localCharacters]);
  
  // Ajouter un nouveau personnage
  const addCharacter = useCallback((data: NewCharacterData) => {
    const defaultStats = {
      popularity: 1,
      oratory: 1,
      piety: 1,
      martialEducation: 1
    };
    
    const newCharacter: Character = {
      id: uuidv4(),
      name: data.name,
      gender: data.gender,
      age: data.age || 25,
      traits: data.traits || [],
      stats: data.stats || defaultStats,
      alive: true,
      biography: data.biography || '',
      birthYear: data.birthYear || 0,
      deathYear: data.deathYear || null,
      relationshipStatus: data.relationshipStatus || 'single',
      familyId: data.familyId || null,
      relationships: data.relationships || [],
      ...data
    };
    
    setLocalCharacters(prev => [...prev, newCharacter]);
    return newCharacter;
  }, []);
  
  // Mettre à jour un personnage existant
  const updateCharacter = useCallback((updatedCharacter: Character) => {
    setLocalCharacters(prev => 
      prev.map(char => 
        char.id === updatedCharacter.id ? updatedCharacter : char
      )
    );
    return updatedCharacter;
  }, []);
  
  // Supprimer un personnage
  const removeCharacter = useCallback((characterId: string) => {
    setLocalCharacters(prev => prev.filter(char => char.id !== characterId));
    return characterId;
  }, []);
  
  // Obtenir un personnage par ID
  const getCharacterById = useCallback((characterId: string) => {
    return localCharacters.find(char => char.id === characterId);
  }, [localCharacters]);
  
  // Obtenir les personnages par relation
  const getCharactersByRelation = useCallback((type: string, targetId?: string) => {
    return localCharacters.filter(character => 
      character.relationships?.some(rel => 
        rel.type === type && (!targetId || rel.targetId === targetId)
      )
    );
  }, [localCharacters]);
  
  // Fonction pour gérer le décès d'un personnage
  const markCharacterAsDeceased = useCallback((characterId: string, deathYear?: number) => {
    setLocalCharacters(prev => 
      prev.map(char => {
        if (char.id === characterId) {
          return {
            ...char,
            alive: false,
            deathYear: deathYear || 0
          };
        }
        return char;
      })
    );
  }, []);
  
  return {
    localCharacters,
    addCharacter,
    updateCharacter,
    removeCharacter,
    getCharacterById,
    getCharactersByRelation,
    markCharacterAsDeceased
  };
};
