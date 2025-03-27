
import { useState, useCallback } from 'react';
import { Child, Preceptor, EducationType, EducationRecord, EducationFormData } from '../types/educationTypes';

// Sample child data for development
const sampleChildren: Child[] = [
  {
    id: 'child-1',
    name: 'Marcus Aurelius',
    gender: 'male',
    age: 14,
    status: 'studying',
    educationType: 'military',
    progress: 60,
    specialties: ['Tactics', 'Combat'],
    skills: {
      rhetoric: 20,
      politics: 15,
      strategy: 40,
      diplomacy: 25,
      combat: 45,
      leadership: 35,
      riding: 30,
      tactics: 50
    },
    traits: ['Disciplined', 'Brave']
  },
  {
    id: 'child-2',
    name: 'Julia Aurelia',
    gender: 'female',
    age: 12,
    status: 'studying',
    educationType: 'rhetoric',
    progress: 40,
    specialties: ['Debate', 'Persuasion'],
    skills: {
      rhetoric: 45,
      politics: 30,
      strategy: 15,
      diplomacy: 40,
      combat: 10,
      leadership: 25,
      riding: 20,
      tactics: 15
    },
    traits: ['Eloquent', 'Perceptive']
  }
];

// Sample preceptors data for development
const samplePreceptors: Preceptor[] = [
  {
    id: 'prec-1',
    name: 'Quintus Fabius',
    specialization: 'military',
    specialty: 'military',
    quality: 4,
    price: 3500,
    cost: 3500,
    experience: 15,
    available: true,
    skill: 80,
    specialties: ['Tactics', 'Combat', 'Strategy'],
    background: 'Former general and tactician',
    traits: ['Disciplined', 'Veteran'],
    status: 'available'
  },
  {
    id: 'prec-2',
    name: 'Marcus Tullius',
    specialization: 'rhetoric',
    specialty: 'rhetoric',
    quality: 5,
    price: 4500,
    cost: 4500,
    experience: 20,
    available: true,
    skill: 90,
    specialties: ['Oratory', 'Debate', 'Persuasion'],
    background: 'Renowned orator and statesman',
    traits: ['Eloquent', 'Wise'],
    status: 'available'
  },
  {
    id: 'prec-3',
    name: 'Livia Scribonia',
    specialization: 'religious',
    specialty: 'religious',
    quality: 3,
    price: 3000,
    cost: 3000,
    experience: 12,
    available: true,
    skill: 75,
    specialties: ['Rituals', 'Divination', 'Religious Law'],
    background: 'Former priestess of Vesta',
    traits: ['Pious', 'Devoted'],
    status: 'available'
  }
];

// Sample education record
const sampleEducationRecord: EducationRecord = {
  id: 'ed-1',
  childId: 'child-1',
  pathType: 'military',
  preceptorId: 'prec-1',
  startYear: 752,
  currentYear: 754,
  totalYears: 4,
  status: 'in_progress',
  skills: {
    combat: 45,
    tactics: 50,
    strategy: 40,
    leadership: 35
  },
  specialties: ['Tactics', 'Combat']
};

export const useChildEducation = () => {
  const [children, setChildren] = useState<Child[]>(sampleChildren);
  const [preceptors, setPreceptors] = useState<Preceptor[]>(samplePreceptors);
  const [educationRecord, setEducationRecord] = useState<EducationRecord>(sampleEducationRecord);
  
  // Get a child by ID
  const getChild = useCallback((id: string) => {
    return children.find(child => child.id === id);
  }, [children]);
  
  // Get a preceptor by ID
  const getPreceptor = useCallback((id: string) => {
    return preceptors.find(preceptor => preceptor.id === id);
  }, [preceptors]);
  
  // Update a child's education
  const updateChildEducation = useCallback((childId: string, educationType: EducationType | string) => {
    setChildren(prev => prev.map(child => 
      child.id === childId ? { ...child, educationType } : child
    ));
  }, []);
  
  // Start education for a child
  const startEducation = useCallback((formData: EducationFormData) => {
    const { childId, type, preceptorId, specialties } = formData;
    
    if (!childId) return false;
    
    // Update the child's education type
    updateChildEducation(childId, type);
    
    // Create a new education record
    const newRecord: EducationRecord = {
      id: `ed-${Date.now()}`,
      childId,
      pathType: type,
      preceptorId,
      startYear: new Date().getFullYear(),
      currentYear: new Date().getFullYear(),
      totalYears: 4, // Default to 4 years
      status: 'in_progress',
      skills: {},
      specialties
    };
    
    setEducationRecord(newRecord);
    
    // If there's a preceptor, update their status
    if (preceptorId) {
      setPreceptors(prev => prev.map(p => 
        p.id === preceptorId ? { ...p, status: 'assigned', childId } : p
      ));
    }
    
    return true;
  }, [updateChildEducation]);
  
  // Cancel education
  const cancelEducation = useCallback((childId: string) => {
    // Update the child's education type to 'none'
    updateChildEducation(childId, 'none');
    
    // Update the education record
    setEducationRecord(prev => {
      if (prev.childId === childId) {
        return {
          ...prev,
          status: 'failed' as any // Using "failed" instead of "canceled" to match the allowed types
        };
      }
      return prev;
    });
    
    // Free up any assigned preceptor
    setPreceptors(prev => prev.map(p => 
      p.childId === childId ? { ...p, status: 'available', childId: undefined } : p
    ));
  }, [updateChildEducation]);
  
  // Complete education
  const completeEducation = useCallback((childId: string) => {
    // Update the education record
    setEducationRecord(prev => {
      if (prev.childId === childId) {
        return {
          ...prev,
          status: 'completed'
        };
      }
      return prev;
    });
  }, []);
  
  // Create a new education form
  const createEducationForm = useCallback(
    (
      childId: string, 
      pathType: EducationType | string, 
      preceptorId: string | null, 
      specialties: string[] = []
    ): EducationFormData => {
      return {
        childId,
        type: pathType,
        pathType,
        preceptorId,
        specialties,
        status: 'not_started'
      };
    },
  []);
  
  return {
    children,
    preceptors,
    educationRecord,
    getChild,
    getPreceptor,
    updateChildEducation,
    startEducation,
    cancelEducation,
    completeEducation,
    createEducationForm
  };
};
