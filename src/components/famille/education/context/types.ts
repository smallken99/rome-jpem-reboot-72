
import { Child, Preceptor } from '../types/educationTypes';
import { Character } from '@/types/character';

export interface EducationContextType {
  children: Child[];
  preceptors: Preceptor[];
  hiredPreceptors: Preceptor[];
  selectedChildId: string | null;
  isLoading?: boolean;
  isEducating: boolean;
  educatingChildren: {[childId: string]: boolean} | string[];
  setSelectedChildId: (id: string | null) => void;
  getChild: (id: string) => Child | undefined;
  startEducation: (childId: string, type: string, mentorId: string, specialties: string[]) => void;
  advanceEducation: (childId: string) => void;
  advanceEducationYear: (childId: string) => void;
  completeEducation: (childId: string) => void;
  hirePreceptor: (preceptorId: string, childId?: string) => void;
  firePreceptor: (preceptorId: string) => void;
  assignPreceptorToChild: (preceptorId: string, childId: string) => void;
  updateChildName: (childId: string, newName: string) => void;
  loadPreceptorsByType: (type: string) => Preceptor[];
  refreshPreceptors: () => void;
}

export interface EducationProviderProps {
  children: React.ReactNode;
  characters?: Character[];
  onCharacterUpdate?: (characterId: string, updatedCharacter: Partial<Character>) => void;
}
