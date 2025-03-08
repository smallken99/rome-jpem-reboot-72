
import { useState, useEffect } from 'react';
import { Preceptor, PreceptorsByType } from '../types/educationTypes';
import { toast } from 'sonner';

export const usePreceptorsManagement = () => {
  const [preceptors, setPreceptors] = useState<PreceptorsByType>({});
  const [hiredPreceptors, setHiredPreceptors] = useState<Preceptor[]>([]);
  
  // Refresh available preceptors
  const refreshPreceptors = () => {
    // This would usually fetch from an API
    // For now we'll just use what the original code had
    import('../data').then(({ generatePreceptors }) => {
      const newPreceptors = generatePreceptors();
      setPreceptors(getPreceptorsByType(Object.values(newPreceptors).flat()));
    }).catch(err => {
      console.error("Error loading preceptors:", err);
      toast.error("Impossible de charger les précepteurs");
    });
  };
  
  // Initialize preceptors on first load
  useEffect(() => {
    refreshPreceptors();
  }, []);
  
  // Hire a preceptor
  const hirePreceptor = (preceptor: Preceptor, childId?: string) => {
    setHiredPreceptors(prev => [...prev, {...preceptor, childId}]);
    
    toast.success(
      childId 
        ? `${preceptor.name} a été embauché pour éduquer votre enfant.` 
        : `${preceptor.name} a été embauché comme précepteur de votre famille.`
    );
    
    return true;
  };
  
  // Fire a preceptor
  const firePreceptor = (preceptorId: string) => {
    const preceptor = hiredPreceptors.find(p => p.id === preceptorId);
    
    if (!preceptor) {
      toast.error("Précepteur introuvable");
      return false;
    }
    
    setHiredPreceptors(prev => prev.filter(p => p.id !== preceptorId));
    toast.success(`${preceptor.name} n'est plus à votre service.`);
    
    return true;
  };
  
  // Assign preceptor to a child
  const assignPreceptorToChild = (preceptorId: string, childId: string) => {
    setHiredPreceptors(prev => 
      prev.map(p => p.id === preceptorId ? {...p, childId} : p)
    );
    
    const preceptor = hiredPreceptors.find(p => p.id === preceptorId);
    if (preceptor) {
      toast.success(`${preceptor.name} a été assigné à l'éducation de votre enfant.`);
    }
    
    return true;
  };
  
  // Get preceptors by education type
  const getPreceptorsByType = (preceptors: Preceptor[]): PreceptorsByType => {
    const result: PreceptorsByType = {};
    
    preceptors.forEach(preceptor => {
      if (!preceptor.speciality) return;
      
      const type = determineEducationType(preceptor.speciality);
      if (!result[type]) {
        result[type] = [];
      }
      
      result[type].push(preceptor);
    });
    
    return result;
  };
  
  // Helper to determine education type from specialty
  const determineEducationType = (specialty: string): string => {
    const militaryKeywords = ['tactique', 'combat', 'guerre', 'militaire'];
    const politicalKeywords = ['rhétorique', 'politique', 'éloquence', 'droit'];
    const religiousKeywords = ['rituel', 'divin', 'religieux', 'augure', 'vestale'];
    const commercialKeywords = ['commerce', 'négoce', 'marchand', 'économie'];
    
    const specialty_lower = specialty.toLowerCase();
    
    if (militaryKeywords.some(kw => specialty_lower.includes(kw))) return 'military';
    if (politicalKeywords.some(kw => specialty_lower.includes(kw))) return 'political';
    if (religiousKeywords.some(kw => specialty_lower.includes(kw))) return 'religious';
    if (commercialKeywords.some(kw => specialty_lower.includes(kw))) return 'commercial';
    
    return 'political'; // Default to political education
  };
  
  return {
    preceptors,
    hiredPreceptors,
    refreshPreceptors,
    hirePreceptor,
    firePreceptor,
    assignPreceptorToChild,
    getPreceptorsByType
  };
};
