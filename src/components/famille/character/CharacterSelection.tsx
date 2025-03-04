import React from 'react';
import { Character } from '@/types/character';
import { CharacterSheet } from '@/components/famille/CharacterSheet';

interface CharacterSelectionProps {
  localCharacters?: Character[];
  activeCharacter?: Character;
  onEditPortrait?: (characterId: string) => void;
  onNameChange?: (characterId: string, newName: string) => void;
}

export const CharacterSelection: React.FC<CharacterSelectionProps> = ({
  localCharacters = [],
  activeCharacter,
  onEditPortrait,
  onNameChange,
}) => {
  return (
    <div className="mb-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {localCharacters.slice(0, 4).map((character) => (
          <CharacterSheet
            key={character.id}
            character={character}
            onEditPortrait={onEditPortrait}
            onNameChange={onNameChange}
          />
        ))}
      </div>
    </div>
  );
};
