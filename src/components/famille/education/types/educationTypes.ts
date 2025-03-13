
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
