
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { PageHeader } from '@/components/ui-custom/PageHeader';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useCharacters } from '../hooks/useCharacters';
import { ChildrenEducationList } from './ChildrenEducationList';
import { PreceptorsList } from './PreceptorsList';
import { EducationMenu } from './EducationMenu';
import { useEducationManagement } from './hooks/useEducationManagement';
import { Child } from './types/educationTypes';
import { useChildrenManagement } from './hooks/useChildrenManagement';

export const EducationManagement: React.FC = () => {
  const navigate = useNavigate();
  const { localCharacters, updateCharacter } = useCharacters();
  const [activeTab, setActiveTab] = useState<string>('children');
  
  // Convert Characters to Children for education system
  const { educationChildren, setEducationChildren } = useChildrenManagement(localCharacters);
  
  // Use the education management hook
  const { 
    educatingChildren,
    startChildEducation,
    advanceEducationYear,
    completeEducation,
    hiredPreceptors
  } = useEducationManagement(
    educationChildren,
    setEducationChildren,
    localCharacters,
    updateCharacter
  );
  
  const handleAdvanceYear = (childId: string) => {
    advanceEducationYear(childId);
    // Update UI after advancing year
  };
  
  const handleCompleteEducation = (childId: string) => {
    const updatedChild = completeEducation(childId);
    if (updatedChild) {
      // Update the character with completed education
    }
  };
  
  const handleStartEducation = (childId: string, educationType: string, mentorId: string | null = null) => {
    startChildEducation(childId, educationType, mentorId);
  };
  
  return (
    <Layout>
      <PageHeader 
        title="Éducation"
        subtitle="Gérez l'éducation des jeunes membres de votre famille"
      />
      
      <div className="mb-6">
        <div className="flex justify-between items-center">
          <Button variant="outline" onClick={() => navigate('/famille')}>
            Retour au menu
          </Button>
          <EducationMenu />
        </div>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Gestion de l'Éducation</CardTitle>
          <CardDescription>
            Supervisez l'éducation des enfants et gérez les précepteurs
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-6">
              <TabsTrigger value="children">Enfants</TabsTrigger>
              <TabsTrigger value="preceptors">Précepteurs</TabsTrigger>
            </TabsList>
            
            <TabsContent value="children">
              <ChildrenEducationList 
                children={educationChildren}
                onStartEducation={handleStartEducation}
                onAdvanceYear={handleAdvanceYear}
                onCompleteEducation={handleCompleteEducation}
                preceptors={hiredPreceptors}
              />
            </TabsContent>
            
            <TabsContent value="preceptors">
              <PreceptorsList preceptors={hiredPreceptors} />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </Layout>
  );
};
