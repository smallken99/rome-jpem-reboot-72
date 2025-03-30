
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
  
  // Propriétés familiales
  relation?: string;
  isHeadOfFamily?: boolean;
  parentIds?: string[];
  spouseId?: string;
  childrenIds?: string[];
  testamentaryWishes?: string;
  marriageStatus?: string;
  
  // Santé et statut
  health?: number;
  status?: 'alive' | 'deceased' | 'exiled';

  // Attributs personnels
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
  
  // Propriétés politiques
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
  
  // Suivi des naissances
  lastChildBirthYear?: number;
}

// Type pour les statistiques de personnage
export interface CharacterStat {
  name: string;
  value: number;
  maxValue: number;
  icon: string;
  description: string;
  color: string;
}

// Type pour les informations d'éducation
export interface EducationInfo {
  type: string;
  specialties: string[];
  mentor: string | null;
  completed?: boolean;
  completedAt?: string;
}
