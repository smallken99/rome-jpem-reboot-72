
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
  
  // Family properties
  relation?: string;
  isHeadOfFamily?: boolean;
  parentIds?: string[];
  spouseId?: string;
  childrenIds?: string[];
  testamentaryWishes?: string;
  marriageStatus?: string;
  
  // Health and status
  health?: number;
  status?: 'alive' | 'deceased' | 'exiled';

  // Personal attributes
  traits?: string[];
  specialty?: string;
  educationType?: string;
  diplomatie?: Record<string, any>;
  
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
  
  // Political properties
  appartenance?: string;
  fonction?: string;
  gens?: string;
  magistrature?: string;
  playerId?: string;
  joueur?: string | boolean;
  popularite?: number;
  militaire?: number;
  piete?: number;
  eloquence?: number;
  statut?: string;
  nom?: string;
  prenom?: string;
  
  // Birth tracking
  lastChildBirthYear?: number;
}

// Type for character stats
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

// Interface for playable senators
export interface SenateurJouable extends Omit<Character, 'stats'> {
  faction: string;
  influence: number;
  prestige: number;
  richesse: number;
  clientele: number;
  allies: string[];
  ennemis: string[];
  gender: 'male' | 'female'; // Explicitly include gender to fix type errors
  stats?: {
    popularity: number | CharacterStat;
    oratory: number | CharacterStat;
    piety: number | CharacterStat;
    martialEducation: number | CharacterStat;
  };
}
