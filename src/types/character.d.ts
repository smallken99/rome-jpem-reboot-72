
export interface Character {
  id: string;
  name: string;
  firstName?: string;
  lastName?: string;
  age: number;
  gender: 'male' | 'female';
  // Added missing properties
  relation?: string;
  traits?: string[];
  health?: number;
  isHeadOfFamily?: boolean;
  parentIds?: string[];
  spouseId?: string;
  childrenIds?: string[];
  specialty?: string;
  testamentaryWishes?: string;
  status?: 'alive' | 'deceased' | 'exiled';
  isPlayer?: boolean;
  portrait?: string;
  title?: string;
  role?: string;
  marriageStatus?: string;
  lastChildBirthYear?: number;
  stats: {
    popularity: number | CharacterStat;
    oratory: number | CharacterStat;
    piety: number | CharacterStat;
    martialEducation: number | CharacterStat;
  };
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
