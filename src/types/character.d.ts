
export interface Character {
  id: string;
  name: string;
  age: number;
  gender: 'male' | 'female';
  relation: string;
  traits: string[];
  health: number;
  isHeadOfFamily?: boolean;
  parentIds?: string[];
  spouseId?: string;
  childrenIds?: string[];
  education?: string;
  educationType?: string;
  specialties?: string[];
  specialty?: string;
  testamentaryWishes?: string;
  status: 'alive' | 'deceased' | 'exiled';
}
