
import { Character } from '@/types/character';

// Types for our registration flow
export type GensOrigin = 'aristocrate' | 'agricole' | 'populaire';
export type FamilyHeadEducation = 'rome' | 'armee' | 'religieux';
export type FamilyPhilosophy = 'traditionaliste' | 'pragmatique' | 'opportuniste';

export interface GensData {
  name: string;
  emblem?: string;
  colors?: {
    primary: string;
    secondary: string;
  };
  motto?: string;
  influence: number;
  wealth: number;
  reputation: number;
  origin?: GensOrigin;
  philosophy?: FamilyPhilosophy;
}

export interface RegistrationData {
  // User account
  username: string;
  email: string;
  password: string;
  
  // Gens data
  gens: GensData;
  
  // Family head
  familyHead: Partial<Character>;
  headEducation?: FamilyHeadEducation;
}

export interface RegistrationContextType {
  registrationData: RegistrationData;
  currentStep: number;
  updateRegistrationData: (data: Partial<RegistrationData>) => void;
  nextStep: () => void;
  prevStep: () => void;
  goToStep: (step: number) => void;
  calculateBonusMalus: () => void;
}
