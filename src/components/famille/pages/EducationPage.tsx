
import React from 'react';
import Layout from '@/components/layout/Layout';
import { PageHeader } from '@/components/ui-custom/PageHeader';
import { FamilyEducation } from '../education/FamilyEducation';
import { Character } from '@/types/character';

interface EducationPageProps {
  characters: Character[];
}

const EducationPage: React.FC<EducationPageProps> = ({ characters }) => {
  return (
    <Layout>
      <PageHeader 
        title="Éducation Familiale" 
        subtitle="Formez la prochaine génération de votre famille"
      />
      
      <FamilyEducation />
    </Layout>
  );
};

export default EducationPage;
