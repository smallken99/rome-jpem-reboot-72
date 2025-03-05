
import React from 'react';
import Layout from '@/components/layout/Layout';
import { PageHeader } from '@/components/ui-custom/PageHeader';
import { PreceptorDetail } from '@/components/famille/education/PreceptorDetail';

export const PreceptorDetailPage: React.FC = () => {
  return (
    <Layout>
      <PageHeader 
        title="Détail du Précepteur"
        subtitle="Informations et embauche d'un précepteur"
      />
      <div className="roman-card">
        <PreceptorDetail />
      </div>
    </Layout>
  );
};
