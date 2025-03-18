
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Child, Preceptor, EducationHistory } from '../types/educationTypes';
import { useChildrenManagement } from '../hooks/useChildrenManagement';
import { usePreceptorsManagement } from '../hooks/usePreceptorsManagement';
import { toast } from 'sonner';
import { Character } from '@/types/character';

// Définition du contexte
interface EducationContextType {
  children: Child[];
  preceptors: Preceptor[];
  educationHistory: EducationHistory[];
  selectedChildId: string | null;
  isEducating: boolean;
  educatingChildren: Record<string, boolean>;

  // Actions pour les enfants
  setSelectedChildId: (id: string | null) => void;
  updateChildName: (childId: string, newName: string) => void;
  updateChildEducation: (childId: string, educationType: string, specialties: string[], mentor: string | null) => void;
  advanceEducation: (childId: string) => void;
  completeEducation: (childId: string) => void;
  
  // Actions pour les précepteurs
  hirePreceptor: (preceptorId: string, childId?: string) => void;
  firePreceptor: (preceptorId: string) => void;
  assignPreceptor: (preceptorId: string, childId: string) => void;
  
  // Utilities
  getMentorForChild: (childId: string) => Preceptor | null;
  getSpecialtiesForEducationType: (type: string) => string[];
  getChildById: (id: string) => Child | undefined;
  getPreceptorById: (id: string) => Preceptor | undefined;
  
  // Advanced
  calculateEducationCost: () => number;
  getChildrenByEducationType: (type: string) => Child[];
  getAvailablePreceptors: () => Preceptor[];
  getHiredPreceptors: () => Preceptor[];
}

// Création du contexte avec une valeur par défaut
const EducationContext = createContext<EducationContextType>({} as EducationContextType);

// Hook personnalisé pour utiliser le contexte
export const useEducation = () => useContext(EducationContext);

// Provider du contexte
export const EducationProvider: React.FC<{
  children: React.ReactNode;
  initialCharacters?: Character[];
}> = ({ children, initialCharacters = [] }) => {
  // Utilisation des hooks de gestion
  const { educationChildren, setEducationChildren, updateChildName } = useChildrenManagement(initialCharacters);
  const { preceptors, setPreceptors } = usePreceptorsManagement();
  
  // États supplémentaires
  const [selectedChildId, setSelectedChildId] = useState<string | null>(null);
  const [educationHistory, setEducationHistory] = useState<EducationHistory[]>([]);
  const [educatingChildren, setEducatingChildren] = useState<Record<string, boolean>>({});
  
  // Déterminer si une éducation est en cours
  const isEducating = Object.values(educatingChildren).some(value => value);
  
  // Mettre à jour l'éducation d'un enfant
  const updateChildEducation = (childId: string, educationType: string, specialties: string[], mentor: string | null) => {
    setEducationChildren(prev => {
      return prev.map(child => {
        if (child.id === childId) {
          return {
            ...child,
            educationType,
            specialties,
            mentor,
            progress: 0
          };
        }
        return child;
      });
    });
    
    toast.success(`Éducation mise à jour pour ${educationChildren.find(c => c.id === childId)?.name}`);
  };
  
  // Faire avancer l'éducation d'un enfant
  const advanceEducation = (childId: string) => {
    setEducatingChildren(prev => ({ ...prev, [childId]: true }));
    
    // Simuler le temps d'avancement
    setTimeout(() => {
      setEducationChildren(prev => {
        return prev.map(child => {
          if (child.id === childId) {
            const newProgress = Math.min(100, (child.progress || 0) + 25);
            return {
              ...child,
              progress: newProgress
            };
          }
          return child;
        });
      });
      
      setEducatingChildren(prev => ({ ...prev, [childId]: false }));
      toast.success(`Éducation avancée pour ${educationChildren.find(c => c.id === childId)?.name}`);
    }, 1500);
  };
  
  // Terminer l'éducation d'un enfant
  const completeEducation = (childId: string) => {
    const child = educationChildren.find(c => c.id === childId);
    
    if (!child) return;
    
    // Ajouter à l'historique
    setEducationHistory(prev => [
      ...prev,
      {
        type: child.educationType,
        mentor: child.mentor,
        specialties: child.specialties,
        completedAt: child.age
      }
    ]);
    
    // Réinitialiser l'éducation de l'enfant
    setEducationChildren(prev => {
      return prev.map(c => {
        if (c.id === childId) {
          return {
            ...c,
            educationType: 'none',
            mentor: null,
            progress: 0,
            specialties: []
          };
        }
        return c;
      });
    });
    
    toast.success(`Éducation terminée pour ${child.name}`);
  };
  
  // Embaucher un précepteur
  const hirePreceptor = (preceptorId: string, childId?: string) => {
    setPreceptors(prev => {
      return prev.map(p => {
        if (p.id === preceptorId) {
          return {
            ...p,
            available: false,
            childId
          };
        }
        return p;
      });
    });
    
    if (childId) {
      const preceptor = preceptors.find(p => p.id === preceptorId);
      
      setEducationChildren(prev => {
        return prev.map(child => {
          if (child.id === childId) {
            return {
              ...child,
              mentor: preceptor?.name || null
            };
          }
          return child;
        });
      });
    }
    
    toast.success(`Précepteur embauché avec succès`);
  };
  
  // Licencier un précepteur
  const firePreceptor = (preceptorId: string) => {
    const preceptor = preceptors.find(p => p.id === preceptorId);
    
    if (preceptor?.childId) {
      setEducationChildren(prev => {
        return prev.map(child => {
          if (child.id === preceptor.childId) {
            return {
              ...child,
              mentor: null
            };
          }
          return child;
        });
      });
    }
    
    setPreceptors(prev => {
      return prev.map(p => {
        if (p.id === preceptorId) {
          return {
            ...p,
            available: true,
            childId: null
          };
        }
        return p;
      });
    });
    
    toast.success(`Précepteur renvoyé`);
  };
  
  // Assigner un précepteur à un enfant
  const assignPreceptor = (preceptorId: string, childId: string) => {
    const preceptor = preceptors.find(p => p.id === preceptorId);
    
    if (!preceptor) return;
    
    // Mettre à jour l'enfant
    setEducationChildren(prev => {
      return prev.map(child => {
        if (child.id === childId) {
          return {
            ...child,
            mentor: preceptor.name
          };
        }
        return child;
      });
    });
    
    // Mettre à jour le précepteur
    setPreceptors(prev => {
      return prev.map(p => {
        if (p.id === preceptorId) {
          return {
            ...p,
            childId
          };
        }
        return p;
      });
    });
    
    toast.success(`Précepteur assigné à ${educationChildren.find(c => c.id === childId)?.name}`);
  };
  
  // Obtenir le mentor pour un enfant
  const getMentorForChild = (childId: string): Preceptor | null => {
    const preceptor = preceptors.find(p => p.childId === childId);
    return preceptor || null;
  };
  
  // Obtenir les spécialités pour un type d'éducation
  const getSpecialtiesForEducationType = (type: string): string[] => {
    switch (type) {
      case 'military':
        return ['Tactique', 'Leadership', 'Stratégie', 'Combat'];
      case 'rhetorique':
      case 'rhetoric':
        return ['Éloquence', 'Persuasion', 'Débat', 'Littérature'];
      case 'religious':
      case 'religieuse':
        return ['Rituels', 'Prière', 'Divination', 'Traditions'];
      case 'politique':
      case 'political':
        return ['Négociation', 'Diplomatie', 'Administration', 'Lois'];
      default:
        return [];
    }
  };
  
  // Obtenir un enfant par son ID
  const getChildById = (id: string): Child | undefined => {
    return educationChildren.find(child => child.id === id);
  };
  
  // Obtenir un précepteur par son ID
  const getPreceptorById = (id: string): Preceptor | undefined => {
    return preceptors.find(p => p.id === id);
  };
  
  // Calculer le coût total de l'éducation
  const calculateEducationCost = (): number => {
    return preceptors
      .filter(p => !p.available)
      .reduce((total, p) => total + p.cost, 0);
  };
  
  // Obtenir les enfants par type d'éducation
  const getChildrenByEducationType = (type: string): Child[] => {
    return educationChildren.filter(child => child.educationType === type);
  };
  
  // Obtenir les précepteurs disponibles
  const getAvailablePreceptors = (): Preceptor[] => {
    return preceptors.filter(p => p.available);
  };
  
  // Obtenir les précepteurs embauchés
  const getHiredPreceptors = (): Preceptor[] => {
    return preceptors.filter(p => !p.available);
  };
  
  // Valeur du contexte
  const contextValue: EducationContextType = {
    children: educationChildren,
    preceptors,
    educationHistory,
    selectedChildId,
    isEducating,
    educatingChildren,
    
    setSelectedChildId,
    updateChildName,
    updateChildEducation,
    advanceEducation,
    completeEducation,
    
    hirePreceptor,
    firePreceptor,
    assignPreceptor,
    
    getMentorForChild,
    getSpecialtiesForEducationType,
    getChildById,
    getPreceptorById,
    
    calculateEducationCost,
    getChildrenByEducationType,
    getAvailablePreceptors,
    getHiredPreceptors
  };
  
  return (
    <EducationContext.Provider value={contextValue}>
      {children}
    </EducationContext.Provider>
  );
};
