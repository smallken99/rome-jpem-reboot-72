
import React from 'react';
import { Character } from '@/types/character';
import { FamilyTreeIntro } from './tree/FamilyTreeIntro';
import { FamilyTreeVisualization } from './tree/FamilyTreeVisualization';
import { FamilyLegend } from './tree/FamilyLegend';
import { FamilyInfoSidebar } from './tree/FamilyInfoSidebar';
import { getFamilyMembers } from './tree/familyHelpers';

interface FamilyTreeProps {
  characters?: Character[];
}

export const FamilyTree: React.FC<FamilyTreeProps> = ({ characters = [] }) => {
  const { paterFamilias, materFamilias, children } = getFamilyMembers(characters);
  
  return (
    <div className="family-tree-container">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2">
          <FamilyTreeIntro />
          
          <FamilyTreeVisualization 
            paterFamilias={paterFamilias}
            materFamilias={materFamilias}
            children={children}
          />
          
          <FamilyLegend />
        </div>
        
        <div>
          <FamilyInfoSidebar characters={characters} />
        </div>
      </div>
    </div>
  );
};
