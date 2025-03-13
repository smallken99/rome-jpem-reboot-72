
import React from 'react';
import Layout from '@/components/layout/Layout';
import { PageHeader } from '@/components/ui-custom/PageHeader';
import { FamilleWelcome } from '@/components/famille/welcome/FamilleWelcome';

export const FamilleWelcomePage: React.FC = () => {
  return (
    <Layout>
      <PageHeader 
        title="Bienvenue dans votre Domus"
        subtitle="Accédez à la gestion familiale, aux alliances et à l'éducation de vos enfants"
      />
      <div className="roman-card">
        <FamilleWelcome />
      </div>
    </Layout>
  );
};
