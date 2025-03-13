
import { useState } from 'react';
import { toast } from 'sonner';
import { Child, EducationHistory } from '../context/types';
import { Character } from '@/types/character';

export const useEducationProgress = () => {
  const [educatingChildren, setEducatingChildren] = useState<Record<string, boolean>>({});

  // Start education process for a child
  const startEducation = (childId: string, educationType: string, mentor: string | null, specialties: string[] = []) => {
    setEducatingChildren(prev => ({ ...prev, [childId]: true }));
    
    // Simulate education process
    toast.success(`Éducation démarrée pour l'enfant`);
    
    // End education process after a delay (in a real app, this would be server-side)
    setTimeout(() => {
      setEducatingChildren(prev => ({ ...prev, [childId]: false }));
      toast.success(`Année d'éducation terminée !`);
    }, 2000);
    
    return true;
  };
  
  // Calculate progress gain for a year
  const calculateYearlyProgress = (child: Child, educationType: string): number => {
    // Base progress (50-70% per year)
    const baseProgress = 50 + Math.floor(Math.random() * 20);
    
    // Bonus for mentor quality
    const mentorQualityBonus = child.currentEducation?.mentor 
      ? 10 
      : 0;
    
    // Base progress
    return baseProgress + mentorQualityBonus;
  };
  
  // Advance education by a year
  const advanceEducation = (
    child: Child, 
    onComplete?: (childId: string, education: EducationHistory) => void
  ): {progress: number, isComplete: boolean} => {
    if (!child.currentEducation) {
      return { progress: 0, isComplete: false };
    }
    
    const { currentEducation } = child;
    const yearlyProgress = calculateYearlyProgress(child, currentEducation.type);
    const newProgress = Math.min(currentEducation.progress + yearlyProgress, 100);
    const isComplete = newProgress >= 100;
    
    if (isComplete && onComplete) {
      // Create education history entry
      const completedEducation: EducationHistory = {
        type: currentEducation.type,
        mentor: currentEducation.mentor || "Autodidacte",
        speciality: currentEducation.speciality,
        completedAt: child.age,
        statBonus: currentEducation.statBonus || 20,
        skills: currentEducation.skills || [],
        startYear: 0, // Ajouté pour satisfaire le type
        completed: true // Ajouté pour satisfaire le type
      };
      
      onComplete(child.id, completedEducation);
    }
    
    return { progress: newProgress, isComplete };
  };
  
  // Apply completed education effects to character
  const applyEducationToCharacter = (character: Character, educationHistory: EducationHistory): Character => {
    if (!character || !character.stats) return character;
    
    const updatedCharacter = { ...character };
    const statName = getRelatedStatToUpdate(educationHistory.type);
    
    if (statName && updatedCharacter.stats[statName as keyof typeof updatedCharacter.stats]) {
      const stat = updatedCharacter.stats[statName as keyof typeof updatedCharacter.stats];
      if (typeof stat === 'object' && 'value' in stat) {
        // Don't exceed max value (usually 80 from education alone)
        const newValue = Math.min((stat.value as number) + educationHistory.statBonus, 80);
        (stat as any).value = newValue;
      }
    }
    
    return updatedCharacter;
  };
  
  // Convert education type to character stat name
  const getRelatedStatToUpdate = (educationType: string): string | null => {
    switch(educationType) {
      case 'military':
        return 'martialEducation';
      case 'political':
      case 'rhetoric':
        return 'oratory';
      case 'religious':
        return 'piety';
      case 'commercial':
        return 'popularity'; // Commercial education increases popularity
      default:
        return null;
    }
  };
  
  return {
    educatingChildren,
    startEducation,
    advanceEducation,
    applyEducationToCharacter
  };
};
