
import React from 'react';
import Layout from '@/components/layout/Layout';
import { PageHeader } from '@/components/ui-custom/PageHeader';
import { EconomieStats } from '@/components/economie/EconomieStats';
import { EconomieTabs } from '@/components/economie/EconomieTabs';

const Economie = () => {
  return (
    <Layout>
      <PageHeader 
        title="Économie" 
        subtitle="Gérez les finances et les revenus de votre Gens" 
      />

      <EconomieStats />
      <EconomieTabs />
      
    </Layout>
  );
};

export default Economie;
