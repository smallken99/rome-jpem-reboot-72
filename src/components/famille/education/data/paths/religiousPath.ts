
import { EducationPath } from '../../types/educationTypes';
import { v4 as uuidv4 } from 'uuid';

export const religiousEducationPath: EducationPath = {
  id: uuidv4(),
  name: 'Éducation Religieuse',
  description: 'Étude des rites, traditions et obligations religieuses romaines pour servir les dieux.',
  minAge: 8,
  maxAge: 16,
  duration: 3,
  relatedStat: 'piety',
  suitableFor: { gender: 'both' },
  outcomes: { piety: 10, popularity: 5 },
  skills: [
    'Rituels sacrés',
    'Interprétation des augures',
    'Connaissances des divinités',
    'Liturgie romaine',
    'Histoire religieuse'
  ],
  specialties: [
    'Pontificat',
    'Divination',
    'Vestales (femmes)',
    'Ritualisme'
  ]
};
