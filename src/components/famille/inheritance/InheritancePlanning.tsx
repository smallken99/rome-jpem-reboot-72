
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { PageHeader } from '@/components/ui-custom/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useNavigate } from 'react-router-dom';
import { InheritanceDetails } from './InheritanceDetails';
import { HeirSelection } from './HeirSelection';
import { TestamentaryWishes } from './TestamentaryWishes';
import { useCharacters } from '../hooks/useCharacters';
import { getEligibleHeirs } from './inheritanceUtils';

export const InheritancePlanning: React.FC = () => {
  const navigate = useNavigate();
  const { localCharacters } = useCharacters();
  const [activeTab, setActiveTab] = useState<string>('overview');
  
  // Find the character who is head of family
  const headOfFamily = localCharacters.find(c => c.isHeadOfFamily) || localCharacters[0];
  
  // Get potential heirs
  const eligibleHeirs = getEligibleHeirs(headOfFamily, localCharacters);
  
  return (
    <Layout>
      <PageHeader 
        title="Planification de l'Héritage"
        subtitle="Assurez la continuité de votre patrimoine et de votre nom"
      />
      
      <div className="mb-6">
        <div className="flex justify-end space-x-4">
          <Button variant="outline" onClick={() => navigate('/famille')}>
            Retour au menu
          </Button>
          <Button onClick={() => navigate('/famille/tree')}>
            Voir l'arbre généalogique
          </Button>
        </div>
      </div>
      
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Testament de {headOfFamily.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-6">
              <TabsTrigger value="overview">Aperçu</TabsTrigger>
              <TabsTrigger value="heirs">Héritiers</TabsTrigger>
              <TabsTrigger value="wishes">Dernières Volontés</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview">
              <InheritanceDetails 
                character={headOfFamily} 
                heirs={eligibleHeirs.slice(0, 5)} // Top 5 heirs
              />
            </TabsContent>
            
            <TabsContent value="heirs">
              <HeirSelection 
                character={headOfFamily}
                allCharacters={localCharacters}
                eligibleHeirs={eligibleHeirs}
              />
            </TabsContent>
            
            <TabsContent value="wishes">
              <TestamentaryWishes character={headOfFamily} />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </Layout>
  );
};
