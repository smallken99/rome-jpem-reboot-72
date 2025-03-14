
import { ReactNode } from 'react';

export type EducationPathType = 'military' | 'rhetoric' | 'religious';

export interface EducationPath {
  id: string;
  type: EducationPathType;
  name: string;
  description: string;
  icon?: ReactNode;
  skillFocus?: string[];
  potentialSpecialties?: string[];
  requirements?: {
    age?: number;
    minPrestige?: number;
    traits?: string[];
    gender?: 'male' | 'female' | 'both';
    cost?: number;
    duration?: string;
  };
  baseYears?: number;
  baseCost?: number;
  careerOpportunities?: string[];
  benefits: string[];
  duration: number;
  outcomes?: {
    skills: string[];
    bonuses?: {
      [key: string]: number;
    };
  } | string[];
  specialties?: string[];
  relatedStat?: string;
}

export interface ChildEducation {
  type: string;
  mentor: string | null;
  progress: number;
  skills: string[];
  yearsCompleted: number;
  totalYears: number;
  statBonus: number;
  speciality?: string;
  pityBonus?: number;
}

export interface Child {
  id: string;
  name: string;
  gender: 'male' | 'female';
  age: number;
  portrait?: string;
  status: 'child' | 'adult';
  skills?: {
    rhetoric?: number;
    politics?: number;
    strategy?: number;
    diplomacy?: number;
    combat?: number;
    leadership?: number;
    riding?: number;
    tactics?: number;
    [key: string]: number | undefined;
  };
  traits?: string[];
  education?: EducationRecord;
  currentEducation?: ChildEducation;
}

export interface EducationRecord {
  id: string;
  childId: string;
  pathType: EducationPathType;
  preceptorId: string;
  startYear: number;
  currentYear: number;
  totalYears: number;
  status: 'not_started' | 'in_progress' | 'completed' | 'canceled';
  skills: {
    [key: string]: number;
  };
  specialties: string[];
}

export interface Preceptor {
  id: string;
  name: string;
  specialty: EducationPathType | string;
  quality: number;
  cost: number;
  available: boolean;
  skills?: string[];
  background?: string;
  skill?: number;
  price?: number;
  status?: 'available' | 'hired' | 'assigned';
  childId?: string | null;
  speciality?: string;
  reputation?: string;
  portrait?: string;
}

export interface PreceptorsByType {
  [key: string]: Preceptor[];
}

export interface EducationFormData {
  childId: string;
  pathType: EducationPathType;
  preceptorId: string;
  startYear: number;
  currentYear: number;
  totalYears: number;
  status: 'in_progress';
  skills: {
    [key: string]: number;
  };
  specialties: string[];
}

export interface EducationHistory {
  id: string;
  type: EducationPathType;
  startYear: number;
  endYear: number;
  completed: boolean;
  mentor: string;
  results: {
    skills: {
      [key: string]: number;
    };
    specialties: string[];
  };
  statBonus?: number;
}

// Props pour les composants

export interface ChildHeaderProps {
  child: Child;
  onNameChange?: (id: string, newName: string) => void;
  hasInvalidEducation?: boolean;
}

export interface CurrentEducationStatusProps {
  education?: EducationRecord | null;
  currentEducation?: ChildEducation;
  childGender?: string;
}

export interface EducationFormActionsProps {
  onCancel: () => void;
  onSave: () => void;
  disabled: boolean;
}

export interface EducationObjectivesProps {
  pathType: EducationPathType;
}

export interface EducationProgressButtonsProps {
  onAdvance?: () => void;
  onCancel?: () => void;
  onComplete?: () => void;
  canComplete?: boolean;
  isEducating?: boolean;
  hasEducation?: boolean;
  educationProgress?: number;
  onAdvanceYear?: () => void;
  onCompleteEducation?: () => void;
}

export interface EducationTypeSelectorProps {
  selectedType?: EducationPathType | null;
  onSelectType?: (type: EducationPathType) => void;
  value?: EducationPathType | null;
  onChange?: (type: EducationPathType) => void;
  childGender?: 'male' | 'female';
}

export interface EducationWarningProps {
  message: string;
}

export interface SkillProgressProps {
  skill: string;
  value: number;
}

export interface MentorInfoProps {
  preceptor: Preceptor | null;
}

export interface ChildNotFoundProps {
  onBack: () => void;
}

export interface EducationStatusProps {
  child: Child;
  hasEducation?: boolean;
  hasInvalidEducation?: boolean;
}

export interface EducationSpecialtySelectorProps {
  educationType: string;
  selectedSpecialties: string[];
  onChange: (specialties: string[]) => void;
  maxSelections?: number;
}
