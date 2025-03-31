
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
  faction?: string;
  famille?: string;
  actif?: boolean | string;
  
  // Birth tracking
  lastChildBirthYear?: number;
}

// Type pour les statistiques de personnage pour la rétrocompatibilité
export interface CharacterStat {
  name: string;
  value: number;
  maxValue: number;
  icon: string;
  description: string;
  color: string;
}

// Type pour l'éducation d'un personnage
export interface EducationInfo {
  type: string;
  specialties: string[];
  mentor: string | null;
  completed?: boolean;
  completedAt?: string;
}

// Interface pour les sénateurs jouables
export interface SenateurJouable extends Omit<Character, 'stats'> {
  faction: string;
  famille: string;
  actif: boolean | string;
  influence: number;
  prestige: number;
  richesse: number;
  clientele: number;
  allies: string[];
  ennemis: string[];
  gender: 'male' | 'female';
  stats?: {
    popularity: number | CharacterStat;
    oratory: number | CharacterStat;
    piety: number | CharacterStat;
    martialEducation: number | CharacterStat;
  };
  
  // Add properties for MaitreJeu compatibility
  competences?: string[] | Record<string, any>;
  nom: string;
  prenom: string;
}
