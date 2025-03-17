
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
      const educationType = educationPaths[Math.floor(Math.random() * educationPaths.length)].id || '';
      
      preceptors.push({
        id: `preceptor-${i}`,
        name: generateRomanName(),
        specialty: generateSpeciality(),
        skill: reputation === "Excellent" ? 5 : reputation === "Bon" ? 4 : 3,
        price: 1000 + Math.floor(Math.random() * 5000), 
        status: 'available',
        background: `Un éducateur expérimenté, spécialisé en ${generateSpeciality()}.`,
        childId: null,
        // For backward compatibility
        reputation,
        quality: reputation === "Excellent" ? 5 : reputation === "Bon" ? 4 : 3,
        cost: 1000 + Math.floor(Math.random() * 5000),
        available: true,
        speciality: generateSpeciality(),
        specialties: [generateSpeciality(), generateSpeciality()],
      });
    }
    
    setAvailablePreceptors(preceptors);
    setLoading(false);
  }, []);
  
  // Function to filter education paths based on child's age and gender
  const getPathsForChild = (child: Child): EducationPath[] => {
    return availablePaths.filter(path => {
      if (!path.requirements) return true;
      
      if (Array.isArray(path.requirements)) {
        return true; // No specific requirements in array format
      }
      
      // Check if requirements is an object with age and gender properties
      if (typeof path.requirements === 'object') {
        const meetsAgeRequirement = child.age >= (path.requirements.age || 0);
        const meetsGenderRequirement = 
          path.requirements.gender === 'both' || 
          path.requirements.gender === child.gender;
        
        return meetsAgeRequirement && meetsGenderRequirement;
      }
      
      return true;
    });
  };
  
  // Function to generate a random preceptor for a specific education type
  const generatePreceptorForType = (educationType: string): Preceptor => {
    const reputation = generateReputation();
    return {
      id: `preceptor-${Date.now()}`,
      name: generateRomanName(),
      specialty: generateSpeciality(),
      skill: reputation === "Excellent" ? 5 : reputation === "Bon" ? 4 : 3,
      price: 1000 + Math.floor(Math.random() * 5000),
      status: 'available',
      background: `Un éducateur expérimenté, spécialisé en ${generateSpeciality()}.`,
      childId: null,
      // For backward compatibility
      reputation,
      quality: reputation === "Excellent" ? 5 : reputation === "Bon" ? 4 : 3,
      cost: 1000 + Math.floor(Math.random() * 5000),
      available: true,
      speciality: generateSpeciality(),
      specialties: [educationType, generateSpeciality()],
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
