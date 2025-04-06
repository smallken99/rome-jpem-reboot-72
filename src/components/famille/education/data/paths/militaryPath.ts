
import { EducationPath } from '../../types/educationTypes';
import { v4 as uuidv4 } from 'uuid';

export const militaryEducationPath: EducationPath = {
  id: uuidv4(),
  name: 'Éducation Militaire',
  description: 'Formation aux arts de la guerre, à la stratégie, et au commandement nécessaires pour servir dans les légions romaines.',
  minAge: 12,
  maxAge: 20,
  duration: 3,
  relatedStat: 'martial',
  suitableFor: ['male'], // Uniquement pour les garçons dans la Rome antique
  outcomes: { martial: 10, leadership: 5 },
  skills: [
    'Combat rapproché',
    'Tactiques de légion',
    'Commandement',
    'Fortification',
    'Logistique militaire'
  ],
  specialties: [
    'Cavalerie',
    'Infanterie',
    'Siège',
    'Stratégie navale'
  ]
};

// Export for paths/index.ts compatibility
export const militaryPath = militaryEducationPath;
