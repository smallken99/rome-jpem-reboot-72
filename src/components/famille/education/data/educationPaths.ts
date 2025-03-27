
import { EducationPath, EducationType } from '../types/educationTypes';

// Education paths data
export const educationPaths: EducationPath[] = [
  {
    id: 'military',
    type: 'military',
    name: 'Éducation Militaire',
    description: 'Formation aux arts de la guerre, à la stratégie militaire et au commandement.',
    benefits: [
      'Aptitude au commandement militaire',
      'Respect des légions',
      'Carrière dans l\'armée'
    ],
    duration: 5,
    minAge: 14,
    maxAge: 25,
    cost: 15000,
    relatedStat: 'martialEducation',
    statBonus: 50,
    specialties: [
      'Tactique de légion',
      'Combat à l\'épée',
      'Stratégie navale',
      'Commandement de cavalerie'
    ],
    requirements: {
      gender: 'male',
      age: 14
    },
    outcomes: {
      skills: [
        'Commandement de légion',
        'Maniement des armes',
        'Tactique militaire'
      ],
      bonuses: {
        martialEducation: 50,
        popularity: 10
      }
    },
    suitableFor: {
      gender: 'male',
      status: ['Patricien', 'Plébéien']
    }
  },
  {
    id: 'rhetoric',
    type: 'rhetoric',
    name: 'Rhétorique',
    description: 'Art de l\'éloquence, de la persuasion et du débat public.',
    benefits: [
      'Excellence dans les débats politiques',
      'Persuasion efficace',
      'Carrière d\'avocat ou de politique'
    ],
    duration: 4,
    minAge: 12,
    maxAge: 25,
    cost: 12000,
    relatedStat: 'oratory',
    statBonus: 50,
    specialties: [
      'Éloquence politique',
      'Argumentation juridique',
      'Art oratoire',
      'Composition littéraire'
    ],
    requirements: {
      age: 12
    },
    outcomes: {
      skills: [
        'Discours persuasif',
        'Débat politique',
        'Composition de plaidoiries'
      ],
      bonuses: {
        oratory: 50,
        popularity: 20
      }
    },
    suitableFor: {
      gender: 'all',
      status: ['Patricien', 'Plébéien']
    }
  },
  {
    id: 'religious',
    type: 'religious',
    name: 'Formation Religieuse',
    description: 'Étude des rituels, des textes sacrés et des pratiques religieuses romaines.',
    benefits: [
      'Respect des institutions religieuses',
      'Connaissance des présages et augures',
      'Carrière dans les collèges sacerdotaux'
    ],
    duration: 3,
    minAge: 10,
    maxAge: 30,
    cost: 10000,
    relatedStat: 'piety',
    statBonus: 50,
    specialties: [
      'Rituel pontifical',
      'Interprétation des augures',
      'Liturgie romaine',
      'Vestales'
    ],
    requirements: {
      age: 10
    },
    outcomes: {
      skills: [
        'Interprétation des présages',
        'Conduite de rituels',
        'Connaissance des divinités'
      ],
      bonuses: {
        piety: 50,
        popularity: 15
      }
    },
    suitableFor: {
      gender: 'all',
      status: ['Patricien', 'Plébéien']
    }
  },
  {
    id: 'academic',
    type: 'academic',
    name: 'Études Académiques',
    description: 'Formation approfondie en philosophie, mathématiques, histoire et littérature.',
    benefits: [
      'Sagesse et culture générale',
      'Respect des intellectuels',
      'Carrière d\'enseignant ou de conseiller'
    ],
    duration: 6,
    minAge: 12,
    maxAge: 25,
    cost: 18000,
    relatedStat: 'oratory',
    statBonus: 40,
    specialties: [
      'Philosophie grecque',
      'Mathématiques',
      'Histoire romaine',
      'Littérature'
    ],
    requirements: {
      age: 12
    },
    outcomes: {
      skills: [
        'Raisonnement philosophique',
        'Érudition historique',
        'Analyse littéraire'
      ],
      bonuses: {
        oratory: 40,
        piety: 10
      }
    },
    suitableFor: {
      gender: 'all',
      status: ['Patricien']
    }
  },
  {
    id: 'political',
    type: 'political',
    name: 'Formation Politique',
    description: 'Apprentissage des rouages de la politique romaine, des institutions et du droit.',
    benefits: [
      'Compréhension des institutions',
      'Réseau politique',
      'Carrière sénatoriale'
    ],
    duration: 5,
    minAge: 16,
    maxAge: 30,
    cost: 20000,
    relatedStat: 'popularity',
    statBonus: 40,
    specialties: [
      'Droit romain',
      'Administration provinciale',
      'Diplomatie',
      'Finances publiques'
    ],
    requirements: {
      age: 16
    },
    outcomes: {
      skills: [
        'Négociation politique',
        'Connaissance juridique',
        'Administration publique'
      ],
      bonuses: {
        popularity: 40,
        oratory: 20
      }
    },
    suitableFor: {
      gender: 'male',
      status: ['Patricien']
    }
  }
];

// Helper function to get an education path by id
export const getEducationPathById = (id: string): EducationPath | undefined => {
  return educationPaths.find(path => path.id === id);
};

// Helper function to get an education path by type
export const getEducationPath = (type: string): EducationPath | undefined => {
  return educationPaths.find(path => path.type === type);
};

// Get all education paths
export const getAllEducationPaths = (): EducationPath[] => {
  return educationPaths;
};

// Helper function to find education path by ID
export const findEducationPathById = (id: string): EducationPath | undefined => {
  return educationPaths.find(path => path.id === id);
};
