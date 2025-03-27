
import { romanNames } from '@/components/famille/education/data/romanNames';

const romanNamePrefixes = romanNames.map(name => name.split(' ')[0]);
const romanNameSuffixes = romanNames.map(name => name.split(' ')[1]).filter(Boolean);

/**
 * Generate a random Roman name
 */
export const generateRomanName = (gender: 'male' | 'female', familyName: string): string => {
  // For males, use praenomen + family name (tria nomina format)
  if (gender === 'male') {
    const randomPrefix = romanNamePrefixes[Math.floor(Math.random() * romanNamePrefixes.length)];
    return `${randomPrefix} ${familyName}`;
  } 
  // For females, use feminized family name + possibly "Minor" for younger daughters
  else {
    // Roman women often took the feminine form of the family name
    const femaleName = familyName.endsWith('us') 
      ? familyName.replace(/us$/, 'a') 
      : familyName.endsWith('ius') 
        ? familyName.replace(/ius$/, 'ia')
        : familyName;
        
    // Add "Minor" for younger daughters sometimes
    const isMinor = Math.random() > 0.7;
    return isMinor ? `${femaleName} Minor` : femaleName;
  }
};

/**
 * Format a name according to Roman naming conventions
 */
export const formatRomanName = (praenomen: string, nomen: string, cognomen?: string): string => {
  if (cognomen) {
    return `${praenomen} ${nomen} ${cognomen}`;
  }
  return `${praenomen} ${nomen}`;
};

/**
 * Extract parts from a full Roman name
 */
export const extractNameParts = (fullName: string): { praenomen: string; nomen: string; cognomen?: string } => {
  const parts = fullName.split(' ');
  
  if (parts.length === 3) {
    return {
      praenomen: parts[0],
      nomen: parts[1],
      cognomen: parts[2]
    };
  } else if (parts.length === 2) {
    return {
      praenomen: parts[0],
      nomen: parts[1]
    };
  }
  
  // Fallback for unusual formats
  return {
    praenomen: parts[0] || 'Ignotus',
    nomen: parts.slice(1).join(' ') || 'Incognitus'
  };
};

/**
 * Get the feminine version of a Roman family name
 */
export const getFeminineName = (familyName: string): string => {
  if (familyName.endsWith('us')) {
    return familyName.replace(/us$/, 'a');
  } else if (familyName.endsWith('ius')) {
    return familyName.replace(/ius$/, 'ia');
  } else if (familyName.endsWith('o')) {
    return familyName.replace(/o$/, 'a');
  }
  
  // If no rule applies, just return the original
  return familyName;
};
