
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
  };
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
