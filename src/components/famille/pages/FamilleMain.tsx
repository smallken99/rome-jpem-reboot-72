
import React from 'react';
import Layout from '@/components/layout/Layout';
import { PageHeader } from '@/components/ui-custom/PageHeader';
import { FamilyOverview } from '../FamilyOverview';
import { FamilyActions } from '../FamilyActions';
import { MarriageAlliances } from '../MarriageAlliances';
import { useCharacters } from '../hooks/useCharacters';
import { Character } from '@/types/character';

const FamilleMain: React.FC = () => {
  const { localCharacters, handleChildBirth, updateCharacter } = useCharacters();
  
  // Handler for child birth that adapts the parameters
  const handleNewChild = (parentIds?: string[]) => {
    const newChild = handleChildBirth(parentIds);
    return newChild;
  };
  
  // Handler for character updates
  const handleCharacterUpdate = (characterId: string, updates: Partial<Character>) => {
    updateCharacter(characterId, updates);
  };
  
  return (
    <Layout>
      <PageHeader 
        title="Famille" 
        subtitle="Gestion de votre famille et alliances matrimoniales"
      />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="md:col-span-2">
          <FamilyOverview characters={localCharacters} />
        </div>
        <div>
          <FamilyActions />
        </div>
      </div>
      
      <div className="mb-8">
        <MarriageAlliances 
          characters={localCharacters} 
          onChildBirth={handleNewChild}
        />
      </div>
    </Layout>
  );
};

export default FamilleMain;
