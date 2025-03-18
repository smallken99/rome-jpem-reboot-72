
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Child, Preceptor } from '../types/educationTypes';
import { usePreceptorsManagement } from '../hooks/usePreceptorsManagement';
import { Character } from '@/types/character';

// Sample data for development
const MOCK_CHILDREN: Child[] = [
  {
    id: '1',
    name: 'Marcus Aurelius',
    age: 12,
    gender: 'male',
    educationType: 'political',
    progress: 50,
    specialties: ['Diplomatie', 'Éloquence'],
    preceptorId: '1',
    status: 'in_progress'
  },
  {
    id: '2',
    name: 'Livia Augusta',
    age: 10,
    gender: 'female',
    educationType: 'religious',
    progress: 25,
    specialties: ['Rituels'],
    preceptorId: '3',
    status: 'in_progress'
  },
  {
    id: '3',
    name: 'Titus Valerius',
    age: 14,
    gender: 'male',
    educationType: 'military',
    progress: 75,
    specialties: ['Tactique', 'Combat'],
    preceptorId: '2',
    status: 'in_progress'
  },
  {
    id: '4',
    name: 'Julia Domna',
    age: 9,
    gender: 'female',
    educationType: 'none',
    progress: 0,
    specialties: [],
    preceptorId: null,
    status: 'not_started'
  },
  {
    id: '5',
    name: 'Gaius Octavius',
    age: 16,
    gender: 'male',
    educationType: 'political',
    progress: 100,
    specialties: ['Législation', 'Administration'],
    preceptorId: '4',
    status: 'completed'
  }
];

export interface EducationContextType {
  children: Child[];
  preceptors: Preceptor[];
  hiredPreceptors: Preceptor[];
  educatingChildren: Record<string, boolean> | string[];
  isLoading: boolean;
  isEducating: boolean | Record<string, boolean>; // Ajout de cette propriété
  
  // Child management
  addChild: (newChild: Omit<Child, 'id'>) => string;
  updateChild: (id: string, updates: Partial<Child>) => void;
  removeChild: (id: string) => void;
  updateChildName: (id: string, newName: string) => void;
  
  // Education management
  startEducation: (childId: string, educationType: string, preceptorId: string | null) => void;
  updateEducation: (childId: string, updates: Partial<Child>) => void;
  advanceEducationYear: (childId: string) => void;
  advanceEducation: (childId: string) => void; // Alias pour advanceEducationYear
  completeEducation: (childId: string) => void;
  setSelectedChildId?: (id: string | null) => void; // Ajout de cette propriété optionnelle
  
  // Preceptor management
  hirePreceptor: (preceptorId: string) => void;
  firePreceptor: (preceptorId: string) => void;
  getAvailablePreceptors: () => Preceptor[];
  loadPreceptorsByType: (type: string) => Preceptor[];
}

const EducationContext = createContext<EducationContextType>({
  children: [],
  preceptors: [],
  hiredPreceptors: [],
  educatingChildren: {},
  isLoading: false,
  isEducating: false,
  
  addChild: () => '',
  updateChild: () => {},
  removeChild: () => {},
  updateChildName: () => {},
  
  startEducation: () => {},
  updateEducation: () => {},
  advanceEducationYear: () => {},
  advanceEducation: () => {},
  completeEducation: () => {},
  
  hirePreceptor: () => {},
  firePreceptor: () => {},
  getAvailablePreceptors: () => [],
  loadPreceptorsByType: () => []
});

export const EducationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [childrenData, setChildrenData] = useState<Child[]>(MOCK_CHILDREN);
  const [educatingChildrenState, setEducatingChildrenState] = useState<Record<string, boolean>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [selectedChildId, setSelectedChildId] = useState<string | null>(null);
  
  const { 
    preceptors,
    addPreceptor,
    updatePreceptor,
    removePreceptor,
    getPreceptorsBySpecialty,
    getAvailablePreceptors,
    getAssignedPreceptors
  } = usePreceptorsManagement();
  
  // Child management functions
  const addChild = (newChild: Omit<Child, 'id'>): string => {
    const id = Math.random().toString(36).substr(2, 9);
    const child: Child = { id, ...newChild };
    setChildrenData(prev => [...prev, child]);
    return id;
  };
  
  const updateChild = (id: string, updates: Partial<Child>) => {
    setChildrenData(prev => 
      prev.map(child => 
        child.id === id ? { ...child, ...updates } : child
      )
    );
  };
  
  const removeChild = (id: string) => {
    setChildrenData(prev => prev.filter(child => child.id !== id));
  };
  
  const updateChildName = (id: string, newName: string) => {
    updateChild(id, { name: newName });
  };
  
  // Education management functions
  const startEducation = (childId: string, educationType: string, preceptorId: string | null) => {
    updateChild(childId, { 
      educationType,
      preceptorId,
      progress: 0,
      status: 'in_progress'
    });
    
    // Mark child as currently educating
    setEducatingChildrenState(prev => ({ ...prev, [childId]: true }));
    
    // If a preceptor is assigned, update their availability
    if (preceptorId) {
      updatePreceptor(preceptorId, { available: false });
    }
  };
  
  const updateEducation = (childId: string, updates: Partial<Child>) => {
    const child = childrenData.find(c => c.id === childId);
    if (!child) return;
    
    // If changing preceptors, update availability
    if (updates.preceptorId && updates.preceptorId !== child.preceptorId) {
      // Make the old preceptor available
      if (child.preceptorId) {
        updatePreceptor(child.preceptorId, { available: true });
      }
      
      // Make the new preceptor unavailable
      if (typeof updates.preceptorId === 'string') {
        updatePreceptor(updates.preceptorId, { available: false });
      }
    }
    
    updateChild(childId, updates);
  };
  
  const advanceEducationYear = (childId: string) => {
    const child = childrenData.find(c => c.id === childId);
    if (!child) return;
    
    // Calculate progress increase (25% per year, limited to 100%)
    const newProgress = Math.min(100, (child.progress || 0) + 25);
    
    updateChild(childId, { 
      progress: newProgress,
      status: newProgress >= 100 ? 'completed' : 'in_progress'
    });
    
    if (newProgress >= 100) {
      // If education is complete, stop educating
      setEducatingChildrenState(prev => {
        const newState = { ...prev };
        delete newState[childId];
        return newState;
      });
    }
  };
  
  // Alias pour advanceEducationYear
  const advanceEducation = advanceEducationYear;
  
  const completeEducation = (childId: string) => {
    updateChild(childId, { 
      progress: 100,
      status: 'completed'
    });
    
    // Stop educating
    setEducatingChildrenState(prev => {
      const newState = { ...prev };
      delete newState[childId];
      return newState;
    });
  };
  
  // Preceptor management
  const hirePreceptor = (preceptorId: string) => {
    updatePreceptor(preceptorId, { available: false });
  };
  
  const firePreceptor = (preceptorId: string) => {
    updatePreceptor(preceptorId, { available: true });
    
    // Update any children using this preceptor
    setChildrenData(prev => 
      prev.map(child => 
        child.preceptorId === preceptorId 
          ? { ...child, preceptorId: null } 
          : child
      )
    );
  };
  
  const loadPreceptorsByType = (type: string): Preceptor[] => {
    // Simulation d'une requête backend
    setIsLoading(true);
    
    // Filtre les précepteurs par type
    const filteredPreceptors = preceptors.filter(
      p => (p.specialty || p.speciality || '').toLowerCase().includes(type.toLowerCase())
    );
    
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
    
    return filteredPreceptors;
  };
  
  // Calculate which children are currently being educated
  const hiredPreceptors = preceptors.filter(p => !p.available);
  
  return (
    <EducationContext.Provider
      value={{
        children: childrenData,
        preceptors,
        hiredPreceptors,
        educatingChildren: educatingChildrenState,
        isLoading,
        isEducating: educatingChildrenState,
        
        addChild,
        updateChild,
        removeChild,
        updateChildName,
        
        startEducation,
        updateEducation,
        advanceEducationYear,
        advanceEducation,
        completeEducation,
        setSelectedChildId,
        
        hirePreceptor,
        firePreceptor,
        getAvailablePreceptors,
        loadPreceptorsByType
      }}
    >
      {children}
    </EducationContext.Provider>
  );
};

export const useEducation = () => useContext(EducationContext);
