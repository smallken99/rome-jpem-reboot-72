
import { EducationPath } from '../../types/educationTypes';

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
  requiredAttributes: {
    wisdom: 7,
    charisma: 5
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
  cost: 4500,
  suitableFor: {
    gender: 'both',
    status: ['patricien', 'plébéien']
  }
};
