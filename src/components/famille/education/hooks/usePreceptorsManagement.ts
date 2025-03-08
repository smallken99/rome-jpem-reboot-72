
import { useState, useCallback } from 'react';
import { Preceptor, PreceptorsByType } from '../types/educationTypes';
import { generatePreceptors } from '../data/preceptors';
import { toast } from 'sonner';

export const usePreceptorsManagement = () => {
  const [preceptors, setPreceptors] = useState<PreceptorsByType>(generatePreceptors());
  const [hiredPreceptors, setHiredPreceptors] = useState<Preceptor[]>([]);
  const [isHiringPreceptor, setIsHiringPreceptor] = useState(false);

  // Refresh the list of available preceptors
  const refreshPreceptors = useCallback(() => {
    setPreceptors(generatePreceptors());
  }, []);

  // Load preceptors by type
  const loadPreceptorsByType = useCallback(async (type: string): Promise<Preceptor[]> => {
    // In a real app, this would be an API call
    // Simulating an async operation
    return new Promise((resolve) => {
      setTimeout(() => {
        const typePreceptors = preceptors[type] || [];
        resolve(typePreceptors);
      }, 500);
    });
  }, [preceptors]);

  // Hire a preceptor
  const hirePreceptor = useCallback((preceptor: Preceptor, childId?: string): boolean => {
    setIsHiringPreceptor(true);
    
    try {
      // Check if already hired
      if (hiredPreceptors.some(p => p.id === preceptor.id)) {
        toast.error("Ce précepteur est déjà à votre service");
        return false;
      }
      
      // Create a copy of the preceptor with updated status
      const hiredPreceptor: Preceptor = {
        ...preceptor,
        available: false,
        childId: childId || null
      };
      
      // Add to hired preceptors
      setHiredPreceptors(prev => [...prev, hiredPreceptor]);
      
      // Update available preceptors
      setPreceptors(prev => {
        const updatedPreceptors = { ...prev };
        const typeKey = preceptor.id.split('-')[0];
        
        if (updatedPreceptors[typeKey]) {
          updatedPreceptors[typeKey] = updatedPreceptors[typeKey].map(p => 
            p.id === preceptor.id ? { ...p, available: false } : p
          );
        }
        
        return updatedPreceptors;
      });
      
      return true;
    } catch (error) {
      console.error("Error hiring preceptor:", error);
      return false;
    } finally {
      setIsHiringPreceptor(false);
    }
  }, [hiredPreceptors]);

  // Fire a preceptor
  const firePreceptor = useCallback((preceptorId: string): boolean => {
    try {
      // Find the preceptor to fire
      const preceptorIndex = hiredPreceptors.findIndex(p => p.id === preceptorId);
      
      if (preceptorIndex === -1) {
        toast.error("Précepteur non trouvé");
        return false;
      }
      
      // Remove from hired preceptors
      setHiredPreceptors(prev => prev.filter(p => p.id !== preceptorId));
      
      // Update available preceptors list
      setPreceptors(prev => {
        const updatedPreceptors = { ...prev };
        const typeKey = preceptorId.split('-')[0];
        
        if (updatedPreceptors[typeKey]) {
          updatedPreceptors[typeKey] = updatedPreceptors[typeKey].map(p => 
            p.id === preceptorId ? { ...p, available: true } : p
          );
        }
        
        return updatedPreceptors;
      });
      
      return true;
    } catch (error) {
      console.error("Error firing preceptor:", error);
      return false;
    }
  }, [hiredPreceptors]);

  // Assign a preceptor to a child
  const assignPreceptorToChild = useCallback((preceptorId: string, childId: string): boolean => {
    try {
      // Find the preceptor to assign
      const preceptorIndex = hiredPreceptors.findIndex(p => p.id === preceptorId);
      
      if (preceptorIndex === -1) {
        toast.error("Précepteur non trouvé");
        return false;
      }
      
      // Update preceptor's assignment
      setHiredPreceptors(prev => prev.map(p => 
        p.id === preceptorId ? { ...p, childId } : p
      ));
      
      return true;
    } catch (error) {
      console.error("Error assigning preceptor:", error);
      return false;
    }
  }, [hiredPreceptors]);

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
