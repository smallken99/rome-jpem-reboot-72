
import { useState, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Child, Preceptor, EducationPath, EducationRecord, EducationFormData, EducationType } from '../types/educationTypes';

export const useChildEducation = () => {
  const [educationRecords, setEducationRecords] = useState<EducationRecord[]>([]);
  const [availablePreceptors, setAvailablePreceptors] = useState<Preceptor[]>([]);
  
  const registerChild = useCallback((child: Child) => {
    // Implementation details
    console.log('Child registered:', child);
  }, []);
  
  const startEducation = useCallback((childId: string, pathId: string, preceptorId?: string) => {
    // Mock implementation
    const record: EducationRecord = {
      id: uuidv4(),
      childId,
      path: {
        id: 'military',
        name: 'Military Training',
        description: 'Training in martial arts and tactics',
        benefits: ['Improved strength', 'Better tactical thinking'],
        statBoost: 'martialEducation',
        icon: 'sword',
        specialties: ['Combat', 'Strategy', 'Leadership'],
        requirements: {
          age: 10,
          gender: 'male'
        },
        bonuses: {
          skills: ['combat', 'tactics', 'leadership'],
          martialEducation: 10,
          oratory: 5
        },
        outcomes: {
          skills: ['swordsmanship', 'tactics']
        },
        duration: 3,
        relatedStat: 'martialEducation',
        minAge: 10,
        maxAge: 18,
        cost: 1000,
        suitableFor: ['male']
      },
      mentor: preceptorId ? {
        id: uuidv4(),
        name: 'Gaius Marius',
        specialization: 'military' as EducationType,
        specialty: 'combat',
        skill: 85,
        cost: 2000,
        price: 2000,
        background: 'Former centurion with extensive battle experience',
        traits: ['Disciplined', 'Strict', 'Honorable'],
        status: 'available',
        available: true,
        experience: 20,
        expertise: 85,
        quality: 4,
        specialties: ['Combat', 'Strategy', 'Formation'],
        description: 'A battle-hardened veteran with years of service in the legions',
        teachingStyle: 'Rigorous and practical',
        reputation: 80,
        speciality: 'combat'
      } : null,
      startDate: new Date().toISOString(),
      progress: 0,
      completed: false,
      pathType: pathId,
      preceptorId: preceptorId
    };
    
    setEducationRecords(prev => [...prev, record]);
    return record;
  }, []);
  
  const advanceEducation = useCallback((recordId: string) => {
    setEducationRecords(prev => prev.map(record => {
      if (record.id === recordId) {
        const newProgress = Math.min(100, record.progress + 25);
        return { ...record, progress: newProgress, completed: newProgress >= 100 };
      }
      return record;
    }));
  }, []);
  
  const completeEducation = useCallback((recordId: string) => {
    setEducationRecords(prev => prev.map(record => {
      if (record.id === recordId) {
        return { ...record, progress: 100, completed: true };
      }
      return record;
    }));
  }, []);
  
  const cancelEducation = useCallback((recordId: string) => {
    setEducationRecords(prev => prev.filter(record => record.id !== recordId));
  }, []);
  
  const hirePreceptor = useCallback((preceptor: Preceptor) => {
    // Implementation details
    setAvailablePreceptors(prev => [...prev, { 
      ...preceptor, 
      id: uuidv4(),
      description: preceptor.description || 'An experienced teacher',
      teachingStyle: preceptor.teachingStyle || 'Traditional',
      reputation: preceptor.reputation || 70,
      expertise: preceptor.expertise || 75
    }]);
    return true;
  }, []);
  
  const assignPreceptor = useCallback((childId: string, preceptorId: string) => {
    // Implementation details
    return true;
  }, []);
  
  const submitEducationForm = useCallback((formData: EducationFormData) => {
    // Fixed to include the required pathId property
    return startEducation(formData.childId, formData.pathId, formData.preceptorId);
  }, [startEducation]);
  
  return {
    educationRecords,
    availablePreceptors,
    registerChild,
    startEducation,
    advanceEducation,
    completeEducation,
    cancelEducation,
    hirePreceptor,
    assignPreceptor,
    submitEducationForm
  };
};
