
import { EducationPath } from '../../types/educationTypes';
import { v4 as uuidv4 } from 'uuid';

export const academicEducationPath: EducationPath = {
  id: uuidv4(),
  name: 'Éducation Académique',
  description: 'Une éducation complète et équilibrée couvrant les arts libéraux et scientifiques.',
  minAge: 7,
  maxAge: 20,
  duration: 4,
  relatedStat: 'knowledge',
  suitableFor: { gender: 'both' },
  outcomes: { oratory: 5, piety: 5, popularity: 5 },
  skills: [
    'Littérature grecque et latine',
    'Mathématiques',
    'Histoire romaine',
    'Astronomie',
    'Géographie'
  ],
  specialties: [
    'Recherche scientifique',
    'Enseignement',
    'Documentation historique',
    'Cartographie'
  ]
};
