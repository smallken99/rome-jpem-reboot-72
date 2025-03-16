
export interface Child {
  id: string;
  name: string;
  age: number;
  gender: 'male' | 'female';
  educationType: string;
  progress: number;
  mentor: string | null;
}

export interface Preceptor {
  id: string;
  name: string;
  specialties: string[];
  expertise: number;
  cost: number;
  reputation: number;
  available: boolean;
}

export interface EducationProgressButtonsProps {
  isEducating: boolean;
  hasEducation: boolean;
  educationProgress?: number;
  onAdvanceYear?: () => void;
  onCompleteEducation?: () => void;
  onAdvance?: () => void;
  onCancel?: () => void;
  onComplete?: () => void;
  canComplete?: boolean;
}

export interface EducationFormProps {
  childId: string;
  onSubmit: (data: EducationFormData) => void;
  isLoading?: boolean;
}

export interface EducationFormData {
  educationType: string;
  specialties: string[];
  mentor: string;
}
