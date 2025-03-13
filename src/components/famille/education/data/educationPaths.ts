
import { EducationPath } from '../types/educationTypes';
import { 
  Sword, 
  BookOpen, 
  Heart,
  Award,
  GraduationCap
} from 'lucide-react';

// Types d'éducation disponibles (limités à 3 principaux)
export const educationPaths: EducationPath[] = [
  {
    id: 'military',
    name: 'Éducation Militaire',
    description: 'Formation aux arts de la guerre et au commandement',
    benefits: [
      'Compétences tactiques et stratégiques',
      'Discipline physique et mentale',
      'Commandement de troupes'
    ],
    duration: 3,
    requirements: {
      age: 12,
      gender: 'male',
      cost: 3500,
      duration: '3 ans'
    },
    outcomes: {
      skills: [
        'Aptitude au combat',
        'Stratégie militaire',
        'Commandement de légion'
      ],
      bonuses: {
        martialEducation: 25,
        leadership: 10
      }
    },
    specialties: [
      'Combat au corps à corps',
      'Stratégie militaire',
      'Commandement',
      'Équitation de guerre',
      'Tactiques légionnaires',
      'Siège et fortifications',
      'Navigation militaire',
      'Archerie',
      'Cavalerie'
    ],
    relatedStat: 'martialEducation'
  },
  {
    id: 'religious',
    name: 'Éducation Religieuse',
    description: 'Étude des cultes et rituels romains',
    benefits: [
      'Connaissance des rites et cérémonies',
      'Interprétation des présages',
      'Influence spirituelle'
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
        'Rituels sacrés',
        'Divination',
        'Connaissance théologique'
      ],
      bonuses: {
        piety: 25,
        influence: 5
      }
    },
    specialties: [
      'Rituels sacrés',
      'Interprétation des présages',
      'Droit pontifical',
      'Mythologie',
      'Tradition ancestrale',
      'Cérémonies officielles',
      'Culte de Vesta',
      'Mystères d\'Eleusis',
      'Lecture des entrailles'
    ],
    relatedStat: 'piety'
  },
  {
    id: 'rhetoric',
    name: 'Éducation Rhétorique',
    description: 'Maîtrise de l\'art oratoire, essentiel pour la vie publique',
    benefits: [
      'Éloquence publique',
      'Capacité de persuasion',
      'Arguments logiques'
    ],
    duration: 3,
    requirements: {
      age: 10,
      gender: 'both',
      cost: 4000,
      duration: '3 ans'
    },
    outcomes: {
      skills: [
        'Art du discours',
        'Débat public',
        'Négociation politique'
      ],
      bonuses: {
        oratory: 25,
        popularity: 10
      }
    },
    specialties: [
      'Rhétorique grecque',
      'Débat public',
      'Composition littéraire',
      'Art de la mémoire',
      'Droit romain',
      'Éloquence civique',
      'Histoire politique',
      'Diplomatie',
      'Grec ancien'
    ],
    relatedStat: 'oratory'
  }
];

// Fonction utilitaire pour obtenir un chemin d'éducation par ID
export const getEducationPathById = (id: string) => {
  return educationPaths.find(path => path.id === id);
};

// Fonction pour obtenir les spécialités en fonction du type d'éducation
export const getSpecialtiesByPath = (educationType: string): string[] => {
  const path = educationPaths.find(path => path.id === educationType);
  if (path && path.specialties && path.specialties.length > 0) {
    return path.specialties;
  }

  // Fallback vers des spécialités par défaut si le chemin n'est pas trouvé
  switch (educationType) {
    case 'military':
    case 'militaire':
      return [
        'Combat au corps à corps',
        'Stratégie militaire',
        'Commandement',
        'Équitation de guerre',
        'Tactiques légionnaires',
        'Siège et fortifications'
      ];
    case 'religious':
    case 'religieuse':
      return [
        'Rituels sacrés',
        'Interprétation des présages',
        'Droit pontifical',
        'Mythologie',
        'Tradition ancestrale',
        'Cérémonies officielles'
      ];
    case 'rhetoric':
    case 'rhetorique':
      return [
        'Rhétorique grecque',
        'Débat public',
        'Composition littéraire',
        'Art de la mémoire',
        'Droit romain',
        'Éloquence civique'
      ];
    default:
      return [];
  }
};
