
export interface Character {
  id: string;
  name: string;
  firstName?: string;
  lastName?: string;
  gender: 'male' | 'female';
  age: number;
  isPlayer?: boolean;
  portrait?: string;
  title?: string;
  role?: string;
  marriageStatus?: string;
  
  // Family-related properties (adding these to fix errors)
  relation?: string;
  isHeadOfFamily?: boolean;
  parentIds?: string[];
  spouseId?: string;
  childrenIds?: string[];
  testamentaryWishes?: string;
  
  // Health and status
  health?: number;
  status?: 'alive' | 'deceased' | 'exiled';

  // Personal attributes (adding these to fix errors)
  traits?: string[];
  specialty?: string;
  educationType?: string;
  
  stats: {
    popularity: number | CharacterStat;
    oratory: number | CharacterStat;
    piety: number | CharacterStat;
    martialEducation: number | CharacterStat;
  };
  
  education?: EducationInfo;
  currentEducation?: {
    type: string;
    mentor: string | null;
    mentorId?: string | null;
    progress: number;
    skills: string[];
    yearsCompleted?: number;
    totalYears?: number;
    statBonus?: number;
    speciality?: string;
  };
  
  // Additional properties for diplomacy
  diplomatie?: Record<string, any>;
  
  // Last child birth tracking
  lastChildBirthYear?: number;
}

// Type for character statistics
export interface CharacterStat {
  name: string;
  value: number;
  maxValue: number;
  icon: string;
  description: string;
  color: string;
}

// Type for education information
export interface EducationInfo {
  type: string;
  specialties: string[];
  mentor: string | null;
  completed?: boolean;
  completedAt?: string;
}
