
import { useState, useCallback, useEffect } from 'react';
import { Preceptor } from '../types/educationTypes';
import { preceptorDatabase } from '../data/preceptorDatabase';

export const usePreceptorsManagement = () => {
  const [preceptors, setPreceptors] = useState<Preceptor[]>([]);
  const [hiredPreceptors, setHiredPreceptors] = useState<Preceptor[]>([]);
  const [isHiringPreceptor, setIsHiringPreceptor] = useState(false);

  // Initialize preceptors
  useEffect(() => {
    refreshPreceptors();
  }, []);

  // Refresh preceptors list
  const refreshPreceptors = useCallback(() => {
    const freshPreceptors = preceptorDatabase.getPreceptors();
    
    // Exclude already hired preceptors
    const availablePreceptors = freshPreceptors.filter(p => 
      !hiredPreceptors.some(hired => hired.id === p.id)
    );
    
    setPreceptors(availablePreceptors);
  }, [hiredPreceptors]);

  // Load preceptors by type
  const loadPreceptorsByType = useCallback((type: string) => {
    if (type === 'all') {
      return preceptors;
    }
    return preceptors.filter(p => p.specialty === type);
  }, [preceptors]);

  // Hire preceptor
  const hirePreceptor = useCallback((preceptorId: string) => {
    setIsHiringPreceptor(true);
    
    // Find preceptor in available list
    const preceptor = preceptors.find(p => p.id === preceptorId);
    
    if (preceptor) {
      // Add to hired list with updated status
      setHiredPreceptors(prev => [
        ...prev, 
        { ...preceptor, status: 'hired', available: false }
      ]);
      
      // Remove from available list
      setPreceptors(prev => prev.filter(p => p.id !== preceptorId));
    }
    
    setIsHiringPreceptor(false);
  }, [preceptors]);

  // Fire preceptor
  const firePreceptor = useCallback((preceptorId: string) => {
    // Find preceptor in hired list
    const preceptor = hiredPreceptors.find(p => p.id === preceptorId);
    
    if (preceptor) {
      // Remove from hired list
      setHiredPreceptors(prev => prev.filter(p => p.id !== preceptorId));
      
      // Add back to available list with updated status
      if (preceptor.status !== 'assigned') {
        setPreceptors(prev => [
          ...prev, 
          { ...preceptor, status: 'available', available: true, childId: null }
        ]);
      }
    }
  }, [hiredPreceptors]);

  // Assign preceptor to child
  const assignPreceptorToChild = useCallback((preceptorId: string, childId: string) => {
    setHiredPreceptors(prev => prev.map(p => 
      p.id === preceptorId ? { ...p, status: 'assigned', childId } : p
    ));
  }, []);

  return {
    preceptors,
    hiredPreceptors,
    isHiringPreceptor,
    refreshPreceptors,
    loadPreceptorsByType,
    hirePreceptor,
    firePreceptor,
    assignPreceptorToChild
  };
};

// Ajouter cette ligne si le fichier preceptorDatabase.ts n'existe pas
export const preceptorDatabase = {
  getPreceptors: () => {
    // Mockup data
    return [
      {
        id: '1',
        name: 'Marcus Tullius',
        specialty: 'rhetoric',
        skill: 85,
        price: 5000,
        status: 'available',
        background: 'Ancien orateur au Sénat',
        quality: 85,
        reputation: 'excellent',
        cost: 5000,
        available: true,
        speciality: 'rhetoric'
      },
      {
        id: '2',
        name: 'Quintus Fabius',
        specialty: 'military',
        skill: 80,
        price: 4500,
        status: 'available',
        background: 'Vétéran des guerres puniques',
        quality: 80,
        reputation: 'excellent',
        cost: 4500,
        available: true,
        speciality: 'military'
      },
      {
        id: '3',
        name: 'Publius Cornelius',
        specialty: 'religious',
        skill: 75,
        price: 4000,
        status: 'available',
        background: 'Ancien augure',
        quality: 75,
        reputation: 'bon',
        cost: 4000,
        available: true,
        speciality: 'religious'
      }
    ] as Preceptor[];
  }
};
