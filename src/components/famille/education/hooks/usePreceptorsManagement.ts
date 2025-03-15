
import { useState, useCallback } from 'react';
import { Preceptor } from '../types/educationTypes';
import { toast } from 'sonner';

// Import the correct export
import { preceptorsList as mockPreceptors } from '../data/preceptors';

export const usePreceptorsManagement = () => {
  const [preceptors, setPreceptors] = useState<Preceptor[]>(mockPreceptors);
  const [hiredPreceptors, setHiredPreceptors] = useState<Preceptor[]>([]);
  const [isHiringPreceptor, setIsHiringPreceptor] = useState(false);

  // Load preceptors by type
  const loadPreceptorsByType = useCallback((type: string): Preceptor[] => {
    return preceptors.filter(p => p.specialty === type && p.available);
  }, [preceptors]);

  // Refresh preceptors list
  const refreshPreceptors = useCallback(() => {
    // In a real app, this would fetch from an API
    setPreceptors(mockPreceptors);
  }, []);

  // Hire a preceptor
  const hirePreceptor = useCallback((id: string) => {
    setIsHiringPreceptor(true);

    try {
      // Find the preceptor
      const preceptor = preceptors.find(p => p.id === id);
      
      if (!preceptor) {
        toast.error("Précepteur introuvable");
        return;
      }
      
      // Update available status
      setPreceptors(prev => 
        prev.map(p => 
          p.id === id ? { ...p, available: false } : p
        )
      );
      
      // Add to hired preceptors
      const hiredPreceptor = { ...preceptor, available: false, status: 'hired' as const };
      setHiredPreceptors(prev => [...prev, hiredPreceptor]);
      
      toast.success(`${preceptor.name} a été engagé`);
    } catch (error) {
      console.error("Error hiring preceptor:", error);
      toast.error("Une erreur est survenue");
    } finally {
      setIsHiringPreceptor(false);
    }
  }, [preceptors]);

  // Fire a preceptor
  const firePreceptor = useCallback((id: string) => {
    try {
      // Find the preceptor
      const preceptor = hiredPreceptors.find(p => p.id === id);
      
      if (!preceptor) {
        toast.error("Précepteur introuvable");
        return;
      }
      
      // Update available status in main list
      setPreceptors(prev => 
        prev.map(p => 
          p.id === id ? { ...p, available: true } : p
        )
      );
      
      // Remove from hired preceptors
      setHiredPreceptors(prev => prev.filter(p => p.id !== id));
      
      toast.success(`${preceptor.name} a été renvoyé`);
    } catch (error) {
      console.error("Error firing preceptor:", error);
      toast.error("Une erreur est survenue");
    }
  }, [hiredPreceptors]);

  // Assign preceptor to child
  const assignPreceptorToChild = useCallback((preceptorId: string, childId: string) => {
    try {
      // First, unassign any preceptor currently assigned to this child
      setHiredPreceptors(prev => 
        prev.map(p => 
          p.childId === childId ? { ...p, status: 'hired', childId: null } : p
        )
      );
      
      // Then assign the new preceptor
      setHiredPreceptors(prev => 
        prev.map(p => 
          p.id === preceptorId ? { ...p, status: 'assigned', childId } : p
        )
      );
      
      const preceptor = hiredPreceptors.find(p => p.id === preceptorId);
      if (preceptor) {
        toast.success(`${preceptor.name} a été assigné à l'éducation`);
      }
    } catch (error) {
      console.error("Error assigning preceptor:", error);
      toast.error("Une erreur est survenue");
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
