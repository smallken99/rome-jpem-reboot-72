
import { useState } from 'react';
import { toast } from 'sonner';
import { Preceptor } from '../types/educationTypes';
import { PreceptorsByType } from '../context/types';

export const usePreceptorManagement = () => {
  const [hiredPreceptors, setHiredPreceptors] = useState<Preceptor[]>([]);
  const [hiringInProgress, setHiringInProgress] = useState(false);
  
  // Hire a preceptor
  const hirePreceptor = (preceptor: Preceptor, childId?: string) => {
    setHiringInProgress(true);
    
    // Simulate hiring process (in a real app, this would involve a backend call)
    setTimeout(() => {
      setHiredPreceptors(prev => [...prev, {...preceptor, childId}]);
      setHiringInProgress(false);
      
      toast.success(
        childId 
          ? `${preceptor.name} a été embauché pour éduquer votre enfant.` 
          : `${preceptor.name} a été embauché comme précepteur de votre famille.`
      );
    }, 1500);
    
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
      if (!preceptor.specialty) return;
      
      const type = determineEducationType(preceptor.specialty);
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
    hiredPreceptors,
    hiringInProgress,
    hirePreceptor,
    firePreceptor,
    assignPreceptorToChild,
    getPreceptorsByType
  };
};
