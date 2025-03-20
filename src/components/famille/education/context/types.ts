
import { Child, Preceptor } from '../types/educationTypes';
import { Character } from '@/types/character';

export interface EducationContextType {
  children: Child[];
  preceptors: Preceptor[];
  hiredPreceptors: Preceptor[];
  selectedChildId: string | null;
  isLoading?: boolean;
  isEducating: {[childId: string]: boolean} | string[];
  educatingChildren: {[childId: string]: boolean} | string[];
  
  // Required methods for ChildEducationDetail.tsx
  getChild: (id: string) => Child | undefined;
  getPreceptorById: (id: string) => Preceptor | null; // Added this method
  findEducationPathById: (pathType: string) => any;
  setSelectedChildId: (id: string | null) => void;
  startEducation: (childId: string, type: string, mentorId?: string, specialties?: string[]) => void;
  advanceEducation: (childId: string) => void;
  advanceEducationYear: (childId: string) => void;
  completeEducation: (childId: string) => void;
  cancelEducation: (childId: string) => void;
  hirePreceptor: (preceptorId: string, childId?: string) => void;
  firePreceptor: (preceptorId: string) => void;
  assignPreceptorToChild: (preceptorId: string, childId: string) => void;
  updateChildName: (childId: string, newName: string) => void;
  loadPreceptorsByType: (type: string) => Preceptor[];
  refreshPreceptors: () => void;
  getAllEducationPaths: () => any[];
}

export interface EducationProviderProps {
  children: React.ReactNode;
  characters?: Character[];
  onCharacterUpdate?: (characterId: string, updatedCharacter: Partial<Character>) => void;
}
