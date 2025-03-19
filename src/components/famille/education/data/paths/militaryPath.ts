
import { EducationPath } from '../../types/educationTypes';

export const militaryPath: EducationPath = {
  id: 'military',
  type: 'military',
  name: 'Éducation Militaire',
  description: 'Formation aux arts de la guerre et au commandement',
  benefits: [
    'Compétences tactiques et stratégiques',
    'Discipline physique et mentale',
    'Commandement de troupes'
  ],
  duration: 3,
  requiredAttributes: {
    strength: 8,
    endurance: 6
  },
  outcomes: {
    skills: [
      'Aptitude au combat',
      'Stratégie militaire',
      'Commandement de légion'
    ],
    bonuses: {
      martialEducation: 25,
      leadership: 10
    }
  },
  specialties: [
    'Combat au corps à corps',
    'Stratégie militaire',
    'Commandement',
    'Équitation de guerre',
    'Tactiques légionnaires',
    'Siège et fortifications',
    'Navigation militaire',
    'Archerie',
    'Cavalerie'
  ],
  relatedStat: 'martialEducation',
  minAge: 12,
  maxAge: 20,
  cost: 3500,
  suitableFor: {
    gender: 'male',
    status: ['patricien', 'plébéien']
  }
};
