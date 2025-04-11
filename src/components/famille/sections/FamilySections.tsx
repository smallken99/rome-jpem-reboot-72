
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FamilyTree } from '../FamilyTree';
import { FamilyMembers } from '../FamilyMembers';
import { Character } from '@/types/character';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Users, Tree, Shield } from 'lucide-react';
import { CharacterCreationButton } from '../character/CharacterCreationButton';
import { FamilyTraits } from '../FamilyTraits';

interface FamilySectionsProps {
  characters: Character[];
  showAddButton?: boolean;
  onAddCharacter?: () => void;
}

export const FamilySections: React.FC<FamilySectionsProps> = ({ 
  characters, 
  showAddButton = true,
  onAddCharacter 
}) => {
  return (
    <Tabs defaultValue="members" className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="members" className="flex items-center gap-1">
          <Users className="h-4 w-4" />
          <span className="hidden sm:inline">Membres</span>
        </TabsTrigger>
        <TabsTrigger value="tree" className="flex items-center gap-1">
          <Tree className="h-4 w-4" />
          <span className="hidden sm:inline">Arbre généalogique</span>
        </TabsTrigger>
        <TabsTrigger value="traits" className="flex items-center gap-1">
          <Shield className="h-4 w-4" />
          <span className="hidden sm:inline">Traits familiaux</span>
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="members" className="pt-4">
        <Card>
          <FamilyMembers characters={characters} />
          {showAddButton && (
            <div className="px-4 py-3 border-t flex justify-center">
              <CharacterCreationButton />
            </div>
          )}
        </Card>
      </TabsContent>
      
      <TabsContent value="tree" className="pt-4">
        <Card className="p-4">
          <FamilyTree 
            characters={characters} 
          />
        </Card>
      </TabsContent>
      
      <TabsContent value="traits" className="pt-4">
        <Card>
          <FamilyTraits />
        </Card>
      </TabsContent>
    </Tabs>
  );
};
