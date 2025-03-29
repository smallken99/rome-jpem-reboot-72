
// We need to update all preceptor objects to include the required properties
import { Preceptor } from '../types/educationTypes';

// Military preceptors
const militaryPreceptors: Preceptor[] = [
  {
    id: 'mil-1',
    name: 'Quintus Fabius',
    specialization: 'military',
    specialty: 'military',
    skill: 80,
    price: 4500,
    experience: 15,
    status: 'available',
    portrait: '/assets/preceptors/military-1.jpg',
    background: 'Vétéran des guerres puniques et ancien tribun militaire',
    quality: 80,
    reputation: 80,
    cost: 4500,
    available: true,
    speciality: 'military',
    specialties: ['military', 'strategy'],
    traits: ['Vétéran', 'Discipliné'],
    expertise: 80,
    description: 'Un vétéran aguerri qui a servi dans de nombreuses campagnes et peut enseigner toutes les tactiques militaires romaines.',
    teachingStyle: 'Formation rigoureuse et discipline stricte'
  },
  {
    id: 'mil-2',
    name: 'Lucius Aemilius',
    specialization: 'military',
    specialty: 'military',
    skill: 70,
    price: 3500,
    experience: 12,
    status: 'available',
    portrait: '/assets/preceptors/military-2.jpg',
    background: 'Ancien centurion des légions de César',
    quality: 70,
    reputation: 70,
    cost: 3500,
    available: true,
    speciality: 'military',
    specialties: ['military', 'discipline'],
    traits: ['Tacticien', 'Autoritaire'],
    expertise: 70,
    description: 'Spécialiste du commandement de petites unités et de l\'entraînement de nouvelles recrues.',
    teachingStyle: 'Enseignement par l\'exemple et exercices pratiques'
  },
  {
    id: 'mil-3',
    name: 'Gnaeus Pompeius',
    specialization: 'military',
    specialty: 'military',
    skill: 60,
    price: 2500,
    experience: 8,
    status: 'available',
    portrait: '/assets/preceptors/military-3.jpg',
    background: 'Jeune instructeur militaire issu d\'une famille équestre',
    quality: 60,
    reputation: 60,
    cost: 2500,
    available: true,
    speciality: 'military',
    specialties: ['military', 'endurance'],
    traits: ['Endurant', 'Rigoureux'],
    expertise: 60,
    description: 'Jeune mais talentueux formateur spécialisé dans le développement physique et l\'endurance.',
    teachingStyle: 'Entraînement physique intensif et théorie militaire'
  }
];

// Religious preceptors
const religiousPreceptors: Preceptor[] = [
  {
    id: 'rel-1',
    name: 'Publius Cornelius',
    specialization: 'religious',
    specialty: 'religious',
    skill: 85,
    price: 5000,
    experience: 18,
    status: 'available',
    portrait: '/assets/preceptors/religious-1.jpg',
    background: 'Ancien Grand Pontife et gardien des traditions religieuses',
    quality: 85,
    reputation: 85,
    cost: 5000,
    available: true,
    speciality: 'religious',
    specialties: ['religious', 'traditions'],
    traits: ['Pieux', 'Érudit'],
    expertise: 85,
    description: 'Expert dans tous les rites romains et la théologie traditionnelle.',
    teachingStyle: 'Enseignement rigoureux des textes sacrés et pratique quotidienne des rites'
  },
  {
    id: 'rel-2',
    name: 'Titus Sempronius',
    specialization: 'religious',
    specialty: 'religious',
    skill: 75,
    price: 3800,
    experience: 14,
    status: 'available',
    portrait: '/assets/preceptors/religious-2.jpg',
    background: 'Augure respecté connaissant les présages et les rituels',
    quality: 75,
    reputation: 75,
    cost: 3800,
    available: true,
    speciality: 'religious',
    specialties: ['religious', 'rituals'],
    traits: ['Observateur', 'Mystique'],
    expertise: 75,
    description: 'Spécialiste de l\'interprétation des signes et des présages divins.',
    teachingStyle: 'Observation et interprétation des signes divins'
  },
  {
    id: 'rel-3',
    name: 'Marcus Valerius',
    specialization: 'religious',
    specialty: 'religious',
    skill: 60,
    price: 2700,
    experience: 9,
    status: 'available',
    portrait: '/assets/preceptors/religious-2.jpg',
    background: 'Prêtre des cultes étrusques et expert en purifications',
    quality: 60,
    reputation: 60,
    cost: 2700,
    available: true,
    speciality: 'religious',
    specialties: ['religious', 'ceremonies'],
    traits: ['Traditionaliste', 'Patient'],
    expertise: 60,
    description: 'Conservateur des traditions étrusques et expert en purifications rituelles.',
    teachingStyle: 'Apprentissage par immersion dans les cérémonies'
  }
];

// Rhetoric preceptors
const rhetoricPreceptors: Preceptor[] = [
  {
    id: 'rhe-1',
    name: 'Marcus Tullius',
    specialization: 'rhetoric',
    specialty: 'rhetoric',
    skill: 90,
    price: 6000,
    experience: 20,
    status: 'available',
    portrait: '/assets/preceptors/rhetoric-1.jpg',
    background: 'Ancien consul et orateur de renom, maître en éloquence',
    quality: 90,
    reputation: 90,
    cost: 6000,
    available: true,
    speciality: 'rhetoric',
    specialties: ['rhetoric', 'eloquence'],
    traits: ['Éloquent', 'Charismatique'],
    expertise: 90,
    description: 'L\'un des plus grands orateurs de Rome, connu pour sa maîtrise de tous les aspects de la rhétorique.',
    teachingStyle: 'Méthode combinant théorie et pratique intensive des discours'
  },
  {
    id: 'rhe-2',
    name: 'Gaius Julius',
    specialization: 'rhetoric',
    specialty: 'rhetoric',
    skill: 80,
    price: 4200,
    experience: 15,
    status: 'available',
    portrait: '/assets/preceptors/rhetoric-2.jpg',
    background: 'Philosophe grec ayant enseigné l\'art oratoire à Athènes',
    quality: 80,
    reputation: 80,
    cost: 4200,
    available: true,
    speciality: 'rhetoric',
    specialties: ['rhetoric', 'persuasion'],
    traits: ['Philosophe', 'Logique'],
    expertise: 80,
    description: 'Formé dans les écoles grecques, il apporte une approche philosophique à l\'enseignement de la rhétorique.',
    teachingStyle: 'Méthode socratique et analyse des grands discours'
  },
  {
    id: 'rhe-3',
    name: 'Servius Sulpicius',
    specialization: 'rhetoric',
    specialty: 'rhetoric',
    skill: 65,
    price: 3000,
    experience: 10,
    status: 'available',
    portrait: '/assets/preceptors/rhetoric-3.jpg',
    background: 'Juriste et tuteur spécialisé dans la plaidoirie',
    quality: 65,
    reputation: 65,
    cost: 3000,
    available: true,
    speciality: 'rhetoric',
    specialties: ['rhetoric', 'law'],
    traits: ['Méthodique', 'Précis'],
    expertise: 65,
    description: 'Spécialiste de l\'éloquence judiciaire et de l\'argumentation légale.',
    teachingStyle: 'Études de cas et simulations de plaidoiries'
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
