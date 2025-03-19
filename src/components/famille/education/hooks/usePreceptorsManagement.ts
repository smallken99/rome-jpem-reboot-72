
import { useState, useEffect } from 'react';
import { useEducation } from '../context/EducationContext';
import { Preceptor } from '../types/educationTypes';
import { toast } from 'sonner';

export const usePreceptorsManagement = () => {
  const { preceptors } = useEducation();
  const [availablePreceptors, setAvailablePreceptors] = useState<Preceptor[]>([]);

  // Update available preceptors when global preceptors change
  useEffect(() => {
    setAvailablePreceptors(preceptors.filter(p => p.available !== false));
  }, [preceptors]);

  // Get preceptor by ID
  const getPreceptorById = (id: string): Preceptor | undefined => {
    return preceptors.find(p => p.id === id);
  };

  // Hire a preceptor
  const hirePreceptor = (preceptorId: string, childId?: string) => {
    const preceptor = getPreceptorById(preceptorId);
    if (!preceptor) {
      toast.error("Précepteur introuvable");
      return;
    }

    // In a real app, update the preceptor in the database
    toast.success(`${preceptor.name} a été engagé comme précepteur`);
    
    // If a child ID was provided, assign the preceptor to that child
    if (childId) {
      assignPreceptorToChild(preceptorId, childId);
    }
  };

  // Fire a preceptor
  const firePreceptor = (preceptorId: string) => {
    const preceptor = getPreceptorById(preceptorId);
    if (!preceptor) {
      toast.error("Précepteur introuvable");
      return;
    }

    // In a real app, update the preceptor in the database
    toast.success(`${preceptor.name} a été renvoyé`);
  };

  // Assign a preceptor to a child
  const assignPreceptorToChild = (preceptorId: string, childId: string) => {
    const preceptor = getPreceptorById(preceptorId);
    if (!preceptor) {
      toast.error("Précepteur introuvable");
      return;
    }

    // In a real app, update the relation in the database
    toast.success(`${preceptor.name} a été assigné à l'enfant`);
  };

  return {
    availablePreceptors,
    getPreceptorById,
    hirePreceptor,
    firePreceptor,
    assignPreceptorToChild
  };
};
