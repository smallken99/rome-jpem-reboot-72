
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Character } from '@/types/character';
import { TreeNode } from './TreeNode';
import { getFamilyMembers, sortChildrenByAge } from './familyHelpers';

interface FamilyTreeComponentProps {
  characters: Character[];
}

export const FamilyTreeComponent: React.FC<FamilyTreeComponentProps> = ({ characters }) => {
  const { paterFamilias, materFamilias, children } = getFamilyMembers(characters);
  const sortedChildren = sortChildrenByAge(children);
  
  if (!paterFamilias && characters.length === 0) {
    return (
      <Card className="w-full">
        <CardContent className="p-6 text-center">
          <p className="text-muted-foreground">Aucun membre de famille trouvé</p>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <div className="family-tree-container w-full overflow-auto">
      <div className="min-w-[800px] p-4">
        <div className="flex flex-col items-center">
          <div className="flex justify-center gap-4 mb-8">
            {paterFamilias && (
              <TreeNode 
                character={paterFamilias}
                nodeType="patriarch"
              />
            )}
            {materFamilias && (
              <TreeNode 
                character={materFamilias}
                nodeType="matriarch"
              />
            )}
          </div>
          
          {sortedChildren.length > 0 && (
            <>
              <div className="w-0.5 h-8 bg-gray-300"></div>
              <div className="w-1/2 h-0.5 bg-gray-300"></div>
              <div className="flex justify-around w-full mt-8 flex-wrap gap-8">
                {sortedChildren.map(child => (
                  <TreeNode 
                    key={child.id}
                    character={child}
                    nodeType={child.gender === 'male' ? 'son' : 'daughter'}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
