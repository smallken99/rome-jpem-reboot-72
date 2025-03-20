
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
  
  // Child management methods
  getChild: (id: string) => Child | undefined;
  getChildById: (id: string) => Child | undefined;
  getPreceptorById: (id: string) => Preceptor | null;
  findEducationPathById: (pathType: string) => any;
  setSelectedChildId: (id: string | null) => void;
  
  // Education process methods
  startEducation: (childId: string, type: string, mentorId?: string, specialties?: string[]) => void;
  advanceEducation: (childId: string) => void;
  advanceEducationYear: (childId: string) => void;
  completeEducation: (childId: string) => void;
  cancelEducation: (childId: string) => void;
  
  // Preceptor management methods
  hirePreceptor: (preceptorId: string, childId?: string) => boolean;
  firePreceptor: (preceptorId: string) => void;
  assignPreceptorToChild: (childId: string, preceptorId: string) => void;
  updateChildName: (childId: string, newName: string) => void;
  loadPreceptorsByType: (type: string) => Preceptor[];
  refreshPreceptors: () => void;
  getAllEducationPaths: () => any[];
  updateChildEducation: (id: string, educationType: string) => void;
  addChild: (child: Omit<Child, 'id' | 'progress'>) => string;
  removeChild: (id: string) => void;
}

export interface EducationProviderProps {
  children: React.ReactNode;
  characters?: Character[];
  onCharacterUpdate?: (characterId: string, updatedCharacter: Partial<Character>) => void;
}
