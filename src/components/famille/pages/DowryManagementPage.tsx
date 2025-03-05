
import React from 'react';
import Layout from '@/components/layout/Layout';
import { PageHeader } from '@/components/ui-custom/PageHeader';
import { DowryManagement } from '@/components/famille/inheritance/DowryManagement';

export const DowryManagementPage: React.FC = () => {
  return (
    <Layout>
      <PageHeader 
        title="Gestion de la Dot"
        subtitle="Définir la dot pour un mariage avantageux"
      />
      <div className="roman-card">
        <DowryManagement />
      </div>
    </Layout>
  );
};
