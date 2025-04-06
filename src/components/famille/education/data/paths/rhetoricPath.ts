
import { EducationPath } from '../../types/educationTypes';
import { v4 as uuidv4 } from 'uuid';

export const rhetoricEducationPath: EducationPath = {
  id: uuidv4(),
  name: 'Éducation Rhétorique',
  description: "Maîtrise de l'art oratoire, de l'argumentation et de la persuasion, essentiels à la vie politique romaine.",
  minAge: 10,
  maxAge: 20,
  duration: 4,
  relatedStat: 'oratory',
  suitableFor: ['male', 'female'],
  outcomes: { oratory: 10, popularity: 5 },
  skills: [
    'Éloquence',
    'Débat politique',
    'Composition de discours',
    'Argumentation juridique',
    'Techniques de mémorisation'
  ],
  specialties: [
    'Orateur public',
    'Plaidoirie',
    'Politique',
    'Enseignement'
  ]
};

// Export for paths/index.ts compatibility
export const rhetoricPath = rhetoricEducationPath;
