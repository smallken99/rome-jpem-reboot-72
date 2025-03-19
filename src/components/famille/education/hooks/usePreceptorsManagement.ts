
import { useState, useEffect } from 'react';
import { Preceptor } from '../types/educationTypes';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'sonner';

export const usePreceptorsManagement = () => {
  const [preceptors, setPreceptors] = useState<Preceptor[]>([
    {
      id: '1',
      name: 'Quintus Servilius',
      specialty: 'rhetoric',
      price: 5000,
      quality: 85,
      experience: 15,
      assigned: false,
      available: true
    },
    {
      id: '2',
      name: 'Gaius Flavius',
      specialty: 'military',
      price: 8000,
      quality: 90,
      experience: 20,
      assigned: false,
      available: true
    },
    {
      id: '3',
      name: 'Titus Livius',
      specialty: 'academic',
      price: 6000,
      quality: 95,
      experience: 25,
      assigned: false,
      available: true
    }
  ]);

  const getPreceptorById = (id: string): Preceptor | undefined => {
    return preceptors.find(p => p.id === id);
  };

  const addPreceptor = (preceptorData: Omit<Preceptor, 'id'>): string => {
    const id = uuidv4();
    const newPreceptor: Preceptor = {
      ...preceptorData,
      id
    };
    
    setPreceptors(prev => [...prev, newPreceptor]);
    return id;
  };

  const removePreceptor = (id: string) => {
    setPreceptors(prev => prev.filter(p => p.id !== id));
  };

  const updatePreceptor = (id: string, data: Partial<Preceptor>) => {
    setPreceptors(prev => 
      prev.map(p => p.id === id ? { ...p, ...data } : p)
    );
  };

  const hirePreceptor = (preceptorId: string, childId?: string) => {
    const preceptor = getPreceptorById(preceptorId);
    
    if (!preceptor) {
      toast.error('Précepteur non trouvé');
      return false;
    }
    
    const updates: Partial<Preceptor> = {
      assigned: true,
      available: false
    };
    
    if (childId) {
      updates.childId = childId;
    }
    
    updatePreceptor(preceptorId, updates);
    
    toast.success(`${preceptor.name} a été embauché comme précepteur`);
    return true;
  };

  const firePreceptor = (preceptorId: string) => {
    const preceptor = getPreceptorById(preceptorId);
    
    if (!preceptor) {
      toast.error('Précepteur non trouvé');
      return;
    }
    
    updatePreceptor(preceptorId, {
      assigned: false,
      available: true,
      childId: undefined
    });
    
    toast.success(`${preceptor.name} a été renvoyé`);
  };

  const getAvailablePreceptors = () => {
    return preceptors.filter(p => p.assigned !== true && p.available !== false);
  };

  const getAssignedPreceptors = () => {
    return preceptors.filter(p => p.assigned === true || p.available === false);
  };

  return {
    preceptors,
    setPreceptors,
    addPreceptor,
    removePreceptor,
    updatePreceptor,
    hirePreceptor,
    firePreceptor,
    getPreceptorById,
    getAvailablePreceptors,
    getAssignedPreceptors
  };
};
