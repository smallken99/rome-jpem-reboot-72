
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { PageHeader } from '@/components/ui-custom/PageHeader';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useCharacters } from '../hooks/useCharacters';
import { EducationTypeSelector } from './components/EducationTypeSelector';
import { EducationSpecialtySelector } from './components/EducationSpecialtySelector';
import { EducationObjectives } from './components/EducationObjectives';
import { PreceptorsList } from './components/PreceptorsList';
import { toast } from '@/components/ui-custom/toast';

export const ChildEducationDetail: React.FC = () => {
  const { childId } = useParams<{ childId: string }>();
  const { localCharacters, updateCharacter } = useCharacters();
  const navigate = useNavigate();
  
  const child = localCharacters.find(c => c.id === childId);
  
  const [selectedEducationType, setSelectedEducationType] = useState<string>(
    child?.education?.type || 'none'
  );
  
  const [selectedSpecialties, setSelectedSpecialties] = useState<string[]>(
    child?.education?.specialties || []
  );
  
  const handleSaveEducation = () => {
    if (!childId || !child) return;
    
    updateCharacter(childId, {
      education: {
        type: selectedEducationType,
        specialties: selectedSpecialties,
        mentor: null
      }
    });
    
    toast.success("Éducation mise à jour avec succès");
    navigate('/famille/education');
  };
  
  if (!child) {
    return (
      <Layout>
        <div className="text-center py-12">
          <p>Enfant non trouvé.</p>
          <Button onClick={() => navigate('/famille/education')} className="mt-4">
            Retour à l'éducation
          </Button>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      <PageHeader 
        title={`Éducation de ${child.name}`}
        subtitle={`Définissez le parcours éducatif pour votre ${child.gender === 'male' ? 'fils' : 'fille'} de ${child.age} ans`}
      />
      
      <div className="mb-6">
        <div className="flex justify-end space-x-4">
          <Button variant="outline" onClick={() => navigate('/famille/education')}>
            Retour à la liste
          </Button>
          <Button onClick={handleSaveEducation}>
            Sauvegarder les changements
          </Button>
        </div>
      </div>
      
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Parcours Éducatif</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="type">
            <TabsList className="mb-6">
              <TabsTrigger value="type">Type d'Éducation</TabsTrigger>
              <TabsTrigger value="specialty">Spécialités</TabsTrigger>
              <TabsTrigger value="preceptors">Précepteurs</TabsTrigger>
            </TabsList>
            
            <TabsContent value="type">
              <div className="space-y-6">
                <EducationTypeSelector 
                  selectedType={selectedEducationType}
                  onChange={setSelectedEducationType}
                  childGender={child.gender}
                />
                
                <EducationObjectives educationType={selectedEducationType} />
              </div>
            </TabsContent>
            
            <TabsContent value="specialty">
              <EducationSpecialtySelector 
                selectedSpecialties={selectedSpecialties}
                availableSpecialties={getSpecialtiesForType(selectedEducationType)}
                onChange={setSelectedSpecialties}
              />
            </TabsContent>
            
            <TabsContent value="preceptors">
              <PreceptorsList 
                childId={childId}
                educationType={selectedEducationType}
              />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </Layout>
  );
};

// Fonction utilitaire pour obtenir les spécialités disponibles selon le type d'éducation
function getSpecialtiesForType(type: string): string[] {
  switch(type) {
    case 'military':
      return ['Tactique', 'Combat rapproché', 'Leadership militaire', 'Stratégie'];
    case 'rhetoric':
      return ['Éloquence', 'Débat politique', 'Droit romain', 'Négociation'];
    case 'political':
      return ['Administration', 'Diplomatie', 'Droit public', 'Gouvernance'];
    case 'academic':
      return ['Littérature', 'Philosophie', 'Histoire', 'Mathématiques'];
    case 'religious':
      return ['Rituel', 'Augure', 'Théologie', 'Divination'];
    default:
      return [];
  }
}
