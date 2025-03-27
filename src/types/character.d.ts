
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
  specialty?: string;
  specialties?: string[];
  testamentaryWishes?: string;
  status: 'alive' | 'deceased' | 'exiled';
  stats?: {
    popularity?: { value: number; name: string; maxValue: number; icon: string; description: string; color: string };
    oratory?: { value: number; name: string; maxValue: number; icon: string; description: string; color: string };
    piety?: { value: number; name: string; maxValue: number; icon: string; description: string; color: string };
    martialEducation?: { value: number; name: string; maxValue: number; icon: string; description: string; color: string };
  };
}
