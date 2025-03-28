
import { EducationPath } from '../../types/educationTypes';

export const politicalPath: EducationPath = {
  id: 'political',
  name: 'Éducation Politique',
  type: 'political',
  description: 'Formation à la politique romaine, aux lois et à la gouvernance',
  minAge: 14,
  maxAge: 22,
  duration: 4,
  cost: 3500,
  relatedStat: 'oratory',
  outcomes: {
    skills: ['Droit romain', 'Négociation', 'Réseautage', 'Administration'],
    bonuses: {
      oratory: 30,
      popularity: 15
    }
  },
  suitableFor: ['male', 'female'],
  
  // Add missing required properties
  benefits: [
    'Compréhension du système politique',
    'Réseau de contacts influents',
    'Capacité à gouverner'
  ],
  statBoost: 'oratory',
  icon: '🏛️',
  specialties: ['Droit romain', 'Négociation', 'Réseautage', 'Administration'],
  requirements: {
    age: 14,
    gender: 'both'
  }
};
