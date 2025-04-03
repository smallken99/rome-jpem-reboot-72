
import React from 'react';
import Layout from '@/components/layout/Layout';
import { PageHeader } from '@/components/ui-custom/PageHeader';
import { FamilyActions } from '../FamilyActions';
import { FamilyOverview } from '../FamilyOverview';
import { useCharacters } from '../hooks/useCharacters';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Users, TreePine } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const FamilleMenu: React.FC = () => {
  const { localCharacters } = useCharacters();
  const navigate = useNavigate();
  
  // Calculer quelques statistiques pour l'affichage
  const familySize = localCharacters.length;
  const adultMembers = localCharacters.filter(c => c.age >= 18).length;
  const childMembers = localCharacters.filter(c => c.age < 18).length;
  
  return (
    <Layout>
      <PageHeader 
        title="Gestion Familiale" 
        subtitle="Gérez votre famille, établissez des alliances et assurez votre succession"
      />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="font-cinzel">Votre Famille</CardTitle>
            <CardDescription>
              Vue d'ensemble de votre lignée et de ses membres
            </CardDescription>
          </CardHeader>
          <CardContent>
            <FamilyOverview characters={localCharacters} />
            
            <div className="flex justify-end mt-4">
              <Button 
                variant="outline" 
                className="flex items-center gap-2"
                onClick={() => navigate('/famille/tree')}
              >
                <TreePine className="h-4 w-4" />
                Voir l'arbre généalogique
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="font-cinzel">Statistiques</CardTitle>
            <CardDescription>
              Aperçu de votre famille
            </CardDescription>
          </CardHeader>
          <CardContent>
            <dl className="space-y-4">
              <div className="flex justify-between">
                <dt className="font-medium">Taille de la famille:</dt>
                <dd className="text-right">{familySize} membres</dd>
              </div>
              <div className="flex justify-between">
                <dt className="font-medium">Adultes:</dt>
                <dd className="text-right">{adultMembers}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="font-medium">Enfants:</dt>
                <dd className="text-right">{childMembers}</dd>
              </div>
              
              <div className="pt-4">
                <Button 
                  variant="secondary" 
                  className="w-full flex items-center justify-center gap-2"
                  onClick={() => navigate('/famille/reputation')}
                >
                  <Users className="h-4 w-4" />
                  Voir la réputation familiale
                </Button>
              </div>
            </dl>
          </CardContent>
        </Card>
      </div>
      
      <FamilyActions />
    </Layout>
  );
};
