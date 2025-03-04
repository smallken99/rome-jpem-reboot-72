
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
}
