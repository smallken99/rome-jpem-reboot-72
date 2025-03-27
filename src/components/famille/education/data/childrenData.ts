
import { Child } from '../types/educationTypes';

export const childrenData: Child[] = [
  {
    id: 'child-1',
    name: 'Marcus Aurelius',
    age: 14,
    gender: 'male',
    status: 'Studying',
    educationType: 'military',
    progress: 65,
    specialties: ['Tactics', 'Combat'],
    traits: ['Ambitious', 'Disciplined'],
    currentEducation: {
      type: 'military',
      mentor: 'Centurion Maximus',
      skills: ['Swordsmanship', 'Cavalry Tactics', 'Command'],
      progress: 65,
      yearsCompleted: 2,
      totalYears: 4,
      statBonus: 15
    }
  },
  {
    id: 'child-2',
    name: 'Livia Aurelia',
    age: 12,
    gender: 'female',
    status: 'Studying',
    educationType: 'rhetoric',
    progress: 45,
    specialties: ['Public Speaking', 'Persuasion'],
    traits: ['Eloquent', 'Patient'],
    currentEducation: {
      type: 'rhetoric',
      mentor: 'Tullius Cicero',
      skills: ['Oration', 'Debate', 'Writing'],
      progress: 45,
      yearsCompleted: 1,
      totalYears: 3,
      statBonus: 10
    }
  },
  {
    id: 'child-3',
    name: 'Gaius Brutus',
    age: 10,
    gender: 'male',
    status: 'Undecided',
    educationType: 'none',
    progress: 0,
    specialties: [],
    traits: ['Curious', 'Energetic'],
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
