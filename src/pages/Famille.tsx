
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { PageHeader } from '@/components/ui-custom/PageHeader';
import { CharacterSelection } from '@/components/famille/character/CharacterSelection';
import { FamilySections } from '@/components/famille/sections/FamilySections';
import { PortraitDialog } from '@/components/famille/character/PortraitDialog';
import { characters } from '@/data/characters';
import { useToast } from '@/components/ui/use-toast';
import { Character } from '@/types/character';

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

  // Handler for adding a new child to the family
  const handleChildBirth = (newChild: Character) => {
    setLocalCharacters(prev => [...prev, newChild]);
    
    // Show success toast
    toast({
      title: "Naissance",
      description: `${newChild.name} est né(e) dans votre famille!`,
      duration: 3000,
    });
  };

  // Handler for character name changes
  const handleNameChange = (characterId: string, newName: string) => {
    if (!newName.trim()) {
      toast({
        title: "Nom invalide",
        description: "Le nom ne peut pas être vide.",
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
          name: newName
        };
      }
      return char;
    });
    
    setLocalCharacters(updatedCharacters);
    
    // Show success toast
    toast({
      title: "Nom mis à jour",
      description: "Le nom du personnage a été changé avec succès.",
      duration: 3000,
    });
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
        onNameChange={handleNameChange}
      />
      
      <PortraitDialog 
        selectedCharacterId={selectedCharacterId}
        portraitUrl={portraitUrl}
        onClose={() => setSelectedCharacterId(null)}
        onPortraitChange={handlePortraitChange}
        onPortraitUrlChange={setPortraitUrl}
      />

      <FamilySections 
        characters={localCharacters}
        onChildBirth={handleChildBirth}
        onNameChange={handleNameChange}
      />
    </Layout>
  );
};

export default Famille;
