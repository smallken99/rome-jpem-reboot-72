
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
  minAge: number;
  suitableFor: string;
  duration: number;
  annualCurriculum: {
    year: number;
    name: string;
    skills: string[];
  }[];
  relatedStat: string;
};
