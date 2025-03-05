
import React from 'react';
import Layout from '@/components/layout/Layout';
import { FamilySections } from '@/components/famille/sections/FamilySections';
import { CharacterSelection } from '@/components/famille/character/CharacterSelection';
import { PageHeader } from '@/components/ui-custom/PageHeader';
import { useCharacters } from '@/components/famille/hooks/useCharacters';

export const FamilleMain: React.FC = () => {
  const { localCharacters, handleChildBirth, handleNameChange } = useCharacters();

  return (
    <Layout>
      <PageHeader 
        title="Famille"
        subtitle="Gérez les membres de votre famille, les alliances et l'héritage"
      />
      
      <CharacterSelection 
        localCharacters={localCharacters}
        onNameChange={handleNameChange}
      />
      
      <FamilySections 
        characters={localCharacters}
        onChildBirth={handleChildBirth}
        onNameChange={handleNameChange}
      />
    </Layout>
  );
};
