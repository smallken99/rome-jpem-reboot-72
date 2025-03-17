
import { Preceptor } from '../types/educationTypes';

// Précepteurs disponibles par type d'éducation
const militaryPreceptors: Preceptor[] = [
  {
    id: 'mil-1',
    name: 'Quintus Fabius',
    specialty: 'military',
    skill: 80,
    price: 4500,
    status: 'available',
    portrait: '/assets/preceptors/military-1.jpg',
    background: 'Vétéran des guerres puniques et ancien tribun militaire',
    quality: 80,
    reputation: 'excellent',
    cost: 4500,
    available: true,
    speciality: 'military',
    specialties: ['military', 'strategy']
  },
  {
    id: 'mil-2',
    name: 'Lucius Aemilius',
    specialty: 'military',
    skill: 70,
    price: 3500,
    status: 'available',
    portrait: '/assets/preceptors/military-2.jpg',
    background: 'Ancien centurion des légions de César',
    quality: 70,
    reputation: 'bon',
    cost: 3500,
    available: true,
    speciality: 'military',
    specialties: ['military', 'discipline']
  },
  {
    id: 'mil-3',
    name: 'Gnaeus Pompeius',
    specialty: 'military',
    skill: 60,
    price: 2500,
    status: 'available',
    portrait: '/assets/preceptors/military-3.jpg',
    background: 'Jeune instructeur militaire issu d\'une famille équestre',
    quality: 60,
    reputation: 'moyen',
    cost: 2500,
    available: true,
    speciality: 'military',
    specialties: ['military', 'endurance']
  }
];

const religiousPreceptors: Preceptor[] = [
  {
    id: 'rel-1',
    name: 'Publius Cornelius',
    specialty: 'religious',
    skill: 85,
    price: 5000,
    status: 'available',
    portrait: '/assets/preceptors/religious-1.jpg',
    background: 'Ancien Grand Pontife et gardien des traditions religieuses',
    quality: 85,
    reputation: 'excellent',
    cost: 5000,
    available: true,
    speciality: 'religious',
    specialties: ['religious', 'traditions']
  },
  {
    id: 'rel-2',
    name: 'Titus Sempronius',
    specialty: 'religious',
    skill: 75,
    price: 3800,
    status: 'available',
    portrait: '/assets/preceptors/religious-2.jpg',
    background: 'Augure respecté connaissant les présages et les rituels',
    quality: 75,
    reputation: 'bon',
    cost: 3800,
    available: true,
    speciality: 'religious',
    specialties: ['religious', 'rituals']
  },
  {
    id: 'rel-3',
    name: 'Marcus Valerius',
    specialty: 'religious',
    skill: 60,
    price: 2700,
    status: 'available',
    portrait: '/assets/preceptors/religious-3.jpg',
    background: 'Prêtre des cultes étrusques et expert en purifications',
    quality: 60,
    reputation: 'moyen',
    cost: 2700,
    available: true,
    speciality: 'religious',
    specialties: ['religious', 'ceremonies']
  }
];

const rhetoricPreceptors: Preceptor[] = [
  {
    id: 'rhe-1',
    name: 'Marcus Tullius',
    specialty: 'rhetoric',
    skill: 90,
    price: 6000,
    status: 'available',
    portrait: '/assets/preceptors/rhetoric-1.jpg',
    background: 'Ancien consul et orateur de renom, maître en éloquence',
    quality: 90,
    reputation: 'excellent',
    cost: 6000,
    available: true,
    speciality: 'rhetoric',
    specialties: ['rhetoric', 'eloquence']
  },
  {
    id: 'rhe-2',
    name: 'Gaius Julius',
    specialty: 'rhetoric',
    skill: 80,
    price: 4200,
    status: 'available',
    portrait: '/assets/preceptors/rhetoric-2.jpg',
    background: 'Philosophe grec ayant enseigné l\'art oratoire à Athènes',
    quality: 80,
    reputation: 'bon',
    cost: 4200,
    available: true,
    speciality: 'rhetoric',
    specialties: ['rhetoric', 'persuasion']
  },
  {
    id: 'rhe-3',
    name: 'Servius Sulpicius',
    specialty: 'rhetoric',
    skill: 65,
    price: 3000,
    status: 'available',
    portrait: '/assets/preceptors/rhetoric-3.jpg',
    background: 'Juriste et tuteur spécialisé dans la plaidoirie',
    quality: 65,
    reputation: 'moyen',
    cost: 3000,
    available: true,
    speciality: 'rhetoric',
    specialties: ['rhetoric', 'law']
  }
];

const allPreceptors: Preceptor[] = [
  ...militaryPreceptors,
  ...religiousPreceptors,
  ...rhetoricPreceptors
];

// Fonction pour obtenir un précepteur aléatoire par type
const getRandomPreceptor = (type: string): Preceptor | null => {
  const preceptorsByType = type === 'military' 
    ? militaryPreceptors 
    : type === 'religious' 
      ? religiousPreceptors 
      : rhetoricPreceptors;
  
  if (preceptorsByType.length === 0) return null;
  
  const randomIndex = Math.floor(Math.random() * preceptorsByType.length);
  return { ...preceptorsByType[randomIndex] };
};

// Base de données des précepteurs
export const preceptorDatabase = {
  // Obtenir tous les précepteurs
  getPreceptors: (): Preceptor[] => {
    return allPreceptors.map(p => ({ ...p }));
  },
  
  // Obtenir les précepteurs par type
  getPreceptorsByType: (type: string): Preceptor[] => {
    if (type === 'military') {
      return militaryPreceptors.map(p => ({ ...p }));
    } else if (type === 'religious') {
      return religiousPreceptors.map(p => ({ ...p }));
    } else if (type === 'rhetoric') {
      return rhetoricPreceptors.map(p => ({ ...p }));
    }
    return [];
  },
  
  // Obtenir un précepteur aléatoire
  getRandomPreceptor
};
