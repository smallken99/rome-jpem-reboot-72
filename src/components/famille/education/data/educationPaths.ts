
import { EducationPath } from '../types/educationTypes';

export const educationPathsData: Record<string, EducationPath> = {
  'military': {
    name: 'Voie Militaire',
    description: 'Formation aux arts de la guerre et au commandement',
    duration: 3,
    relatedStat: 'martialEducation',
    minAge: 12,
    maxAge: 18,
    suitableFor: ['male'],
    skills: [
      'Tactique de combat',
      'Commandement',
      'Équitation militaire',
      'Maniement des armes',
      'Stratégie de campagne'
    ],
    outcomes: {
      martialEducation: 15,
      popularity: 5
    }
  },
  'rhetoric': {
    name: 'Voie Rhétorique',
    description: "Maîtrise de l'art oratoire et de la persuasion",
    duration: 3,
    relatedStat: 'oratory',
    minAge: 10,
    maxAge: 20,
    suitableFor: { gender: 'both' },
    skills: [
      'Éloquence',
      'Argumentation',
      'Composition de discours',
      'Débat politique',
      'Gestuelle oratoire'
    ],
    outcomes: {
      oratory: 15,
      popularity: 5
    }
  },
  'religious': {
    name: 'Voie Religieuse',
    description: 'Formation aux rituels et traditions religieuses de Rome',
    duration: 3,
    relatedStat: 'piety',
    minAge: 8,
    maxAge: 18,
    suitableFor: { gender: 'both' },
    skills: [
      'Rites sacrificiels',
      'Divination',
      'Connaissance des divinités',
      'Calendrier religieux',
      'Droit pontifical'
    ],
    outcomes: {
      piety: 15,
      popularity: 5
    }
  },
  'political': {
    name: 'Voie Politique',
    description: 'Apprentissage des rouages du Sénat et des institutions',
    duration: 3,
    relatedStat: 'popularity',
    minAge: 14,
    maxAge: 20,
    suitableFor: ['male'],
    skills: [
      'Procédure sénatoriale',
      'Négociation politique',
      'Gestion des clientèles',
      'Droit romain',
      'Histoire politique'
    ],
    outcomes: {
      popularity: 10,
      oratory: 10
    }
  }
};

export const getAllEducationPaths = () => {
  return Object.entries(educationPathsData).map(([id, path]) => ({
    id,
    ...path
  }));
};

export const getEducationPathById = (id: string) => {
  return educationPathsData[id];
};
