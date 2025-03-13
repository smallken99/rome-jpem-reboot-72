
import React from 'react';
import Layout from '@/components/layout/Layout';
import { PageHeader } from '@/components/ui-custom/PageHeader';
import { ChildEducationDetail } from '@/components/famille/education/ChildEducationDetail';

export const ChildEducationDetailPage: React.FC = () => {
  return (
    <Layout>
      <PageHeader 
        title="Détail de l'Éducation"
        subtitle="Configurer l'éducation d'un enfant"
      />
      <div className="roman-card">
        <ChildEducationDetail />
      </div>
    </Layout>
  );
};
