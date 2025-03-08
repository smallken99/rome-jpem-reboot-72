
import { romanNames, romanNamePrefixes, romanNameSuffixes } from './data/romanNames';
import { educationSpecialties } from './data/specialties';

/**
 * Safely checks if an object is an array with elements
 * @param obj The object to check
 * @returns True if the object is an array with at least one element
 */
export const isNonEmptyArray = (obj: any): boolean => {
  return Array.isArray(obj) && obj.length > 0;
};

/**
 * Safely gets an array length, returning 0 for non-arrays
 * @param obj The object to check
 * @returns The length of the array or 0 if not an array
 */
export const safeArrayLength = (obj: any): number => {
  return Array.isArray(obj) ? obj.length : 0;
};

/**
 * Generates a random Roman name for a preceptor
 * @returns A Roman name
 */
export const generateRomanName = (): string => {
  const nameIndex = Math.floor(Math.random() * romanNames.length);
  const usePrefix = Math.random() > 0.7;
  const useSuffix = Math.random() > 0.7;
  
  let name = romanNames[nameIndex];
  
  if (usePrefix) {
    const prefixIndex = Math.floor(Math.random() * romanNamePrefixes.length);
    name = `${romanNamePrefixes[prefixIndex]} ${name}`;
  }
  
  if (useSuffix) {
    const suffixIndex = Math.floor(Math.random() * romanNameSuffixes.length);
    name = `${name} ${romanNameSuffixes[suffixIndex]}`;
  }
  
  return name;
};

/**
 * Generates a random speciality for a preceptor
 * @param educationType The type of education
 * @returns A speciality
 */
export const generateSpeciality = (educationType: string): string => {
  if (!educationSpecialties[educationType]) {
    return "Général";
  }
  
  const specialtyIndex = Math.floor(Math.random() * educationSpecialties[educationType].length);
  return educationSpecialties[educationType][specialtyIndex];
};

/**
 * Generates a random reputation for a preceptor
 * @returns A reputation string
 */
export const generateReputation = (): "Excellent" | "Bon" | "Moyen" => {
  const rand = Math.random();
  if (rand > 0.7) return "Excellent";
  if (rand > 0.4) return "Bon";
  return "Moyen";
};

/**
 * Generates a random fee based on reputation
 * @param reputation The reputation of the preceptor
 * @returns A fee amount
 */
export const generateFee = (reputation: "Excellent" | "Bon" | "Moyen"): number => {
  switch (reputation) {
    case "Excellent": return 8000 + Math.floor(Math.random() * 4000);
    case "Bon": return 5000 + Math.floor(Math.random() * 3000);
    case "Moyen": return 2000 + Math.floor(Math.random() * 3000);
    default: return 3000;
  }
};

/**
 * Generates a title for a preceptor
 * @param reputation The reputation of the preceptor
 * @returns A title
 */
export const generateTitle = (reputation: "Excellent" | "Bon" | "Moyen"): string => {
  switch (reputation) {
    case "Excellent": return "le Sage";
    case "Bon": return "l'Érudit";
    case "Moyen": return "";
    default: return "";
  }
};

/**
 * Generates a stat bonus for education
 * @returns A stat bonus number
 */
export const generateStatBonus = (): number => {
  return Math.floor(Math.random() * 5) + 1;
};

/**
 * Generates a random gender
 * @returns Either 'male' or 'female'
 */
export const generateGender = (): 'male' | 'female' => {
  return Math.random() > 0.7 ? 'female' : 'male';
};
