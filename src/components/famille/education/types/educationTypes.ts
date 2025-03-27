
export type EducationType = 'military' | 'political' | 'religious' | 'artistic' | 'philosophical' | 'none';

export interface Child {
  id: string;
  name: string;
  age: number;
  gender: 'male' | 'female';
  status?: string;
  educationType: EducationType;
  progress: number;
  specialties: string[];
  specialty?: string;
  traits: string[];
  preceptorId?: string | null;
  currentEducation?: ChildEducation;
}

export interface ChildEducation {
  type: EducationType;
  mentor: string | null;
  progress: number;
  skills: string[];
  yearsCompleted?: number;
  totalYears?: number;
  statBonus?: number;
  mentorId?: string | null;
}

export interface Preceptor {
  id: string;
  name: string;
  specialization: EducationType;
  skill: number;
  cost: number;
  background: string;
  traits: string[];
  status: 'available' | 'hired' | 'assigned' | 'unavailable';
  childId?: string | null;
}
