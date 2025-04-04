
import { EducationPath } from '../../types/educationTypes';
import { v4 as uuidv4 } from 'uuid';

export const militaryEducationPath: EducationPath = {
  id: uuidv4(),
  name: 'Éducation Militaire',
  description: 'Formation aux tactiques militaires et au commandement des légions romaines.',
  minAge: 12,
  maxAge: 18,
  duration: 3,
  relatedStat: 'martial',
  suitableFor: ['male'],
  outcomes: { martialEducation: 10, oratory: 3 },
  skills: [
    'Tactique de combat',
    'Stratégie militaire',
    'Maniement des armes',
    'Équitation de guerre',
    'Commandement'
  ],
  specialties: [
    'Commandement de légion',
    'Cavalerie d\'élite',
    'Génie militaire',
    'Artillerie'
  ]
};
