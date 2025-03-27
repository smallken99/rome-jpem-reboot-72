
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
  suitableFor: ['male', 'female']
};
