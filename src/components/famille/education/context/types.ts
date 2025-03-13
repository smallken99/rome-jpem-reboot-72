
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

// Add missing types for components
export interface EducationTypeSelectorProps {
  value: string;
  onChange: (value: string) => void;
  childGender: string;
}

export interface EducationSpecialtySelectorProps {
  educationType: string;
  selectedSpecialties: string[];
  onChange: (specialties: string[]) => void;
}

export interface StatBonusInfoProps {
  educationType: string;
  statBonus?: number;
}

export interface EducationWarningProps {
  text: string;
}

export interface ChildEducation {
  type: string;
  mentor: string | null;
  mentorId?: string | null;
  progress: number;
  skills: string[];
  speciality?: string;
  yearsCompleted?: number;
  totalYears?: number;
  statBonus?: number;
  pityBonus?: number;
  educationHistory?: EducationHistory[];
}

export interface EducationHistory {
  type: string;
  mentor: string;
  speciality?: string;
  completedAt: number;
  statBonus: number;
  skills: string[];
  startYear: number;
  completed: boolean;
}

export interface PreceptorsByType {
  [type: string]: Preceptor[];
}
