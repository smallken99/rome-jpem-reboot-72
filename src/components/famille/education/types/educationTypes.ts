
// Basic education types
export type EducationType = 'military' | 'political' | 'religious' | 'artistic' | 'philosophical' | 'rhetoric' | 'academic' | 'none';
export type Gender = 'male' | 'female';

// Child data structure for education system
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
  mentor?: string;
  preceptorId?: string | null;
  currentEducation?: ChildEducation;
}

// Current education status for a child
export interface ChildEducation {
  type: EducationType;
  mentor: string | null;
  progress: number;
  skills: string[];
  yearsCompleted?: number;
  totalYears?: number;
  statBonus?: number;
  mentorId?: string | null;
  speciality?: string;
}

// Education record - completed education
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

// Preceptor (teacher/mentor) data
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
  // Additional properties used in various components
  specialty?: string;
  speciality?: string;
  quality?: number;
  expertise?: number;
  price?: number;
  experience?: number;
  available?: boolean;
  assigned?: boolean;
  description?: string;
  teachingStyle?: string;
  specialties?: string[];
}

// Preceptors grouped by education type
export interface PreceptorsByType {
  military: Preceptor[];
  rhetoric: Preceptor[];
  religious: Preceptor[];
  academic: Preceptor[];
}

// Education path definition
export interface EducationPath {
  id: string;
  name: string;
  type: EducationType;
  description: string;
  minAge: number;
  maxAge: number;
  duration: number;
  cost: number;
  relatedStat: string;
  requiredAttributes?: { [key: string]: number };
  outcomes: {
    skills?: string[];
    bonuses?: { [key: string]: number };
  } | string[];
  suitableFor: Gender[];
}

// Component props for education components
export interface EducationObjectivesProps {
  childId: string;
  path: EducationPath;
}

export interface EducationTypeSelectorProps {
  selectedType: EducationType;
  onChange: (type: EducationType) => void;
  gender: Gender;
  age?: number;
}

export interface EducationSpecialtySelectorProps {
  educationType: EducationType;
  selectedSpecialties: string[];
  onChange: (specialties: string[]) => void;
}

// Form data for education
export interface EducationFormData {
  type: EducationType;
  specialties: string[];
  preceptorId: string | null;
}

// Education record
export interface EducationRecord {
  id: string;
  childId: string;
  pathType: EducationType;
  preceptorId: string | null;
  startYear: number;
  currentYear: number;
  totalYears: number;
  status: 'not_started' | 'in_progress' | 'completed' | 'failed';
  skills: { [key: string]: number };
  specialties: string[];
}
