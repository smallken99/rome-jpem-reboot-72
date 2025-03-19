
import { useState, useCallback } from 'react';
import { useEducation } from '../context/EducationContext';
import { Preceptor } from '../types/educationTypes';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'sonner';

export const usePreceptorsManagement = () => {
  const { preceptors: contextPreceptors, firePreceptor: contextFirePreceptor, hirePreceptor: contextHirePreceptor } = useEducation();
  const [preceptors, setPreceptors] = useState<Preceptor[]>(contextPreceptors);

  // Get all preceptors
  const getAllPreceptors = useCallback(() => {
    return preceptors;
  }, [preceptors]);

  // Get available preceptors
  const getAvailablePreceptors = useCallback(() => {
    return preceptors.filter(p => p.available !== false);
  }, [preceptors]);

  // Get preceptors by type
  const getPreceptorsByType = useCallback((type: string) => {
    return preceptors.filter(p => p.specialty === type);
  }, [preceptors]);

  // Get preceptors by ID
  const getPreceptorById = useCallback((id: string) => {
    const preceptor = preceptors.find(p => p.id === id);
    if (!preceptor) {
      console.error(`Preceptor with ID ${id} not found`);
      return null;
    }
    return preceptor;
  }, [preceptors]);

  // Get assigned preceptors
  const getAssignedPreceptors = useCallback(() => {
    return preceptors.filter(p => p.assigned);
  }, [preceptors]);

  // Hire a preceptor
  const hirePreceptor = useCallback((preceptorId: string, childId?: string) => {
    if (contextHirePreceptor) {
      contextHirePreceptor(preceptorId, childId);
    } else {
      // Fallback implementation
      setPreceptors(prev => 
        prev.map(p => 
          p.id === preceptorId 
            ? { ...p, available: false, assigned: true, childId } 
            : p
        )
      );
      toast.success("Précepteur engagé avec succès");
    }
    return true;
  }, [contextHirePreceptor, setPreceptors]);

  // Fire a preceptor
  const firePreceptor = useCallback((preceptorId: string) => {
    if (contextFirePreceptor) {
      contextFirePreceptor(preceptorId);
    } else {
      // Fallback implementation
      setPreceptors(prev => 
        prev.map(p => 
          p.id === preceptorId 
            ? { ...p, available: true, assigned: false, childId: undefined } 
            : p
        )
      );
      toast.success("Précepteur renvoyé avec succès");
    }
  }, [contextFirePreceptor, setPreceptors]);

  return {
    preceptors,
    setPreceptors,
    getAllPreceptors,
    availablePreceptors: getAvailablePreceptors(),
    getPreceptorsByType,
    getPreceptorById,
    getAssignedPreceptors,
    hirePreceptor,
    firePreceptor
  };
};
