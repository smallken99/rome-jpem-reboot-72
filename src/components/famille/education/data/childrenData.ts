
import { Child } from '../types/educationTypes';

// Mock children data for development and testing
export const children: Child[] = [
  {
    id: 'child-1',
    name: 'Marcus',
    age: 12,
    gender: 'male',
    status: 'child',
    currentEducation: {
      type: 'military',
      mentor: 'Gaius Livius le Sage',
      skills: ['Tactique légionnaire', 'Équitation militaire'],
      progress: 35,
      yearsCompleted: 1,
      totalYears: 2,
      statBonus: 25
    }
  },
  {
    id: 'child-2',
    name: 'Julia',
    age: 10,
    gender: 'female',
    status: 'child',
    currentEducation: {
      type: 'rhetoric',
      mentor: 'Publius Cornelius l\'Érudit',
      skills: ['Rhétorique grecque', 'Composition littéraire'],
      progress: 20,
      yearsCompleted: 0,
      totalYears: 3,
      statBonus: 20
    }
  },
  {
    id: 'child-3',
    name: 'Lucius',
    age: 15,
    gender: 'male',
    status: 'child',
    currentEducation: {
      type: 'none',
      mentor: null,
      skills: [],
      progress: 0,
      yearsCompleted: 0,
      totalYears: 0,
      statBonus: 0
    }
  }
];
