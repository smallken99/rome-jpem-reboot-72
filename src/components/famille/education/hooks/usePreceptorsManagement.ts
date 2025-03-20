
import { useCallback } from 'react';
import { Preceptor } from '../types/educationTypes';
import { useEducation } from '../context/EducationContext';
import { toast } from 'sonner';

export const usePreceptorsManagement = () => {
  const { 
    preceptors, 
    hirePreceptor: hirePreceptorContext, 
    firePreceptor: firePreceptorContext,
    assignPreceptorToChild,
    getPreceptorById,
    loadPreceptorsByType
  } = useEducation();
  
  // Fonction pour embaucher un précepteur
  const hirePreceptor = useCallback((preceptorId: string, childId?: string): boolean => {
    try {
      const success = hirePreceptorContext(preceptorId, childId);
      if (success && !childId) {
        toast.success("Le précepteur a été embauché avec succès");
      }
      return success;
    } catch (error) {
      console.error("Erreur lors de l'embauche du précepteur:", error);
      toast.error("Une erreur s'est produite lors de l'embauche du précepteur");
      return false;
    }
  }, [hirePreceptorContext]);
  
  // Fonction pour renvoyer un précepteur
  const firePreceptor = useCallback((preceptorId: string) => {
    try {
      firePreceptorContext(preceptorId);
      toast.success("Le précepteur a été renvoyé");
    } catch (error) {
      console.error("Erreur lors du renvoi du précepteur:", error);
      toast.error("Une erreur s'est produite lors du renvoi du précepteur");
    }
  }, [firePreceptorContext]);
  
  // Fonction pour assigner un précepteur à un enfant
  const assignPreceptor = useCallback((childId: string, preceptorId: string) => {
    try {
      assignPreceptorToChild(childId, preceptorId);
      toast.success("Le précepteur a été assigné à l'enfant");
    } catch (error) {
      console.error("Erreur lors de l'assignation du précepteur:", error);
      toast.error("Une erreur s'est produite lors de l'assignation du précepteur");
    }
  }, [assignPreceptorToChild]);
  
  // Fonction pour obtenir les précepteurs par type d'éducation
  const getPreceptorsByType = useCallback((type: string): Preceptor[] => {
    return loadPreceptorsByType(type);
  }, [loadPreceptorsByType]);
  
  return {
    preceptors,
    hirePreceptor,
    firePreceptor,
    assignPreceptor,
    getPreceptorById,
    getPreceptorsByType
  };
};
