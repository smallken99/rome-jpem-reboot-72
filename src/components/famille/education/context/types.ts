
import { Child, Preceptor } from '../types/educationTypes';
import { Character } from '@/types/character';

export interface EducationContextType {
  children: Child[];
  preceptors: Preceptor[];
  hiredPreceptors: Preceptor[];
  educatingChildren: {[childId: string]: boolean} | string[];
  isHiringPreceptor: boolean;
  loadPreceptorsByType: (type: string) => Preceptor[];
  refreshPreceptors: () => void;
  hirePreceptor: (id: string) => void;
  firePreceptor: (id: string) => void;
  assignPreceptorToChild: (preceptorId: string, childId: string) => void;
  startChildEducation: (childId: string, educationType: string, mentorId: string | null) => void;
  advanceEducationYear: (childId: string) => void;
  completeEducation: (childId: string) => void;
  updateChildName: (childId: string, newName: string) => void;
}

export interface EducationProviderProps {
  children: React.ReactNode;
  characters?: Character[];
  onCharacterUpdate?: (characterId: string, updatedCharacter: Partial<Character>) => void;
}
