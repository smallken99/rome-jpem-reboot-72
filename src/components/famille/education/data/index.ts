
import { EducationPath } from '../types/educationTypes';

export const educationPaths: EducationPath[] = [
  {
    id: 'rhetoric',
    name: 'Éducation Rhétorique',
    description: 'Formation à l\'art oratoire, indispensable pour une carrière politique',
    benefits: [
      'Maîtrise de l\'éloquence',
      'Influence accrue sur le peuple',
      'Réputation améliorée au Sénat'
    ],
    duration: 2,
    requirements: {
      age: 12,
      gender: ['male', 'female']
    },
    outcomes: {
      skills: ['éloquence', 'persuasion', 'débat'],
      bonuses: {
        eloquence: 40,
        popularite: 20
      }
    }
  },
  {
    id: 'politics',
    name: 'Éducation Politique',
    description: 'Préparation aux rouages du pouvoir et à la gestion de la Cité',
    benefits: [
      'Compréhension des institutions',
      'Réseau de contacts politiques',
      'Aptitude à la négociation'
    ],
    duration: 3,
    requirements: {
      age: 14,
      gender: ['male', 'female']
    },
    outcomes: {
      skills: ['diplomatie', 'administration', 'droit'],
      bonuses: {
        popularite: 30,
        eloquence: 20
      }
    }
  },
  {
    id: 'military',
    name: 'Éducation Martiale',
    description: 'Formation aux arts de la guerre et au commandement militaire',
    benefits: [
      'Compétences de combat',
      'Connaissances tactiques',
      'Respect des légionnaires'
    ],
    duration: 2,
    requirements: {
      age: 13,
      gender: ['male'] // Restricted to males in Roman society
    },
    outcomes: {
      skills: ['stratégie', 'combat', 'leadership'],
      bonuses: {
        combat: 40,
        leadership: 30
      }
    }
  },
  {
    id: 'religious',
    name: 'Éducation Religieuse',
    description: 'Préparation aux devoirs sacrés et à la compréhension des rites',
    benefits: [
      'Profonde connaissance des rituels',
      'Respect des dieux',
      'Influence spirituelle'
    ],
    duration: 2,
    requirements: {
      age: 10,
      gender: ['male', 'female']
    },
    outcomes: {
      skills: ['rituel', 'théologie', 'divination'],
      bonuses: {
        piete: 50,
        popularite: 20
      }
    }
  }
];

export const getEducationPath = (id: string): EducationPath | undefined => {
  return educationPaths.find(path => path.id === id);
};

export const getEducationTypes = (): {value: string, label: string}[] => {
  return [
    { value: 'rhetoric', label: 'Rhétorique' },
    { value: 'politics', label: 'Politique' },
    { value: 'military', label: 'Militaire' },
    { value: 'religious', label: 'Religieuse' }
  ];
};
