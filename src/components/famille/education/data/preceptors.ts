
import { Preceptor, EducationType } from '../types/educationTypes';
import { v4 as uuidv4 } from 'uuid';

// Sample preceptors data
const preceptorsData: Preceptor[] = [
  {
    id: 'p1',
    name: 'Marcus Flavius',
    specialization: 'military',
    specialty: 'military',
    skill: 80,
    cost: 2500,
    price: 2500,
    quality: 4,
    expertise: 80,
    experience: 15,
    background: 'Ancien centurion avec 15 ans d\'expérience dans les légions romaines',
    traits: ['Discipliné', 'Rigoureux', 'Expert en armes'],
    status: 'available',
    available: true,
    assigned: false,
    specialties: ['Combat au glaive', 'Tactique de légion']
  },
  {
    id: 'p2',
    name: 'Quintus Tullius',
    specialization: 'rhetoric',
    specialty: 'rhetoric',
    skill: 85,
    cost: 3000,
    price: 3000,
    quality: 4,
    expertise: 85,
    experience: 20,
    background: 'Orateur renommé du forum, a formé plusieurs sénateurs',
    traits: ['Éloquent', 'Patient', 'Cultivé'],
    status: 'available',
    available: true,
    assigned: false,
    specialties: ['Discours public', 'Débat politique']
  },
  {
    id: 'p3',
    name: 'Livia Scribonia',
    specialization: 'religious',
    specialty: 'religious',
    skill: 75,
    cost: 2200,
    price: 2200,
    quality: 3,
    expertise: 75,
    experience: 12,
    background: 'Ancienne assistante d\'une grande vestale',
    traits: ['Pieuse', 'Respectueuse', 'Traditionaliste'],
    status: 'available',
    available: true,
    assigned: false,
    specialties: ['Rites domestiques', 'Traditions familiales']
  },
  {
    id: 'p4',
    name: 'Gaius Aelius',
    specialization: 'political',
    specialty: 'political',
    skill: 90,
    cost: 3500,
    price: 3500,
    quality: 5,
    expertise: 90,
    experience: 25,
    background: 'Ancien conseiller du Sénat, spécialiste en droit romain',
    traits: ['Stratège', 'Influent', 'Négociateur'],
    status: 'available',
    available: true,
    assigned: false,
    specialties: ['Loi romaine', 'Administration publique']
  },
  {
    id: 'p5',
    name: 'Publius Marcellus',
    specialization: 'academic',
    specialty: 'academic',
    skill: 82,
    cost: 2800,
    price: 2800,
    quality: 4,
    expertise: 82,
    experience: 18,
    background: 'Philosophe grec ayant étudié à Athènes',
    traits: ['Sage', 'Méthodique', 'Curieux'],
    status: 'available',
    available: true,
    assigned: false,
    specialties: ['Philosophie stoïcienne', 'Mathématiques']
  }
];

// Function to get all preceptors
export const getAllPreceptors = (): Preceptor[] => {
  return preceptorsData;
};

// Function to get a preceptor by ID
export const getPreceptorById = (id: string): Preceptor | undefined => {
  return preceptorsData.find(p => p.id === id);
};

// Function to get preceptors by education type
export const getPreceptorsForType = (type: string): Preceptor[] => {
  return preceptorsData.filter(p => p.specialization === type || p.specialty === type);
};

// Helper function to generate new preceptors
export const generatePreceptor = (type: EducationType, quality: number = 3): Preceptor => {
  const firstNames = ['Marcus', 'Gaius', 'Titus', 'Lucius', 'Quintus', 'Publius', 'Servius', 'Aulus', 'Decimus', 'Spurius'];
  const lastNames = ['Tullius', 'Valerius', 'Cornelius', 'Julius', 'Caecilius', 'Claudius', 'Aemilius', 'Fabius', 'Fulvius', 'Licinius'];
  
  const randomName = `${firstNames[Math.floor(Math.random() * firstNames.length)]} ${lastNames[Math.floor(Math.random() * lastNames.length)]}`;
  const skill = 50 + (quality * 10) + Math.floor(Math.random() * 20);
  const cost = 1500 + (quality * 500) + Math.floor(Math.random() * 500);
  
  return {
    id: uuidv4(),
    name: randomName,
    specialization: type,
    specialty: type,
    skill,
    cost,
    price: cost,
    quality,
    expertise: skill,
    experience: 5 + quality + Math.floor(Math.random() * 10),
    background: `Précepteur expérimenté en éducation ${type}`,
    traits: ['Expérimenté', 'Pédagogue'],
    status: 'available',
    available: true,
    assigned: false,
    specialties: []
  };
};
