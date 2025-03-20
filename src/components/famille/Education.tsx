
import React from 'react';
import { useLocation } from 'react-router-dom';
import { EducationTabs } from './education/EducationTabs';
import { EducationHeader } from './education/components/EducationHeader';
import { EducationInfoBox } from './education/components/EducationInfoBox';
import { EducationProvider } from './education/context/EducationContext';
import { Character } from '@/types/character';

interface EducationProps {
  characters?: Character[];
  onNameChange?: (characterId: string, newName: string) => void;
  onEducationChange?: (characterId: string, educationType: string, specialties: string[], mentor: string | null) => void;
  onCharacterUpdate?: (characterId: string, updatedCharacter: Partial<Character>) => void;
}

export const Education: React.FC<EducationProps> = ({ 
  characters = [], 
  onNameChange,
  onEducationChange,
  onCharacterUpdate
}) => {
  const location = useLocation();
  
  // Handle character updates through our provider
  const handleCharacterUpdate = (characterId: string, updates: Partial<Character>) => {
    // Update name if the name changed
    if (updates.name && onNameChange) {
      onNameChange(characterId, updates.name);
    }
    
    // Update education if education changed
    if (updates.education && onEducationChange) {
      onEducationChange(
        characterId, 
        updates.education.type || 'none', 
        updates.education.specialties || [], 
        updates.education.mentor
      );
    }
    
    // Use the general update if available
    if (onCharacterUpdate) {
      onCharacterUpdate(characterId, updates);
    }
  };

  return (
    <div className="education">
      <EducationProvider 
        characters={characters}
        onCharacterUpdate={handleCharacterUpdate}
      >
        <EducationHeader />
        <EducationInfoBox />
        
        <EducationTabs />
      </EducationProvider>
    </div>
  );
};
