
import { EducationPath } from '../../types/educationTypes';
import { v4 as uuidv4 } from 'uuid';

export const academicEducationPath: EducationPath = {
  id: uuidv4(),
  name: 'Éducation Académique',
  description: "Formation aux sciences, à la philosophie et aux arts libéraux tels qu'enseignés dans les académies grecques.",
  minAge: 10,
  maxAge: 20,
  duration: 4,
  relatedStat: 'intelligence',
  suitableFor: ['male', 'female'],
  outcomes: { intelligence: 10, oratory: 5 },
  skills: [
    'Mathématiques',
    'Astronomie',
    'Sciences naturelles',
    'Philosophie',
    'Littérature grecque'
  ],
  specialties: [
    'Académie',
    'Médecine',
    'Architecture',
    'Droit'
  ]
};

// Export for paths/index.ts compatibility
export const academicPath = academicEducationPath;
