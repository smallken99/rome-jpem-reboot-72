
import React from 'react';
import Layout from '@/components/layout/Layout';
import { PageHeader } from '@/components/ui-custom/PageHeader';
import { useCharacters } from '../hooks/useCharacters';
import { FamilyOverview } from '../FamilyOverview';
import { FamilyActions } from '../FamilyActions';

const FamilleMain: React.FC = () => {
  const { localCharacters, handleChildBirth } = useCharacters();
  
  // Handler pour les naissances d'enfants - adapté pour accepter parentIds
  const onChildBirth = (parentIds?: string[]) => {
    if (parentIds) {
      return handleChildBirth(parentIds);
    }
    // Fallback si pas de parents spécifiés
    return handleChildBirth();
  };
  
  return (
    <Layout>
      <PageHeader 
        title="Gestion Familiale"
        subtitle="Gérez votre famille, établissez des alliances, et assurez votre succession"
      />
      
      <div className="space-y-6">
        <FamilyOverview characters={localCharacters} />
        <FamilyActions />
      </div>
    </Layout>
  );
};

export default FamilleMain;
