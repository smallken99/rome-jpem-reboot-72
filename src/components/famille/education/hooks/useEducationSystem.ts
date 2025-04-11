
import { useState, useCallback } from 'react';
import { EducationPath, EducationType, Preceptor } from '../types/educationTypes';
import { getAllEducationPaths, getEducationPathById as fetchEducationPathById } from '../data/educationPaths';
import { v4 as uuidv4 } from 'uuid';

export const useEducationSystem = () => {
  const [selectedPathId, setSelectedPathId] = useState<string | null>(null);
  
  // Get all available education paths
  const getEducationPaths = useCallback(() => {
    return getAllEducationPaths();
  }, []);
  
  // Get a specific education path by ID
  const getEducationPathById = useCallback((id: string) => {
    return fetchEducationPathById(id);
  }, []);
  
  // Generate sample preceptors for a type
  const generatePreceptorsForType = useCallback((type: EducationType | string): Preceptor[] => {
    const preceptors: Preceptor[] = [
      {
        id: uuidv4(),
        name: `Master of ${type}`,
        specialty: type as EducationType,
        speciality: type as EducationType,
        specialization: type as EducationType,
        skill: 80,
        cost: 4000,
        price: 4000,
        description: `Expert in ${type} education`,
        traits: ['Knowledgeable', 'Patient'],
        status: 'available',
        experience: 15,
        expertise: 80,
        available: true,
        quality: 4,
        specialties: [`${type} basics`, `${type} advanced`],
        teachingStyle: 'Methodical and thorough',
        reputation: 85
      }
    ];
    
    return preceptors;
  }, []);
  
  // Filter paths by gender and age
  const filterPathsByEligibility = useCallback((paths: EducationPath[], gender: 'male' | 'female', age: number) => {
    return paths.filter(path => {
      // Check gender eligibility
      let genderEligible = true;
      
      if (path.suitableFor) {
        if (Array.isArray(path.suitableFor)) {
          genderEligible = path.suitableFor.includes(gender);
        } else if (typeof path.suitableFor === 'object') {
          const suitableGender = path.suitableFor.gender || 'both';
          genderEligible = suitableGender === 'both' || suitableGender === gender;
        }
      }
      
      // Check age eligibility
      const ageEligible = (!path.minAge || age >= path.minAge) && (!path.maxAge || age <= path.maxAge);
      
      return genderEligible && ageEligible;
    });
  }, []);
  
  // Get preceptor cost for type
  const getPreceptorCostForType = useCallback((type: string, quality: number = 3) => {
    const baseCost = {
      military: 2500,
      religious: 2200,
      rhetoric: 3000,
      political: 3500,
      artistic: 2000,
      philosophical: 2800,
      academic: 3200
    };
    
    const baseValue = (baseCost as any)[type] || 2500;
    return baseValue + (quality * 500);
  }, []);
  
  return {
    selectedPathId,
    setSelectedPathId,
    getEducationPaths,
    getEducationPathById,
    generatePreceptorsForType,
    filterPathsByEligibility,
    getPreceptorCostForType
  };
};
