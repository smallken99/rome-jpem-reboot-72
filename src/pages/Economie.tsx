
import React from 'react';
import Layout from '@/components/layout/Layout';
import { PageHeader } from '@/components/ui-custom/PageHeader';
import { EconomyManager } from '@/components/economie/EconomyManager';

const Economie = () => {
  return (
    <Layout>
      <PageHeader 
        title="Économie" 
        subtitle="Gérez les finances et les revenus de votre Gens" 
      />
      
      <div className="container mx-auto py-6">
        <EconomyManager />
      </div>
      
    </Layout>
  );
};

export default Economie;
