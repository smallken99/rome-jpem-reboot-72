
import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { Child, Preceptor, EducationType } from '../types/educationTypes';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'sonner';

interface EducationContextType {
  children: Child[];
  preceptors: Preceptor[];
  educatingChildren: string[];
  isEducating: Record<string, boolean>;
  
  // Child functions
  addChild: (child: Omit<Child, 'id' | 'progress'>) => string;
  removeChild: (id: string) => void;
  updateChildName: (id: string, name: string) => void;
  updateChildEducation: (id: string, educationType: EducationType) => void;
  assignPreceptorToChild: (childId: string, preceptorId: string) => void;
  
  // Education functions
  startEducation: (childId: string, educationType?: EducationType, specialty?: string) => void;
  advanceEducationYear: (childId: string) => void;
  completeEducation: (childId: string) => void;
  
  // Preceptor functions
  addPreceptor: (preceptor: Omit<Preceptor, 'id'>) => string;
  removePreceptor: (id: string) => void;
  hirePreceptor: (id: string) => boolean;
  firePreceptor: (id: string) => void;
  
  // New functions to fix errors
  getChildById: (id: string) => Child | undefined;
  advanceEducation: (childId: string) => void;
  cancelEducation: (childId: string) => void;
  getEducationPathById: (pathType: string) => any;
  getAllEducationPaths: () => any[];
}

const EducationContext = createContext<EducationContextType | undefined>(undefined);

export const EducationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [childrenData, setChildrenData] = useState<Child[]>([
    {
      id: '1',
      name: 'Lucius Cornelius',
      age: 10,
      gender: 'male',
      educationType: 'military',
      progress: 35,
      preceptorId: '2'
    },
    {
      id: '2',
      name: 'Julia Cornelia',
      age: 12,
      gender: 'female',
      educationType: 'rhetoric',
      progress: 60
    },
    {
      id: '3',
      name: 'Marcus Cornelius',
      age: 8,
      gender: 'male',
      educationType: 'none',
      progress: 0
    }
  ]);
  
  const [preceptorsData, setPreceptorsData] = useState<Preceptor[]>([
    {
      id: '1',
      name: 'Quintus Servilius',
      specialty: 'rhetoric',
      price: 5000,
      quality: 85,
      experience: 15,
      assigned: false
    },
    {
      id: '2',
      name: 'Gaius Flavius',
      specialty: 'military',
      price: 8000,
      quality: 90,
      experience: 20,
      assigned: true
    },
    {
      id: '3',
      name: 'Titus Livius',
      specialty: 'academic',
      price: 6000,
      quality: 95,
      experience: 25,
      assigned: false
    }
  ]);
  
  // Track which children are currently being educated (in progress)
  const [educatingChildrenIds, setEducatingChildrenIds] = useState<string[]>([]);
  const [isEducatingMap, setIsEducatingMap] = useState<Record<string, boolean>>({});
  
  // Child management functions
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
  }, []);
  
  const updateChildEducation = useCallback((id: string, educationType: EducationType) => {
    setChildrenData(prev => 
      prev.map(child => 
        child.id === id ? { ...child, educationType, progress: 0 } : child
      )
    );
    
    toast.success("Type d'éducation mis à jour");
  }, []);
  
  const assignPreceptorToChild = useCallback((childId: string, preceptorId: string) => {
    // Update child with preceptor
    setChildrenData(prev => 
      prev.map(child => 
        child.id === childId ? { ...child, preceptorId } : child
      )
    );
    
    // Mark preceptor as assigned
    setPreceptorsData(prev => 
      prev.map(preceptor => 
        preceptor.id === preceptorId ? { ...preceptor, assigned: true } : preceptor
      )
    );
    
    const preceptor = preceptorsData.find(p => p.id === preceptorId);
    const child = childrenData.find(c => c.id === childId);
    
    if (preceptor && child) {
      toast.success(`${preceptor.name} a été assigné à l'éducation de ${child.name}`);
    }
  }, [childrenData, preceptorsData]);
  
  // Education functions
  const startEducation = useCallback((childId: string, educationType?: EducationType, specialty?: string) => {
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
    
    setEducatingChildrenIds(prev => [...prev, childId]);
    setIsEducatingMap(prev => ({ ...prev, [childId]: true }));
    
    toast.success(`L'éducation de ${child.name} a commencé`);
  }, [childrenData]);
  
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
    
    // Set this child as currently educating
    setIsEducatingMap(prev => ({ ...prev, [childId]: true }));
    
    // Simulate education progress
    setTimeout(() => {
      setChildrenData(prev => 
        prev.map(c => {
          if (c.id === childId) {
            // Calculate progress increase based on preceptor quality if assigned
            let progressIncrease = 15; // Base increase
            
            if (c.preceptorId) {
              const preceptor = preceptorsData.find(p => p.id === c.preceptorId);
              if (preceptor) {
                // Better preceptors provide faster progress
                progressIncrease = 10 + Math.floor(preceptor.quality / 10);
              }
            }
            
            const newProgress = Math.min(100, c.progress + progressIncrease);
            return { ...c, progress: newProgress };
          }
          return c;
        })
      );
      
      // Mark as no longer educating
      setIsEducatingMap(prev => ({ ...prev, [childId]: false }));
      
      toast.success(`L'éducation de ${child.name} a progressé !`);
    }, 2000); // Simulate progress over 2 seconds
  }, [childrenData, preceptorsData]);
  
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
    
    // Complete the education by setting progress to 100%
    setChildrenData(prev => 
      prev.map(c => 
        c.id === childId ? { ...c, progress: 100 } : c
      )
    );
    
    // Remove from educating children
    setEducatingChildrenIds(prev => prev.filter(id => id !== childId));
    setIsEducatingMap(prev => ({ ...prev, [childId]: false }));
    
    toast.success(`L'éducation de ${child.name} est maintenant complète !`);
  }, [childrenData]);
  
  // Preceptor management functions
  const addPreceptor = useCallback((preceptor: Omit<Preceptor, 'id'>): string => {
    const id = uuidv4();
    const newPreceptor: Preceptor = {
      ...preceptor,
      id
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
    
    // Check if the preceptor is assigned to any child
    const assignedToChild = childrenData.some(child => child.preceptorId === id);
    
    if (assignedToChild) {
      toast.error("Ce précepteur est actuellement assigné à un enfant et ne peut pas être retiré");
      return;
    }
    
    setPreceptorsData(prev => prev.filter(p => p.id !== id));
    toast.success(`${preceptor.name} a été retiré de la liste des précepteurs`);
  }, [preceptorsData, childrenData]);
  
  const hirePreceptor = useCallback((id: string): boolean => {
    const preceptor = preceptorsData.find(p => p.id === id);
    
    if (!preceptor) {
      toast.error("Précepteur introuvable");
      return false;
    }
    
    // In a real app, check if enough funds are available
    // For now, we'll assume the hiring is successful
    
    toast.success(`${preceptor.name} a été embauché comme précepteur`);
    return true;
  }, [preceptorsData]);
  
  const firePreceptor = useCallback((id: string) => {
    const preceptor = preceptorsData.find(p => p.id === id);
    
    if (!preceptor) {
      toast.error("Précepteur introuvable");
      return;
    }
    
    // Remove preceptor assignment from any children
    setChildrenData(prev => 
      prev.map(child => 
        child.preceptorId === id ? { ...child, preceptorId: undefined } : child
      )
    );
    
    // Mark as unassigned (or remove completely in a real implementation)
    setPreceptorsData(prev => 
      prev.map(p => 
        p.id === id ? { ...p, assigned: false } : p
      )
    );
    
    toast.success(`${preceptor.name} a été renvoyé`);
  }, [preceptorsData]);
  
  // New functions to fix errors
  const getChildById = useCallback((id: string) => {
    return childrenData.find(child => child.id === id);
  }, [childrenData]);
  
  const advanceEducation = useCallback((childId: string) => {
    advanceEducationYear(childId); // Alias for existing function
  }, [advanceEducationYear]);
  
  const cancelEducation = useCallback((childId: string) => {
    const child = childrenData.find(c => c.id === childId);
    
    if (!child) {
      toast.error("Enfant introuvable");
      return;
    }
    
    // Reset education progress
    setChildrenData(prev => 
      prev.map(c => 
        c.id === childId ? { ...c, progress: 0 } : c
      )
    );
    
    // Remove from educating children
    setEducatingChildrenIds(prev => prev.filter(id => id !== childId));
    setIsEducatingMap(prev => ({ ...prev, [childId]: false }));
    
    toast.success(`L'éducation de ${child.name} a été annulée.`);
  }, [childrenData]);
  
  const getEducationPathById = useCallback((pathType: string) => {
    // This would normally fetch from a data store
    return {
      name: pathType.charAt(0).toUpperCase() + pathType.slice(1),
      duration: 3,
      minimumAge: 8,
      suitableFor: { gender: 'both' },
      specialties: []
    };
  }, []);
  
  const getAllEducationPaths = useCallback(() => {
    // This would normally fetch from a data store
    return [
      { id: 'military', name: 'Militaire' },
      { id: 'rhetoric', name: 'Rhétorique' },
      { id: 'academic', name: 'Académique' },
      { id: 'religious', name: 'Religieuse' }
    ];
  }, []);
  
  const value = {
    children: childrenData,
    preceptors: preceptorsData,
    educatingChildren: educatingChildrenIds,
    isEducating: isEducatingMap,
    
    // Child functions
    addChild,
    removeChild,
    updateChildName,
    updateChildEducation,
    assignPreceptorToChild,
    
    // Education functions
    startEducation,
    advanceEducationYear,
    completeEducation,
    
    // Preceptor functions
    addPreceptor,
    removePreceptor,
    hirePreceptor,
    firePreceptor,
    
    // New functions
    getChildById,
    advanceEducation,
    cancelEducation,
    getEducationPathById,
    getAllEducationPaths
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
