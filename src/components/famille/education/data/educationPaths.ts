
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
    icon: Scale,
    benefits: [
      'Compréhension des institutions romaines',
      'Connaissance des procédures législatives',
      'Développement des relations politiques'
    ],
    requirements: {
      age: 10,
      gender: 'male',
      cost: 5000,
      duration: '2 ans'
    },
    outcomes: [
      'Capacité à briguer des postes électoraux',
      'Réseau de contacts politiques',
      'Amélioration de l\'Éloquence et de la Popularité'
    ],
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
    icon: MessageCircle,
    benefits: [
      'Éloquence publique',
      'Capacité de persuasion',
      'Construction d\'arguments logiques'
    ],
    requirements: {
      age: 8,
      gender: 'both',
      cost: 4000,
      duration: '3 ans'
    },
    outcomes: [
      'Capacité à prononcer des discours convaincants',
      'Amélioration significative de l\'Éloquence',
      'Compétence en négociation'
    ],
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
    icon: Sword,
    benefits: [
      'Compétences tactiques et stratégiques',
      'Discipline physique et mentale',
      'Connaissance des armes et formations'
    ],
    requirements: {
      age: 12,
      gender: 'male',
      cost: 3500,
      duration: '2 ans'
    },
    outcomes: [
      'Préparation au service militaire',
      'Capacité à commander des troupes',
      'Amélioration de l\'Éducation Martiale'
    ],
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
    icon: Landmark,
    benefits: [
      'Connaissance des rites et cérémonies',
      'Compréhension des présages et augures',
      'Maîtrise du calendrier religieux'
    ],
    requirements: {
      age: 8,
      gender: 'both',
      cost: 4500,
      duration: '3 ans'
    },
    outcomes: [
      'Capacité à interpréter les présages',
      'Possibilité d\'accéder aux collèges sacerdotaux',
      'Amélioration de la Piété'
    ],
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
    icon: BookOpen,
    benefits: [
      'Sagesse et connaissance',
      'Raisonnement logique',
      'Compréhension de l\'éthique'
    ],
    requirements: {
      age: 14,
      gender: 'both',
      cost: 6000,
      duration: '4 ans'
    },
    outcomes: [
      'Capacité d\'analyse et de réflexion',
      'Amélioration de la Sagesse',
      'Respect des pairs intellectuels'
    ],
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
    icon: HeartHandshake,
    benefits: [
      'Art de la négociation',
      'Connaissance des cultures étrangères',
      'Maîtrise des langues'
    ],
    requirements: {
      age: 12,
      gender: 'both',
      cost: 5500,
      duration: '3 ans'
    },
    outcomes: [
      'Préparation aux missions diplomatiques',
      'Capacité à négocier des traités',
      'Amélioration de l\'Influence'
    ],
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
    icon: GraduationCap,
    benefits: [
      'Compétences en gestion financière',
      'Connaissance des procédures administratives',
      'Maîtrise du droit fiscal'
    ],
    requirements: {
      age: 14,
      gender: 'male',
      cost: 4000,
      duration: '2 ans'
    },
    outcomes: [
      'Capacité à gérer les finances publiques',
      'Expertise en taxation et trésorerie',
      'Amélioration de l\'Intelligence'
    ],
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
    icon: Award,
    benefits: [
      'Art de commander et d\'inspirer',
      'Gestion des groupes et des conflits',
      'Prise de décision'
    ],
    requirements: {
      age: 15,
      gender: 'male',
      cost: 6000,
      duration: '2 ans'
    },
    outcomes: [
      'Capacité à diriger des équipes',
      'Respect et loyauté des subordonnés',
      'Amélioration du Leadership'
    ],
    specialties: [
      'Commandement civil',
      'Autorité et charisme',
      'Résolution de conflits',
      'Planification stratégique'
    ],
    relatedStat: 'leadership'
  }
];
