import React, { createContext, useContext, useState, useCallback, ReactNode, useEffect } from 'react';
import { Child, Preceptor, EducationType, Gender } from '../types/educationTypes';
import { Character } from '@/types/character';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'sonner';
import { militaryPath, religiousPath, rhetoricPath, academicPath } from '../data/paths';
import { EducationContextType, EducationProviderProps } from './types';

const EducationContext = createContext<EducationContextType | undefined>(undefined);

export const EducationProvider: React.FC<EducationProviderProps> = ({ 
  children, 
  characters = [],
  onCharacterUpdate
}) => {
  const initializeChildrenFromCharacters = () => {
    if (characters && characters.length > 0) {
      return characters
        .filter(char => char.age < 21)
        .map(char => ({
          id: char.id,
          name: char.name,
          age: char.age,
          gender: char.gender as Gender,
          educationType: char.education?.type as EducationType || 'none',
          progress: char.currentEducation?.progress || 0,
          preceptorId: char.currentEducation?.mentorId,
          specialties: char.education?.specialties || [],
          status: char.currentEducation?.progress === 100 ? 'completed' : 'in_progress'
        }));
    }
    return [
      {
        id: '1',
        name: 'Lucius Cornelius',
        age: 10,
        gender: 'male' as Gender,
        educationType: 'military',
        progress: 35,
        preceptorId: '2'
      },
      {
        id: '2',
        name: 'Julia Cornelia',
        age: 12,
        gender: 'female' as Gender,
        educationType: 'rhetoric',
        progress: 60
      },
      {
        id: '3',
        name: 'Marcus Cornelius',
        age: 8,
        gender: 'male' as Gender,
        educationType: 'none',
        progress: 0
      }
    ] as Child[];
  };

  const [childrenData, setChildrenData] = useState<Child[]>(initializeChildrenFromCharacters());
  
  useEffect(() => {
    if (characters && characters.length > 0) {
      setChildrenData(initializeChildrenFromCharacters());
    }
  }, [characters]);
  
  const [preceptorsData, setPreceptorsData] = useState<Preceptor[]>([
    {
      id: '1',
      name: 'Quintus Servilius',
      specialty: 'rhetoric',
      price: 5000,
      quality: 85,
      experience: 15,
      assigned: false,
      teachingStyle: 'Discursif'
    },
    {
      id: '2',
      name: 'Gaius Flavius',
      specialty: 'military',
      price: 8000,
      quality: 90,
      experience: 20,
      assigned: true,
      teachingStyle: 'Rigoureux'
    },
    {
      id: '3',
      name: 'Titus Livius',
      specialty: 'academic',
      price: 6000,
      quality: 95,
      experience: 25,
      assigned: false,
      teachingStyle: 'Pédagogique'
    }
  ]);
  
  const [educatingChildrenIds, setEducatingChildrenIds] = useState<string[]>([]);
  const [isEducatingMap, setIsEducatingMap] = useState<Record<string, boolean>>({});
  
  const [hiredPreceptors, setHiredPreceptors] = useState<Preceptor[]>([]);
  const [selectedChildId, setSelectedChildId] = useState<string | null>(null);
  
  const syncCharacterChanges = useCallback((childId: string, updates: Partial<Child>) => {
    if (!onCharacterUpdate) return;
    
    const character = characters.find(c => c.id === childId);
    if (!character) return;
    
    const characterUpdates: Partial<Character> = {};
    
    if (updates.educationType) {
      characterUpdates.education = {
        ...character.education,
        type: updates.educationType,
        specialties: updates.specialties || []
      };
    }
    
    if (updates.progress !== undefined) {
      characterUpdates.currentEducation = {
        ...character.currentEducation,
        progress: updates.progress,
        type: updates.educationType || character.currentEducation?.type || 'none',
        mentor: updates.mentor || character.currentEducation?.mentor || null
      };
    }
    
    if (updates.name) {
      characterUpdates.name = updates.name;
    }
    
    onCharacterUpdate(childId, characterUpdates);
  }, [characters, onCharacterUpdate]);
  
  const addChild = useCallback((child: Omit<Child, 'id' | 'progress'>): string => {
    const id = uuidv4();
    const newChild: Child = {
      ...child,
      id,
      progress: 0
    };
    
    setChildrenData(prev => [...prev, newChild]);
    toast.success(`${child.name} a été ajouté(e) à la famille`);
    return id;
  }, []);
  
  const removeChild = useCallback((id: string) => {
    setChildrenData(prev => prev.filter(child => child.id !== id));
    toast.success(`L'enfant a été retiré de la famille`);
  }, []);
  
  const updateChildName = useCallback((id: string, name: string) => {
    setChildrenData(prev => 
      prev.map(child => 
        child.id === id ? { ...child, name } : child
      )
    );
    
    syncCharacterChanges(id, { name });
  }, [syncCharacterChanges]);
  
  const updateChildEducation = useCallback((id: string, educationType: EducationType) => {
    setChildrenData(prev => 
      prev.map(child => 
        child.id === id ? { ...child, educationType, progress: 0 } : child
      )
    );
    
    syncCharacterChanges(id, { educationType, progress: 0 });
    
    toast.success("Type d'éducation mis à jour");
  }, [syncCharacterChanges]);
  
  const assignPreceptorToChild = useCallback((childId: string, preceptorId: string) => {
    setChildrenData(prev => 
      prev.map(child => 
        child.id === childId ? { ...child, preceptorId } : child
      )
    );
    
    setPreceptorsData(prev => 
      prev.map(preceptor => 
        preceptor.id === preceptorId ? { ...preceptor, assigned: true, childId } : preceptor
      )
    );
    
    const preceptor = preceptorsData.find(p => p.id === preceptorId);
    const child = childrenData.find(c => c.id === childId);
    
    if (preceptor && child) {
      syncCharacterChanges(childId, { 
        mentor: preceptor.name,
        preceptorId
      });
      
      toast.success(`${preceptor.name} a été assigné à l'éducation de ${child.name}`);
    }
  }, [childrenData, preceptorsData, syncCharacterChanges]);
  
  const getChild = useCallback((id: string) => {
    return childrenData.find(child => child.id === id);
  }, [childrenData]);
  
  const getChildById = useCallback((id: string) => {
    return getChild(id);
  }, [getChild]);
  
  const handleSelectedChildChange = useCallback((id: string | null) => {
    setSelectedChildId(id);
  }, []);
  
  const startEducation = useCallback((childId: string, educationType?: EducationType, mentorId?: string, specialties?: string[]) => {
    const child = childrenData.find(c => c.id === childId);
    
    if (!child) {
      toast.error("Enfant introuvable");
      return;
    }
    
    const type = educationType || child.educationType;
    
    if (type === 'none') {
      toast.error("Aucun type d'éducation n'a été assigné");
      return;
    }
    
    setChildrenData(prev => 
      prev.map(c => {
        if (c.id === childId) {
          return { 
            ...c, 
            educationType: type as EducationType,
            specialties: specialties || c.specialties,
            progress: 0
          };
        }
        return c;
      })
    );
    
    if (mentorId) {
      assignPreceptorToChild(childId, mentorId);
    }
    
    setEducatingChildrenIds(prev => [...prev, childId]);
    setIsEducatingMap(prev => ({ ...prev, [childId]: true }));
    
    syncCharacterChanges(childId, { 
      educationType: type as EducationType,
      specialties,
      progress: 0,
      mentor: mentorId ? preceptorsData.find(p => p.id === mentorId)?.name : null
    });
    
    toast.success(`L'éducation de ${child.name} a commencé`);
  }, [childrenData, assignPreceptorToChild, syncCharacterChanges, preceptorsData]);
  
  const advanceEducationYear = useCallback((childId: string) => {
    const child = childrenData.find(c => c.id === childId);
    
    if (!child) {
      toast.error("Enfant introuvable");
      return;
    }
    
    if (child.educationType === 'none') {
      toast.error("Aucun type d'éducation n'a été assigné");
      return;
    }
    
    setIsEducatingMap(prev => ({ ...prev, [childId]: true }));
    
    setTimeout(() => {
      setChildrenData(prev => 
        prev.map(c => {
          if (c.id === childId) {
            let progressIncrease = 15;
            
            if (c.preceptorId) {
              const preceptor = preceptorsData.find(p => p.id === c.preceptorId);
              if (preceptor) {
                progressIncrease = 10 + Math.floor(preceptor.quality / 10);
              }
            }
            
            const newProgress = Math.min(100, c.progress + progressIncrease);
            
            syncCharacterChanges(childId, { progress: newProgress });
            
            return { ...c, progress: newProgress };
          }
          return c;
        })
      );
      
      setIsEducatingMap(prev => ({ ...prev, [childId]: false }));
      
      toast.success(`L'éducation de ${child.name} a progressé !`);
    }, 2000);
  }, [childrenData, preceptorsData, syncCharacterChanges]);
  
  const advanceEducation = useCallback((childId: string) => {
    advanceEducationYear(childId);
  }, [advanceEducationYear]);
  
  const findEducationPathById = useCallback((pathType: string) => {
    switch(pathType) {
      case 'military': return militaryPath;
      case 'religious': return religiousPath;
      case 'rhetoric': return rhetoricPath;
      case 'academic': return academicPath;
      default: return {
        name: pathType.charAt(0).toUpperCase() + pathType.slice(1),
        duration: 3,
        minAge: 8,
        suitableFor: { gender: 'both' },
        specialties: [],
        statBonus: 0,
        relatedStat: 'popularity'
      };
    }
  }, []);
  
  const completeEducation = useCallback((childId: string) => {
    const child = childrenData.find(c => c.id === childId);
    
    if (!child) {
      toast.error("Enfant introuvable");
      return;
    }
    
    if (child.educationType === 'none') {
      toast.error("Aucun type d'éducation n'a été assigné");
      return;
    }
    
    if (child.progress < 75) {
      toast.error("L'éducation n'est pas suffisamment avancée pour être complétée");
      return;
    }
    
    setChildrenData(prev => 
      prev.map(c => 
        c.id === childId ? { ...c, progress: 100 } : c
      )
    );
    
    setEducatingChildrenIds(prev => prev.filter(id => id !== childId));
    setIsEducatingMap(prev => ({ ...prev, [childId]: false }));
    
    const educationPath = findEducationPathById(child.educationType);
    const statBonus = educationPath.statBonus || 20;
    const relatedStat = educationPath.relatedStat || 'oratory';
    
    syncCharacterChanges(childId, { 
      progress: 100,
      status: 'completed'
    });
    
    if (onCharacterUpdate) {
      const character = characters.find(c => c.id === childId);
      if (character) {
        const statUpdates: Partial<Character> = {
          education: {
            ...character.education,
            completed: true,
            completedAt: new Date().toISOString()
          }
        };
        
        if (character.stats) {
          statUpdates.stats = { ...character.stats };
          if (relatedStat in statUpdates.stats) {
            const currentStat = statUpdates.stats[relatedStat as keyof typeof statUpdates.stats];
            
            if (typeof currentStat === 'number') {
              (statUpdates.stats[relatedStat as keyof typeof statUpdates.stats] as number) += statBonus;
            } else if (typeof currentStat === 'object') {
              const statObj = { ...currentStat };
              statObj.value += statBonus;
              statUpdates.stats[relatedStat as keyof typeof statUpdates.stats] = statObj;
            }
          }
        }
        
        onCharacterUpdate(childId, statUpdates);
      }
    }
    
    toast.success(`L'éducation de ${child.name} est maintenant complète !`);
  }, [childrenData, syncCharacterChanges, findEducationPathById, characters, onCharacterUpdate]);
  
  const cancelEducation = useCallback((childId: string) => {
    const child = childrenData.find(c => c.id === childId);
    
    if (!child) {
      toast.error("Enfant introuvable");
      return;
    }
    
    setChildrenData(prev => 
      prev.map(c => 
        c.id === childId ? { ...c, progress: 0 } : c
      )
    );
    
    setEducatingChildrenIds(prev => prev.filter(id => id !== childId));
    setIsEducatingMap(prev => ({ ...prev, [childId]: false }));
    
    syncCharacterChanges(childId, { 
      progress: 0,
      status: 'canceled'
    });
    
    toast.success(`L'éducation de ${child.name} a été annulée.`);
  }, [childrenData, syncCharacterChanges]);
  
  const addPreceptor = useCallback((preceptor: Omit<Preceptor, 'id'>): string => {
    const id = uuidv4();
    const newPreceptor: Preceptor = {
      ...preceptor,
      id,
      teachingStyle: preceptor.teachingStyle || 'Standard'
    };
    
    setPreceptorsData(prev => [...prev, newPreceptor]);
    toast.success(`${preceptor.name} a été ajouté à la liste des précepteurs`);
    return id;
  }, []);
  
  const removePreceptor = useCallback((id: string) => {
    const preceptor = preceptorsData.find(p => p.id === id);
    
    if (!preceptor) {
      toast.error("Précepteur introuvable");
      return;
    }
    
    const assignedToChild = childrenData.some(child => child.preceptorId === id);
    
    if (assignedToChild) {
      toast.error("Ce précepteur est actuellement assigné à un enfant et ne peut pas être retiré");
      return;
    }
    
    setPreceptorsData(prev => prev.filter(p => p.id !== id));
    toast.success(`${preceptor.name} a été retiré de la liste des précepteurs`);
  }, [preceptorsData, childrenData]);
  
  const hirePreceptor = useCallback((id: string, childId?: string): boolean => {
    const preceptor = preceptorsData.find(p => p.id === id);
    
    if (!preceptor) {
      toast.error("Précepteur introuvable");
      return false;
    }
    
    setPreceptorsData(prev => 
      prev.map(p => {
        if (p.id === id) {
          const updated = { ...p, assigned: true };
          if (childId) {
            updated.childId = childId;
          }
          return updated;
        }
        return p;
      })
    );
    
    setHiredPreceptors(prev => {
      if (prev.some(p => p.id === id)) {
        return prev;
      }
      return [...prev, preceptor];
    });
    
    if (childId) {
      assignPreceptorToChild(childId, id);
    }
    
    toast.success(`${preceptor.name} a été embauché comme précepteur`);
    return true;
  }, [preceptorsData, assignPreceptorToChild]);
  
  const firePreceptor = useCallback((id: string) => {
    const preceptor = preceptorsData.find(p => p.id === id);
    
    if (!preceptor) {
      toast.error("Précepteur introuvable");
      return;
    }
    
    if (preceptor.childId) {
      const childToUpdate = childrenData.find(c => c.id === preceptor.childId);
      if (childToUpdate) {
        setChildrenData(prev => 
          prev.map(child => 
            child.id === preceptor.childId ? { ...child, preceptorId: undefined } : child
          )
        );
        
        syncCharacterChanges(preceptor.childId, { 
          preceptorId: undefined,
          mentor: null
        });
      }
    }
    
    setPreceptorsData(prev => 
      prev.map(p => 
        p.id === id ? { ...p, assigned: false, childId: undefined } : p
      )
    );
    
    setHiredPreceptors(prev => prev.filter(p => p.id !== id));
    
    toast.success(`${preceptor.name} a été renvoyé`);
  }, [preceptorsData, childrenData, syncCharacterChanges]);
  
  const getEducationPathById = useCallback((pathType: string) => {
    return findEducationPathById(pathType);
  }, [findEducationPathById]);
  
  const getAllEducationPaths = useCallback(() => {
    return [
      { id: 'military', name: 'Militaire' },
      { id: 'rhetoric', name: 'Rhétorique' },
      { id: 'academic', name: 'Académique' },
      { id: 'religious', name: 'Religieuse' }
    ];
  }, []);
  
  const loadPreceptorsByType = useCallback((type: string) => {
    return preceptorsData.filter(p => p.specialty === type || p.speciality === type);
  }, [preceptorsData]);
  
  const refreshPreceptors = useCallback(() => {
    console.log("Refreshing preceptors...");
  }, []);
  
  const getPreceptorById = useCallback((id: string) => {
    const preceptor = preceptorsData.find(p => p.id === id);
    if (!preceptor) {
      return null;
    }
    return preceptor;
  }, [preceptorsData]);
  
  const value = {
    children: childrenData,
    preceptors: preceptorsData,
    educatingChildren: educatingChildrenIds,
    isEducating: isEducatingMap,
    hiredPreceptors: hiredPreceptors,
    selectedChildId: selectedChildId,
    
    addChild,
    removeChild,
    updateChildName,
    updateChildEducation,
    assignPreceptorToChild,
    getChild,
    getChildById,
    setSelectedChildId: handleSelectedChildChange,
    
    startEducation,
    advanceEducationYear,
    advanceEducation,
    completeEducation,
    cancelEducation,
    
    addPreceptor,
    removePreceptor,
    hirePreceptor,
    firePreceptor,
    loadPreceptorsByType,
    refreshPreceptors,
    
    findEducationPathById,
    getEducationPathById,
    getAllEducationPaths,
    
    getPreceptorById
  };
  
  return (
    <EducationContext.Provider value={value}>
      {children}
    </EducationContext.Provider>
  );
};

export const useEducation = () => {
  const context = useContext(EducationContext);
  if (context === undefined) {
    throw new Error('useEducation must be used within an EducationProvider');
  }
  return context;
};

export default EducationContext;
