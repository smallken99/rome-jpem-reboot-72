
import { EducationType, Preceptor } from '../types/educationTypes';
import { v4 as uuidv4 } from 'uuid';

// Liste des précepteurs disponibles
const preceptors: Preceptor[] = [
  {
    id: uuidv4(),
    name: 'Marcus Cornelius',
    specialty: 'rhetoric',
    specialization: 'rhetoric',
    speciality: 'rhetoric',
    specialties: ['Discours politique', 'Plaidoirie'],
    expertise: 85,
    experience: 12,
    cost: 5000,
    price: 5000,
    available: true,
    skill: 85,
    quality: 4,
    description: 'Ancien avocat renommé, maintenant précepteur d\'élite',
    status: 'available',
    childId: undefined,
    assigned: false,
    traits: ['Éloquent', 'Patient'],
    background: 'Ancien avocat du forum',
    reputation: 80,
    teachingStyle: 'Socratique'
  },
  {
    id: uuidv4(),
    name: 'Publius Decius',
    specialty: 'military',
    specialization: 'military',
    speciality: 'military',
    specialties: ['Tactique', 'Stratégie'],
    expertise: 90,
    experience: 20,
    cost: 7000,
    price: 7000,
    available: true,
    skill: 90,
    quality: 5,
    description: 'Ancien centurion de la légion romaine',
    status: 'available',
    childId: undefined,
    assigned: false,
    traits: ['Discipliné', 'Rigoureux'],
    background: 'Vétéran des campagnes gauloises',
    reputation: 85,
    teachingStyle: 'Autoritaire'
  },
  {
    id: uuidv4(),
    name: 'Quintus Fabius',
    specialty: 'religious',
    specialization: 'religious',
    speciality: 'religious',
    specialties: ['Rites', 'Augures'],
    expertise: 75,
    experience: 15,
    cost: 4500,
    price: 4500,
    available: true,
    skill: 75,
    quality: 4,
    description: 'Ancien prêtre du temple de Jupiter',
    status: 'available',
    childId: undefined,
    assigned: false,
    traits: ['Pieux', 'Scrupuleux'],
    background: 'Serviteur des dieux depuis sa jeunesse',
    reputation: 70,
    teachingStyle: 'Traditionnel'
  }
];

// Fonctions d'accès aux précepteurs
export const getAllPreceptors = (): Preceptor[] => preceptors;

export const getPreceptorById = (id: string): Preceptor | undefined => {
  return preceptors.find(p => p.id === id);
};

export const getPreceptorsByType = (type: EducationType): Preceptor[] => {
  return preceptors.filter(p => p.specialty === type || p.specialization === type);
};

// Alias pour la compatibilité
export const getPreceptorsForType = getPreceptorsByType;

export default preceptors;
