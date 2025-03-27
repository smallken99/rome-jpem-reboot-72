
import { Preceptor, EducationType } from './types/educationTypes';
import { v4 as uuidv4 } from 'uuid';

/**
 * Generate a new preceptor with default values
 */
export const createPreceptor = (specialization: EducationType): Preceptor => {
  return {
    id: uuidv4(),
    name: generatePreceptorName(),
    specialization: specialization,
    skill: 60 + Math.floor(Math.random() * 30),
    cost: 1000 + Math.floor(Math.random() * 2000),
    background: "Ancien précepteur d'une famille patricienne",
    traits: ["Érudit", "Discipliné"],
    status: 'available',
    specialty: getSpecialtyForType(specialization),
    expertise: 65 + Math.floor(Math.random() * 25),
    experience: 5 + Math.floor(Math.random() * 15),
    price: 1200 + Math.floor(Math.random() * 1800),
    available: true,
    description: "Un précepteur expérimenté, spécialisé dans l'éducation romaine traditionnelle.",
    teachingStyle: "Rigoureux et méthodique",
    specialties: [],
    reputation: 70 + Math.floor(Math.random() * 20)
  };
};

/**
 * Generate a roman-style name for preceptors
 */
const generatePreceptorName = (): string => {
  const firstNames = ["Marcus", "Gaius", "Lucius", "Publius", "Quintus", "Titus", "Aulus", "Servius"];
  const lastNames = ["Tullius", "Cornelius", "Fabius", "Claudius", "Valerius", "Caecilius", "Aurelius"];
  
  return `${firstNames[Math.floor(Math.random() * firstNames.length)]} ${lastNames[Math.floor(Math.random() * lastNames.length)]}`;
};

/**
 * Get a suitable specialty based on education type
 */
const getSpecialtyForType = (type: EducationType): string => {
  const specialties: Record<string, string[]> = {
    military: ["Stratégie militaire", "Combat à l'épée", "Commandement", "Tactiques de siège"],
    political: ["Rhétorique politique", "Droit romain", "Administration"],
    religious: ["Rites et cérémonies", "Augures et divination", "Droit sacré"],
    artistic: ["Poésie", "Musique", "Sculpture"],
    philosophical: ["Philosophie stoïcienne", "Éthique", "Logique"],
    rhetoric: ["Art oratoire", "Débat politique", "Éloquence judiciaire"],
    academic: ["Mathématiques", "Astronomie", "Médecine"],
    none: ["Éducation générale"]
  };
  
  const typeKey = type as string;
  const options = specialties[typeKey] || specialties.academic;
  return options[Math.floor(Math.random() * options.length)];
};
