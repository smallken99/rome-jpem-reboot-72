import React from 'react';
import { Character } from '@/types/character';
import { FamilyOverview } from '../FamilyOverview';
import { Education } from '../Education';
import { MarriageAlliances } from '../MarriageAlliances';
import { Inheritance } from '../Inheritance';
import { FamilyTree } from '../FamilyTree';
// Import other needed components

interface FamilySectionsProps {
  characters: Character[];
  onNameChange: (characterId: string, newName: string) => void;
  onCharacterUpdate: (characterId: string, updates: Partial<Character>) => void;
  activeSection: string;
}

export const FamilySections: React.FC<FamilySectionsProps> = ({
  characters,
  onNameChange,
  onCharacterUpdate,
  activeSection
}) => {
  const handleChildBirth = (parentIds?: string[]) => {
    // Child birth logic would go here
    // For now, just a placeholder that could be implemented later
    console.log("Child birth requested for parents:", parentIds);
  };

  // Render the appropriate section based on activeSection
  switch (activeSection) {
    case 'overview':
      return <FamilyOverview characters={characters} />;
    
    case 'education':
      return <Education />;
    
    case 'marriage':
      return <MarriageAlliances characters={characters} onChildBirth={handleChildBirth} />;
    
    case 'inheritance':
      return <Inheritance />;
    
    case 'tree':
      return <FamilyTree characters={characters} />;
    
    default:
      return <FamilyOverview characters={characters} />;
  }
};
