
import React, { createContext, useState, useContext, ReactNode, useCallback } from 'react';
import { useMaitreJeu } from '@/components/maitrejeu/context';
import { toast } from 'sonner';
import { Child, Preceptor, EducationType } from '../types/educationTypes';
import { EducationContextType, EducationProviderProps } from './types';

const EducationContext = createContext<EducationContextType | undefined>(undefined);

export const EducationProvider: React.FC<EducationProviderProps> = ({ children }) => {
  const { membres, updateMembreFamille } = useMaitreJeu();
  
  // État pour les enfants en éducation
  const [educationChildren, setEducationChildren] = useState<Child[]>([
    {
      id: "child-1",
      name: "Marcus Tullius Junior",
      age: 12,
      gender: "male",
      educationType: "politique",
      progress: 40,
      mentor: "preceptor-1",
      specialties: ["éloquence", "droit"]
    },
    {
      id: "child-2",
      name: "Tullia",
      age: 10,
      gender: "female",
      educationType: "arts",
      progress: 25,
      mentor: "preceptor-2",
      specialties: ["musique", "poésie"]
    },
    {
      id: "child-3",
      name: "Quintus Tullius",
      age: 8,
      gender: "male",
      educationType: "none",
      progress: 0,
      mentor: null,
      specialties: []
    }
  ]);
  
  // État pour les précepteurs disponibles
  const [preceptors, setPreceptors] = useState<Preceptor[]>([
    {
      id: "preceptor-1",
      name: "Lucius Aemilius",
      specialties: ["politique", "rhétorique"],
      expertise: 85,
      cost: 5000,
      reputation: 90,
      available: false,
      description: "Ancien sénateur respecté, spécialiste du droit romain et de l'éloquence.",
      skill: 85,
      specialty: "politique"
    },
    {
      id: "preceptor-2",
      name: "Claudia Metella",
      specialties: ["arts", "philosophie"],
      expertise: 75,
      cost: 4000,
      reputation: 80,
      available: false,
      description: "Issue d'une famille patricienne, experte en littérature et arts libéraux.",
      skill: 75,
      specialty: "arts"
    },
    {
      id: "preceptor-3",
      name: "Gaius Marius",
      specialties: ["militaire", "politique"],
      expertise: 90,
      cost: 6000,
      reputation: 85,
      available: true,
      description: "Ancien général et consul, expert en stratégie militaire et tactique politique.",
      skill: 90,
      specialty: "militaire"
    },
    {
      id: "preceptor-4",
      name: "Servilia",
      specialties: ["philosophie", "rhétorique"],
      expertise: 80,
      cost: 4500,
      reputation: 75,
      available: true,
      description: "Femme cultivée et influente, maîtresse des enseignements stoïciens.",
      skill: 80,
      specialty: "philosophie"
    },
    {
      id: "preceptor-5",
      name: "Marcus Antonius",
      specialties: ["religieuse", "politique"],
      expertise: 70,
      cost: 3800,
      reputation: 65,
      available: true,
      description: "Prêtre et homme politique, spécialiste des rites religieux et de la divination.",
      skill: 70,
      specialty: "religieuse"
    }
  ]);
  
  // États pour le tracking de l'éducation
  const [selectedChildId, setSelectedChildId] = useState<string | null>(null);
  const [isEducating, setIsEducating] = useState(false);
  const [educatingChildren, setEducatingChildren] = useState<{[key: string]: boolean}>({});
  const [hiredPreceptors, setHiredPreceptors] = useState<Preceptor[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  
  // Récupérer un enfant par son ID
  const getChild = (id: string) => {
    return educationChildren.find(child => child.id === id);
  };
  
  // Démarrer l'éducation d'un enfant
  const startEducation = (childId: string, type: string, mentorId: string, specialties: string[]) => {
    setEducationChildren(prev => prev.map(child => {
      if (child.id === childId) {
        return {
          ...child,
          educationType: type,
          mentor: mentorId,
          specialties,
          progress: 0
        };
      }
      return child;
    }));
    
    // Rendre le précepteur indisponible
    setPreceptors(prev => prev.map(p => {
      if (p.id === mentorId) {
        return { ...p, available: false };
      }
      return p;
    }));
    
    toast.success(`L'éducation de ${getChild(childId)?.name} en ${type} a débuté!`);
  };
  
  // Avancer l'éducation d'un enfant
  const advanceEducation = (childId: string) => {
    setIsEducating(true);
    setEducatingChildren(prev => ({ ...prev, [childId]: true }));
    
    setTimeout(() => {
      setEducationChildren(prev => prev.map(child => {
        if (child.id === childId) {
          const newProgress = Math.min(child.progress + 25, 100);
          
          return {
            ...child,
            progress: newProgress,
            age: child.age + 1
          };
        }
        return child;
      }));
      
      setIsEducating(false);
      setEducatingChildren(prev => ({ ...prev, [childId]: false }));
      
      const child = getChild(childId);
      if (child) {
        toast.success(`${child.name} a progressé dans son éducation!`);
        
        // Mettre à jour l'âge dans la base de données des membres
        const membre = membres.find(m => m.id === childId);
        if (membre) {
          updateMembreFamille(childId, { 
            age: membre.age + 1,
            education: child.specialties?.join(', ') || ''
          });
        }
        
        if (child.progress >= 100) {
          toast.success(`${child.name} a terminé son éducation en ${child.educationType}!`);
        }
      }
    }, 1500);
  };

  // Fonction pour avancer l'éducation d'une année (pour compatibilité)
  const advanceEducationYear = (childId: string) => {
    advanceEducation(childId);
  };
  
  // Terminer l'éducation d'un enfant
  const completeEducation = (childId: string) => {
    const child = getChild(childId);
    if (!child) return;
    
    // Libérer le précepteur
    if (child.mentor) {
      setPreceptors(prev => prev.map(p => {
        if (p.id === child.mentor) {
          return { ...p, available: true };
        }
        return p;
      }));
    }
    
    setEducationChildren(prev => prev.map(c => {
      if (c.id === childId) {
        return {
          ...c,
          educationType: "none",
          mentor: null,
          progress: 0
        };
      }
      return c;
    }));
    
    toast.success(`L'éducation de ${child.name} est terminée!`);
  };
  
  // Embaucher un précepteur
  const hirePreceptor = (preceptorId: string, childId: string = '') => {
    const preceptor = preceptors.find(p => p.id === preceptorId);
    
    if (!preceptor) return;
    
    // Si un enfant est spécifié, assigner directement
    if (childId) {
      const child = getChild(childId);
      
      if (child) {
        // Libérer l'ancien précepteur si existant
        if (child.mentor) {
          setPreceptors(prev => prev.map(p => {
            if (p.id === child.mentor) {
              return { ...p, available: true };
            }
            return p;
          }));
        }
        
        // Assigner le nouveau précepteur
        setPreceptors(prev => prev.map(p => {
          if (p.id === preceptorId) {
            return { ...p, available: false };
          }
          return p;
        }));
        
        // Mettre à jour l'enfant
        setEducationChildren(prev => prev.map(c => {
          if (c.id === childId) {
            return {
              ...c,
              mentor: preceptorId,
              educationType: preceptor.specialties[0] as EducationType // Par défaut, prendre la première spécialité
            };
          }
          return c;
        }));
        
        toast.success(`${preceptor.name} a été embauché pour éduquer ${child.name}!`);
      }
    } else {
      // Simplement ajouter aux précepteurs embauchés
      setHiredPreceptors(prev => [...prev, preceptor]);
      
      // Marquer comme indisponible dans la liste principale
      setPreceptors(prev => prev.map(p => {
        if (p.id === preceptorId) {
          return { ...p, available: false };
        }
        return p;
      }));
      
      toast.success(`${preceptor.name} a été embauché comme précepteur!`);
    }
  };
  
  // Licencier un précepteur
  const firePreceptor = (preceptorId: string) => {
    // Identifier l'enfant associé à ce précepteur
    const child = educationChildren.find(c => c.mentor === preceptorId);
    
    if (child) {
      // Mettre à jour l'enfant
      setEducationChildren(prev => prev.map(c => {
        if (c.id === child.id) {
          return {
            ...c,
            mentor: null,
            educationType: "none",
            progress: 0
          };
        }
        return c;
      }));
    }
    
    // Libérer le précepteur
    setPreceptors(prev => prev.map(p => {
      if (p.id === preceptorId) {
        return { ...p, available: true };
      }
      return p;
    }));
    
    // Retirer des précepteurs embauchés
    setHiredPreceptors(prev => prev.filter(p => p.id !== preceptorId));
    
    const preceptor = preceptors.find(p => p.id === preceptorId);
    toast.success(`${preceptor?.name} a été libéré de ses fonctions.`);
  };

  // Assigner un précepteur à un enfant
  const assignPreceptorToChild = (preceptorId: string, childId: string) => {
    const preceptor = hiredPreceptors.find(p => p.id === preceptorId) || 
                      preceptors.find(p => p.id === preceptorId);
    const child = getChild(childId);
    
    if (!preceptor || !child) return;
    
    // Libérer l'ancien précepteur si existant
    if (child.mentor) {
      setHiredPreceptors(prev => prev.map(p => {
        if (p.id === child.mentor) {
          return { ...p, childId: null };
        }
        return p;
      }));
    }
    
    // Assigner le nouveau précepteur
    setHiredPreceptors(prev => prev.map(p => {
      if (p.id === preceptorId) {
        return { ...p, childId };
      }
      return p;
    }));
    
    // Mettre à jour l'enfant
    setEducationChildren(prev => prev.map(c => {
      if (c.id === childId) {
        return {
          ...c,
          mentor: preceptorId
        };
      }
      return c;
    }));
    
    toast.success(`${preceptor.name} a été assigné à l'éducation de ${child.name}!`);
  };

  // Mettre à jour le nom d'un enfant
  const updateChildName = (childId: string, newName: string) => {
    setEducationChildren(prev => prev.map(child => {
      if (child.id === childId) {
        return { ...child, name: newName };
      }
      return child;
    }));
    toast.success(`Nom mis à jour: ${newName}`);
  };

  // Récupérer les précepteurs par type
  const loadPreceptorsByType = (type: string): Preceptor[] => {
    return preceptors.filter(p => 
      p.specialties.includes(type) || 
      p.specialty === type
    );
  };

  // Rafraîchir la liste des précepteurs
  const refreshPreceptors = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };
  
  const value: EducationContextType = {
    children: educationChildren,
    preceptors,
    hiredPreceptors,
    selectedChildId,
    isLoading,
    isEducating,
    educatingChildren,
    setSelectedChildId,
    getChild,
    startEducation,
    advanceEducation,
    advanceEducationYear,
    completeEducation,
    hirePreceptor,
    firePreceptor,
    assignPreceptorToChild,
    updateChildName,
    loadPreceptorsByType,
    refreshPreceptors
  };
  
  return (
    <EducationContext.Provider value={value}>
      {children}
    </EducationContext.Provider>
  );
};

export const useEducation = () => {
  const context = useContext(EducationContext);
  if (!context) {
    throw new Error('useEducation must be used within an EducationProvider');
  }
  return context;
};
