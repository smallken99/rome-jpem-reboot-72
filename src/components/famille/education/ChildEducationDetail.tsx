
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useCharacters } from '../hooks/useCharacters';
import { Character } from '@/types/character';
import { EducationTypeSelector } from './components/EducationTypeSelector';
import { EducationProgressButtons } from './components/EducationProgressButtons';
import { EducationPreceptor } from './components/EducationPreceptor';
import { EducationPathSelector } from './components/EducationPathSelector';
import { EducationFormActions } from './components/EducationFormActions';
import { toast } from 'sonner';
import { useEducationManagement } from './hooks/useEducationManagement';
import { useChildrenManagement } from './hooks/useChildrenManagement';
import { ArrowLeft } from 'lucide-react';
import { EducationType } from './types/educationTypes';

export const ChildEducationDetail: React.FC = () => {
  const { childId } = useParams<{ childId: string }>();
  const navigate = useNavigate();
  const { localCharacters, updateCharacter } = useCharacters();
  const [child, setChild] = useState<Character | null>(null);
  const [selectedEducationType, setSelectedEducationType] = useState<EducationType>('rhetoric');
  const [isEducating, setIsEducating] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  // Convertir les personnages en enfants pour le système d'éducation
  const { educationChildren, setEducationChildren } = useChildrenManagement(localCharacters);
  
  const { 
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
  
  useEffect(() => {
    if (childId) {
      const foundChild = localCharacters.find(c => c.id === childId);
      if (foundChild) {
        setChild(foundChild);
        setSelectedEducationType(foundChild.educationType as EducationType || 'rhetoric');
        setIsEducating(!!foundChild.currentEducation?.progress);
      }
      setIsLoading(false);
    }
  }, [childId, localCharacters]);
  
  const handleSaveEducation = () => {
    if (!child) return;
    
    if (child.currentEducation) {
      // Déjà en cours d'éducation, mettre à jour
      updateCharacter(child.id, {
        educationType: selectedEducationType,
        currentEducation: {
          ...child.currentEducation,
          type: selectedEducationType
        }
      });
      
      toast.success(`L'éducation de ${child.name} a été mise à jour.`);
    } else {
      // Démarrer une nouvelle éducation
      startChildEducation(child.id, selectedEducationType);
      setIsEducating(true);
      
      toast.success(`L'éducation de ${child.name} a commencé.`);
    }
  };
  
  const handleAdvanceYear = () => {
    if (!child) return;
    
    advanceEducationYear(child.id);
    
    // Mettre à jour l'interface
    setChild(prevChild => {
      if (!prevChild) return null;
      const newProgress = prevChild.currentEducation 
        ? Math.min((prevChild.currentEducation.progress || 0) + 33, 100) 
        : 33;
      
      return {
        ...prevChild,
        currentEducation: {
          ...(prevChild.currentEducation || { type: selectedEducationType, mentor: null, skills: [] }),
          progress: newProgress,
          yearsCompleted: ((prevChild.currentEducation?.yearsCompleted || 0) + 1)
        }
      };
    });
  };
  
  const handleCompleteEducation = () => {
    if (!child) return;
    
    completeEducation(child.id);
    
    toast.success(`L'éducation de ${child.name} est maintenant terminée.`);
    
    // Retourner à la liste des enfants
    setTimeout(() => navigate('/famille/education'), 1500);
  };
  
  if (isLoading) {
    return (
      <div className="text-center p-8">
        <p className="text-muted-foreground">Chargement des données...</p>
      </div>
    );
  }
  
  if (!child) {
    return (
      <div className="text-center p-8">
        <p className="text-red-500">Enfant non trouvé.</p>
        <Button 
          variant="outline" 
          className="mt-4"
          onClick={() => navigate('/famille/education')}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Retour à la liste
        </Button>
      </div>
    );
  }
  
  const canComplete = child.currentEducation?.progress === 100;
  const progress = child.currentEducation?.progress || 0;
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">{child.name}</h2>
          <p className="text-muted-foreground">
            {child.gender === 'male' ? 'Garçon' : 'Fille'} • {child.age} ans
          </p>
        </div>
        
        <Button 
          variant="outline" 
          onClick={() => navigate('/famille/education')}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Retour
        </Button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Éducation de {child.name}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <EducationTypeSelector
                selectedType={selectedEducationType}
                onChange={(type) => setSelectedEducationType(type as EducationType)}
                gender="male"
                childGender={child.gender}
                age={child.age}
              />
              
              {progress > 0 && (
                <div className="mt-6">
                  <div className="flex justify-between text-sm mb-2">
                    <span>Progression: {progress}%</span>
                    <span>
                      {child.currentEducation?.yearsCompleted || 0}/3 années
                    </span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary transition-all duration-500 ease-out"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                </div>
              )}
              
              <EducationProgressButtons
                isEducating={isEducating}
                hasEducation={!!child.currentEducation}
                educationProgress={progress}
                onAdvanceYear={handleAdvanceYear}
                onCompleteEducation={handleCompleteEducation}
                canComplete={canComplete}
                isInvalidEducation={child.gender === 'female' && selectedEducationType === 'military'}
              />
            </CardContent>
          </Card>
          
          {!child.currentEducation && (
            <Card>
              <CardHeader>
                <CardTitle>Parcours d'Éducation</CardTitle>
              </CardHeader>
              <CardContent>
                <EducationPathSelector
                  childAge={child.age}
                  childGender={child.gender}
                  selectedPath={selectedEducationType}
                  onSelectPath={(type) => setSelectedEducationType(type as EducationType)}
                />
                
                <EducationFormActions
                  onCancel={() => navigate('/famille/education')}
                  onSave={handleSaveEducation}
                  saving={false}
                />
              </CardContent>
            </Card>
          )}
        </div>
        
        <div>
          <EducationPreceptor
            child={child}
            preceptors={hiredPreceptors}
            onAssignPreceptor={(preceptorId) => {
              console.log("Assign preceptor:", preceptorId);
              toast.success("Précepteur assigné avec succès");
            }}
          />
        </div>
      </div>
    </div>
  );
};
