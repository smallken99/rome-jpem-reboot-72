
export type EducationType = 'none' | 'military' | 'rhetoric' | 'academic';
export type Gender = 'male' | 'female';

export interface Child {
  id: string;
  name: string;
  age: number;
  gender: Gender;
  educationType: EducationType;
  progress: number;
  preceptorId?: string;
}

export interface Preceptor {
  id: string;
  name: string;
  specialty: EducationType;
  price: number;
  quality: number;
  experience: number;
  assigned?: boolean;
}

export interface EducationSession {
  childId: string;
  preceptorId?: string;
  startYear?: number;
  currentYear?: number;
  progress: number;
}
