
export type EducationType = 
  'military' | 
  'political' | 
  'religious' | 
  'artistic' | 
  'philosophical' | 
  'rhetoric' | 
  'academic' | 
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
  status: 'available' | 'hired' | 'unavailable';
  specialty: string;
  expertise: number;
  experience: number;
  price: number;
  available: boolean;
  description: string;
  teachingStyle: string;
  specialties: string[];
  reputation: number;
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
}
