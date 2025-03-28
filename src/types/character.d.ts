
export interface Character {
  id: string;
  name: string;
  firstName?: string;
  lastName?: string;
  age: number;
  gender: 'male' | 'female';
  
  // Additional properties needed
  relation?: string;
  isHeadOfFamily?: boolean;
  parentIds?: string[];
  spouseId?: string;
  childrenIds?: string[];
  health?: number;
  status?: 'alive' | 'deceased' | 'exiled';
  traits?: string[];
  testamentaryWishes?: string;
  specialty?: string;
  
  // Family relationship properties
  isPlayer?: boolean;
  portrait?: string;
  title?: string;
  role?: string;
  marriageStatus?: string;
  lastChildBirthYear?: number;
  
  // Stats
  stats: {
    popularity: number | CharacterStat;
    oratory: number | CharacterStat;
    piety: number | CharacterStat;
    martialEducation: number | CharacterStat;
  };
  
  // Education information
  education?: {
    type: string;
    specialties: string[];
    mentor: string | null;
    completed?: boolean;
    completedAt?: string;
  };
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
  
  // Additional properties used in code
  educationType?: string;
  skills?: string[] | Record<string, number>;
  testamentaryWishes?: string;
}

export interface CharacterStat {
  name: string;
  value: number;
  maxValue: number;
  icon: string;
  description: string;
  color: string;
}
