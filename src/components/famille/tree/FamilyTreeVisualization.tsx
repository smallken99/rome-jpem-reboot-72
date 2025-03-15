
import React from 'react';
import { Character } from '@/types/character';
import { FamilyMember } from './FamilyMember';

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
  if (!paterFamilias && !materFamilias) {
    return (
      <div className="p-6 text-center bg-amber-50 rounded-lg border border-amber-200">
        <p className="text-amber-800">
          Aucun chef de famille n'a été trouvé. Assurez-vous que vos personnages ont les rôles appropriés.
        </p>
      </div>
    );
  }

  const maleChildren = children.filter(child => child.gender === 'male');
  const femaleChildren = children.filter(child => child.gender === 'female');

  return (
    <div className="family-tree-visualization py-6">
      <div className="tree-container">
        {/* Ligne supérieure : Pater et Mater Familias */}
        <div className="flex justify-center gap-8 mb-12">
          {paterFamilias && (
            <FamilyMember 
              character={paterFamilias} 
              roleLabel="Pater Familias" 
              primary={true}
            />
          )}
          
          {materFamilias && (
            <FamilyMember 
              character={materFamilias} 
              roleLabel="Mater Familias" 
              primary={true}
            />
          )}
        </div>
        
        {/* Ligne de connexion */}
        {(paterFamilias || materFamilias) && children.length > 0 && (
          <div className="w-1 h-12 bg-amber-800/30 mx-auto -mt-6 mb-6"></div>
        )}
        
        {/* Ligne horizontale de connexion si plusieurs enfants */}
        {children.length > 1 && (
          <div className="w-1/2 h-1 bg-amber-800/30 mx-auto mb-6"></div>
        )}
        
        {/* Enfants */}
        {children.length > 0 && (
          <div className="flex flex-wrap justify-center gap-8">
            {maleChildren.map((child, index) => (
              <div key={child.id || index} className="child-container">
                <FamilyMember 
                  character={child} 
                  roleLabel={child.role || "Fils"} 
                />
              </div>
            ))}
            
            {femaleChildren.map((child, index) => (
              <div key={child.id || index} className="child-container">
                <FamilyMember 
                  character={child} 
                  roleLabel={child.role || "Fille"} 
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
