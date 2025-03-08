
import React, { useState, useEffect } from 'react';
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
import { useEducation } from './context/EducationContext';
import { useToast } from '@/hooks/use-toast';
import { educationPaths } from './data';
import { EducationPath } from './types/educationTypes';

export const ChildEducationDetail = () => {
  const { childId } = useParams<{ childId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedEducationType, setSelectedEducationType] = useState<string>('none');
  const [selectedSpecialties, setSelectedSpecialties] = useState<string[]>([]);
  const [availablePaths, setAvailablePaths] = useState<EducationPath[]>([]);
  
  // Get child data and functions from our context
  const { 
    children, 
    hiredPreceptors,
    startChildEducation
  } = useEducation();
  
  // Find the child
  const child = childId ? children.find(c => c.id === childId) : null;
  
  // Set initial education type from child's current education
  useEffect(() => {
    if (child) {
      setSelectedEducationType(child.currentEducation.type);
      setSelectedSpecialties(child.currentEducation.skills || []);
      
      // Filter education paths based on child's gender and age
      const filteredPaths = educationPaths.filter(path => {
        const genderMatch = path.suitableFor === 'both' || 
                          (path.suitableFor === 'male' && child.gender === 'male') ||
                          (path.suitableFor === 'female' && child.gender === 'female');
        const ageMatch = child.age >= path.minAge;
        return genderMatch && ageMatch;
      });
      
      setAvailablePaths(filteredPaths);
    }
  }, [child]);
  
  // Check if selected education is invalid
  const isInvalidEducation = child?.gender === 'female' && selectedEducationType === 'military';
  
  // Handle education type change
  const handleEducationTypeChange = (type: string) => {
    setSelectedEducationType(type);
  };
  
  // Handle specialty selection
  const handleSpecialtyChange = (specialty: string, isSelected: boolean) => {
    if (isSelected) {
      setSelectedSpecialties(prev => [...prev, specialty]);
    } else {
      setSelectedSpecialties(prev => prev.filter(s => s !== specialty));
    }
  };
  
  // Handle education form submission
  const handleSubmit = () => {
    if (isInvalidEducation) {
      toast({
        title: "Éducation invalide",
        description: "L'éducation militaire n'est pas recommandée pour une fille romaine.",
        variant: "destructive",
      });
      return;
    }
    
    if (!childId) return;
    
    setIsSubmitting(true);
    
    // Find an appropriate mentor from hired preceptors
    const availableMentors = hiredPreceptors.filter(p => {
      // Filter by preceptor speciality or lack of assignment
      return !p.childId || p.childId === childId;
    });
    
    // Choose first available mentor or null if none
    const selectedMentor = availableMentors.length > 0 ? availableMentors[0].id : null;
    
    // Start the education
    const success = startChildEducation(
      childId, 
      selectedEducationType, 
      selectedMentor, 
      selectedSpecialties
    );
    
    if (success) {
      toast({
        title: "Éducation modifiée",
        description: `L'éducation de ${child?.name} a été mise à jour avec succès.`,
      });
      
      // Redirect back to education page
      setTimeout(() => {
        setIsSubmitting(false);
        navigate('/famille/education');
      }, 1500);
    } else {
      setIsSubmitting(false);
      toast({
        title: "Erreur",
        description: "Impossible de démarrer l'éducation",
        variant: "destructive",
      });
    }
  };
  
  // If the child isn't found, display not found component
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
          <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
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
                selectedSpecialties={selectedSpecialties}
                onSpecialtyChange={handleSpecialtyChange}
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
                onSubmit={handleSubmit}
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
