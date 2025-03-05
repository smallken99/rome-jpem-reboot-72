
import React from 'react';
import Layout from '@/components/layout/Layout';
import { PageHeader } from '@/components/ui-custom/PageHeader';
import { AllianceManagement } from '@/components/famille/alliances/AllianceManagement';

export const AllianceManagementPage: React.FC = () => {
  return (
    <Layout>
      <PageHeader 
        title="Gestion d'Alliance Matrimoniale"
        subtitle="Négociez les termes et la dot pour une alliance bénéfique"
      />
      <div className="roman-card">
        <AllianceManagement />
      </div>
    </Layout>
  );
};
