
import { EducationPath } from '../types/educationTypes';

export const educationPaths: EducationPath[] = [
  {
    id: 'military',
    type: 'military',
    name: 'Éducation Militaire',
    description: 'Formation aux arts de la guerre et aux stratégies militaires.',
    benefits: [
      'Améliore l\'éducation martiale',
      'Ouvre l\'accès aux carrières militaires',
      'Développe les compétences de commandement'
    ],
    duration: 3,
    minAge: 12,
    maxAge: 18,
    cost: 500,
    relatedStat: 'martialEducation',
    statBonus: 15,
    specialties: ['Tactique', 'Combat rapproché', 'Leadership militaire', 'Stratégie'],
    requirements: {
      age: 12,
      gender: 'male',
      cost: 500,
      duration: '3 ans'
    },
    outcomes: {
      skills: ['Commandement de légion', 'Tactique de siège', 'Combat à l\'épée'],
      bonuses: {
        martialEducation: 15,
        leadership: 10
      }
    },
    suitableFor: {
      gender: 'male',
      status: ['patrician', 'equestrian']
    }
  },
  {
    id: 'rhetoric',
    type: 'rhetoric',
    name: 'Rhétorique',
    description: 'Maîtrise de l\'art oratoire et de la persuasion.',
    benefits: [
      'Améliore l\'éloquence',
      'Développe les compétences de débat',
      'Prépare aux carrières politiques'
    ],
    duration: 3,
    minAge: 12,
    maxAge: 18,
    cost: 450,
    relatedStat: 'oratory',
    statBonus: 15,
    specialties: ['Éloquence', 'Débat politique', 'Droit romain', 'Négociation'],
    requirements: {
      age: 12,
      cost: 450,
      duration: '3 ans'
    },
    outcomes: {
      skills: ['Discours public', 'Argumentaire juridique', 'Négociation politique'],
      bonuses: {
        oratory: 15,
        popularity: 10
      }
    },
    suitableFor: {
      gender: 'both',
      status: ['patrician', 'equestrian', 'plebeian']
    }
  },
  {
    id: 'academic',
    type: 'academic',
    name: 'Académique',
    description: 'Étude des arts, de la philosophie et des sciences.',
    benefits: [
      'Développe l\'érudition',
      'Améliore les connaissances générales',
      'Prépare aux carrières intellectuelles'
    ],
    duration: 3,
    minAge: 12,
    maxAge: 20,
    cost: 400,
    relatedStat: 'oratory',
    statBonus: 10,
    specialties: ['Littérature', 'Philosophie', 'Histoire', 'Mathématiques'],
    requirements: {
      age: 12,
      cost: 400,
      duration: '3 ans'
    },
    outcomes: {
      skills: ['Écriture', 'Philosophie stoïcienne', 'Connaissance historique'],
      bonuses: {
        oratory: 10,
        piety: 5
      }
    },
    suitableFor: {
      gender: 'both',
      status: ['patrician', 'equestrian', 'plebeian']
    }
  },
  {
    id: 'religious',
    type: 'religious',
    name: 'Religieuse',
    description: 'Formation aux rites, traditions et pratiques religieuses romaines.',
    benefits: [
      'Améliore la piété',
      'Développe la connaissance des rites',
      'Prépare aux carrières religieuses'
    ],
    duration: 3,
    minAge: 10,
    maxAge: 18,
    cost: 350,
    relatedStat: 'piety',
    statBonus: 15,
    specialties: ['Rituel', 'Augure', 'Théologie', 'Divination'],
    requirements: {
      age: 10,
      cost: 350,
      duration: '3 ans'
    },
    outcomes: {
      skills: ['Présage divin', 'Rituel sacré', 'Interprétation des augures'],
      bonuses: {
        piety: 15,
        oratory: 5
      }
    },
    suitableFor: {
      gender: 'both',
      status: ['patrician', 'equestrian', 'plebeian']
    }
  },
  {
    id: 'political',
    type: 'political',
    name: 'Politique',
    description: 'Formation aux rouages du système politique romain.',
    benefits: [
      'Améliore la compréhension politique',
      'Développe les réseaux d\'influence',
      'Prépare au cursus honorum'
    ],
    duration: 3,
    minAge: 14,
    maxAge: 20,
    cost: 500,
    relatedStat: 'popularity',
    statBonus: 15,
    specialties: ['Administration', 'Diplomatie', 'Droit public', 'Gouvernance'],
    requirements: {
      age: 14,
      gender: 'male',
      cost: 500,
      duration: '3 ans'
    },
    outcomes: {
      skills: ['Administration publique', 'Négociation diplomatique', 'Droit constitutionnel'],
      bonuses: {
        popularity: 15,
        oratory: 10
      }
    },
    suitableFor: {
      gender: 'male',
      status: ['patrician', 'equestrian']
    }
  }
];

export function getEducationPath(type: string): EducationPath | undefined {
  return educationPaths.find(path => path.type === type);
}

export function getAllEducationPaths(): EducationPath[] {
  return educationPaths;
}

export function getEducationPathById(id: string): EducationPath | undefined {
  return educationPaths.find(path => path.id === id);
}
