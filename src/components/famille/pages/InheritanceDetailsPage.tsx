
import React from 'react';
import { useParams } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { PageHeader } from '@/components/ui-custom/PageHeader';
import { InheritanceDetails } from '@/components/famille/inheritance/InheritanceDetails';
import { useCharacters } from '../hooks/useCharacters';

export const InheritanceDetailsPage: React.FC = () => {
  const { heirId } = useParams<{ heirId: string }>();
  const { localCharacters } = useCharacters();
  const heir = heirId ? localCharacters.find(c => c.id === heirId) : null;
  const potentialHeirs = localCharacters.filter(c => 
    c.gender === 'male' && c.age < 30 && c.id !== heirId
  );
  
  return (
    <Layout>
      <PageHeader 
        title="Détails de l'Héritage"
        subtitle="Configuration détaillée de la succession"
      />
      <div className="roman-card">
        {heir ? (
          <InheritanceDetails 
            character={heir}
            heirs={potentialHeirs} 
          />
        ) : (
          <div className="p-6 text-center">
            <p>Héritier non trouvé</p>
          </div>
        )}
      </div>
    </Layout>
  );
};
