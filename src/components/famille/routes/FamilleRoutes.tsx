
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import FamilleMain from '../pages/FamilleMain';
import { FamilyTree } from '../FamilyTree';
import { MarriageAlliances } from '../MarriageAlliances';
import { Education } from '../Education';
import { Inheritance } from '../Inheritance';
import { useCharacters } from '../hooks/useCharacters';
import { FamilyEducation } from '../education/FamilyEducation';
import { ChildEducationDetail } from '../education/ChildEducationDetail';
import { InheritancePlanning } from '../inheritance/InheritancePlanning';

export const FamilleRoutes: React.FC = () => {
  const { localCharacters, handleChildBirth, handleNameChange, updateCharacter } = useCharacters();
  
  return (
    <Routes>
      <Route path="/" element={<FamilleMain />} />
      <Route path="/tree" element={<FamilyTree characters={localCharacters} />} />
      <Route 
        path="/alliances" 
        element={<MarriageAlliances characters={localCharacters} onChildBirth={handleChildBirth} />} 
      />
      <Route 
        path="/education" 
        element={
          <FamilyEducation />
        }
      />
      <Route 
        path="/education/child/:childId" 
        element={<ChildEducationDetail />} 
      />
      <Route 
        path="/inheritance" 
        element={<InheritancePlanning />} 
      />
      <Route 
        path="*" 
        element={<FamilleMain />} 
      />
    </Routes>
  );
};
