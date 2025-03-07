
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
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
  const location = useLocation();
  const {
    activeTab,
    setActiveTab,
    preceptors,
    generatePreceptors,
    children
  } = useEducationSystem(characters);

  // Handle tab changes from route state
  useEffect(() => {
    if (location.state && location.state.tab) {
      setActiveTab(location.state.tab);
    }
  }, [location.state, setActiveTab]);

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
