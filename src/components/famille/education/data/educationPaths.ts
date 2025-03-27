
// Education paths data
export interface EducationPath {
  id: string;
  type: string;
  name: string;
  description: string;
  benefits: string[];
  duration: number;
  minAge: number;
  maxAge: number;
  cost: number;
  relatedStat: string;
  statBonus?: number;
  specialties: string[];
  requirements?: any;
  outcomes: {
    skills: string[];
    bonuses: Record<string, number>;
  };
  suitableFor: {
    gender: string;
    status: string[];
  };
}

const educationPaths: EducationPath[] = [
  {
    id: 'military',
    type: 'military',
    name: 'Éducation Militaire',
    description: 'Formation aux arts de la guerre et du commandement',
    benefits: [
      'Capacité à diriger des légions',
      'Compétences en stratégie militaire',
      'Respect des soldats'
    ],
    duration: 4,
    minAge: 12,
    maxAge: 18,
    cost: 5000,
    relatedStat: 'martialEducation',
    statBonus: 15,
    specialties: ['Combat à l\'épée', 'Tactique de bataille', 'Commandement de légion'],
    outcomes: {
      skills: ['Tactique militaire', 'Commandement', 'Discipline'],
      bonuses: {
        martialEducation: 15,
        popularity: 5
      }
    },
    suitableFor: {
      gender: 'male',
      status: ['citizen', 'patrician']
    }
  },
  {
    id: 'rhetoric',
    type: 'rhetoric',
    name: 'Rhétorique et Éloquence',
    description: 'Maîtrise de l\'art de la persuasion et du discours public',
    benefits: [
      'Excellence dans les débats au Sénat',
      'Capacité à persuader les assemblées populaires',
      'Compétences dans les négociations'
    ],
    duration: 3,
    minAge: 10,
    maxAge: 18,
    cost: 4000,
    relatedStat: 'oratory',
    statBonus: 15,
    specialties: ['Discours publics', 'Argumentation juridique', 'Éloquence politique'],
    outcomes: {
      skills: ['Persuasion', 'Débat', 'Composition de discours'],
      bonuses: {
        oratory: 15,
        popularity: 8
      }
    },
    suitableFor: {
      gender: 'both',
      status: ['citizen', 'patrician']
    }
  },
  {
    id: 'religious',
    type: 'religious',
    name: 'Éducation Religieuse',
    description: 'Formation aux traditions sacrées et aux rites religieux romains',
    benefits: [
      'Connaissance des rites et cérémonies',
      'Interprétation des présages',
      'Respect du clergé'
    ],
    duration: 3,
    minAge: 8,
    maxAge: 16,
    cost: 3000,
    relatedStat: 'piety',
    statBonus: 20,
    specialties: ['Rites et cérémonies', 'Divination', 'Connaissance des cultes'],
    outcomes: {
      skills: ['Rituel religieux', 'Divination', 'Connaissance théologique'],
      bonuses: {
        piety: 20,
        popularity: 3
      }
    },
    suitableFor: {
      gender: 'both',
      status: ['citizen', 'patrician']
    }
  }
];

export const getAllEducationPaths = (): EducationPath[] => {
  return educationPaths;
};

export const findEducationPathById = (id: string): EducationPath | undefined => {
  return educationPaths.find(path => path.id === id || path.type === id);
};
