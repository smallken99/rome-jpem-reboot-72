
import React from 'react';
import Layout from '@/components/layout/Layout';
import { PageHeader } from '@/components/ui-custom/PageHeader';
import { Inheritance } from '@/components/famille/Inheritance';

export const Heritage: React.FC = () => {
  return (
    <Layout>
      <PageHeader 
        title="Héritage et Testaments"
        subtitle="Gérez la succession et la transmission du patrimoine"
      />
      <div className="roman-card">
        <Inheritance />
      </div>
    </Layout>
  );
};
