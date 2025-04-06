
// Types d'éducation complets et cohérents
export type Gender = 'male' | 'female';

export type EducationType = 'rhetoric' | 'military' | 'political' | 'religious' | 'philosophical' | 'academic' | 'none';

export interface EducationPath {
  id: string;
  name: string;
  description: string;
  duration?: number;
  relatedStat: string;
  outcomes: Record<string, number>;
  skills?: string[];
  minAge?: number;
  maxAge?: number;
  suitableFor?: Gender[];
  specialties?: string[];
  benefits?: string[];
  icon?: string;
}

export interface Child {
  id: string;
  name: string;
  firstName?: string;
  lastName?: string;
  age: number;
  gender: Gender;
  educationType: EducationType;
  progress: number;
  mentor?: string | null;
  preceptorId?: string;
  specialties?: string[];
  status?: string;
  currentEducation?: EducationProgress;
}

export interface EducationProgress {
  type: string;
  mentor: string | null;
  progress: number;
  skills: any[];
  yearsCompleted: number;
  totalYears: number;
  statBonus?: Record<string, number>;
  speciality?: string;
  pathType?: string;
  status?: string;
  startYear?: number;
}

export interface EducationRecord {
  id?: string;
  childId: string;
  type: EducationType;
  pathType?: string;
  startDate: string;
  startYear?: number;
  completionDate?: string;
  mentor?: string;
  results?: any;
  skills?: string[];
  currentYear?: number;
  totalYears?: number;
  status?: string;
  progress?: number;
}

export interface EducationFormData {
  type: EducationType;
  mentor?: string;
  mentorId?: string;
  customFocus?: string;
  childId?: string;
  pathId?: string;
  preceptorId?: string;
}

export interface EducationHistory {
  records: EducationRecord[];
  type?: EducationType;
  statBonus?: Record<string, number>;
}

export interface ChildEducation {
  type: EducationType;
  progress: number;
  mentor?: string;
  mentorQuality?: number;
  startDate?: string;
  estimatedCompletion?: string;
  skills: string[];
}

export interface Preceptor {
  id: string;
  name: string;
  specialty: string;
  specialization?: EducationType;
  specialties: string[];
  speciality?: string;
  expertise: number;
  experience: number;
  cost: number;
  price?: number;
  available: boolean;
  skill: number;
  quality: number;
  description: string;
  status: string;
  traits?: string[];
  background?: string;
  reputation?: number;
  teachingStyle?: string;
  portrait?: string;
  childId?: string;
  assigned?: boolean;
}

export interface PreceptorsByType {
  rhetoric: Preceptor[];
  military: Preceptor[];
  political: Preceptor[];
  religious: Preceptor[];
  philosophical: Preceptor[];
  academic: Preceptor[];
}

export interface EducationState {
  children: Child[];
  preceptors: Preceptor[];
  startEducation: (childId: string, type: EducationType) => void;
  hirePreceptor: (preceptorId: string) => void;
  firePreceptor: (preceptorId: string) => void;
  assignPreceptor: (childId: string, preceptorId: string) => void;
  completeEducation: (childId: string) => void;
  educatingChildren: string[];
  isEducating: Record<string, boolean>;
}
