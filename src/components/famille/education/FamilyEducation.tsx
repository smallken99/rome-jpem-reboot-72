
import React from 'react';
import Layout from '@/components/layout/Layout';
import { PageHeader } from '@/components/ui-custom/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useCharacters } from '../hooks/useCharacters';
import { ChildList } from './components/ChildList';
import { EducationProvider } from './context/EducationContext';

export const FamilyEducation: React.FC = () => {
  const navigate = useNavigate();
  const { localCharacters } = useCharacters();
  
  // Filter children from the family
  const children = localCharacters.filter(c => 
    (c.relation?.includes('Fils') || c.relation?.includes('Fille')) && 
    c.age < 18
  );
  
  return (
    <Layout>
      <PageHeader 
        title="Éducation Familiale"
        subtitle="Formez la prochaine génération pour l'avenir de votre famille"
      />
      
      <div className="mb-6">
        <div className="flex justify-end">
          <Button onClick={() => navigate('/famille')}>
            Retour au menu
          </Button>
        </div>
      </div>
      
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Éducation des Enfants</CardTitle>
        </CardHeader>
        <CardContent>
          {children.length > 0 ? (
            <EducationProvider characters={localCharacters}>
              <ChildList children={children} />
            </EducationProvider>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <p>Aucun enfant en âge d'être éduqué dans votre famille.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </Layout>
  );
};
