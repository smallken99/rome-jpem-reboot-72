
import { romanNames } from '@/components/famille/education/data/romanNames';

const romanNamePrefixes = romanNames.map(name => name.split(' ')[0]);
const romanNameSuffixes = romanNames.map(name => name.split(' ')[1]);

/**
 * Generate a random Roman name
 */
export const generateRomanName = (gender: 'male' | 'female', familyName: string): string => {
  // For males, use praenomen + family name
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
