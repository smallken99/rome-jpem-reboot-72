
import { EducationPath } from '../types/educationTypes';
import { 
  BookOpen, 
  Sword, 
  Landmark, 
  Scale, 
  MessageCircle, 
  HeartHandshake,
  GraduationCap,
  Award
} from 'lucide-react';

// Types d'éducation disponibles
export const educationPaths: EducationPath[] = [
  {
    id: 'political',
    name: 'Éducation Politique',
    description: 'Formation à l\'art de la politique romaine',
    benefits: [
      'Compréhension des institutions romaines',
      'Connaissance des procédures législatives',
      'Développement des relations politiques'
    ],
    duration: 2,
    requirements: {
      age: 10,
      gender: 'male',
      cost: 5000,
      duration: '2 ans'
    },
    outcomes: {
      skills: [
        'Capacité à briguer des postes électoraux',
        'Réseau de contacts politiques',
        'Amélioration de l\'Éloquence et de la Popularité'
      ],
      bonuses: {
        oratory: 15,
        popularity: 10
      }
    },
    specialties: [
      'Procédures sénatoriales',
      'Droit romain',
      'Éloquence civique',
      'Histoire politique'
    ],
    relatedStat: 'popularity'
  },
  {
    id: 'rhetoric',
    name: 'Éducation Rhétorique',
    description: 'Maîtrise de l\'art oratoire, essentiel pour la vie publique',
    benefits: [
      'Éloquence publique',
      'Capacité de persuasion',
      'Construction d\'arguments logiques'
    ],
    duration: 3,
    requirements: {
      age: 8,
      gender: 'both',
      cost: 4000,
      duration: '3 ans'
    },
    outcomes: {
      skills: [
        'Capacité à prononcer des discours convaincants',
        'Amélioration significative de l\'Éloquence',
        'Compétence en négociation'
      ],
      bonuses: {
        oratory: 20,
        influence: 10
      }
    },
    specialties: [
      'Rhétorique grecque',
      'Débat public',
      'Composition littéraire',
      'Art de la mémoire'
    ],
    relatedStat: 'oratory'
  },
  {
    id: 'military',
    name: 'Éducation Militaire',
    description: 'Formation aux arts de la guerre et au commandement',
    benefits: [
      'Compétences tactiques et stratégiques',
      'Discipline physique et mentale',
      'Connaissance des armes et formations'
    ],
    duration: 2,
    requirements: {
      age: 12,
      gender: 'male',
      cost: 3500,
      duration: '2 ans'
    },
    outcomes: {
      skills: [
        'Préparation au service militaire',
        'Capacité à commander des troupes',
        'Amélioration de l\'Éducation Martiale'
      ],
      bonuses: {
        martialEducation: 25,
        leadership: 10
      }
    },
    specialties: [
      'Tactique légionnaire',
      'Équitation militaire',
      'Fortifications',
      'Navigation militaire'
    ],
    relatedStat: 'martialEducation'
  },
  {
    id: 'religious',
    name: 'Éducation Religieuse',
    description: 'Étude des cultes et rituels romains',
    benefits: [
      'Connaissance des rites et cérémonies',
      'Compréhension des présages et augures',
      'Maîtrise du calendrier religieux'
    ],
    duration: 3,
    requirements: {
      age: 8,
      gender: 'both',
      cost: 4500,
      duration: '3 ans'
    },
    outcomes: {
      skills: [
        'Capacité à interpréter les présages',
        'Possibilité d\'accéder aux collèges sacerdotaux',
        'Amélioration de la Piété'
      ],
      bonuses: {
        piety: 20,
        influence: 5
      }
    },
    specialties: [
      'Divination',
      'Rituels sacrificiels',
      'Cultes familiaux',
      'Mystères étrusques'
    ],
    relatedStat: 'piety'
  },
  {
    id: 'philosophical',
    name: 'Éducation Philosophique',
    description: 'Étude des grandes écoles philosophiques grecques et romaines',
    benefits: [
      'Sagesse et connaissance',
      'Raisonnement logique',
      'Compréhension de l\'éthique'
    ],
    duration: 4,
    requirements: {
      age: 14,
      gender: 'both',
      cost: 6000,
      duration: '4 ans'
    },
    outcomes: {
      skills: [
        'Capacité d\'analyse et de réflexion',
        'Amélioration de la Sagesse',
        'Respect des pairs intellectuels'
      ],
      bonuses: {
        intelligence: 25,
        oratory: 5
      }
    },
    specialties: [
      'Stoïcisme',
      'Épicurisme',
      'Académie platonicienne',
      'Scepticisme'
    ],
    relatedStat: 'intelligence'
  },
  {
    id: 'diplomatic',
    name: 'Éducation Diplomatique',
    description: 'Formation aux relations internationales et à la négociation',
    benefits: [
      'Art de la négociation',
      'Connaissance des cultures étrangères',
      'Maîtrise des langues'
    ],
    duration: 3,
    requirements: {
      age: 12,
      gender: 'both',
      cost: 5500,
      duration: '3 ans'
    },
    outcomes: {
      skills: [
        'Préparation aux missions diplomatiques',
        'Capacité à négocier des traités',
        'Amélioration de l\'Influence'
      ],
      bonuses: {
        influence: 20,
        oratory: 10
      }
    },
    specialties: [
      'Protocole diplomatique',
      'Langues étrangères',
      'Géographie politique',
      'Histoire des relations étrangères'
    ],
    relatedStat: 'influence'
  },
  {
    id: 'administrative',
    name: 'Éducation Administrative',
    description: 'Formation à la gestion publique et aux finances',
    benefits: [
      'Compétences en gestion financière',
      'Connaissance des procédures administratives',
      'Maîtrise du droit fiscal'
    ],
    duration: 2,
    requirements: {
      age: 14,
      gender: 'male',
      cost: 4000,
      duration: '2 ans'
    },
    outcomes: {
      skills: [
        'Capacité à gérer les finances publiques',
        'Expertise en taxation et trésorerie',
        'Amélioration de l\'Intelligence'
      ],
      bonuses: {
        intelligence: 15,
        popularity: 5
      }
    },
    specialties: [
      'Comptabilité publique',
      'Réglementation commerciale',
      'Administration provinciale',
      'Gestion des travaux publics'
    ],
    relatedStat: 'intelligence'
  },
  {
    id: 'leadership',
    name: 'Éducation au Leadership',
    description: 'Formation aux qualités de meneur et de commandement',
    benefits: [
      'Art de commander et d\'inspirer',
      'Gestion des groupes et des conflits',
      'Prise de décision'
    ],
    duration: 2,
    requirements: {
      age: 15,
      gender: 'male',
      cost: 6000,
      duration: '2 ans'
    },
    outcomes: {
      skills: [
        'Capacité à diriger des équipes',
        'Respect et loyauté des subordonnés',
        'Amélioration du Leadership'
      ],
      bonuses: {
        leadership: 20,
        martialEducation: 5
      }
    },
    specialties: [
      'Commandement civil',
      'Autorité et charisme',
      'Résolution de conflits',
      'Planification stratégique'
    ],
    relatedStat: 'leadership'
  }
];

// Fonction utilitaire pour obtenir un chemin d'éducation par ID
export const getEducationPathById = (id: string) => {
  return educationPaths.find(path => path.id === id);
};

// Fonction utilitaire pour obtenir la liste des spécialités d'un chemin d'éducation
export const getSpecialtiesByPath = (pathId: string): string[] => {
  const path = getEducationPathById(pathId);
  return path && path.specialties ? path.specialties : [];
};
