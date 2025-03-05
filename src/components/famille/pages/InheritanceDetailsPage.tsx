
import React from 'react';
import Layout from '@/components/layout/Layout';
import { PageHeader } from '@/components/ui-custom/PageHeader';
import { InheritanceDetails } from '@/components/famille/inheritance/InheritanceDetails';

export const InheritanceDetailsPage: React.FC = () => {
  return (
    <Layout>
      <PageHeader 
        title="Détails du Testament"
        subtitle="Définir les termes du testament pour un héritier"
      />
      <div className="roman-card">
        <InheritanceDetails />
      </div>
    </Layout>
  );
};
