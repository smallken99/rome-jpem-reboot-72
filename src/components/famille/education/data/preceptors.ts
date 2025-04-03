
import { Preceptor, EducationType } from '../types/educationTypes';
import { v4 as uuidv4 } from 'uuid';

// Précepteurs disponibles par défaut
const defaultPreceptors: Preceptor[] = [
  {
    id: uuidv4(),
    name: 'Marcus Aurelius Maximus',
    specialization: 'military',
    skill: 85,
    cost: 2000,
    price: 2000,
    background: 'Ancien centurion des légions romaines',
    traits: ['Discipliné', 'Exigeant', 'Loyal'],
    status: 'available',
    available: true,
    specialty: 'Tactique militaire',
    specialities: ['Tactique militaire', 'Commandement', 'Combat rapproché'],
    speciality: 'Tactique militaire',
    expertise: 85,
    experience: 20,
    quality: 4,
    portrait: '',
    description: 'Instructeur militaire respecté ayant servi sous plusieurs généraux célèbres',
    teachingStyle: 'Rigoureux et pratique',
    reputation: 4,
    specialties: ['Tactique militaire', 'Commandement', 'Combat rapproché']
  },
  {
    id: uuidv4(),
    name: 'Titus Livius Orator',
    specialization: 'rhetoric',
    skill: 90,
    cost: 2500,
    price: 2500,
    background: 'Ancien orateur du forum',
    traits: ['Éloquent', 'Patient', 'Méthodique'],
    status: 'available',
    available: true,
    specialty: 'Art oratoire',
    specialities: ['Art oratoire', 'Composition de discours', 'Débat politique'],
    speciality: 'Art oratoire',
    expertise: 90,
    experience: 25,
    quality: 5,
    portrait: '',
    description: 'Maître de rhétorique ayant formé plusieurs sénateurs influents',
    teachingStyle: 'Encourageant avec critique constructive',
    reputation: 5,
    specialties: ['Art oratoire', 'Composition de discours', 'Débat politique']
  },
  {
    id: uuidv4(),
    name: 'Quintus Hortensius Politicus',
    specialization: 'political',
    skill: 80,
    cost: 2200,
    price: 2200,
    background: 'Ancien conseiller sénatorial',
    traits: ['Rusé', 'Observateur', 'Stratège'],
    status: 'available',
    available: true,
    specialty: 'Intrigues politiques',
    specialities: ['Intrigues politiques', 'Droit romain', 'Négociation'],
    speciality: 'Intrigues politiques',
    expertise: 80,
    experience: 18,
    quality: 4,
    portrait: '',
    description: 'Expert en politique romaine et en négociations diplomatiques',
    teachingStyle: 'Subtil et sophistiqué',
    reputation: 4,
    specialties: ['Intrigues politiques', 'Droit romain', 'Négociation']
  },
  {
    id: uuidv4(),
    name: 'Lucius Cornelius Augur',
    specialization: 'religious',
    skill: 85,
    cost: 2300,
    price: 2300,
    background: 'Ancien augure du temple de Jupiter',
    traits: ['Pieux', 'Spirituel', 'Rigoureux'],
    status: 'available',
    available: true,
    specialty: 'Augures et présages',
    specialities: ['Augures et présages', 'Rituels religieux', 'Théologie romaine'],
    speciality: 'Augures et présages',
    expertise: 85,
    experience: 22,
    quality: 4,
    portrait: '',
    description: 'Spécialiste des traditions religieuses romaines et des augures',
    teachingStyle: 'Solennel et mystique',
    reputation: 4,
    specialties: ['Augures et présages', 'Rituels religieux', 'Théologie romaine']
  },
  {
    id: uuidv4(),
    name: 'Gaius Plinius Philosophus',
    specialization: 'philosophical',
    skill: 95,
    cost: 2800,
    price: 2800,
    background: 'Philosophe stoïcien reconnu',
    traits: ['Sage', 'Contemplatif', 'Logique'],
    status: 'available',
    available: true,
    specialty: 'Philosophie stoïcienne',
    specialities: ['Philosophie stoïcienne', 'Logique', 'Éthique'],
    speciality: 'Philosophie stoïcienne',
    expertise: 95,
    experience: 30,
    quality: 5,
    portrait: '',
    description: 'Érudit dans les différentes écoles philosophiques grecques et romaines',
    teachingStyle: 'Socratique avec questions et dialogues',
    reputation: 5,
    specialties: ['Philosophie stoïcienne', 'Logique', 'Éthique']
  }
];

// Récupérer tous les précepteurs
export const getAllPreceptors = (): Preceptor[] => {
  return [...defaultPreceptors];
};

// Récupérer un précepteur par ID
export const getPreceptorById = (id: string): Preceptor | undefined => {
  return getAllPreceptors().find(p => p.id === id);
};

// Récupérer les précepteurs par type d'éducation
export const getPreceptorsForType = (type: string): Preceptor[] => {
  if (type === 'none') return [];
  
  return getAllPreceptors().filter(p => 
    p.specialization === type && p.status === 'available'
  );
};

// Générer un précepteur aléatoire selon le type d'éducation
export const generateRandomPreceptor = (type: EducationType): Preceptor => {
  const names = [
    'Marcus', 'Gaius', 'Lucius', 'Publius', 'Titus', 'Quintus', 'Decimus',
    'Servius', 'Sextus', 'Aulus', 'Spurius', 'Appius'
  ];
  
  const surnames = [
    'Tullius', 'Cornelius', 'Julius', 'Claudius', 'Valerius', 'Aemilius',
    'Fabius', 'Caecilius', 'Aurelius', 'Livius', 'Domitius', 'Licinius'
  ];
  
  const cognomina = {
    military: ['Bellator', 'Martialis', 'Fortis', 'Militaris', 'Armatus'],
    rhetoric: ['Orator', 'Loquax', 'Eloquens', 'Rhetor', 'Verbosus'],
    political: ['Politicus', 'Senator', 'Civilis', 'Publicus', 'Urbanus'],
    religious: ['Pontifex', 'Augur', 'Flamen', 'Sacer', 'Divinus'],
    philosophical: ['Philosophus', 'Sapiens', 'Stoicus', 'Doctus', 'Eruditus']
  };
  
  const specializations = {
    military: ['Tactique militaire', 'Commandement', 'Combat rapproché', 'Stratégie de siège', 'Logistique'],
    rhetoric: ['Art oratoire', 'Composition de discours', 'Débat politique', 'Persuasion', 'Diction'],
    political: ['Intrigues politiques', 'Droit romain', 'Négociation', 'Administration', 'Diplomatie'],
    religious: ['Augures et présages', 'Rituels religieux', 'Théologie romaine', 'Sacrifices', 'Divination'],
    philosophical: ['Philosophie stoïcienne', 'Logique', 'Éthique', 'Métaphysique', 'Épistémologie']
  };
  
  const randomName = names[Math.floor(Math.random() * names.length)];
  const randomSurname = surnames[Math.floor(Math.random() * surnames.length)];
  const typedCognomina = cognomina[type] || cognomina.philosophical;
  const randomCognomen = typedCognomina[Math.floor(Math.random() * typedCognomina.length)];
  
  const typedSpecializations = specializations[type] || specializations.philosophical;
  const randomSpecialty = typedSpecializations[Math.floor(Math.random() * typedSpecializations.length)];
  
  const skill = Math.floor(Math.random() * 30) + 60; // Entre 60 et 90
  const experience = Math.floor(Math.random() * 20) + 5; // Entre 5 et 25 ans
  
  return {
    id: uuidv4(),
    name: `${randomName} ${randomSurname} ${randomCognomen}`,
    specialization: type,
    skill,
    cost: Math.floor(skill * 25),
    price: Math.floor(skill * 25),
    background: `Précepteur spécialisé en éducation ${type}`,
    traits: ['Éduqué', 'Patient', 'Méthodique'],
    status: 'available',
    available: true,
    specialty: randomSpecialty,
    specialities: [randomSpecialty],
    speciality: randomSpecialty,
    expertise: skill,
    experience,
    quality: Math.ceil(skill / 20),
    portrait: '',
    description: `Précepteur expérimenté dans l'enseignement de ${randomSpecialty}`,
    teachingStyle: 'Adaptatif et pédagogique',
    reputation: Math.ceil(skill / 20),
    specialties: [randomSpecialty]
  };
};
