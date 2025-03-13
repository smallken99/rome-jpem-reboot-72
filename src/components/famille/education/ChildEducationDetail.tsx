
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
    if (child && child.currentEducation) {
      setSelectedType(child.currentEducation.type || 'none');
      setSelectedSpecialties(child.currentEducation.skills || []);
      
      // Si l'enfant a un mentor, trouve son ID dans la liste des précepteurs engagés
      if (child.currentEducation.mentor) {
        const preceptor = hiredPreceptors.find(p => p.name === child.currentEducation?.mentor);
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
    return !p.childId || p.childId === childId;
  });
  
  // Gérer la soumission du formulaire
  const handleSubmit = () => {
    if (selectedType === 'none') {
      toast.error("Veuillez sélectionner un type d'éducation");
      return;
    }
    
    setIsSubmitting(true);
    
    // Utiliser le contexte pour démarrer l'éducation
    startChildEducation(childId, selectedType, selectedMentor);
    
    setIsSubmitting(false);
    toast.success(`Éducation configurée pour ${child.name}`);
    navigate('/famille/education');
  };
  
  return (
    <div className="space-y-6">
      {/* En-tête avec les informations de l'enfant */}
      <ChildHeader 
        child={child}
      />
      
      {/* Avertissement si l'enfant est déjà en éducation */}
      {child.currentEducation && child.currentEducation.type !== 'none' && (
        <EducationWarning 
          text={`${child.name} est déjà engagé dans une éducation de type ${child.currentEducation.type}. Changer son éducation annulera ses progrès actuels.`}
        />
      )}
      
      {/* Sélecteur de type d'éducation */}
      <EducationTypeSelector 
        value={selectedType} 
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
        <div className="space-y-2">
          <h3 className="text-lg font-medium">Précepteur</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Choisissez un précepteur pour améliorer l'éducation de votre enfant.
          </p>
          <select
            className="w-full p-2 border rounded"
            value={selectedMentor || ''}
            onChange={(e) => setSelectedMentor(e.target.value || null)}
          >
            <option value="">Aucun précepteur (autodidacte)</option>
            {availableMentors.map(mentor => (
              <option key={mentor.id} value={mentor.id}>
                {mentor.name} - {mentor.specialty}
              </option>
            ))}
          </select>
        </div>
      )}
      
      {/* Information sur les bonus de statistiques */}
      {selectedType !== 'none' && (
        <StatBonusInfo 
          educationType={selectedType}
          statBonus={selectedMentor ? 25 : 15}
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
