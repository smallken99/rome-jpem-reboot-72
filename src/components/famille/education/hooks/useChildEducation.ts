
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { children, educationPaths } from '../data';
import { Child, EducationPath } from '../types/educationTypes';

export const useChildEducation = (childId: string | undefined) => {
  const navigate = useNavigate();
  const [child, setChild] = useState<Child | null>(null);
  const [availablePaths, setAvailablePaths] = useState<EducationPath[]>([]);
  const [selectedEducationType, setSelectedEducationType] = useState<string>('');
  
  // Chercher les données de l'enfant
  useEffect(() => {
    if (childId) {
      const foundChild = children.find(c => c.id === childId);
      if (foundChild) {
        setChild(foundChild);
        setSelectedEducationType(foundChild.currentEducation.type);
        
        // Filtrer les parcours éducatifs disponibles en fonction du genre et de l'âge
        const filteredPaths = educationPaths.filter(path => {
          const genderMatch = path.suitableFor === 'both' || 
                             (path.suitableFor === 'male' && foundChild.gender === 'male') ||
                             (path.suitableFor === 'female' && foundChild.gender === 'female');
          const ageMatch = foundChild.age >= path.minAge;
          return genderMatch && ageMatch;
        });
        
        setAvailablePaths(filteredPaths);
      }
    }
  }, [childId]);
  
  // Gestionnaire pour le changement du type d'éducation
  const handleEducationTypeChange = (type: string) => {
    setSelectedEducationType(type);
  };
  
  // Gestionnaire pour la soumission du formulaire
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Ici, nous simulons la mise à jour des données de l'enfant
    // Dans une application réelle, vous feriez un appel à l'API
    
    // Rediriger vers la page d'éducation principale
    navigate('/famille/education');
  };
  
  return {
    child,
    availablePaths,
    selectedEducationType,
    handleEducationTypeChange,
    handleSubmit,
    isInvalidEducation: child?.gender === 'female' && selectedEducationType === 'military'
  };
};
