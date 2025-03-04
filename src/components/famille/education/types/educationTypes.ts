
// Type for a preceptor (teacher)
export type Preceptor = {
  id: string;
  name: string;
  speciality: string;
  reputation: 'Excellent' | 'Bon' | 'Moyen';
  fee: number;
  statBonus: number;
  gender: 'male' | 'female';
};

export type PreceptorsByType = {
  [key: string]: Preceptor[];
};

export type EducationHistory = {
  type: string;
  mentor: string;
  speciality?: string;
  completedAt: number; // Age when completed
  statBonus: number;
  skills: string[];
  duration: number; // How many years it took
};

export type ChildEducation = {
  type: string;
  mentor: string | null;
  progress: number;
  skills: string[];
  speciality?: string;
  pityBonus?: number;
  yearsCompleted?: number;
  totalYears?: number;
  statBonus?: number;
  // Track previous educations with more details
  educationHistory?: EducationHistory[];
};

export type Child = {
  id: string;
  name: string;
  age: number;
  gender: string;
  currentEducation: ChildEducation;
};

export type EducationPath = {
  type: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  minAge: number; // Lowered minimum ages for faster progression
  suitableFor: string; // "all", "male" or "female"
  duration: number;
  annualCurriculum: {
    year: number;
    name: string;
    skills: string[];
  }[];
  relatedStat: string;
};
