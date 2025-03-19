
import { useState, useEffect } from 'react';
import { Child, EducationPath, Preceptor, EducationPathType } from '../types/educationTypes';
import { educationPaths as educationPathsData } from '../data/educationPaths';

export const useEducationSystem = () => {
  const [educationPaths, setEducationPaths] = useState<EducationPath[]>(educationPathsData);
  const [availablePreceptors, setAvailablePreceptors] = useState<Preceptor[]>([]);

  // Fonction de recherche de précepteurs
  const searchPreceptors = (type: string, minQuality?: number): Preceptor[] => {
    // Simulation de la recherche de précepteurs
    return [
      {
        id: `preceptor-${Date.now()}`,
        name: `Précepteur de ${type}`,
        specialty: type as EducationPathType,
        price: 2000 + (minQuality || 0) * 50,
        quality: minQuality ? minQuality + 10 : 60,
        experience: 5,
        assigned: false,
        available: true,
        specialties: [type],
        speciality: type
      }
    ];
  };

  // Fonction qui vérifie si un enfant peut suivre un certain chemin d'éducation
  const canFollowPath = (child: Child, pathId: string): { eligible: boolean; reason?: string } => {
    const path = educationPaths.find(p => p.id === pathId);
    if (!path) return { eligible: false, reason: 'Chemin d\'éducation non trouvé' };

    // Vérifier l'âge
    if (child.age < path.minimumAge) {
      return { eligible: false, reason: `L'enfant est trop jeune. Âge minimum: ${path.minimumAge}` };
    }
    if (child.age > path.maximumAge) {
      return { eligible: false, reason: `L'enfant est trop âgé. Âge maximum: ${path.maximumAge}` };
    }

    // Vérifier les prérequis spécifiques si nécessaire
    if (path.requirements) {
      if (Array.isArray(path.requirements)) {
        // Pour les prérequis sous forme de liste (à implémenter au besoin)
      } else {
        // Vérifier l'âge minimum spécifique si défini
        if (path.requirements.age && child.age < path.requirements.age) {
          return { eligible: false, reason: `L'enfant doit avoir au moins ${path.requirements.age} ans` };
        }
        
        // Vérifier le genre si défini
        if (path.requirements.gender && path.requirements.gender !== 'both') {
          if (path.requirements.gender !== child.gender) {
            return { eligible: false, reason: `Cette éducation est réservée aux ${path.requirements.gender === 'male' ? 'garçons' : 'filles'}` };
          }
        }
      }
    }

    return { eligible: true };
  };

  // Fonction pour calculer le coût d'éducation
  const calculateEducationCost = (pathId: string, preceptorId?: string): number => {
    const path = educationPaths.find(p => p.id === pathId);
    const baseCost = path ? path.cost : 0;
    
    // Ajouter le coût du précepteur si applicable
    let preceptorCost = 0;
    if (preceptorId) {
      const preceptor = availablePreceptors.find(p => p.id === preceptorId);
      preceptorCost = preceptor ? preceptor.price : 0;
    }
    
    return baseCost + preceptorCost;
  };

  // Fonction pour trouver un chemin d'éducation par type
  const findPathByType = (type: EducationPathType): EducationPath | undefined => {
    return educationPaths.find(path => path.type === type);
  };

  // Fonctions pour l'initialisation et la mise à jour des données
  const refreshPreceptors = () => {
    setAvailablePreceptors(prev => [
      ...prev,
      ...searchPreceptors('military'),
      ...searchPreceptors('religious'),
      ...searchPreceptors('rhetoric')
    ]);
  };

  useEffect(() => {
    refreshPreceptors();
  }, []);

  return {
    educationPaths,
    availablePreceptors,
    canFollowPath,
    calculateEducationCost,
    findPathByType,
    refreshPreceptors,
    searchPreceptors
  };
};
