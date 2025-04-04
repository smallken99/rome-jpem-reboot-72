
import { useState } from 'react';
import { toast } from 'sonner';
import { Preceptor, EducationType, PreceptorsByType } from '../types/educationTypes';
import { preceptors as initialPreceptors } from '../data/preceptors';
import { v4 as uuidv4 } from 'uuid';

export const usePreceptorManagement = () => {
  const [preceptors, setPreceptors] = useState<Preceptor[]>(initialPreceptors);
  const [hiredPreceptors, setHiredPreceptors] = useState<Preceptor[]>([]);
  const [hiringInProgress, setHiringInProgress] = useState(false);

  // Hire a new preceptor
  const hirePreceptor = (preceptor: Preceptor, childId?: string): boolean => {
    // Check if already hired
    const isAlreadyHired = hiredPreceptors.some(p => p.id === preceptor.id);
    if (isAlreadyHired) {
      toast.error("Ce précepteur est déjà engagé");
      return false;
    }

    // Update the preceptor's status
    const updatedPreceptor = {
      ...preceptor,
      available: false,
      status: 'hired',
      assignedTo: childId
    };

    setHiredPreceptors(prev => [...prev, updatedPreceptor]);
    
    // Update the available preceptors list
    setPreceptors(prev => 
      prev.map(p => 
        p.id === preceptor.id ? { ...p, available: false, status: 'hired' } : p
      )
    );

    toast.success(`${preceptor.name} a été engagé avec succès`);
    return true;
  };

  // Fire a preceptor
  const firePreceptor = (preceptorId: string): boolean => {
    const preceptorToFire = hiredPreceptors.find(p => p.id === preceptorId);
    
    if (!preceptorToFire) {
      toast.error("Précepteur non trouvé");
      return false;
    }

    // Remove from hired list
    setHiredPreceptors(prev => prev.filter(p => p.id !== preceptorId));
    
    // Update available list
    setPreceptors(prev => 
      prev.map(p => 
        p.id === preceptorId ? { ...p, available: true, status: 'available', assignedTo: undefined } : p
      )
    );

    toast.success(`${preceptorToFire.name} a été renvoyé`);
    return true;
  };

  // Assign preceptor to a child
  const assignPreceptorToChild = (preceptorId: string, childId: string): boolean => {
    const preceptorToAssign = hiredPreceptors.find(p => p.id === preceptorId);
    
    if (!preceptorToAssign) {
      toast.error("Ce précepteur n'est pas disponible");
      return false;
    }

    // Update the preceptor's assignment
    setHiredPreceptors(prev => 
      prev.map(p => 
        p.id === preceptorId ? { ...p, assignedTo: childId } : p
      )
    );

    toast.success(`${preceptorToAssign.name} a été assigné à cet enfant`);
    return true;
  };

  // Group preceptors by their specialization
  const getPreceptorsByType = (preceptorsToGroup: Preceptor[]): PreceptorsByType => {
    return preceptorsToGroup.reduce((acc, preceptor) => {
      const type = (preceptor.specialty || preceptor.speciality) as EducationType;
      
      if (!acc[type]) {
        acc[type] = [];
      }
      
      acc[type].push(preceptor);
      return acc;
    }, {} as PreceptorsByType);
  };

  // Filter preceptors by type
  const filterPreceptorsByType = (type: EducationType): Preceptor[] => {
    return preceptors.filter(p => p.specialty === type || p.speciality === type);
  };

  // Create a custom preceptor
  const createCustomPreceptor = (preceptorData: Partial<Preceptor>): string => {
    const newPreceptor: Preceptor = {
      id: uuidv4(),
      name: preceptorData.name || "Nouveau Précepteur",
      specialty: preceptorData.specialty || "rhetoric",
      speciality: preceptorData.speciality || "rhetoric",
      specialties: preceptorData.specialties || [],
      expertise: preceptorData.expertise || 70,
      experience: preceptorData.experience || 10,
      cost: preceptorData.cost || 3000,
      price: preceptorData.price || 3000,
      available: true,
      skill: preceptorData.skill || 70,
      quality: preceptorData.quality || 3,
      description: preceptorData.description || "",
      status: "available"
    };

    setPreceptors(prev => [...prev, newPreceptor]);
    toast.success(`${newPreceptor.name} a été ajouté à la liste des précepteurs`);
    
    return newPreceptor.id;
  };

  return {
    preceptors,
    hiredPreceptors,
    hiringInProgress,
    hirePreceptor,
    firePreceptor,
    assignPreceptorToChild,
    getPreceptorsByType,
    filterPreceptorsByType,
    createCustomPreceptor,
    setHiringInProgress
  };
};
