
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Character } from '@/types/character';
import { sortChildrenByAge } from './familyHelpers';
import { toast } from '@/components/ui-custom/toast';

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
  // Trier les enfants par âge, avec les garçons d'abord, puis les filles
  const sortedChildren = sortChildrenByAge(children);
  const sons = sortedChildren.filter(child => child.gender === 'male');
  const daughters = sortedChildren.filter(child => child.gender === 'female');
  
  // Fonction pour générer le style d'un nœud de l'arbre
  const getNodeStyle = (character: Character) => {
    // Base style
    const baseStyle = "border p-4 rounded-md flex flex-col items-center justify-center text-center min-w-[150px]";
    
    // Status colors
    if (character.status === 'deceased') {
      return `${baseStyle} bg-gray-200 border-gray-400 text-gray-700`;
    }
    
    // Gender and role colors
    if (character.gender === 'male') {
      if (character.isHeadOfFamily) {
        return `${baseStyle} bg-amber-50 border-amber-300 text-amber-900`;
      }
      return `${baseStyle} bg-blue-50 border-blue-200 text-blue-900`;
    } else {
      return `${baseStyle} bg-pink-50 border-pink-200 text-pink-900`;
    }
  };
  
  // Handle view character details
  const handleViewCharacter = (character: Character) => {
    toast.info(`Détails de ${character.name} - Fonctionnalité à venir`);
  };
  
  return (
    <div className="mt-6 mb-12">
      <Card>
        <CardContent className="p-6 overflow-auto">
          <div className="min-w-[800px]">
            {/* Arbre généalogique */}
            <div className="flex flex-col items-center">
              {/* Pater Familias */}
              {paterFamilias ? (
                <div className={getNodeStyle(paterFamilias)}>
                  <h3 className="font-medium">{paterFamilias.name}</h3>
                  <p className="text-sm">{paterFamilias.age} ans</p>
                  <p className="text-xs opacity-75">{paterFamilias.relation}</p>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="mt-2"
                    onClick={() => handleViewCharacter(paterFamilias)}
                  >
                    Détails
                  </Button>
                </div>
              ) : (
                <div className="border p-4 rounded-md border-dashed border-gray-300 text-gray-500 min-w-[150px] text-center">
                  Pas de chef de famille
                </div>
              )}
              
              {/* Ligne de connexion */}
              {(paterFamilias && materFamilias) && (
                <div className="h-10 w-px bg-gray-300 my-2"></div>
              )}
              
              {/* Mater Familias */}
              {materFamilias && (
                <div className={getNodeStyle(materFamilias)}>
                  <h3 className="font-medium">{materFamilias.name}</h3>
                  <p className="text-sm">{materFamilias.age} ans</p>
                  <p className="text-xs opacity-75">{materFamilias.relation}</p>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="mt-2"
                    onClick={() => handleViewCharacter(materFamilias)}
                  >
                    Détails
                  </Button>
                </div>
              )}
              
              {/* Ligne de connexion aux enfants */}
              {(paterFamilias || materFamilias) && children.length > 0 && (
                <div className="h-10 w-px bg-gray-300 my-2"></div>
              )}
              
              {/* Enfants */}
              {children.length > 0 ? (
                <div className="flex flex-col items-center">
                  <div className="w-full h-px bg-gray-300 my-2"></div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {sortedChildren.map(child => (
                      <div key={child.id} className={getNodeStyle(child)}>
                        <h3 className="font-medium">{child.name}</h3>
                        <p className="text-sm">{child.age} ans</p>
                        <p className="text-xs opacity-75">{child.relation}</p>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="mt-2"
                          onClick={() => handleViewCharacter(child)}
                        >
                          Détails
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-center text-gray-500 mt-4">
                  <p>Pas d'enfants dans la famille</p>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
