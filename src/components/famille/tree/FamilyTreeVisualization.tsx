
import React from 'react';
import { Character } from '@/types/character';
import { Card } from '@/components/ui/card';

interface FamilyTreeVisualizationProps {
  paterFamilias: Character | null;
  materFamilias: Character | null;
  children: Character[];
}

export const FamilyTreeVisualization: React.FC<FamilyTreeVisualizationProps> = ({
  paterFamilias,
  materFamilias,
  children
}) => {
  if (!paterFamilias && !materFamilias) {
    return (
      <div className="text-center p-8 bg-gray-50 border rounded-lg">
        <p className="text-gray-500 italic">Aucun membre de famille disponible pour afficher l'arbre généalogique</p>
      </div>
    );
  }
  
  return (
    <div className="family-tree border rounded-lg p-6 bg-stone-50">
      <div className="grid grid-flow-row auto-rows-max gap-4">
        {/* Premier niveau - Parents */}
        <div className="flex justify-center gap-8 mb-8">
          {paterFamilias && (
            <FamilyMemberCard
              character={paterFamilias}
              isPrimary={true}
            />
          )}
          
          {materFamilias && (
            <FamilyMemberCard
              character={materFamilias}
              isPrimary={true}
            />
          )}
        </div>
        
        {/* Ligne de connexion */}
        {paterFamilias && materFamilias && (
          <div className="flex justify-center mb-4">
            <div className="w-20 h-8 border-l border-r border-b"></div>
          </div>
        )}
        
        {/* Deuxième niveau - Enfants */}
        <div className="flex flex-wrap justify-center gap-6">
          {children.length > 0 ? (
            children.map(child => (
              <FamilyMemberCard
                key={child.id}
                character={child}
                isPrimary={false}
              />
            ))
          ) : (
            <div className="text-center p-4 bg-white border rounded-lg w-full">
              <p className="text-gray-500 italic">Aucun enfant</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

interface FamilyMemberCardProps {
  character: Character;
  isPrimary?: boolean;
}

const FamilyMemberCard: React.FC<FamilyMemberCardProps> = ({ character, isPrimary = false }) => {
  const getStatusColor = () => {
    if (character.status === 'deceased') return 'bg-gray-200 border-gray-400 text-gray-600';
    if (character.isHeadOfFamily) return 'bg-amber-50 border-amber-300';
    if (character.gender === 'male') return 'bg-blue-50 border-blue-200';
    return 'bg-pink-50 border-pink-200';
  };
  
  return (
    <Card className={`p-3 ${getStatusColor()} ${isPrimary ? 'w-48' : 'w-40'}`}>
      <div className="text-center">
        <h4 className="font-semibold mb-1 truncate">{character.name}</h4>
        <p className="text-sm text-gray-600 mb-2">{character.relation}</p>
        <div className="text-xs flex justify-between px-1">
          <span>{character.age} ans</span>
          <span>{character.gender === 'male' ? '♂️' : '♀️'}</span>
        </div>
      </div>
    </Card>
  );
};
