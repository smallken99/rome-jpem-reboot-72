
// Types pour le système d'éducation

export interface EducationPath {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  benefits: string[];
  requirements: {
    age: number;
    gender: 'male' | 'female' | 'both';
    cost: number;
    duration: string;
  };
  outcomes: string[];
  specialties: string[];
  type?: string;
  title?: string;
  duration?: string;
  minAge?: number;
  suitableFor?: 'male' | 'female' | 'both';
  relatedStat?: string;
}

export interface Child {
  id: string;
  name: string;
  age: number;
  gender: string;
  currentEducation: {
    type: string;
    mentor: string | null;
    skills: string[];
    progress: number;
    speciality?: string;
    yearsCompleted?: number;
    totalYears?: number;
    pityBonus?: number;
    statBonus?: string;
    educationHistory?: EducationHistory[];
  };
}

export interface EducationHistory {
  type: string;
  startYear: number;
  endYear?: number;
  completed: boolean;
  mentor?: string;
  skills: string[];
}

export interface Preceptor {
  id: string;
  name: string;
  speciality: string;
  reputation: "Excellent" | "Bon" | "Moyen";
  quality: number;
  cost: number;
  available: boolean;
  background: string;
  childId: string | null;
}

export interface PreceptorsByType {
  [key: string]: Preceptor[];
}

// Interface pour les props des composants d'éducation
export interface ChildHeaderProps {
  name: string;
  age: number;
  gender: string;
}

export interface EducationTypeSelectorProps {
  selectedType: string;
  onChange: (type: string) => void;
  childGender: string;
}

export interface EducationSpecialtySelectorProps {
  educationType: string;
  selectedSpecialties: string[];
  onChange: (specialties: string[]) => void;
}

export interface MentorInfoProps {
  mentors: Preceptor[];
  selectedMentor: string | null;
  onChange: (mentorId: string | null) => void;
}

export interface StatBonusInfoProps {
  hasMentor: boolean;
  educationType: string;
}

export interface PietyBonusProps {
  bonus?: number;
}

export interface EducationWarningProps {
  name: string;
  currentEducationType: string;
}

export interface PreceptorHeaderProps {
  name: string;
  reputation: "Excellent" | "Bon" | "Moyen";
}

export interface PreceptorSpecialityProps {
  specialty: string;
  type?: string;
}

export interface PreceptorBiographyProps {
  text: string;
}

export interface PreceptorQualityStarsProps {
  quality: number;
}

export interface PreceptorCostInfoProps {
  cost: number;
  available: boolean;
}

export interface PreceptorActionsProps {
  onHire: () => void;
  onCancel?: () => void;
  isAvailable: boolean;
  isLoading?: boolean;
}
