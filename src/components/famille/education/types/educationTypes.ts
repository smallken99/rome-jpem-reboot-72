
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
  price: number;
  background: string;
  traits: string[];
  status: 'available' | 'hired' | 'unavailable' | 'assigned';
  available: boolean;
  assigned?: boolean;
  specialty: string;
  speciality?: string;
  expertise: number;
  experience: number;
  quality?: number;
  childId?: string;
  portrait?: string;
  
  // Additional required properties
  description: string;
  teachingStyle: string;
  reputation: number;
  specialties: string[];
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
  skills?: string[] | Record<string, number>;
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
  skills?: string[];
  bonuses?: {
    skills?: string[];
    combat?: any;
    [key: string]: any;
  };
  requirements: {
    age: number;
    gender: Gender | 'both' | Gender[];
    skills?: {
      [key: string]: number;
    };
  };
  duration: number;
  type?: string;
  outcomes?: {
    skills?: string[];
    bonuses?: Record<string, any>;
  } | string[];
  suitableFor?: {
    gender?: Gender | 'both';
    minAge?: number;
    maxAge?: number;
    includes?: (gender: Gender) => boolean;
  };
  relatedStat?: string;
  minAge?: number;
  maxAge?: number;
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
  id?: string;
  currentYear?: number;
  totalYears?: number;
  pathType?: string;
  status?: string;
  startYear?: number;
  preceptorId?: string;
  skills?: string[];
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
  type?: string;
  preceptorId?: string;
  specialties?: string[];
  pathType?: string;
  status?: string;
}

export interface PreceptorsByType {
  military: Preceptor[];
  rhetoric: Preceptor[];
  religious: Preceptor[];
  academic: Preceptor[];
  [key: string]: Preceptor[];
}

export interface EducationPathCardProps {
  path: EducationPath;
  isSelected?: boolean;
  onSelect?: () => void;
}
