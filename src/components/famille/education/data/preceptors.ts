
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
    specialties: ['Combat au glaive', 'Tactique de légion'],
    
    // Add missing required properties
    description: 'Un vétéran des campagnes militaires qui a servi sous différents généraux et peut enseigner toutes les facettes de l\'art de la guerre.',
    teachingStyle: 'Rigoureux et exigeant, instille la discipline',
    reputation: 80
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
    specialties: ['Discours public', 'Débat politique'],
    
    // Add missing required properties
    description: 'Maître de la parole et de l\'argumentation, ayant étudié à Athènes et enseigné à de nombreux patriciens.',
    teachingStyle: 'Dialogues socratiques et exercices pratiques',
    reputation: 90
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
    specialties: ['Rites domestiques', 'Traditions familiales'],
    
    // Add missing required properties
    description: 'Versée dans tous les rituels religieux romains et connaissant parfaitement les traditions des cultes officiels.',
    teachingStyle: 'Immersion dans les pratiques rituelles et apprentissage par observation',
    reputation: 75
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
    specialties: ['Loi romaine', 'Administration publique'],
    
    // Add missing required properties
    description: 'Connaisseur de tous les rouages politiques de Rome et du fonctionnement du Sénat, ayant servi comme conseiller aux plus hauts niveaux.',
    teachingStyle: 'Études de cas et exercices pratiques de négociation',
    reputation: 95
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
    specialties: ['Philosophie stoïcienne', 'Mathématiques'],
    
    // Add missing required properties
    description: 'Érudit dans de nombreux domaines intellectuels, de la philosophie grecque aux mathématiques et à l\'astronomie.',
    teachingStyle: 'Questions philosophiques et réflexion critique',
    reputation: 85
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
    specialties: [],
    
    // Add missing required properties
    description: `Précepteur spécialisé en ${type}, avec une expérience de ${5 + quality} ans d'enseignement.`,
    teachingStyle: 'Adaptatif selon les besoins de l\'élève',
    reputation: 50 + (quality * 10)
  };
};
