
import { EducationPath } from '../../types/educationTypes';
import { v4 as uuidv4 } from 'uuid';

export const rhetoricEducationPath: EducationPath = {
  id: uuidv4(),
  name: 'Éducation Rhétorique',
  description: 'Formation à l\'art oratoire, la persuasion et l\'éloquence nécessaire au forum et au sénat.',
  minAge: 10,
  maxAge: 20,
  duration: 3,
  relatedStat: 'oratory',
  suitableFor: ['male', 'female'],
  outcomes: { oratory: 10, popularity: 5 },
  skills: [
    'Art oratoire',
    'Persuasion',
    'Éloquence',
    'Débat public',
    'Composition littéraire'
  ],
  specialties: [
    'Plaidoirie judiciaire',
    'Discours politique',
    'Poésie et littérature',
    'Enseignement'
  ]
};
