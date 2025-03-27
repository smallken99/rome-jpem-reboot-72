
// Basic education types
export type EducationType = 'military' | 'political' | 'religious' | 'artistic' | 'philosophical' | 'rhetoric' | 'academic' | 'none';
export type Gender = 'male' | 'female';

// Child data structure for education system
export interface Child {
  id: string;
  name: string;
  age: number;
  gender: Gender;
  status?: string;
  educationType: EducationType | string;
  progress: number;
  specialties: string[];
  specialty?: string;
  traits: string[];
  mentor?: string;
  preceptorId?: string | null;
  currentEducation?: ChildEducation;
  skills?: { [key: string]: number };
}

// Current education status for a child
export interface ChildEducation {
  type: EducationType | string;
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
  type: EducationType | string;
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
  specialization: EducationType | string;
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
  portrait?: string;
  reputation?: number;
}

// Preceptors grouped by type
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
  type: EducationType | string;
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
  benefits?: string[];
}

// Component props for education components
export interface EducationObjectivesProps {
  childId: string;
  path?: EducationPath;
  educationType?: EducationType | string;
}

export interface EducationTypeSelectorProps {
  selectedType: EducationType | string;
  onChange: (type: EducationType | string) => void;
  gender: Gender;
  childGender?: Gender;
  age?: number;
}

export interface EducationSpecialtySelectorProps {
  educationType: EducationType | string;
  selectedSpecialties: string[];
  onChange: (specialties: string[]) => void;
  availableSpecialties?: string[];
}

// Form data for education
export interface EducationFormData {
  type: EducationType | string;
  specialties: string[];
  preceptorId: string | null;
  childId?: string;
  pathType?: EducationType | string;
  mentor?: string | null;
  startYear?: number;
  currentYear?: number;
  totalYears?: number;
  status?: "not_started" | "in_progress" | "completed" | "failed" | "canceled";
  skills?: { [key: string]: number };
  educationType?: EducationType | string;
}

// Education record
export interface EducationRecord {
  id: string;
  childId: string;
  pathType: EducationType | string;
  preceptorId: string | null;
  startYear: number;
  currentYear: number;
  totalYears: number;
  status: "not_started" | "in_progress" | "completed" | "failed" | "canceled";
  skills: { [key: string]: number };
  specialties: string[];
}
