
import { EducationPath } from '../types/educationTypes';

export const educationTypes = [
  { id: 'military', name: 'Militaire' },
  { id: 'rhetoric', name: 'Rhétorique' },
  { id: 'political', name: 'Politique' },
  { id: 'religious', name: 'Religieuse' },
  { id: 'philosophical', name: 'Philosophique' },
  { id: 'administrative', name: 'Administrative' }
];

export const educationPaths: Record<string, EducationPath> = {
  military: {
    name: 'Éducation Militaire',
    description: 'Formation aux arts de la guerre et au commandement des légions',
    duration: 3,
    relatedStat: 'martialEducation',
    skills: [
      'Tactique de combat',
      'Commandement',
      'Discipline légionnaire',
      'Fortifications',
      'Logistique militaire'
    ],
    outcomes: {
      martialEducation: 15,
      popularity: 5
    }
  },
  rhetoric: {
    name: 'Éducation Rhétorique',
    description: "Maîtrise de l'art oratoire et de la persuasion",
    duration: 3,
    relatedStat: 'oratory',
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
  political: {
    name: 'Éducation Politique',
    description: 'Apprentissage des rouages du Sénat et des institutions romaines',
    duration: 3,
    relatedStat: 'popularity',
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
  },
  religious: {
    name: 'Éducation Religieuse',
    description: 'Formation aux rituels et traditions religieuses de Rome',
    duration: 3,
    relatedStat: 'piety',
    skills: [
      'Rites sacrificiels',
      'Interprétation des présages',
      'Connaissance des divinités',
      'Calendrier religieux',
      'Droit pontifical'
    ],
    outcomes: {
      piety: 15,
      popularity: 5
    }
  },
  philosophical: {
    name: 'Éducation Philosophique',
    description: 'Étude des grandes écoles philosophiques grecques et romaines',
    duration: 3,
    relatedStat: 'oratory',
    skills: [
      'Stoïcisme',
      'Épicurisme',
      'Logique',
      'Éthique',
      'Métaphysique'
    ],
    outcomes: {
      oratory: 10,
      piety: 10
    }
  },
  administrative: {
    name: 'Éducation Administrative',
    description: 'Formation à la gestion des provinces et des finances publiques',
    duration: 3,
    relatedStat: 'popularity',
    skills: [
      'Comptabilité',
      'Fiscalité',
      'Droit provincial',
      'Administration territoriale',
      'Gestion des ressources'
    ],
    outcomes: {
      popularity: 10,
      martialEducation: 5,
      piety: 5
    }
  }
};

export const getEducationPath = (educationType: string): EducationPath => {
  return educationPaths[educationType] || educationPaths.military;
};
