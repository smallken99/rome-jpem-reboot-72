
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { PageHeader } from '@/components/ui-custom/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { AllianceList } from './components/AllianceList';
import { AllianceCreation } from './components/AllianceCreation';
import { MarriageProposals } from './components/MarriageProposals';
import { useAllianceBirths } from './useAllianceBirths';
import { useCharacters } from '../hooks/useCharacters';
import { useGameTime } from '@/hooks/useGameTime';
import { toast } from '@/components/ui-custom/toast';

export const MarriagesAndAlliances: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<string>('existing');
  const { localCharacters, addCharacter } = useCharacters();
  const { year, season } = useGameTime();
  const { lastBirthYear, checkForBirths } = useAllianceBirths(localCharacters, addCharacter);
  
  const handleCheckForBirths = () => {
    const newBirth = checkForBirths();
    if (newBirth) {
      toast.success(`Un nouvel enfant est né dans votre famille !`);
    } else {
      toast.info(`Aucune naissance ce trimestre.`);
    }
  };
  
  return (
    <Layout>
      <PageHeader 
        title="Alliances Matrimoniales"
        subtitle="Gérez les mariages et alliances avec d'autres familles"
      />
      
      <div className="mb-6">
        <div className="flex justify-between items-center">
          <div>
            <Button variant="outline" onClick={() => navigate('/famille')}>
              Retour au menu
            </Button>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm">Dernière naissance: An {lastBirthYear || "?"}</span>
            <Button onClick={handleCheckForBirths}>
              Vérifier les naissances
            </Button>
          </div>
        </div>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Gestion des Alliances</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-6">
              <TabsTrigger value="existing">Alliances Existantes</TabsTrigger>
              <TabsTrigger value="proposals">Propositions</TabsTrigger>
              <TabsTrigger value="create">Créer une Alliance</TabsTrigger>
            </TabsList>
            
            <TabsContent value="existing">
              <AllianceList />
            </TabsContent>
            
            <TabsContent value="proposals">
              <MarriageProposals />
            </TabsContent>
            
            <TabsContent value="create">
              <AllianceCreation currentYear={year} currentSeason={season} />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </Layout>
  );
};
