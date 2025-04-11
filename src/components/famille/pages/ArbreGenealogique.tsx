
import React from 'react';
import Layout from '@/components/layout/Layout';
import { PageHeader } from '@/components/ui-custom/PageHeader';
import { FamilyTreeComponent } from '@/components/famille/tree/FamilyTreeComponent';
import { characters } from '@/data/characters';
import { Card } from '@/components/ui/card';
import { useCharacters } from '../hooks/useCharacters';

export const ArbreGenealogique: React.FC = () => {
  const { localCharacters } = useCharacters();
  const displayCharacters = localCharacters.length > 0 ? localCharacters : characters;

  return (
    <Layout>
      <PageHeader 
        title="Arbre Généalogique"
        subtitle="Visualisez les liens familiaux et l'histoire de votre lignée"
      />
      <Card className="roman-card p-6">
        <FamilyTreeComponent 
          characters={displayCharacters} 
        />
      </Card>
    </Layout>
  );
};

export default ArbreGenealogique;
