
import { v4 as uuidv4 } from 'uuid';
import { generateRomanName } from '../utils/naming/romanNameGenerator';
import { Preceptor } from './types/educationTypes';

// Roman name prefixes and suffixes for preceptor generation
const romanNamePrefixes = ['Magister', 'Praeceptor', 'Doctor', 'Educator'];
const romanNameSuffixes = ['Sapiens', 'Doctus', 'Eruditus', 'Magnus'];

export const generatePreceptor = (specialty: string, quality: number = 3): Preceptor => {
  const id = uuidv4();
  const randomPrefix = romanNamePrefixes[Math.floor(Math.random() * romanNamePrefixes.length)];
  const randomSuffix = romanNameSuffixes[Math.floor(Math.random() * romanNameSuffixes.length)];
  
  // Generate a roman name for the base
  const baseName = generateRomanName('male');
  const name = `${randomPrefix} ${baseName} ${randomSuffix}`;
  
  // Calculate price based on quality
  const basePrice = 2000;
  const price = basePrice + (quality * 500);
  
  // Calculate experience based on quality
  const experience = 5 + (quality * 3);
  
  return {
    id,
    name,
    specialty: specialty as any,
    quality,
    price,
    experience,
    skill: 50 + (quality * 10),
    expertise: quality * 2,
    available: true,
    description: `Un précepteur spécialisé en ${specialty}.`,
    teachingStyle: quality > 4 ? 'Exigeant' : 'Pédagogue',
    reputation: 60 + (quality * 8),
    specialties: []
  };
};
