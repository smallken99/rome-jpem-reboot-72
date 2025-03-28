
import { EducationPath } from '../../types/educationTypes';

export const rhetoricPath: EducationPath = {
  id: 'rhetoric',
  name: 'Éducation Rhétorique',
  type: 'rhetoric',
  description: 'Formation à l\'art oratoire, l\'éloquence et la persuasion',
  minAge: 13,
  maxAge: 21,
  duration: 4,
  cost: 3000,
  relatedStat: 'oratory',
  outcomes: {
    skills: ['Éloquence', 'Débat', 'Persuasion', 'Composition'],
    bonuses: {
      oratory: 35,
      popularity: 15
    }
  },
  suitableFor: ['male', 'female'],
  
  // Add missing required properties
  benefits: [
    'Excellence dans l\'art de la parole',
    'Capacité à persuader et influencer',
    'Compétences en débat public'
  ],
  statBoost: 'oratory',
  icon: '📣',
  specialties: ['Éloquence', 'Débat', 'Persuasion', 'Composition'],
  requirements: {
    age: 13,
    gender: 'both'
  }
};
