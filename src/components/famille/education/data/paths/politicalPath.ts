
import { EducationPath } from '../../types/educationTypes';
import { v4 as uuidv4 } from 'uuid';

export const politicalEducationPath: EducationPath = {
  id: uuidv4(),
  name: 'Éducation Politique',
  description: 'Formation aux affaires politiques, à la gouvernance et aux alliances stratégiques.',
  minAge: 14,
  maxAge: 22,
  duration: 3,
  relatedStat: 'politics',
  suitableFor: ['male'],
  outcomes: { oratory: 8, popularity: 7 },
  skills: [
    'Droit romain',
    'Négociation diplomatique',
    'Administration publique',
    'Finance d\'État',
    'Alliance politique'
  ],
  specialties: [
    'Jurisprudence',
    'Administration provinciale',
    'Diplomatie étrangère',
    'Finances publiques'
  ]
};

// Export for paths/index.ts compatibility
export const politicalPath = politicalEducationPath;
