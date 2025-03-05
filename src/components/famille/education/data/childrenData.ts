
import { Child } from '../types/educationTypes';

// Exemple de données d'enfants avec leur éducation actuelle
export const children: Child[] = [
  {
    id: '1',
    name: 'Titus Tullius',
    age: 15,
    gender: 'male',
    currentEducation: {
      type: 'military',
      mentor: 'Centurion Flavius Aquila',
      speciality: 'Tactique de bataille',
      progress: 65,
      pityBonus: 10, // Piety bonus from religious activities
      skills: ['Tactique de base', 'Maniement du glaive', 'Discipline militaire'],
      yearsCompleted: 1,
      totalYears: 2
    }
  },
  {
    id: '2',
    name: 'Lucia Tullia Minor',
    age: 12,
    gender: 'female',
    currentEducation: {
      type: 'political',
      mentor: 'Sénateur Marcus Porcius',
      speciality: 'Rhétorique avancée',
      progress: 40,
      pityBonus: 5, // Small piety bonus
      skills: ['Rhétorique', 'Histoire romaine', 'Poésie grecque'],
      yearsCompleted: 1,
      totalYears: 2
    }
  },
  {
    id: '3',
    name: 'Quintus Tullius',
    age: 10,
    gender: 'male',
    currentEducation: {
      type: 'none',
      mentor: null,
      progress: 0,
      skills: [],
      yearsCompleted: 0,
      totalYears: 0
    }
  },
];
