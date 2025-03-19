
import { EducationPath } from '../../types/educationTypes';

export const academicPath: EducationPath = {
  id: 'academic',
  name: 'Académique',
  type: 'academic',
  description: 'L\'éducation académique forme aux sciences, à la philosophie et aux mathématiques.',
  minAge: 8,
  maxAge: 17,
  duration: 6,
  mainStatBonus: 'intelligence',
  statBonus: 40,
  specialties: ['philosophy', 'mathematics', 'science', 'history'],
  requiredAttributes: {
    intelligence: 6
  },
  recommendedAttributes: {
    intelligence: 8,
    sagesse: 6
  },
  outcomes: {
    skills: ['connaissance', 'analyse', 'observation', 'enseignement'],
    bonuses: {
      'intelligence': 3,
      'sagesse': 2
    }
  },
  suitableFor: {
    gender: 'both',
    status: ['patricien', 'plébéien']
  },
  specialtyDetails: [
    {
      id: 'philosophy',
      name: 'Philosophie',
      description: 'Étude des grands penseurs grecs et romains',
      skills: ['rhétorique', 'logique'],
      careers: ['Maître', 'Philosophe']
    },
    {
      id: 'mathematics',
      name: 'Mathématiques',
      description: 'Étude des nombres, de la géométrie et de l\'astronomie',
      skills: ['calcul', 'analyse'],
      careers: ['Ingénieur', 'Astronome']
    },
    {
      id: 'science',
      name: 'Sciences',
      description: 'Étude de la nature, de la médecine et de la biologie',
      skills: ['observation', 'méthode'],
      careers: ['Médecin', 'Naturaliste']
    },
    {
      id: 'history',
      name: 'Histoire',
      description: 'Étude des événements passés et de leurs causes',
      skills: ['mémoire', 'analyse'],
      careers: ['Historien', 'Conseiller']
    }
  ],
  cost: 5000,
  relatedStat: 'intelligence',
  benefits: ['Compétences analytiques', 'Connaissances scientifiques']
};
