
import React from 'react';
import Layout from '@/components/layout/Layout';
import { PageHeader } from '@/components/ui-custom/PageHeader';
import { Education } from '@/components/famille/Education';
import { characters } from '@/data/characters';

export const EducationPage: React.FC = () => {
  return (
    <Layout>
      <PageHeader 
        title="Éducation des Enfants"
        subtitle="Formez la prochaine génération pour perpétuer l'héritage familial"
      />
      <div className="roman-card">
        <Education characters={characters} />
      </div>
    </Layout>
  );
};
