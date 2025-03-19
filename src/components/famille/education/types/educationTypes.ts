
export type EducationType = 'none' | 'military' | 'rhetoric' | 'academic' | 'religious' | 'political';
export type Gender = 'male' | 'female';
export type EducationPathType = EducationType;
export type EducationStatus = 'not_started' | 'in_progress' | 'completed' | 'canceled';

export interface Child {
  id: string;
  name: string;
  age: number;
  gender: Gender;
  educationType: EducationType;
  progress: number;
  preceptorId?: string;
  skills?: Record<string, number>;
  traits?: string[];
  status?: string;
  currentEducation?: ChildEducation;
  specialties?: string[];
  mentor?: string;
  specialty?: string;
}

export interface Preceptor {
  id: string;
  name: string;
  specialty: EducationType;
  price: number;
  experience: number;
  quality: number;
  assigned?: boolean;
  skill?: number;
  expertise?: number;
  cost?: number;
  available?: boolean;
  description?: string;
  speciality?: string;
  specialties?: string[];
  childId?: string;
  status?: string;
  reputation?: number;
  background?: string;
  portrait?: string;
}

export interface EducationSession {
  childId: string;
  preceptorId?: string;
  startYear?: number;
  currentYear?: number;
  progress: number;
}

export interface EducationPath {
  id: string;
  type: EducationType;
  name: string;
  description: string;
  benefits: string[];
  duration: number;
  minAge: number;
  maxAge: number;
  cost: number;
  relatedStat: string;
  mainStatBonus?: string;
  statBonus?: number;
  specialties: string[];
  requirements?: {
    age?: number;
    gender?: string;
    cost?: number;
    duration?: string;
  };
  requiredAttributes?: Record<string, number>;
  recommendedAttributes?: Record<string, number>;
  outcomes: {
    skills: string[];
    bonuses: Record<string, number>;
  };
  suitableFor: {
    gender: string;
    status: string[];
  };
  specialtyDetails?: Array<{
    id: string;
    name: string;
    description: string;
    skills: string[];
    careers: string[];
  }>;
}

export interface EducationRecord {
  id: string;
  childId: string;
  pathType: string;
  preceptorId?: string;
  startYear?: number;
  currentYear?: number;
  totalYears?: number;
  status: EducationStatus;
  skills?: Record<string, number>;
  specialties?: string[];
}

export interface EducationFormData {
  childId: string;
  educationType?: string;
  pathType?: string;
  mentor?: string;
  preceptorId?: string;
  startYear?: number;
  currentYear?: number;
  totalYears?: number;
  status?: string;
  skills?: Record<string, any>;
  specialties?: string[];
}

export interface ChildEducation {
  type: string;
  mentor: string | null;
  mentorId?: string | null;
  progress: number;
  skills: string[];
  yearsCompleted: number;
  totalYears: number;
  statBonus: number;
  speciality?: string;
}

export interface EducationHistory {
  type: EducationType;
  mentor: string;
  speciality?: string;
  completedAt: number;
  statBonus: number;
  skills: string[];
  startYear: number;
  endYear: number;
  completed: boolean;
}

export interface EducationObjectivesProps {
  educationType: string;
}

export interface EducationSpecialtySelectorProps {
  selectedSpecialties: string[];
  availableSpecialties: string[];
  onChange: (specialties: string[]) => void;
}

export interface EducationTypeSelectorProps {
  selectedType: string;
  onChange: (type: string) => void;
  childGender?: Gender;
}

export interface PreceptorsByType {
  military: Preceptor[];
  rhetoric: Preceptor[];
  religious: Preceptor[];
  academic: Preceptor[];
  political?: Preceptor[];
}

export interface EducationProgressButtonsProps {
  isEducating: boolean;
  hasEducation: boolean;
  educationProgress?: number;
  onAdvanceYear?: () => void;
  onCompleteEducation?: () => void;
  canComplete?: boolean;
  onAdvance?: () => void;
  onCancel?: () => void;
  onComplete?: () => void;
}
