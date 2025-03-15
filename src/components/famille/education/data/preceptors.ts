
import { Preceptor } from '../types/educationTypes';

export const preceptorsList: Preceptor[] = [
  {
    id: 'prec-1',
    name: 'Lucius Cornelius',
    specialty: 'rhetoric',
    years: 12, // Changed from experience to years
    rating: 4.7,
    cost: 1200,
    available: true,
    description: 'Ancien orateur du Sénat, spécialiste en rhétorique et argumentation.',
    status: 'available'
  },
  {
    id: 'prec-2',
    name: 'Marcus Porcius',
    specialty: 'military',
    years: 15, // Changed from experience to years
    rating: 4.5,
    cost: 1500,
    available: true,
    description: 'Vétéran des légions, enseigne les tactiques militaires et l\'art de la guerre.',
    status: 'available'
  },
  {
    id: 'prec-3',
    name: 'Publius Vergilius',
    specialty: 'literature',
    years: 8, // Changed from experience to years
    rating: 4.8,
    cost: 1000,
    available: true,
    description: 'Poète et écrivain reconnu, spécialiste en littérature et poésie.',
    status: 'available'
  },
  {
    id: 'prec-4',
    name: 'Titus Lucretius',
    specialty: 'philosophy',
    years: 20, // Changed from experience to years
    rating: 4.9,
    cost: 1800,
    available: true,
    description: 'Philosophe stoïcien expérimenté, formé à Athènes.',
    status: 'available'
  },
  {
    id: 'prec-5',
    name: 'Gaius Sempronius',
    specialty: 'law',
    years: 14, // Changed from experience to years
    rating: 4.6,
    cost: 1400,
    available: true,
    description: 'Juriste réputé, spécialisé dans le droit romain et les procédures légales.',
    status: 'available'
  }
];

// For backward compatibility
export const preceptors = preceptorsList;
