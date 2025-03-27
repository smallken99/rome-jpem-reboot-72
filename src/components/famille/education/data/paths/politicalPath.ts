
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
  suitableFor: ['male', 'female']
};
