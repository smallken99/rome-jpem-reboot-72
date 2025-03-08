
import { Child, Preceptor, EducationHistory, PreceptorsByType } from '../types/educationTypes';
import { Character } from '@/types/character';

export interface EducationContextType {
  children: Child[];
  preceptors: PreceptorsByType;
  hiredPreceptors: Preceptor[];
  educatingChildren: Record<string, boolean>;
  
  // Actions
  refreshPreceptors: () => void;
  hirePreceptor: (preceptor: Preceptor, childId?: string) => boolean;
  firePreceptor: (preceptorId: string) => boolean;
  assignPreceptorToChild: (preceptorId: string, childId: string) => boolean;
  startChildEducation: (
    childId: string, 
    educationType: string, 
    mentorId: string | null, 
    specialties: string[]
  ) => boolean;
  advanceEducationYear: (childId: string) => void;
  completeEducation: (childId: string) => void;
  updateChildName: (childId: string, newName: string) => void;
  loadPreceptorsByType?: (type: string) => Promise<Preceptor[]>;
  isHiringPreceptor?: boolean;
}

export interface EducationProviderProps {
  characters?: Character[];
  onCharacterUpdate?: (characterId: string, updatedCharacter: Partial<Character>) => void;
  children: React.ReactNode;
}
