
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CharacterSheet } from './CharacterSheet';
import { FamilyStats } from './FamilyStats';
import { Character } from '@/types/character';

interface FamilyOverviewProps {
  characters: Character[];
  onCharacterSelect?: (character: Character) => void;
}

export const FamilyOverview: React.FC<FamilyOverviewProps> = ({ 
  characters,
  onCharacterSelect
}) => {
  // Trouve le chef de famille (pater familias)
  const paterFamilias = characters.find(c => c.isHeadOfFamily) || characters[0];
  
  // Trouve la mère de famille (matrona)
  const matrona = characters.find(c => c.gender === 'female' && c.relation?.includes('Épouse'));
  
  // Trouve les enfants
  const children = characters.filter(c => 
    c.relation?.includes('Fils') || 
    c.relation?.includes('Fille')
  );
  
  return (
    <div className="family-overview space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="font-cinzel">Vue d'ensemble de la Famille</CardTitle>
          <CardDescription>
            Consultez l'état actuel de votre famille et de ses membres
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <FamilyStats 
              membersCount={characters.length}
              adultsCount={characters.filter(c => c.age >= 16).length}
              childrenCount={characters.filter(c => c.age < 16).length}
            />
            
            <div className="space-y-4">
              <h3 className="font-medium text-lg">Chef de Famille</h3>
              {paterFamilias && (
                <CharacterSheet character={paterFamilias} />
              )}
            </div>
            
            {matrona && (
              <div className="space-y-4">
                <h3 className="font-medium text-lg">Matrona</h3>
                <CharacterSheet character={matrona} />
              </div>
            )}
            
            {children.length > 0 && (
              <div className="space-y-4">
                <h3 className="font-medium text-lg">Enfants</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {children.map(child => (
                    <CharacterSheet 
                      key={child.id} 
                      character={child}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
