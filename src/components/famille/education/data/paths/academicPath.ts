
import { EducationPath } from '../../types/educationTypes';

export const academicPath: EducationPath = {
  id: 'academic',
  name: 'Éducation Académique',
  type: 'academic',
  description: 'Formation aux sciences, à la philosophie et aux arts libéraux',
  minAge: 12,
  maxAge: 22,
  duration: 5,
  cost: 3800,
  relatedStat: 'oratory',
  outcomes: {
    skills: ['Philosophie', 'Mathématiques', 'Astronomie', 'Littérature'],
    bonuses: {
      oratory: 25,
      piety: 15,
      popularity: 10
    }
  },
  suitableFor: ['male', 'female'],
  
  // Add missing required properties
  benefits: [
    'Meilleure compréhension du monde',
    'Capacité à débattre sur des sujets complexes',
    'Prestige intellectuel'
  ],
  statBoost: 'oratory',
  icon: '📚',
  specialties: ['Philosophie', 'Mathématiques', 'Astronomie', 'Littérature'],
  requirements: {
    age: 12,
    gender: 'both'
  }
};
