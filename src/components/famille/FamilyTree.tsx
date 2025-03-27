
import React from 'react';
import Layout from '@/components/layout/Layout';
import { PageHeader } from '@/components/ui-custom/PageHeader';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Character } from '@/types/character';

interface FamilyTreeProps {
  characters: Character[];
}

export const FamilyTree: React.FC<FamilyTreeProps> = ({ characters }) => {
  return (
    <Layout>
      <PageHeader 
        title="Arbre Généalogique"
        subtitle="Visualisez l'histoire et les relations de votre famille"
      />
      
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Votre Lignée</CardTitle>
          <CardDescription>
            Explorez les relations familiales à travers les générations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>Fonctionnalité en cours de développement</p>
        </CardContent>
      </Card>
    </Layout>
  );
};
