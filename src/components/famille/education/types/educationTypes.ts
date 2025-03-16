
export interface Child {
  id: string;
  name: string;
  age: number;
  gender: 'male' | 'female';
  educationType: string;
  progress: number;
  mentor: string | null;
  specialties?: string[];
  currentEducation?: ChildEducation;
}

export interface Preceptor {
  id: string;
  name: string;
  specialties: string[];
  expertise: number;
  cost: number;
  reputation: number;
  available: boolean;
  description: string;
  skill?: number; // For compatibility
  specialty?: string; // For compatibility
  price?: number; // For compatibility
  quality?: number; // For compatibility
  status?: 'available' | 'hired' | 'assigned';
  childId?: string | null;
}

export interface EducationPath {
  id: string;
  name: string;
  description: string;
  minAge: number;
  maxAge: number;
  duration: number;
  cost: number;
  requirements?: string[];
  outcomes: string[] | {
    skills: string[];
    bonuses: Record<string, number>;
  };
  relatedStat?: string;
  icon: string;
  color: string;
}

export interface ChildEducation {
  type: string;
  mentor: string | null;
  progress: number;
  skills: string[];
  yearsCompleted: number;
  totalYears: number;
  statBonus: number;
  mentorId?: string | null;
}

export interface EducationRecord {
  id: string;
  childId: string;
  pathType: string;
  preceptorId: string | null;
  startYear: number;
  currentYear: number;
  totalYears: number;
  status: 'not_started' | 'in_progress' | 'completed' | 'canceled';
  skills: Record<string, number>;
  specialties: string[];
}

export interface EducationFormData {
  educationType: string;
  specialties: string[];
  mentor: string;
  childId?: string;
}

export interface EducationProgressButtonsProps {
  isEducating: boolean;
  hasEducation: boolean;
  educationProgress?: number;
  onAdvanceYear?: () => void;
  onCompleteEducation?: () => void;
  onAdvance?: () => void;
  onCancel?: () => void;
  onComplete?: () => void;
  canComplete?: boolean;
}

export type EducationType = 'militaire' | 'politique' | 'rhétorique' | 'arts' | 'philosophie' | 'religieuse' | 'none';
export type EducationPathType = EducationType;

export interface EducationHistory {
  pathId: string;
  startDate: string;
  endDate?: string;
  completed: boolean;
  mentorId?: string;
  skills: string[];
  specialties: string[];
}

export type PreceptorsByType = Record<string, Preceptor[]>;

export interface ChildHeaderProps {
  child: Child;
  onNameChange?: (id: string, newName: string) => void;
  hasInvalidEducation?: boolean;
}

export interface ChildNotFoundProps {
  childId: string;
  onBack: () => void;
}

export interface CurrentEducationStatusProps {
  education: ChildEducation;
  mentor?: Preceptor | null;
}

export interface EducationObjectivesProps {
  educationType: string;
  specialties: string[];
}

export interface EducationSpecialtySelectorProps {
  educationType: string;
  selectedSpecialties: string[];
  onChange: (specialties: string[]) => void;
  disabled?: boolean;
}

export interface EducationStatusProps {
  child: Child;
  hasEducation: boolean;
  hasInvalidEducation?: boolean;
}

export interface EducationTypeSelectorProps {
  selectedType: string;
  onChange: (type: string) => void;
  disabled?: boolean;
  gender?: 'male' | 'female';
}

export interface MentorInfoProps {
  mentor: Preceptor | null;
  educationType: string;
  onChangeMentor: () => void;
}

export interface SkillProgressProps {
  label: string;
  value: number;
  max?: number;
  icon?: React.ReactNode;
}
