
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { ChildHeader } from './components/ChildHeader';
import { EducationTypeSelector } from './components/EducationTypeSelector';
import { EducationSpecialtySelector } from './components/EducationSpecialtySelector';
import { EducationObjectives } from './components/EducationObjectives';
import { CurrentEducationStatus } from './components/CurrentEducationStatus';
import { EducationFormActions } from './components/EducationFormActions';
import { ChildNotFound } from './components/ChildNotFound';
import { PageHeading } from './components/PageHeading';
import { useChildEducation } from './hooks/useChildEducation';
import { useToast } from '@/hooks/use-toast';

export const ChildEducationDetail = () => {
  const { childId } = useParams<{ childId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { 
    child, 
    availablePaths, 
    selectedEducationType, 
    handleEducationTypeChange, 
    handleSubmit,
    isInvalidEducation
  } = useChildEducation(childId);
  
  const onSubmit = () => {
    if (isInvalidEducation) {
      toast({
        title: "Éducation invalide",
        description: "L'éducation militaire n'est pas recommandée pour une fille romaine.",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate saving education data
    setTimeout(() => {
      toast({
        title: "Éducation modifiée",
        description: `L'éducation de ${child?.name} a été mise à jour avec succès.`,
      });
      
      // Redirect back to education page
      setIsSubmitting(false);
      navigate('/famille/education');
    }, 1500);
  };
  
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };
  
  // Si l'enfant n'est pas trouvé, afficher un message
  if (!child) {
    return <ChildNotFound />;
  }
  
  return (
    <div className="p-6 space-y-6">
      {/* En-tête avec bouton de retour */}
      <PageHeading childName={child.name} />
      
      {/* Carte d'information sur l'enfant */}
      <Card>
        <ChildHeader 
          child={child} 
          hasInvalidEducation={isInvalidEducation}
        />
        
        <CardContent className="p-4">
          {/* Formulaire de modification de l'éducation */}
          <form onSubmit={handleFormSubmit}>
            <div className="space-y-6">
              {/* Sélection du type d'éducation */}
              <EducationTypeSelector
                availablePaths={availablePaths}
                selectedEducationType={selectedEducationType}
                onSelectEducationType={handleEducationTypeChange}
                isInvalidEducation={isInvalidEducation}
                childGender={child.gender}
              />
              
              {/* Options spécifiques au type d'éducation sélectionné */}
              <EducationSpecialtySelector 
                educationType={selectedEducationType}
              />
              
              {/* Notes et objectifs d'éducation */}
              <EducationObjectives 
                educationType={selectedEducationType}
              />
              
              {/* Affichage des données actuelles si l'enfant a déjà une éducation */}
              <CurrentEducationStatus
                currentEducation={child.currentEducation}
                childGender={child.gender}
              />
              
              {/* Boutons d'action */}
              <EducationFormActions 
                onSubmit={onSubmit}
                isLoading={isSubmitting}
                childId={childId}
              />
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ChildEducationDetail;
