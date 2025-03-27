
export interface Character {
  id: string;
  name: string;
  firstName?: string;
  lastName?: string;
  age: number;
  gender: 'male' | 'female';
  // Family relationship properties
  relation?: string;
  isHeadOfFamily?: boolean;
  parentIds?: string[];
  spouseId?: string;
  childrenIds?: string[];
  // Character traits and stats
  traits?: string[];
  health?: number;
  status?: 'alive' | 'deceased' | 'exiled';
  specialties?: string[];
  specialty?: string;
  educationType?: string;
  testamentaryWishes?: string;
  // Visual and metadata
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
}

export interface CharacterStat {
  name: string;
  value: number;
  maxValue: number;
  icon: string;
  description: string;
  color: string;
}
