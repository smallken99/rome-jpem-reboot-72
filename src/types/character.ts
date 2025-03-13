
export interface Character {
  id: string;
  name: string;
  gender: 'male' | 'female';
  age: number;
  isPlayer?: boolean;
  portrait?: string;
  title?: string;
  role?: string;
  stats: {
    popularity: number;
    oratory: number;
    piety: number;
    martialEducation: number;
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

// Type pour les statistiques de personnage pour la rétrocompatibilité
export interface CharacterStat {
  name: string;
  value: number;
  maxValue: number;
  icon: string;
  description: string;
  color: string;
}
