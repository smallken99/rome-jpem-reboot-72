
import { Preceptor } from '../types/educationTypes';

export const preceptorsList: Preceptor[] = [
  {
    id: 'prec-1',
    name: 'Lucius Cornelius',
    specialty: 'rhetoric',
    specialties: ['rhetoric', 'politics'],
    expertise: 12,
    cost: 1200,
    price: 1200,
    experience: 12,
    available: true,
    description: 'Ancien orateur du Sénat, spécialiste en rhétorique et argumentation.',
    status: 'available',
    skill: 4,
    quality: 4,
    reputation: 85
  },
  {
    id: 'prec-2',
    name: 'Marcus Porcius',
    specialty: 'military',
    specialties: ['military', 'leadership'],
    expertise: 15,
    cost: 1500,
    price: 1500,
    experience: 15,
    available: true,
    description: 'Vétéran des légions, enseigne les tactiques militaires et l\'art de la guerre.',
    status: 'available',
    skill: 5,
    quality: 5,
    reputation: 90
  },
  {
    id: 'prec-3',
    name: 'Publius Vergilius',
    specialty: 'rhetoric',
    specialties: ['rhetoric', 'literature'],
    expertise: 8,
    cost: 1000,
    price: 1000,
    experience: 8,
    available: true,
    description: 'Poète et écrivain reconnu, spécialiste en littérature et poésie.',
    status: 'available',
    skill: 4,
    quality: 4,
    reputation: 82
  },
  {
    id: 'prec-4',
    name: 'Titus Lucretius',
    specialty: 'religious',
    specialties: ['religious', 'philosophy'],
    expertise: 20,
    cost: 1800,
    price: 1800,
    experience: 20,
    available: true,
    description: 'Philosophe stoïcien expérimenté, formé à Athènes.',
    status: 'available',
    skill: 5,
    quality: 5,
    reputation: 88
  },
  {
    id: 'prec-5',
    name: 'Gaius Sempronius',
    specialty: 'rhetoric',
    specialties: ['rhetoric', 'law'],
    expertise: 14,
    cost: 1400,
    price: 1400,
    experience: 14,
    available: true,
    description: 'Juriste réputé, spécialisé dans le droit romain et les procédures légales.',
    status: 'available',
    skill: 4,
    quality: 4,
    reputation: 85
  }
];

// For backward compatibility
export const preceptors = preceptorsList;
