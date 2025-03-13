
import React from 'react';
import { RomanCard } from '@/components/ui-custom/RomanCard';
import { MarriageAlliances } from '@/components/famille/MarriageAlliances';
import { Inheritance } from '@/components/famille/Inheritance';
import { Education } from '@/components/famille/Education';
import { FamilyTree } from '@/components/famille/FamilyTree';
import { Character } from '@/types/character';

interface FamilySectionsProps {
  characters?: Character[];
  onChildBirth?: (child: Character) => void;
  onNameChange?: (characterId: string, newName: string) => void;
}

export const FamilySections: React.FC<FamilySectionsProps> = ({ 
  characters = [], 
  onChildBirth,
  onNameChange
}) => {
  return (
    <>
      <RomanCard className="mb-6">
        <RomanCard.Header>
          <h3 className="font-cinzel text-lg text-rome-navy">Arbre Généalogique</h3>
        </RomanCard.Header>
        <RomanCard.Content>
          <FamilyTree characters={characters} />
        </RomanCard.Content>
      </RomanCard>
    
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <RomanCard className="h-full">
          <RomanCard.Header>
            <h3 className="font-cinzel text-lg text-rome-navy">Mariages et Alliances</h3>
          </RomanCard.Header>
          <RomanCard.Content>
            <MarriageAlliances 
              characters={characters}
              onChildBirth={onChildBirth}
            />
          </RomanCard.Content>
        </RomanCard>
        
        <RomanCard className="h-full">
          <RomanCard.Header>
            <h3 className="font-cinzel text-lg text-rome-navy">Héritage Familial</h3>
          </RomanCard.Header>
          <RomanCard.Content>
            <Inheritance />
          </RomanCard.Content>
        </RomanCard>
      </div>

      <RomanCard className="mb-6">
        <RomanCard.Header>
          <h3 className="font-cinzel text-lg text-rome-navy">Éducation des Enfants</h3>
        </RomanCard.Header>
        <RomanCard.Content>
          <Education 
            characters={characters}
            onNameChange={onNameChange}
          />
        </RomanCard.Content>
      </RomanCard>
    </>
  );
};
