
import React from 'react';
import { useParams } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { PageHeader } from '@/components/ui-custom/PageHeader';
import { InheritanceDetails } from '@/components/famille/inheritance/InheritanceDetails';

export const InheritanceDetailsPage: React.FC = () => {
  const { heirId } = useParams<{ heirId: string }>();
  
  return (
    <Layout>
      <PageHeader 
        title="Détails de l'Héritage"
        subtitle="Configuration détaillée de la succession"
      />
      <div className="roman-card">
        <InheritanceDetails heirId={heirId || ''} />
      </div>
    </Layout>
  );
};
