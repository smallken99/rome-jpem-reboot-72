
import React from 'react';
import Layout from '@/components/layout/Layout';
import { PageHeader } from '@/components/ui-custom/PageHeader';
import { FamilyTree } from '../FamilyTree';
import { useCharacters } from '../hooks/useCharacters';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

export const FamilyTreePage: React.FC = () => {
  const { localCharacters } = useCharacters();
  const navigate = useNavigate();
  
  return (
    <Layout>
      <PageHeader 
        title="Arbre Généalogique"
        subtitle="Visualisez les liens familiaux et votre succession"
      />
      
      <div className="mb-6">
        <div className="flex justify-end space-x-4">
          <Button variant="outline" onClick={() => navigate('/famille')}>
            Retour au menu
          </Button>
          <Button onClick={() => navigate('/famille/inheritance')}>
            Planifier ma succession
          </Button>
        </div>
      </div>
      
      <Card>
        <CardContent className="pt-6">
          <FamilyTree characters={localCharacters} />
        </CardContent>
      </Card>
    </Layout>
  );
};
