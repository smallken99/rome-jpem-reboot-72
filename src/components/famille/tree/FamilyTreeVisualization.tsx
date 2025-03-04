
import React from 'react';
import { FamilyMember } from './FamilyMember';
import { Character } from '@/types/character';
import { Heart, GitBranch } from 'lucide-react';

interface FamilyTreeVisualizationProps {
  paterFamilias?: Character;
  materFamilias?: Character;
  children: Character[];
}

export const FamilyTreeVisualization: React.FC<FamilyTreeVisualizationProps> = ({ 
  paterFamilias, 
  materFamilias, 
  children 
}) => {
  return (
    <div className="family-tree-visualization relative mt-8">
      <div className="flex flex-col items-center">
        {/* First generation - Pater and Mater */}
        <div className="flex justify-center gap-4 mb-12 relative">
          {paterFamilias && <FamilyMember member={paterFamilias} role="Pater Familias" />}
          
          {/* Marriage connector */}
          {paterFamilias && materFamilias && (
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 text-xs text-muted-foreground">
              <div className="w-24 h-px bg-rome-gold/50"></div>
              <Heart className="h-4 w-4 text-rome-gold/70" />
              <div className="w-24 h-px bg-rome-gold/50"></div>
            </div>
          )}
          
          {materFamilias && <FamilyMember member={materFamilias} role="Mater Familias" />}
        </div>
        
        {/* Vertical line to children */}
        {(paterFamilias || materFamilias) && children.length > 0 && (
          <div className="flex flex-col items-center mb-4">
            <div className="w-px h-6 bg-rome-gold/50"></div>
            <GitBranch className="h-5 w-5 text-rome-gold/70 rotate-180 mb-2" />
          </div>
        )}
        
        {/* Second generation - Children */}
        {children.length > 0 && (
          <div className="flex flex-wrap justify-center gap-4">
            {children.map((child) => (
              <FamilyMember 
                key={child.id} 
                member={child} 
                role={child.gender === 'male' ? 'Filius' : 'Filia'} 
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
