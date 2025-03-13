
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
