
import { EducationPath } from '../../types/educationTypes';
import { v4 as uuidv4 } from 'uuid';

export const militaryEducationPath: EducationPath = {
  id: uuidv4(),
  name: 'Éducation Militaire',
  description: 'Formation aux arts de la guerre, stratégie militaire et commandement des troupes.',
  minAge: 12,
  maxAge: 22,
  duration: 5,
  relatedStat: 'martial',
  suitableFor: ['male'],
  outcomes: { martial: 10, leadership: 5 },
  skills: [
    'Tactiques de combat',
    'Stratégie militaire',
    'Commandement',
    'Maniement des armes',
    'Équitation de combat'
  ],
  specialties: [
    'Légionnaire',
    'Cavalerie',
    'Stratégie navale',
    'Génie militaire'
  ]
};

// Export for paths/index.ts compatibility
export const militaryPath = militaryEducationPath;
