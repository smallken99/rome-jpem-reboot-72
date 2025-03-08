
import { useState, useEffect } from 'react';
import { Child, EducationPath, Preceptor } from '../types/educationTypes';
import { educationPaths } from '../data';
import { 
  generateRomanName, 
  generateSpeciality, 
  generateReputation, 
  generateFee,
  generateTitle,
  generateStatBonus,
  generateGender
} from '../preceptorUtils';

export const useEducationSystem = () => {
  const [availablePaths, setAvailablePaths] = useState<EducationPath[]>([]);
  const [availablePreceptors, setAvailablePreceptors] = useState<Preceptor[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Set available paths
    setAvailablePaths(educationPaths);
    
    // Generate preceptors (simplified)
    const preceptors: Preceptor[] = [];
    for (let i = 0; i < 10; i++) {
      const reputation = generateReputation();
      const educationType = educationPaths[Math.floor(Math.random() * educationPaths.length)].type || '';
      
      preceptors.push({
        id: `preceptor-${i}`,
        name: generateRomanName(),
        speciality: generateSpeciality(),
        reputation: reputation,
        quality: reputation === "Excellent" ? 5 : reputation === "Bon" ? 4 : 3,
        cost: generateFee(),
        available: true,
        background: `Un éducateur expérimenté, spécialisé en ${generateSpeciality()}.`,
        childId: null
      });
    }
    
    setAvailablePreceptors(preceptors);
    setLoading(false);
  }, []);
  
  // Function to filter education paths based on child's age and gender
  const getPathsForChild = (child: Child): EducationPath[] => {
    return availablePaths.filter(path => {
      const meetsAgeRequirement = child.age >= (path.minAge || 0);
      const meetsGenderRequirement = 
        path.suitableFor === 'both' || 
        path.suitableFor === child.gender;
      
      return meetsAgeRequirement && meetsGenderRequirement;
    });
  };
  
  // Function to generate a random preceptor for a specific education type
  const generatePreceptorForType = (educationType: string): Preceptor => {
    const reputation = generateReputation();
    return {
      id: `preceptor-${Date.now()}`,
      name: generateRomanName(),
      speciality: generateSpeciality(),
      reputation: reputation,
      quality: reputation === "Excellent" ? 5 : reputation === "Bon" ? 4 : 3,
      cost: generateFee(),
      available: true,
      background: `Un éducateur expérimenté, spécialisé en ${generateSpeciality()}.`,
      childId: null
    };
  };
  
  return {
    availablePaths,
    availablePreceptors,
    loading,
    getPathsForChild,
    generatePreceptorForType
  };
};
