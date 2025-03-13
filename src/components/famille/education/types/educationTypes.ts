
import { LucideIcon } from "lucide-react";

export interface Child {
  id: string;
  name: string;
  age: number;
  gender: string;
  currentEducation?: {
    type: string;
    mentor: string | null;
    mentorId?: string | null;
    progress: number;
    skills: string[];
    yearsCompleted?: number;
    totalYears?: number;
    statBonus?: number;
    speciality?: string;
  };
}

export interface Preceptor {
  id: string;
  name: string;
  specialty: string;
  skill: number;
  price: number;
  status: 'available' | 'hired' | 'assigned';
  portrait?: string;
  background?: string;
  childId?: string | null;
  // For backward compatibility with existing code
  quality?: number;
  reputation?: string;
  cost?: number;
  available?: boolean;
  speciality?: string;
}

export interface EducationPath {
  id: string;
  name: string;
  description: string;
  benefits: string[];
  duration: number;
  icon?: LucideIcon;
  requirements: {
    age?: number;
    gender?: string;
    skills?: Record<string, number>;
    cost?: number;
    duration?: string;
  };
  outcomes: {
    skills: string[];
    bonuses: Record<string, number>;
  } | string[];
  specialties?: string[];
  relatedStat?: string;
  type?: string;
  minAge?: number;
  suitableFor?: string;
}

export interface ChildHeaderProps {
  child: Child;
  onNameChange?: (childId: string, newName: string) => void;
  hasInvalidEducation?: boolean;
}

export interface EducationStatusProps {
  child: Child;
  hasEducation: boolean;
  hasInvalidEducation?: boolean;
}

export interface EducationProgressButtonsProps {
  isEducating?: boolean;
  hasEducation: boolean;
  educationProgress?: number;
  onAdvanceYear: () => void;
  onCompleteEducation: () => void;
}

export interface PreceptorCardProps {
  preceptor: Preceptor;
  onHire?: () => void;
  onFire?: () => void;
  onAssign?: () => void;
  isHired?: boolean;
}

// Add required interfaces from context/types.ts
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
