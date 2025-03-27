
import { EducationType } from '../types/educationTypes';

export interface EducationPath {
  id: string;
  name: string;
  type: EducationType;
  description: string;
  duration: number;
  minAge: number;
  maxAge: number;
  genderRestriction?: 'male' | 'female';
  requirements?: string[];
  relatedStat?: string;
  outcomes: {
    skills: string[];
    bonuses: {
      [key: string]: number;
    };
  };
  careers: string[];
}

const educationPathsList: EducationPath[] = [
  {
    id: 'military',
    name: 'Éducation Militaire',
    type: 'military',
    description: 'Formation aux arts de la guerre et à la stratégie militaire',
    duration: 5,
    minAge: 12,
    maxAge: 18,
    genderRestriction: 'male',
    relatedStat: 'martialEducation',
    outcomes: {
      skills: ['Combat à l\'épée', 'Tactique', 'Commandement'],
      bonuses: {
        martialEducation: 35,
        popularity: 10,
        oratory: 5
      }
    },
    careers: ['Légat', 'Tribun Militaire', 'Centurion']
  },
  {
    id: 'political',
    name: 'Éducation Politique',
    type: 'political',
    description: 'Formation au droit romain et à l\'art oratoire',
    duration: 4,
    minAge: 10,
    maxAge: 20,
    relatedStat: 'oratory',
    outcomes: {
      skills: ['Rhétorique', 'Droit romain', 'Débat'],
      bonuses: {
        oratory: 35,
        popularity: 20,
        piety: 5
      }
    },
    careers: ['Sénateur', 'Avocat', 'Questeur']
  },
  {
    id: 'religious',
    name: 'Éducation Religieuse',
    type: 'religious',
    description: 'Formation aux rites religieux et aux traditions romaines',
    duration: 3,
    minAge: 8,
    maxAge: 20,
    relatedStat: 'piety',
    outcomes: {
      skills: ['Rituels', 'Connaissance des divinités', 'Divination'],
      bonuses: {
        piety: 40,
        popularity: 15,
        oratory: 5
      }
    },
    careers: ['Prêtre', 'Augure', 'Vestale']
  },
  {
    id: 'philosophical',
    name: 'Éducation Philosophique',
    type: 'philosophical',
    description: 'Étude des grands philosophes et de la sagesse antique',
    duration: 4,
    minAge: 12,
    maxAge: 22,
    relatedStat: 'oratory',
    outcomes: {
      skills: ['Logique', 'Éthique', 'Métaphysique'],
      bonuses: {
        oratory: 25,
        piety: 20,
        popularity: 5
      }
    },
    careers: ['Philosophe', 'Tuteur', 'Conseiller']
  },
  {
    id: 'artistic',
    name: 'Éducation Artistique',
    type: 'artistic',
    description: 'Formation aux arts, à la poésie et à la musique',
    duration: 3,
    minAge: 8,
    maxAge: 18,
    relatedStat: 'popularity',
    outcomes: {
      skills: ['Poésie', 'Musique', 'Sculpture'],
      bonuses: {
        popularity: 30,
        oratory: 15,
        piety: 10
      }
    },
    careers: ['Poète', 'Sculpteur', 'Musicien']
  }
];

export const getAllEducationPaths = (): EducationPath[] => {
  return educationPathsList;
};

export const getEducationPathById = (id: string): EducationPath | undefined => {
  return educationPathsList.find(p => p.id === id);
};
