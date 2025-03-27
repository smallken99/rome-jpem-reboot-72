import { useState, useEffect, useCallback } from 'react';
import { Character } from '@/types/character';
import { generateRomanName } from '../utils/naming/romanNameGenerator';
import { toast } from '@/components/ui-custom/toast';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { v4 as uuidv4 } from 'uuid';

const initialCharacters: Character[] = [
  {
    id: '1',
    name: 'Gaius Claudius',
    age: 45,
    gender: 'male',
    relation: 'Pater Familias',
    isHeadOfFamily: true,
    traits: ['Eloquent', 'Ambitieux'],
    health: 85,
    status: 'alive',
    stats: {
      popularity: { value: 60, name: 'Popularité', maxValue: 100, icon: 'popularity', description: 'Votre réputation parmi le peuple', color: 'gold' },
      oratory: { value: 70, name: 'Éloquence', maxValue: 100, icon: 'oratory', description: 'Votre capacité à persuader', color: 'terracotta' },
      piety: { value: 65, name: 'Piété', maxValue: 100, icon: 'piety', description: 'Votre dévotion aux dieux', color: 'navy' },
      martialEducation: { value: 55, name: 'Éducation Martiale', maxValue: 100, icon: 'martialEducation', description: 'Votre formation militaire', color: 'red' }
    }
  },
  {
    id: '2',
    name: 'Claudia',
    age: 38,
    gender: 'female',
    relation: 'Épouse',
    traits: ['Fidèle', 'Cultivée'],
    health: 90,
    status: 'alive',
    stats: {
      popularity: { value: 50, name: 'Popularité', maxValue: 100, icon: 'popularity', description: 'Votre réputation parmi le peuple', color: 'gold' },
      oratory: { value: 60, name: 'Éloquence', maxValue: 100, icon: 'oratory', description: 'Votre capacité à persuader', color: 'terracotta' },
      piety: { value: 75, name: 'Piété', maxValue: 100, icon: 'piety', description: 'Votre dévotion aux dieux', color: 'navy' },
      martialEducation: { value: 0, name: 'Éducation Martiale', maxValue: 100, icon: 'martialEducation', description: 'Votre formation militaire', color: 'red' }
    }
  },
  {
    id: '3',
    name: 'Marcus Claudius',
    age: 18,
    gender: 'male',
    relation: 'Fils',
    traits: ['Vif', 'Impétueux'],
    health: 95,
    parentIds: ['1', '2'],
    status: 'alive',
    stats: {
      popularity: { value: 40, name: 'Popularité', maxValue: 100, icon: 'popularity', description: 'Votre réputation parmi le peuple', color: 'gold' },
      oratory: { value: 45, name: 'Éloquence', maxValue: 100, icon: 'oratory', description: 'Votre capacité à persuader', color: 'terracotta' },
      piety: { value: 50, name: 'Piété', maxValue: 100, icon: 'piety', description: 'Votre dévotion aux dieux', color: 'navy' },
      martialEducation: { value: 60, name: 'Éducation Martiale', maxValue: 100, icon: 'martialEducation', description: 'Votre formation militaire', color: 'red' }
    }
  },
  {
    id: '4',
    name: 'Julia Claudia',
    age: 15,
    gender: 'female',
    relation: 'Fille',
    traits: ['Intelligente', 'Pieuse'],
    health: 92,
    parentIds: ['1', '2'],
    status: 'alive',
    stats: {
      popularity: { value: 45, name: 'Popularité', maxValue: 100, icon: 'popularity', description: 'Votre réputation parmi le peuple', color: 'gold' },
      oratory: { value: 55, name: 'Éloquence', maxValue: 100, icon: 'oratory', description: 'Votre capacité à persuader', color: 'terracotta' },
      piety: { value: 70, name: 'Piété', maxValue: 100, icon: 'piety', description: 'Votre dévotion aux dieux', color: 'navy' }
    }
  }
];

export const useCharacters = () => {
  const [localCharacters, setLocalCharacters] = useLocalStorage<Character[]>(
    'roman-family-characters', 
    initialCharacters
  );
  
  const handleChildBirth = useCallback((parentIds?: string[]) => {
    const gender = Math.random() > 0.5 ? 'male' : 'female';
    const familyName = parentIds ? 
      localCharacters.find(c => c.id === parentIds[0])?.name.split(' ')[1] || 'Ignotus' : 
      'Ignotus';
      
    const newChild: Character = {
      id: uuidv4(),
      name: generateRomanName(gender, familyName),
      age: 0,
      gender,
      relation: gender === 'male' ? 'Fils' : 'Fille',
      traits: [],
      health: 85 + Math.floor(Math.random() * 15),
      parentIds,
      status: 'alive',
      stats: {
        popularity: { value: 20, name: 'Popularité', maxValue: 100, icon: 'popularity', description: 'Influence naissante', color: 'gold' },
        oratory: { value: 15, name: 'Éloquence', maxValue: 100, icon: 'oratory', description: 'Aptitude naturelle', color: 'terracotta' },
        piety: { value: 25, name: 'Piété', maxValue: 100, icon: 'piety', description: 'Dévotion naturelle', color: 'navy' },
        martialEducation: { value: 0, name: 'Éducation Martiale', maxValue: 100, icon: 'martialEducation', description: 'Formation initiale', color: 'red' }
      }
    };
    
    setLocalCharacters(prev => [...prev, newChild]);
    toast.success(`Un nouvel enfant est né ! ${newChild.name} rejoint votre famille.`);
    
    return newChild;
  }, [localCharacters, setLocalCharacters]);
  
  const handleNameChange = useCallback((characterId: string, newName: string) => {
    setLocalCharacters(prev => 
      prev.map(char => 
        char.id === characterId ? { ...char, name: newName } : char
      )
    );
    toast.success(`Le nom a été modifié avec succès.`);
  }, [setLocalCharacters]);
  
  const updateCharacter = useCallback((characterId: string, updates: Partial<Character>) => {
    setLocalCharacters(prev => 
      prev.map(char => 
        char.id === characterId ? { ...char, ...updates } : char
      )
    );
  }, [setLocalCharacters]);
  
  const addCharacter = useCallback((character: Omit<Character, 'id'>) => {
    const newCharacter: Character = {
      ...character,
      id: uuidv4()
    };
    
    setLocalCharacters(prev => [...prev, newCharacter]);
    return newCharacter.id;
  }, [setLocalCharacters]);
  
  return {
    localCharacters,
    handleChildBirth,
    handleNameChange,
    updateCharacter,
    addCharacter
  };
};
