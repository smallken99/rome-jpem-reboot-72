
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useEducation } from './context/EducationContext';
import { ChildHeader } from './components/ChildHeader';
import { EducationTypeSelector } from './components/EducationTypeSelector';
import { EducationSpecialtySelector } from './components/EducationSpecialtySelector';
import { PietyBonus } from './components/PietyBonus';
import { StatBonusInfo } from './components/StatBonusInfo';
import { ChildNotFound } from './components/ChildNotFound';
import { EducationFormActions } from './components/EducationFormActions';
import { EducationWarning } from './components/EducationWarning';
import { MentorInfo } from './components/MentorInfo';
import { toast } from 'sonner';

const ChildEducationDetail: React.FC = () => {
  const { childId } = useParams<{ childId: string }>();
  const navigate = useNavigate();
  const { 
    children, 
    hiredPreceptors, 
    startChildEducation 
  } = useEducation();
  
  // Trouver l'enfant dans notre contexte d'éducation
  const child = children.find(c => c.id === childId);
  
  // États du formulaire
  const [selectedType, setSelectedType] = useState<string>('none');
  const [selectedSpecialties, setSelectedSpecialties] = useState<string[]>([]);
  const [selectedMentor, setSelectedMentor] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Charger les données existantes de l'enfant
  useEffect(() => {
    if (child) {
      setSelectedType(child.currentEducation.type || 'none');
      setSelectedSpecialties(child.currentEducation.skills || []);
      
      // Si l'enfant a un mentor, trouve son ID dans la liste des précepteurs engagés
      if (child.currentEducation.mentor) {
        const preceptor = hiredPreceptors.find(p => p.name === child.currentEducation.mentor);
        if (preceptor) {
          setSelectedMentor(preceptor.id);
        }
      }
    }
  }, [child, hiredPreceptors]);
  
  // Si l'enfant n'est pas trouvé
  if (!childId || !child) {
    return <ChildNotFound />;
  }
  
  // Filtrer les précepteurs disponibles pour ce type d'éducation
  const availableMentors = hiredPreceptors.filter(p => {
    // Un précepteur est disponible s'il n'est pas assigné à un enfant 
    // ou s'il est déjà assigné à cet enfant
    const isAvailable = !p.childId || p.childId === childId;
    return isAvailable;
  });
  
  // Gérer la soumission du formulaire
  const handleSubmit = () => {
    if (selectedType === 'none') {
      toast.error("Veuillez sélectionner un type d'éducation");
      return;
    }
    
    setIsSubmitting(true);
    
    // Utiliser le contexte pour démarrer l'éducation
    const success = startChildEducation(
      childId,
      selectedType,
      selectedMentor,
      selectedSpecialties
    );
    
    setIsSubmitting(false);
    
    if (success) {
      toast.success(`Éducation configurée pour ${child.name}`);
      navigate('/famille/education');
    } else {
      toast.error("Une erreur est survenue lors de la configuration de l'éducation");
    }
  };
  
  return (
    <div className="space-y-6">
      {/* En-tête avec les informations de l'enfant */}
      <ChildHeader 
        name={child.name} 
        age={child.age} 
        gender={child.gender} 
      />
      
      {/* Avertissement si l'enfant est déjà en éducation */}
      {child.currentEducation && child.currentEducation.type !== 'none' && (
        <EducationWarning 
          name={child.name}
          currentEducationType={child.currentEducation.type}
        />
      )}
      
      {/* Sélecteur de type d'éducation */}
      <EducationTypeSelector 
        selectedType={selectedType} 
        onChange={setSelectedType} 
        childGender={child.gender}
      />
      
      {/* Sélecteur de spécialités */}
      {selectedType !== 'none' && (
        <EducationSpecialtySelector
          educationType={selectedType}
          selectedSpecialties={selectedSpecialties}
          onChange={setSelectedSpecialties}
        />
      )}
      
      {/* Sélection du mentor */}
      {selectedType !== 'none' && (
        <MentorInfo 
          mentors={availableMentors}
          selectedMentor={selectedMentor}
          onChange={setSelectedMentor}
        />
      )}
      
      {/* Information sur les bonus de statistiques */}
      {selectedType !== 'none' && (
        <StatBonusInfo 
          hasMentor={!!selectedMentor} 
          educationType={selectedType}
        />
      )}
      
      {/* Bonus de piété (pour les éducations religieuses) */}
      {selectedType === 'religious' && (
        <PietyBonus 
          bonus={10}
        />
      )}
      
      {/* Boutons d'action */}
      <EducationFormActions 
        onSubmit={handleSubmit}
        isLoading={isSubmitting}
        childId={childId}
      />
    </div>
  );
};

export default ChildEducationDetail;
