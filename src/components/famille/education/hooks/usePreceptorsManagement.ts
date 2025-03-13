
import { useState } from 'react';
import { Preceptor } from '../types/educationTypes';
import { toast } from 'sonner';

// Mock data for preceptors
const mockPreceptors: Preceptor[] = [
  {
    id: 'p1',
    name: 'Marcus Tullius',
    specialty: 'rhetoric',
    skill: 75,
    price: 2000,
    status: 'available'
  },
  {
    id: 'p2',
    name: 'Quintus Valerius',
    specialty: 'politics',
    skill: 80,
    price: 3000,
    status: 'available'
  },
  {
    id: 'p3',
    name: 'Gaius Flavius',
    specialty: 'military',
    skill: 85,
    price: 4000,
    status: 'available'
  },
  {
    id: 'p4',
    name: 'Lucius Aemilius',
    specialty: 'philosophy',
    skill: 90,
    price: 5000,
    status: 'available'
  },
  {
    id: 'p5',
    name: 'Titus Claudius',
    specialty: 'rhetoric',
    skill: 65,
    price: 1500,
    status: 'available'
  },
  {
    id: 'p6',
    name: 'Publius Cornelius',
    specialty: 'military',
    skill: 70,
    price: 2500,
    status: 'available'
  },
];

export const usePreceptorsManagement = () => {
  const [preceptors, setPreceptors] = useState<Preceptor[]>(mockPreceptors);
  const [hiredPreceptors, setHiredPreceptors] = useState<Preceptor[]>([]);
  const [isHiringPreceptor, setIsHiringPreceptor] = useState(false);

  const refreshPreceptors = () => {
    // In a real app, this would call an API
    // For now, we'll just reset to our mock data
    setPreceptors(mockPreceptors.filter(p => 
      !hiredPreceptors.some(hp => hp.id === p.id)
    ));
  };

  const loadPreceptorsByType = (type: string): Preceptor[] => {
    if (!type || type === 'all') {
      return preceptors;
    }
    return preceptors.filter(p => p.specialty === type);
  };

  const hirePreceptor = (preceptorId: string) => {
    const preceptor = preceptors.find(p => p.id === preceptorId);
    
    if (!preceptor) {
      toast.error("Précepteur non trouvé.");
      return;
    }
    
    // Update preceptor status
    const updatedPreceptor = { ...preceptor, status: 'hired' as const };
    
    // Remove from available preceptors
    setPreceptors(prev => prev.filter(p => p.id !== preceptorId));
    
    // Add to hired preceptors
    setHiredPreceptors(prev => [...prev, updatedPreceptor]);
    
    toast.success(`${preceptor.name} a été embauché comme précepteur.`);
  };

  const firePreceptor = (preceptorId: string) => {
    const preceptor = hiredPreceptors.find(p => p.id === preceptorId);
    
    if (!preceptor) {
      toast.error("Précepteur non trouvé parmi ceux embauchés.");
      return;
    }
    
    // Update preceptor status
    const updatedPreceptor = { ...preceptor, status: 'available' as const };
    
    // Remove from hired preceptors
    setHiredPreceptors(prev => prev.filter(p => p.id !== preceptorId));
    
    // Add back to available preceptors
    setPreceptors(prev => [...prev, updatedPreceptor]);
    
    toast.success(`${preceptor.name} a été libéré de ses fonctions.`);
  };

  const assignPreceptorToChild = (childId: string, preceptorId: string) => {
    const preceptor = hiredPreceptors.find(p => p.id === preceptorId);
    
    if (!preceptor) {
      toast.error("Précepteur non trouvé.");
      return;
    }
    
    // In a real app, we would update the assignment in the database
    toast.success(`${preceptor.name} a été assigné à l'éducation de l'enfant.`);
  };

  return {
    preceptors,
    hiredPreceptors,
    isHiringPreceptor,
    setIsHiringPreceptor,
    refreshPreceptors,
    loadPreceptorsByType,
    hirePreceptor,
    firePreceptor,
    assignPreceptorToChild
  };
};
