
import { useState, useEffect } from 'react';
import { educationPaths } from '../data';
import { PreceptorsByType } from '../types/educationTypes';
import { Character } from '@/types/character';
import { 
  generateRomanName, 
  generateSpeciality, 
  generateReputation, 
  generateFee, 
  generateTitle,
  generateStatBonus,
  generateGender
} from '../preceptorUtils';

// Constants for the education system
const MAX_STAT_VALUE_FROM_EDUCATION = 40;

export const useEducationSystem = (characters: Character[] = []) => {
  const [activeTab, setActiveTab] = useState("current");
  const [preceptors, setPreceptors] = useState<PreceptorsByType>({});

  // Filter out only children (characters under 18)
  const children = characters.filter(char => char.age < 18);

  // Generate random preceptors for each education path
  const generatePreceptors = () => {
    const newPreceptors: PreceptorsByType = {};
    
    educationPaths.forEach(path => {
      const pathPreceptors = [];
      // Générer plus de précepteurs (8-12 par type d'éducation)
      const numPreceptors = 8 + Math.floor(Math.random() * 5);
      
      for (let i = 0; i < numPreceptors; i++) {
        // Déterminer le genre selon le type d'éducation
        const gender = generateGender(path.type);
        const title = generateTitle(path.type, gender);
        const name = `${title} ${generateRomanName()}`;
        const speciality = generateSpeciality(path.type);
        const reputation = generateReputation();
        const fee = generateFee(reputation);
        
        // Generate stat bonus based on reputation, respecting the maximum allowed value
        let statBonus = generateStatBonus(reputation);
        
        // Apply maximum stat bonus cap based on path type
        if (path.type === 'political' || path.type === 'religious' || path.type === 'military' || path.type === 'commercial') {
          // Ensure the bonus doesn't exceed the max value from education
          statBonus = Math.min(statBonus, MAX_STAT_VALUE_FROM_EDUCATION - 30); // Leaving room for growth
        }
        
        pathPreceptors.push({
          id: `${path.type}-${i}`,
          name,
          speciality,
          reputation,
          fee,
          statBonus,
          gender
        });
      }
      
      newPreceptors[path.type] = pathPreceptors;
    });
    
    setPreceptors(newPreceptors);
  };

  // Generate preceptors on initial load
  useEffect(() => {
    generatePreceptors();
  }, []);

  return {
    activeTab,
    setActiveTab,
    preceptors,
    generatePreceptors,
    children
  };
};
