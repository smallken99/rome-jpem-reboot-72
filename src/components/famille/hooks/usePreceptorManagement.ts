
import { useState } from 'react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { Preceptor } from '../education/types/educationTypes';
import { toast } from 'sonner';
import { v4 as uuidv4 } from 'uuid';
import { getAllPreceptors } from '../education/data/preceptors';

export const usePreceptorManagement = () => {
  const [hiredPreceptors, setHiredPreceptors] = useLocalStorage<Preceptor[]>(
    'hired-preceptors',
    []
  );
  
  const availablePreceptors = getAllPreceptors().filter(
    p => !hiredPreceptors.some(hired => hired.id === p.id)
  );
  
  const hirePreceptor = (preceptorId: string, childId?: string) => {
    const preceptor = availablePreceptors.find(p => p.id === preceptorId);
    
    if (!preceptor) {
      toast.error("Ce précepteur n'est pas disponible");
      return false;
    }
    
    const newHiredPreceptor = {
      ...preceptor,
      childId
    };
    
    setHiredPreceptors(prev => [...prev, newHiredPreceptor]);
    toast.success(`${preceptor.name} a été embauché comme précepteur`);
    
    return true;
  };
  
  const firePreceptor = (preceptorId: string) => {
    setHiredPreceptors(prev => prev.filter(p => p.id !== preceptorId));
    toast.success("Le précepteur a été renvoyé");
  };
  
  const assignPreceptorToChild = (preceptorId: string, childId: string) => {
    setHiredPreceptors(prev => 
      prev.map(p => 
        p.id === preceptorId 
          ? { ...p, childId } 
          : p
      )
    );
    
    toast.success("Précepteur assigné avec succès");
  };
  
  const unassignPreceptor = (preceptorId: string) => {
    setHiredPreceptors(prev => 
      prev.map(p => 
        p.id === preceptorId 
          ? { ...p, childId: undefined } 
          : p
      )
    );
    
    toast.success("Précepteur libéré de son assignation");
  };
  
  return {
    hiredPreceptors,
    availablePreceptors,
    hirePreceptor,
    firePreceptor,
    assignPreceptorToChild,
    unassignPreceptor
  };
};
