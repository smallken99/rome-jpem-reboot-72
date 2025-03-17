
import { EducationPath } from '../../types/educationTypes';
import { Heart } from 'lucide-react';

export const religiousPath: EducationPath = {
  id: 'religious',
  type: 'religious',
  name: 'Éducation Religieuse',
  description: 'Étude des cultes et rituels romains',
  benefits: [
    'Connaissance des rites et cérémonies',
    'Interprétation des présages',
    'Influence spirituelle'
  ],
  duration: 3,
  requirements: {
    age: 8,
    gender: 'both',
    cost: 4500,
    duration: '3 ans'
  },
  outcomes: {
    skills: [
      'Rituels sacrés',
      'Divination',
      'Connaissance théologique'
    ],
    bonuses: {
      piety: 25,
      influence: 5
    }
  },
  specialties: [
    'Rituels sacrés',
    'Interprétation des présages',
    'Droit pontifical',
    'Mythologie',
    'Tradition ancestrale',
    'Cérémonies officielles',
    'Culte de Vesta',
    'Mystères d\'Eleusis',
    'Lecture des entrailles'
  ],
  relatedStat: 'piety',
  minAge: 8,
  maxAge: 16,
  cost: 4500
};
