
export interface CharacterStat {
  name: string;
  value: number;
  maxValue: number;
  icon: string;
  description: string;
  color: string;
}

export interface CharacterStats {
  popularity: CharacterStat;
  oratory: CharacterStat;
  piety: CharacterStat;
  martialEducation: CharacterStat;
}

export interface EducationInfo {
  type?: string;
  specialties?: string[];
  mentor?: string | null;
}

export interface Character {
  id: string;
  name: string;
  portrait?: string;
  age: number;
  gender: 'male' | 'female';
  title?: string;
  role?: string;
  isPlayer?: boolean;
  stats: CharacterStats;
  education?: EducationInfo;
}
