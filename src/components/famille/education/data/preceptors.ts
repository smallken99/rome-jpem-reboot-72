
import { Preceptor } from '../types/educationTypes';
import { v4 as uuidv4 } from 'uuid';

// Preceptors data
const preceptorsData: Preceptor[] = [
  {
    id: '1',
    name: 'Marcus Livius Drusus',
    specialty: 'military',
    price: 5000,
    experience: 15,
    quality: 85,
    expertise: 85,
    specialties: ['Tactique de légion', 'Combat à l\'épée'],
    description: 'Ancien centurion avec 20 ans d\'expérience dans les légions romaines.',
    status: 'available',
    background: 'Vétéran des campagnes de Gaule',
    teachingStyle: 'Strict et discipliné'
  },
  {
    id: '2',
    name: 'Quintus Hortensius Hortalus',
    specialty: 'rhetoric',
    price: 7000,
    experience: 20,
    quality: 90,
    expertise: 90,
    specialties: ['Éloquence politique', 'Argumentation juridique'],
    description: 'Orateur célèbre et avocat renommé du forum romain.',
    status: 'available',
    background: 'Formé à Athènes',
    teachingStyle: 'Éloquent et théâtral'
  },
  {
    id: '3',
    name: 'Publius Mucius Scaevola',
    specialty: 'religious',
    price: 4000,
    experience: 25,
    quality: 80,
    expertise: 80,
    specialties: ['Rituel pontifical', 'Interprétation des augures'],
    description: 'Ancien membre du collège des Pontifes avec une connaissance approfondie des rites.',
    status: 'available',
    background: 'Issu d\'une lignée de prêtres',
    teachingStyle: 'Méthodique et précis'
  },
  {
    id: '4',
    name: 'Sextus Aelius Paetus',
    specialty: 'academic',
    price: 6000,
    experience: 18,
    quality: 87,
    expertise: 87,
    specialties: ['Philosophie grecque', 'Mathématiques'],
    description: 'Philosophe et mathématicien éduqué à Alexandrie.',
    status: 'available',
    background: 'A étudié dans la Grande Bibliothèque',
    teachingStyle: 'Socratique et questionneur'
  },
  {
    id: '5',
    name: 'Gaius Sempronius Gracchus',
    specialty: 'political',
    price: 8000,
    experience: 12,
    quality: 92,
    expertise: 92,
    specialties: ['Droit romain', 'Administration provinciale'],
    description: 'Ancien questeur avec une connaissance approfondie des institutions romaines.',
    status: 'available',
    background: 'Famille influente de réformateurs',
    teachingStyle: 'Pragmatique et inspirant'
  }
];

// Helper functions
export const getAllPreceptors = (): Preceptor[] => {
  return preceptorsData;
};

export const getPreceptorById = (id: string): Preceptor | undefined => {
  return preceptorsData.find(preceptor => preceptor.id === id);
};

export const getPreceptorsForType = (type: string): Preceptor[] => {
  if (type === 'all') return preceptorsData;
  return preceptorsData.filter(preceptor => preceptor.specialty === type);
};

export const generateRandomPreceptor = (specialty: string): Preceptor => {
  const firstNames = ['Marcus', 'Gaius', 'Lucius', 'Quintus', 'Publius', 'Titus', 'Aulus'];
  const familyNames = ['Tullius', 'Claudius', 'Julius', 'Cornelius', 'Fabius', 'Valerius'];
  const cognomens = ['Maximus', 'Rufus', 'Niger', 'Longus', 'Crassus', 'Cicero', 'Caesar'];
  
  const randomName = `${firstNames[Math.floor(Math.random() * firstNames.length)]} ${
    familyNames[Math.floor(Math.random() * familyNames.length)]} ${
    cognomens[Math.floor(Math.random() * cognomens.length)]}`;
  
  const experience = 5 + Math.floor(Math.random() * 25);
  const quality = 60 + Math.floor(Math.random() * 30);
  
  const specialtiesMap: Record<string, string[]> = {
    military: ['Tactique de légion', 'Combat à l\'épée', 'Stratégie navale', 'Commandement de cavalerie'],
    rhetoric: ['Éloquence politique', 'Argumentation juridique', 'Art oratoire', 'Composition littéraire'],
    religious: ['Rituel pontifical', 'Interprétation des augures', 'Liturgie romaine', 'Culte de Vesta'],
    academic: ['Philosophie grecque', 'Mathématiques', 'Histoire romaine', 'Littérature'],
    political: ['Droit romain', 'Administration provinciale', 'Diplomatie', 'Finances publiques']
  };
  
  const getRandomSpecialties = () => {
    const availableSpecialties = specialtiesMap[specialty] || [];
    const count = 1 + Math.floor(Math.random() * 2); // 1 or 2 specialties
    const result = [];
    
    for (let i = 0; i < count && i < availableSpecialties.length; i++) {
      const randomIndex = Math.floor(Math.random() * availableSpecialties.length);
      result.push(availableSpecialties[randomIndex]);
      availableSpecialties.splice(randomIndex, 1); // Remove to avoid duplicates
    }
    
    return result;
  };
  
  return {
    id: uuidv4(),
    name: randomName,
    specialty: specialty as any,
    price: 3000 + Math.floor(Math.random() * 7000),
    experience,
    quality,
    expertise: quality,
    specialties: getRandomSpecialties(),
    description: `Précepteur avec ${experience} ans d'expérience dans l'enseignement.`,
    status: 'available',
    background: 'Formation traditionnelle romaine',
    teachingStyle: 'Adapté à l\'élève'
  };
};
