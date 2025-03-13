
import { Child, EducationPath, Preceptor } from '../types/educationTypes';
import { Character } from '@/types/character';

export interface EducationProviderProps {
  characters?: Character[];
  onCharacterUpdate?: (characterId: string, updates: Partial<Character>) => void;
  children: React.ReactNode;
}

export interface EducationContextType {
  children: Child[];
  preceptors: Preceptor[];
  hiredPreceptors: Preceptor[];
  educatingChildren: Record<string, boolean>;
  isHiringPreceptor: boolean;
  loadPreceptorsByType: (type: string) => Preceptor[];
  refreshPreceptors: () => void;
  hirePreceptor: (preceptorId: string) => void;
  firePreceptor: (preceptorId: string) => void;
  assignPreceptorToChild: (childId: string, preceptorId: string) => void;
  startChildEducation: (childId: string, educationType: string, mentorId?: string) => void;
  advanceEducationYear: (childId: string) => void;
  completeEducation: (childId: string) => void;
  updateChildName: (childId: string, newName: string) => void;
}
