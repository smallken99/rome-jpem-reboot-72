
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { PageHeader } from '@/components/ui-custom/PageHeader';
import { CharacterSelection } from '@/components/famille/character/CharacterSelection';
import { FamilySections } from '@/components/famille/sections/FamilySections';
import { PortraitDialog } from '@/components/famille/character/PortraitDialog';
import { characters } from '@/data/characters';
import { useToast } from '@/components/ui/use-toast';

const Famille = () => {
  const [localCharacters, setLocalCharacters] = useState(characters);
  const [activeCharacter, setActiveCharacter] = useState(characters[0]);
  const [selectedCharacterId, setSelectedCharacterId] = useState<string | null>(null);
  const [portraitUrl, setPortraitUrl] = useState("");
  const { toast } = useToast();

  // Handler to update character portrait
  const handlePortraitChange = (characterId: string, newPortraitUrl: string) => {
    if (!newPortraitUrl.trim()) {
      toast({
        title: "URL invalide",
        description: "Veuillez saisir une URL d'image valide.",
        variant: "destructive",
        duration: 3000,
      });
      return;
    }
    
    // Update the local characters state
    const updatedCharacters = localCharacters.map(char => {
      if (char.id === characterId) {
        return {
          ...char,
          portrait: newPortraitUrl
        };
      }
      return char;
    });
    
    setLocalCharacters(updatedCharacters);
    
    // Show success toast
    toast({
      title: "Portrait mis à jour",
      description: "Le portrait du personnage a été changé avec succès.",
      duration: 3000,
    });
    
    // Close the dialog
    setSelectedCharacterId(null);
  };

  // Handler to open portrait edit dialog
  const handleEditPortrait = (characterId: string) => {
    setSelectedCharacterId(characterId);
    setPortraitUrl("");
  };

  return (
    <Layout>
      <PageHeader
        title="Famille"
        subtitle="Gérez votre dynastie et assurez l'avenir de votre Gens"
      />

      <CharacterSelection 
        localCharacters={localCharacters}
        activeCharacter={activeCharacter}
        onEditPortrait={handleEditPortrait}
      />
      
      <PortraitDialog 
        selectedCharacterId={selectedCharacterId}
        portraitUrl={portraitUrl}
        onClose={() => setSelectedCharacterId(null)}
        onPortraitChange={handlePortraitChange}
        onPortraitUrlChange={setPortraitUrl}
      />

      <FamilySections />
    </Layout>
  );
};

export default Famille;
