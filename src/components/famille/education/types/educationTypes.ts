
export type EducationType = 
  | 'military' 
  | 'rhetoric' 
  | 'political' 
  | 'religious' 
  | 'philosophical' 
  | 'administrative'
  | 'none';

export type Gender = 'male' | 'female';

export interface Child {
  id: string;
  name: string;
  age: number;
  gender: Gender;
  educationType: EducationType;
  progress?: number;
  specialties: string[];
  traits: string[];
  currentEducation?: {
    type: string;
    mentor: string | null;
    progress: number;
    skills: string[];
    yearsCompleted?: number;
    totalYears?: number;
  };
}

export interface Preceptor {
  id: string;
  name: string;
  specialty: string;
  description: string;
  specialization: EducationType;
  expertise: number;
  experience: number;
  price: number;
  traits: string[];
  skills: string[];
  portrait?: string;
  childId?: string;
  skill?: number; // Pour la rétrocompatibilité
}

export interface EducationPath {
  name: string;
  description: string;
  duration: number;
  relatedStat: string;
  skills: string[];
  outcomes: Record<string, number>;
  minAge?: number;
  maxAge?: number;
  suitableFor?: Gender[] | { gender: Gender | 'both' };
}

export interface EducationOutcome {
  skills: string[];
  statBoosts: Record<string, number>;
  specialties?: string[];
}
