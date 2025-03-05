
import React from 'react';
import { EducationTabs } from './education/EducationTabs';
import { EducationHeader } from './education/components/EducationHeader';
import { EducationInfoBox } from './education/components/EducationInfoBox';
import { useEducationSystem } from './education/hooks/useEducationSystem';
import { Character } from '@/types/character';

interface EducationProps {
  characters?: Character[];
  onNameChange?: (characterId: string, newName: string) => void;
  onEducationChange?: (characterId: string, educationType: string, specialties: string[], mentor: string | null) => void;
}

export const Education: React.FC<EducationProps> = ({ 
  characters = [], 
  onNameChange,
  onEducationChange 
}) => {
  const {
    activeTab,
    setActiveTab,
    preceptors,
    generatePreceptors,
    children
  } = useEducationSystem(characters);

  return (
    <div className="education">
      <EducationHeader />
      <EducationInfoBox />
      
      <EducationTabs 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        preceptors={preceptors} 
        refreshPreceptors={generatePreceptors}
        onNameChange={onNameChange}
        characters={children}
      />
    </div>
  );
};
