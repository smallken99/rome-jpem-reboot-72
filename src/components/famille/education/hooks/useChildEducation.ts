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
      type: 'military' as EducationType,
      pathType: pathId,
      startDate: new Date().toISOString(),
      mentor: preceptorId || null,
      results: undefined,
      skills: ['combat', 'tactics'],
      currentYear: 1,
      totalYears: 3,
      status: 'in_progress',
      progress: 0
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
