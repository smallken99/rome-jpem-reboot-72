
import { useState, useCallback } from 'react';
import { Child, Preceptor, EducationType } from '../types/educationTypes';
import { Character } from '@/types/character';
import { toast } from 'sonner';
import { usePreceptorManagement } from './usePreceptorManagement';

export const useEducationManagement = (
  children: Child[],
  setChildren: React.Dispatch<React.SetStateAction<Child[]>>,
  characters: Character[],
  updateCharacter: (id: string, updates: Partial<Character>) => void
) => {
  const [educatingChildren, setEducatingChildren] = useState<string[]>([]);
  const { hiredPreceptors, hirePreceptor } = usePreceptorManagement();
  
  // Démarrer l'éducation d'un enfant
  const startChildEducation = useCallback((childId: string, educationType: string, mentorId: string | null = null) => {
    // Trouver l'enfant
    const child = children.find(c => c.id === childId);
    
    if (!child) {
      toast.error("Enfant non trouvé");
      return;
    }
    
    if (child.educationType !== 'none') {
      toast.error(`${child.name} est déjà en cours d'éducation`);
      return;
    }
    
    // Mettre à jour l'enfant
    setChildren(prev => prev.map(c => 
      c.id === childId 
        ? { 
            ...c, 
            educationType: educationType as EducationType, 
            progress: 0, 
            currentEducation: {
              type: educationType as EducationType,
              mentor: mentorId,
              progress: 0,
              skills: [],
              yearsCompleted: 0,
              totalYears: 3
            }
          } 
        : c
    ));
    
    // Mettre à jour le personnage correspondant
    const character = characters.find(char => char.id === childId);
    if (character) {
      updateCharacter(childId, {
        educationType: educationType as EducationType,
        currentEducation: {
          type: educationType,
          mentor: null,
          mentorId,
          progress: 0,
          skills: [],
          yearsCompleted: 0,
          totalYears: 3
        }
      });
    }
    
    setEducatingChildren(prev => [...prev, childId]);
    
    toast.success(`L'éducation ${educationType} a commencé pour ${child.name}`);
  }, [children, setChildren, characters, updateCharacter]);
  
  // Avancer l'éducation d'un enfant d'une année
  const advanceEducationYear = useCallback((childId: string) => {
    // Trouver l'enfant
    const child = children.find(c => c.id === childId);
    
    if (!child || child.educationType === 'none') {
      toast.error("Aucune éducation en cours pour cet enfant");
      return;
    }
    
    // Calculer la nouvelle progression (33% par an pour une éducation de 3 ans)
    const newProgress = Math.min(child.progress + 33, 100);
    
    // Mettre à jour l'enfant
    setChildren(prev => prev.map(c => 
      c.id === childId 
        ? { 
            ...c, 
            progress: newProgress,
            currentEducation: c.currentEducation 
              ? {
                  ...c.currentEducation,
                  progress: newProgress,
                  yearsCompleted: (c.currentEducation.yearsCompleted || 0) + 1
                }
              : undefined
          } 
        : c
    ));
    
    // Mettre à jour le personnage correspondant
    const character = characters.find(char => char.id === childId);
    if (character && character.currentEducation) {
      updateCharacter(childId, {
        currentEducation: {
          ...character.currentEducation,
          progress: newProgress,
          yearsCompleted: (character.currentEducation.yearsCompleted || 0) + 1
        }
      });
    }
    
    toast.success(`L'éducation de ${child.name} a progressé à ${newProgress}%`);
    
    // Si l'éducation est terminée
    if (newProgress >= 100) {
      toast.info(`L'éducation de ${child.name} peut maintenant être finalisée`);
    }
  }, [children, setChildren, characters, updateCharacter]);
  
  // Compléter l'éducation d'un enfant
  const completeEducation = useCallback((childId: string) => {
    // Trouver l'enfant
    const child = children.find(c => c.id === childId);
    
    if (!child || child.educationType === 'none' || child.progress < 100) {
      toast.error("L'éducation n'est pas prête à être complétée");
      return;
    }
    
    // Préparer les compétences acquises selon le type d'éducation
    const acquiredSkills = getSkillsByEducationType(child.educationType);
    
    // Mettre à jour l'enfant
    setChildren(prev => prev.map(c => 
      c.id === childId 
        ? { 
            ...c, 
            educationType: 'none' as EducationType,
            progress: 0,
            specialties: [...(c.specialties || []), ...acquiredSkills],
            currentEducation: undefined
          } 
        : c
    ));
    
    // Mettre à jour le personnage correspondant
    const character = characters.find(char => char.id === childId);
    if (character) {
      updateCharacter(childId, {
        education: {
          type: child.educationType,
          specialties: [...(character.education?.specialties || []), ...acquiredSkills],
          mentor: character.currentEducation?.mentor || null,
          completed: true,
          completedAt: new Date().toISOString()
        },
        currentEducation: undefined
      });
    }
    
    setEducatingChildren(prev => prev.filter(id => id !== childId));
    
    toast.success(`L'éducation de ${child.name} est terminée avec succès !`);
    
    return child;
  }, [children, setChildren, characters, updateCharacter]);
  
  // Fonction utilitaire pour obtenir les compétences selon le type d'éducation
  const getSkillsByEducationType = (educationType: string): string[] => {
    switch (educationType) {
      case 'military':
        return ['Tactique de combat', 'Commandement'];
      case 'rhetoric':
        return ['Éloquence', 'Argumentation'];
      case 'political':
        return ['Négociation politique', 'Droit romain'];
      case 'religious':
        return ['Rites sacrificiels', 'Interprétation des présages'];
      case 'philosophical':
        return ['Logique', 'Éthique'];
      default:
        return ['Connaissance générale'];
    }
  };
  
  return {
    educatingChildren,
    startChildEducation,
    advanceEducationYear,
    completeEducation,
    hiredPreceptors
  };
};
