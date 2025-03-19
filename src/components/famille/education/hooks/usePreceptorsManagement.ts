
import { useState, useCallback } from 'react';
import { Preceptor, EducationType } from '../types/educationTypes';
import { toast } from 'sonner';

export const usePreceptorsManagement = () => {
  const [preceptors, setPreceptors] = useState<Preceptor[]>([
    {
      id: 'preceptor-1',
      name: 'Quintus Fabius',
      specialty: 'rhetoric',
      price: 5000,
      quality: 90,
      experience: 15,
      assigned: false,
      available: true
    },
    {
      id: 'preceptor-2',
      name: 'Marcus Livius',
      specialty: 'military',
      price: 6000,
      quality: 85,
      experience: 12,
      assigned: false,
      available: true
    },
    {
      id: 'preceptor-3',
      name: 'Publius Cornelius',
      specialty: 'academic',
      price: 4500,
      quality: 80,
      experience: 10,
      assigned: false,
      available: true
    }
  ]);
  
  // Function to add a new preceptor
  const addPreceptor = useCallback((preceptorData: Omit<Preceptor, 'id'>) => {
    const id = `preceptor-${preceptors.length + 1}`;
    const newPreceptor: Preceptor = {
      ...preceptorData,
      id,
      assigned: false,
      available: true
    };
    
    setPreceptors(prev => [...prev, newPreceptor]);
    toast.success(`${newPreceptor.name} a été ajouté comme précepteur disponible.`);
    
    return id;
  }, [preceptors]);
  
  // Function to remove a preceptor
  const removePreceptor = useCallback((preceptorId: string) => {
    const preceptor = preceptors.find(p => p.id === preceptorId);
    
    if (!preceptor) {
      toast.error('Précepteur non trouvé.');
      return false;
    }
    
    if (preceptor.assigned) {
      toast.error('Ce précepteur est actuellement assigné et ne peut pas être retiré.');
      return false;
    }
    
    setPreceptors(prev => prev.filter(p => p.id !== preceptorId));
    toast.success(`${preceptor.name} a été retiré de la liste.`);
    
    return true;
  }, [preceptors]);
  
  // Function to assign a preceptor to a child
  const assignPreceptor = useCallback((preceptorId: string, childId: string) => {
    setPreceptors(prev => 
      prev.map(p => p.id === preceptorId ? { ...p, assigned: true, childId } : p)
    );
    
    const preceptor = preceptors.find(p => p.id === preceptorId);
    if (preceptor) {
      toast.success(`${preceptor.name} a été assigné à l'éducation.`);
    }
    
    return true;
  }, [preceptors]);
  
  // Function to unassign a preceptor
  const unassignPreceptor = useCallback((preceptorId: string) => {
    setPreceptors(prev => 
      prev.map(p => p.id === preceptorId ? { ...p, assigned: false, childId: undefined } : p)
    );
    
    const preceptor = preceptors.find(p => p.id === preceptorId);
    if (preceptor) {
      toast.success(`${preceptor.name} a été libéré de ses fonctions d'éducation.`);
    }
    
    return true;
  }, [preceptors]);
  
  // Get assigned preceptors
  const getAssignedPreceptors = useCallback(() => {
    return preceptors.filter(p => p.assigned);
  }, [preceptors]);
  
  // New functions to fix errors
  const availablePreceptors = preceptors.filter(p => p.available && !p.assigned);
  
  const hirePreceptor = useCallback((preceptorId: string, childId?: string) => {
    const preceptor = preceptors.find(p => p.id === preceptorId);
    
    if (!preceptor) {
      toast.error('Précepteur non trouvé.');
      return false;
    }
    
    setPreceptors(prev => 
      prev.map(p => p.id === preceptorId ? 
        { ...p, available: false, assigned: !!childId, childId } : p
      )
    );
    
    toast.success(`${preceptor.name} a été embauché comme précepteur.`);
    return true;
  }, [preceptors]);
  
  const firePreceptor = useCallback((preceptorId: string) => {
    const preceptor = preceptors.find(p => p.id === preceptorId);
    
    if (!preceptor) {
      toast.error('Précepteur non trouvé.');
      return false;
    }
    
    setPreceptors(prev => 
      prev.map(p => p.id === preceptorId ? 
        { ...p, available: true, assigned: false, childId: undefined } : p
      )
    );
    
    toast.success(`${preceptor.name} a été renvoyé.`);
    return true;
  }, [preceptors]);
  
  const getPreceptorById = useCallback((id: string) => {
    return preceptors.find(p => p.id === id);
  }, [preceptors]);
  
  return {
    preceptors,
    setPreceptors,
    addPreceptor,
    removePreceptor,
    assignPreceptor,
    unassignPreceptor,
    getAssignedPreceptors,
    
    // Additional functions
    availablePreceptors,
    hirePreceptor,
    firePreceptor,
    getPreceptorById
  };
};
