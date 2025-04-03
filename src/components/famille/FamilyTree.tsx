
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { PageHeader } from '@/components/ui-custom/PageHeader';
import { Card, CardContent, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useCharacters } from './hooks/useCharacters';
import { Character } from '@/types/character';
import { FamilyTreeComponent } from './tree/FamilyTreeComponent';
import { FamilyTreeDetails } from './tree/FamilyTreeDetails';
import { FamilyControls } from './tree/FamilyControls';
import { AddFamilyMemberDialog } from './members/AddFamilyMemberDialog';

interface FamilyTreeProps {
  characters?: Character[];
}

export const FamilyTree: React.FC<FamilyTreeProps> = ({ characters: externalCharacters }) => {
  const { localCharacters } = useCharacters();
  const [isAddMemberOpen, setIsAddMemberOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('tree');
  
  // Utiliser les personnages externes s'ils sont fournis, sinon utiliser les locaux
  const characters = externalCharacters || localCharacters;
  
  return (
    <Layout>
      <PageHeader 
        title="Arbre Généalogique"
        subtitle="Visualisez l'histoire et les relations de votre famille"
      />
      
      <FamilyControls onAddMember={() => setIsAddMemberOpen(true)} />
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
        <TabsList className="mb-4">
          <TabsTrigger value="tree">Arbre généalogique</TabsTrigger>
          <TabsTrigger value="details">Détails</TabsTrigger>
        </TabsList>
        
        <TabsContent value="tree">
          <Card>
            <CardContent className="p-6">
              {characters.length > 0 ? (
                <FamilyTreeComponent characters={characters} />
              ) : (
                <CardDescription className="text-center py-12">
                  Aucun membre de famille. Commencez par ajouter un premier membre.
                </CardDescription>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="details">
          <FamilyTreeDetails characters={characters} />
        </TabsContent>
      </Tabs>
      
      <AddFamilyMemberDialog
        isOpen={isAddMemberOpen}
        onClose={() => setIsAddMemberOpen(false)}
      />
    </Layout>
  );
};
