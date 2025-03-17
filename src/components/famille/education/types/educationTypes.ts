
export interface Child {
  id: string;
  name: string;
  age: number;
  gender: 'male' | 'female';
  educationType?: string;
  progress?: number;
  mentor?: string | null;
  specialties?: string[];
  currentEducation?: ChildEducation;
  skills?: Record<string, number>;
  traits?: string[];
  status?: string;
}

export interface Preceptor {
  id: string;
  name: string;
  specialties: string[];
  expertise?: number;
  cost: number;
  reputation?: number;
  available: boolean;
  description?: string;
  skill?: number;
  specialty?: string;
  price?: number;
  quality?: number;
  status?: 'available' | 'hired' | 'assigned';
  childId?: string | null;
  years?: number;
  speciality?: string;
  background?: string;
  rating?: number;
}

export interface EducationPath {
  id: string;
  name: string;
  description: string;
  minAge: number;
  maxAge: number;
  duration: number;
  cost: number;
  requirements?: {
    age?: number;
    gender?: 'male' | 'female' | 'both';
    cost?: number;
    duration?: string;
  } | string[];
  outcomes: string[] | {
    skills: string[];
    bonuses: Record<string, number>;
  };
  relatedStat?: string;
  icon?: string;
  color?: string;
  type?: string;
  benefits?: string[];
  specialties?: string[];
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
  pathType?: string;
  currentYear?: number;
  status?: 'not_started' | 'in_progress' | 'completed' | 'canceled';
  speciality?: string;
  specialties?: string[];
}

export interface EducationRecord {
  id: string;
  childId: string;
  pathType: string;
  preceptorId: string | null;
  startYear: number;
  currentYear: number;
  totalYears: number;
  progress?: number; // Added for compatibility
  status: 'not_started' | 'in_progress' | 'completed' | 'canceled';
  skills: Record<string, number>;
  specialties: string[];
}

export interface EducationFormData {
  educationType: string;
  mentor: string;
  specialties: string[];
  childId?: string;
  pathType?: string;
  preceptorId?: string;
  startYear?: number;
  currentYear?: number;
  totalYears?: number;
  status?: string;
  skills?: Record<string, number>;
}

export interface EducationProgressButtonsProps {
  isEducating: boolean;
  hasEducation?: boolean;
  educationProgress?: number;
  onAdvanceYear?: () => void;
  onCompleteEducation?: () => void;
  onAdvance?: () => void;
  onCancel?: () => void;
  onComplete?: () => void;
  canComplete?: boolean;
}

export type EducationType = 'militaire' | 'politique' | 'rhétorique' | 'arts' | 'philosophie' | 'religieuse' | 'military' | 'political' | 'rhetoric' | 'religious' | 'none';
export type EducationPathType = EducationType;

export interface EducationHistory {
  pathId?: string;
  startDate?: string;
  endDate?: string;
  completed?: boolean;
  mentorId?: string;
  skills?: string[];
  specialties?: string[];
  type?: string;
  mentor?: string;
  speciality?: string;
  completedAt?: number;
  statBonus?: number;
  startYear?: number;
  endYear?: number;
}

export type PreceptorsByType = Record<string, Preceptor[]>;

export interface ChildHeaderProps {
  child: Child;
  onNameChange?: (id: string, newName: string) => void;
  hasInvalidEducation?: boolean;
}

export interface ChildNotFoundProps {
  childId?: string;
  onBack: () => void;
}

export interface CurrentEducationStatusProps {
  education?: ChildEducation | EducationRecord;
  mentor?: Preceptor | null;
  currentEducation?: ChildEducation;
}

export interface EducationObjectivesProps {
  educationType?: string;
  specialties?: string[];
  pathType?: string;
}

export interface EducationSpecialtySelectorProps {
  educationType: string;
  selectedSpecialties: string[];
  onChange: (specialties: string[]) => void;
  disabled?: boolean;
  maxSelections?: number;
}

export interface EducationStatusProps {
  child: Child;
  hasEducation: boolean;
  hasInvalidEducation?: boolean;
}

export interface EducationTypeSelectorProps {
  selectedType: string;
  onChange?: (type: string) => void;
  disabled?: boolean;
  gender?: 'male' | 'female';
  childGender?: 'male' | 'female';
  value?: string;
  onSelectType?: (type: string) => void;
}

export interface MentorInfoProps {
  mentor?: Preceptor | null;
  educationType?: string;
  onChangeMentor?: () => void;
  preceptor?: Preceptor | null;
}

export interface SkillProgressProps {
  label?: string;
  value: number;
  max?: number;
  icon?: React.ReactNode;
  skill?: string;
}
