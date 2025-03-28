
import { EducationPath } from '../../types/educationTypes';

export const religiousPath: EducationPath = {
  id: 'religious',
  name: 'Éducation Religieuse',
  type: 'religious',
  description: 'Formation aux rites, cérémonies et traditions religieuses romaines',
  minAge: 10,
  maxAge: 18,
  duration: 4,
  cost: 2500,
  relatedStat: 'piety',
  outcomes: {
    skills: ['Rituels', 'Auspices', 'Présages', 'Traditions'],
    bonuses: {
      piety: 35,
      popularity: 10
    }
  },
  suitableFor: ['male', 'female'],
  
  // Add missing required properties
  benefits: [
    'Faveur des dieux',
    'Respect de la communauté',
    'Accès aux positions religieuses'
  ],
  statBoost: 'piety',
  icon: '🏺',
  specialties: ['Rituels', 'Auspices', 'Présages', 'Traditions'],
  requirements: {
    age: 10,
    gender: 'both'
  }
};
