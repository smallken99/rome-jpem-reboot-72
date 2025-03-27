
import { useState, useCallback } from 'react';
import { EducationPath, EducationType, Preceptor } from '../types/educationTypes';
import { getAllEducationPaths, getEducationPathById } from '../data/educationPaths';

export const useEducationSystem = () => {
  const [selectedPathId, setSelectedPathId] = useState<string | null>(null);
  
  // Get all available education paths
  const getEducationPaths = useCallback(() => {
    return getAllEducationPaths();
  }, []);
  
  // Get a specific education path by ID
  const getEducationPathById = useCallback((id: string) => {
    return getEducationPathById(id);
  }, []);
  
  // Generate sample preceptors for a type
  const generatePreceptorsForType = useCallback((type: EducationType | string): Preceptor[] => {
    const preceptors: Preceptor[] = [
      {
        id: `${type}-preceptor-1`,
        name: `Master of ${type}`,
        specialization: type as EducationType,
        skill: 80,
        cost: 4000,
        background: `Expert in ${type} education`,
        traits: ['Knowledgeable', 'Patient'],
        status: 'available',
        specialty: type,
        speciality: type,
        experience: 15,
        price: 4000,
        quality: 4,
        expertise: 80,
        available: true,
        specialties: [`${type} basics`, `${type} advanced`]
      }
    ];
    
    return preceptors;
  }, []);
  
  // Filter paths by gender and age
  const filterPathsByEligibility = useCallback((paths: EducationPath[], gender: 'male' | 'female', age: number) => {
    return paths.filter(path => {
      // Check gender eligibility
      const genderEligible = !path.suitableFor || path.suitableFor.includes(gender);
      
      // Check age eligibility
      const ageEligible = age >= path.minAge && (!path.maxAge || age <= path.maxAge);
      
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
