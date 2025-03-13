
import { ReactNode } from 'react';

export type EducationPathType = 'military' | 'rhetoric' | 'religious';

export interface EducationPath {
  id: string;
  type: EducationPathType;
  name: string;
  description: string;
  icon: ReactNode;
  skillFocus: string[];
  potentialSpecialties: string[];
  requirements?: {
    age?: number;
    minPrestige?: number;
    traits?: string[];
  };
  baseYears: number;
  baseCost: number;
  careerOpportunities: string[];
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
  specialty: EducationPathType;
  quality: number;
  cost: number;
  available: boolean;
  skills?: string[];
  background?: string;
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

// Props pour les composants

export interface ChildHeaderProps {
  child: Child;
}

export interface CurrentEducationStatusProps {
  education: EducationRecord;
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
  onAdvance: () => void;
  onCancel: () => void;
  onComplete: () => void;
  canComplete: boolean;
}

export interface EducationTypeSelectorProps {
  selectedType: EducationPathType | null;
  onSelectType: (type: EducationPathType) => void;
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
