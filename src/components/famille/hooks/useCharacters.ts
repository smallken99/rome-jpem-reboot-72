
import React from 'react';
import { Character } from '@/types/character';
import { characters as initialCharacters } from '@/data/characters';

export const useCharacters = () => {
  const [localCharacters, setLocalCharacters] = React.useState(initialCharacters);

  const handleChildBirth = (child: Character) => {
    setLocalCharacters(prev => [...prev, child]);
  };

  const handleNameChange = (characterId: string, newName: string) => {
    setLocalCharacters(prev => 
      prev.map(char => 
        char.id === characterId ? { ...char, name: newName } : char
      )
    );
  };

  return {
    localCharacters,
    handleChildBirth,
    handleNameChange
  };
};
