
export type EducationType = 'military' | 'rhetoric' | 'religious' | 'academic' | 'none';
export type Gender = 'male' | 'female';

export interface Child {
  id: string;
  name: string;
  age: number;
  gender: Gender;
  educationType: EducationType;
  status?: string;
  progress: number;
  specialties?: string[];
  traits?: string[];
  mentor?: string;
  preceptorId?: string;
  currentEducation?: {
    type: string;
    mentor: string | null;
    mentorId?: string | null;
    speciality?: string;
    progress: number;
    skills: string[];
    yearsCompleted?: number;
    totalYears?: number;
    statBonus?: number;
  };
}

export interface EducationPath {
  id: string;
  name: string;
  description: string;
  icon?: string;
  benefits?: string[];
  specialties?: string[];
  requirements?: {
    age?: number;
    gender?: 'male' | 'female' | 'both';
  };
  duration: number;
  relatedStat: string;
  skills: string[];
  outcomes: Record<string, number>;
  minAge?: number;
  maxAge?: number;
  suitableFor?: { gender: 'both' | Gender } | Gender[];
  type?: string;
}

export interface Preceptor {
  id: string;
  name: string;
  specialty: string;
  speciality?: string;
  specialties?: string[];
  skill?: number;
  expertise?: number;
  quality?: number;
  cost?: number;
  price?: number;
  experience?: number;
  reputation?: number;
  teachingStyle?: string;
  background?: string;
  traits?: string[];
  available?: boolean;
  assigned?: boolean;
  status?: string;
  childId?: string;
  description?: string;
}

export interface EducationRecord {
  id: string;
  childId: string;
  path: EducationPath;
  mentor?: Preceptor;
  preceptorId?: string | null;
  startDate: string;
  progress: number;
  completed: boolean;
  pathType: string;
  status?: 'in_progress' | 'completed' | 'canceled' | 'not_started';
  currentYear?: number;
  totalYears?: number;
  startYear?: number;
}

export interface ChildEducation {
  childId: string;
  education: EducationRecord;
}

export interface PreceptorsByType {
  military: Preceptor[];
  rhetoric: Preceptor[];
  religious: Preceptor[];
  academic: Preceptor[];
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

export interface EducationFormData {
  childId: string;
  pathId: string;
  preceptorId?: string | null;
}
