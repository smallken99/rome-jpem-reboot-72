
import { EducationPath } from '../../types/educationTypes';
import { BookOpen } from 'lucide-react';

export const rhetoricPath: EducationPath = {
  id: 'rhetoric',
  name: 'Éducation Rhétorique',
  description: 'Maîtrise de l\'art oratoire, essentiel pour la vie publique',
  benefits: [
    'Éloquence publique',
    'Capacité de persuasion',
    'Arguments logiques'
  ],
  duration: 3,
  requirements: {
    age: 10,
    gender: 'both',
    cost: 4000,
    duration: '3 ans'
  },
  outcomes: {
    skills: [
      'Art du discours',
      'Débat public',
      'Négociation politique'
    ],
    bonuses: {
      oratory: 25,
      popularity: 10
    }
  },
  specialties: [
    'Rhétorique grecque',
    'Débat public',
    'Composition littéraire',
    'Art de la mémoire',
    'Droit romain',
    'Éloquence civique',
    'Histoire politique',
    'Diplomatie',
    'Grec ancien'
  ],
  relatedStat: 'oratory'
};
