
import React from 'react';
import Layout from '@/components/layout/Layout';
import { PageHeader } from '@/components/ui-custom/PageHeader';
import { FamilyTree } from '@/components/famille/FamilyTree';
import { characters } from '@/data/characters';
import { Card } from '@/components/ui/card';

export const ArbreGenealogique: React.FC = () => {
  return (
    <Layout>
      <PageHeader 
        title="Arbre Généalogique"
        subtitle="Visualisez les liens familiaux et l'histoire de votre lignée"
      />
      <Card className="roman-card p-6">
        <FamilyTree characters={characters} />
      </Card>
    </Layout>
  );
};

export default ArbreGenealogique;
