
export type EducationType = 
  'military' | 
  'political' | 
  'religious' | 
  'artistic' | 
  'philosophical' | 
  'rhetoric' | 
  'academic' | 
  'commercial' |
  'none' | 
  string;

export type Gender = 'male' | 'female';

export interface Preceptor {
  id: string;
  name: string;
  specialization: EducationType;
  skill: number;
  cost: number;
  background: string;
  traits: string[];
  status: 'available' | 'hired' | 'unavailable' | 'assigned';
  specialty: string;
  expertise: number;
  experience: number;
  price: number;
  available: boolean;
  description: string;
  teachingStyle: string;
  specialties: string[];
  reputation: number;
  quality?: number;
  childId?: string;
  speciality?: string;
  portrait?: string;
  assigned?: boolean;
}

export interface Child {
  id: string;
  name: string;
  age: number;
  gender: Gender;
  educationType: EducationType;
  progress: number;
  specialties: string[];
  specialty?: string;
  traits: string[];
  status?: string;
  currentEducation?: ChildEducation;
  preceptorId?: string;
  mentor?: string;
}

export interface EducationPath {
  id: EducationType;
  name: string;
  description: string;
  benefits: string[];
  statBoost: string;
  icon: string;
  specialties: string[];
  requirements: {
    age: number;
    gender: Gender | 'both' | Gender[];
    skills?: {
      [key: string]: number;
    };
  };
  duration: number;
  type?: string;
  outcomes?: string[];
  suitableFor?: {
    gender?: Gender | 'both';
    minAge?: number;
    maxAge?: number;
  };
  relatedStat?: string;
}

export interface ChildEducation {
  type: EducationType;
  mentor: string | null;
  mentorId?: string | null;
  progress: number;
  skills: string[];
  yearsCompleted?: number;
  totalYears?: number;
  statBonus?: number;
  speciality?: string;
}

export interface EducationRecord {
  childId: string;
  path: EducationPath;
  mentor: Preceptor | null;
  startDate: string;
  progress: number;
  completed: boolean;
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
  mentorId?: string;
}

export interface PreceptorsByType {
  military: Preceptor[];
  rhetoric: Preceptor[];
  religious: Preceptor[];
  academic: Preceptor[];
  [key: string]: Preceptor[];
}
