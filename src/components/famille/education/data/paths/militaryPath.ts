
import { EducationPath } from '../../types/educationTypes';

export const militaryPath: EducationPath = {
  id: 'military',
  name: 'Éducation Militaire',
  type: 'military',
  description: 'Formation aux arts de la guerre, tactiques et stratégies militaires',
  minAge: 12,
  maxAge: 20,
  duration: 5,
  cost: 3000,
  relatedStat: 'martialEducation',
  outcomes: {
    skills: ['Commandement', 'Tactique', 'Combat au glaive', 'Stratégie'],
    bonuses: {
      martialEducation: 30,
      oratory: 10
    }
  },
  suitableFor: ['male'],
  
  // Add missing required properties
  benefits: [
    'Carrière dans l\'armée romaine',
    'Respect des soldats',
    'Compétences de leadership'
  ],
  statBoost: 'martialEducation',
  icon: '⚔️',
  specialties: ['Commandement', 'Tactique', 'Combat au glaive', 'Stratégie'],
  requirements: {
    age: 12,
    gender: 'male'
  }
};
