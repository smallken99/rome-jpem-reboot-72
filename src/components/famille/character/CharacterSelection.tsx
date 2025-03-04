
import React from 'react';
import { StatBox } from '@/components/ui-custom/StatBox';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Users, Heart, ScrollText, User } from 'lucide-react';
import { CharacterSheet } from '@/components/famille/CharacterSheet';
import { FamilyTree } from '@/components/famille/FamilyTree';
import { Character } from '@/types/character';

interface CharacterSelectionProps {
  localCharacters: Character[];
  activeCharacter: Character;
  onEditPortrait: (characterId: string) => void;
}

export const CharacterSelection: React.FC<CharacterSelectionProps> = ({ 
  localCharacters, 
  activeCharacter, 
  onEditPortrait 
}) => {
  // Count active alliances from MarriageAlliances.tsx
  const alliancesCount = 2;
  
  // Count heirs (male children under 18)
  const heirs = localCharacters.filter(char => 
    char.gender === 'male' && char.age < 18
  ).length;
  
  // Count all family members including characters and extended family in alliances
  // 4 additional members: Cornelia Minor, Quintus Fabius, Claudia Major, Decimus Junius
  const extendedFamilyCount = 4;
  const familyMembersCount = localCharacters.length + extendedFamilyCount;
  
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <StatBox 
          title="Membres de la famille" 
          value={familyMembersCount.toString()} 
          description="Membres directs et affiliés"
          icon={<Users className="h-6 w-6" />} 
        />
        <StatBox 
          title="Alliances matrimoniales" 
          value={alliancesCount.toString()} 
          description="En augmentation ce semestre"
          icon={<Heart className="h-6 w-6" />} 
          trend="up"
          trendValue="+1"
        />
        <StatBox 
          title="Héritiers" 
          value={heirs.toString()} 
          description="Lignée directe masculine"
          icon={<ScrollText className="h-6 w-6" />} 
        />
      </div>

      <div className="mb-8">
        <Tabs defaultValue="characters" className="w-full">
          <TabsList className="mb-4 bg-white border border-rome-gold/30">
            <TabsTrigger value="characters" className="data-[state=active]:bg-rome-gold/10">
              <User className="h-4 w-4 mr-2" /> Personnages
            </TabsTrigger>
            <TabsTrigger value="family-tree" className="data-[state=active]:bg-rome-gold/10">
              <Users className="h-4 w-4 mr-2" /> Arbre Généalogique
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="characters" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {localCharacters.map((character) => (
                <CharacterSheet 
                  key={character.id}
                  character={character} 
                  className={activeCharacter.id === character.id ? 'border-rome-gold' : ''}
                  onEditPortrait={onEditPortrait}
                />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="family-tree">
            <FamilyTree />
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};
