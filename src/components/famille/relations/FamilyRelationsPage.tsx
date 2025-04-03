
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { PageHeader } from '@/components/ui-custom/PageHeader';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { RelationsList } from './components/RelationsList';
import { RelationsDiagram } from './components/RelationsDiagram';
import { NewRelationForm } from './components/NewRelationForm';
import { useFamilyRelations } from './hooks/useFamilyRelations';

export const FamilyRelationsPage: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<string>('list');
  const { 
    relations, 
    addRelation, 
    updateRelation, 
    removeRelation 
  } = useFamilyRelations();
  
  return (
    <Layout>
      <PageHeader 
        title="Relations Familiales"
        subtitle="Gérez les relations politiques et personnelles de votre famille"
      />
      
      <div className="mb-6">
        <div className="flex justify-end space-x-4">
          <Button variant="outline" onClick={() => navigate('/famille')}>
            Retour au menu
          </Button>
        </div>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Gestion des Relations</CardTitle>
          <CardDescription>
            Les relations de votre famille avec les autres familles et personnages influents de Rome
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-6">
              <TabsTrigger value="list">Liste des Relations</TabsTrigger>
              <TabsTrigger value="diagram">Diagramme</TabsTrigger>
              <TabsTrigger value="new">Nouvelle Relation</TabsTrigger>
            </TabsList>
            
            <TabsContent value="list">
              <RelationsList 
                relations={relations}
                onUpdateRelation={updateRelation}
                onRemoveRelation={removeRelation}
              />
            </TabsContent>
            
            <TabsContent value="diagram">
              <RelationsDiagram relations={relations} />
            </TabsContent>
            
            <TabsContent value="new">
              <NewRelationForm onAddRelation={addRelation} />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </Layout>
  );
};
