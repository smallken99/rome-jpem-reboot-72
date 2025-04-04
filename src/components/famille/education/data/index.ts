
import { EducationPath } from '../types/educationTypes';
import { v4 as uuidv4 } from 'uuid';

// Common education paths
export const educationPaths: Record<string, EducationPath> = {
  military: {
    id: uuidv4(),
    name: "Éducation Militaire",
    description: "Formation aux tactiques militaires, au maniement des armes et au commandement des légions romaines.",
    duration: 3,
    relatedStat: "martial",
    skills: ["Tactique militaire", "Commandement", "Maniement des armes", "Équitation", "Navigation"],
    outcomes: { martialEducation: 10, popularity: 5 }
  },
  
  rhetoric: {
    id: uuidv4(),
    name: "Éducation Rhétorique",
    description: "Formation à l'art oratoire, la persuasion et l'éloquence nécessaire au forum et au sénat.",
    duration: 3,
    relatedStat: "oratory",
    skills: ["Art oratoire", "Persuasion", "Éloquence", "Argumentation", "Logique"],
    outcomes: { oratory: 10, popularity: 5 }
  },
  
  political: {
    id: uuidv4(),
    name: "Éducation Politique",
    description: "Formation aux affaires politiques, à la gouvernance et aux alliances stratégiques.",
    duration: 3,
    relatedStat: "politics",
    skills: ["Gouvernance", "Diplomatie", "Négociation", "Droit romain", "Administration"],
    outcomes: { popularity: 10, oratory: 5 }
  },
  
  religious: {
    id: uuidv4(),
    name: "Éducation Religieuse",
    description: "Étude des rites, traditions et obligations religieuses romaines pour servir les dieux.",
    duration: 3,
    relatedStat: "piety",
    skills: ["Rituel sacré", "Divination", "Interprétation des présages", "Connaissance des divinités", "Rites funéraires"],
    outcomes: { piety: 10, popularity: 5 }
  },
  
  philosophical: {
    id: uuidv4(),
    name: "Éducation Philosophique",
    description: "Étude des grands courants philosophiques et de la réflexion éthique et morale.",
    duration: 3,
    relatedStat: "wisdom",
    skills: ["Philosophie stoïcienne", "Philosophie épicurienne", "Éthique", "Dialectique", "Métaphysique"],
    outcomes: { oratory: 8, piety: 7 }
  },
  
  academic: {
    id: uuidv4(),
    name: "Éducation Académique Complète",
    description: "Formation générale englobant les lettres, l'histoire, les mathématiques et les sciences.",
    duration: 4,
    relatedStat: "academic",
    skills: ["Histoire romaine", "Littérature", "Mathématiques", "Astronomie", "Langues étrangères", "Poésie"],
    outcomes: { popularity: 5, martialEducation: 2, piety: 5 }
  }
};

export * from './preceptors';
export * from './preceptorDatabase';
export * from './specialties';
export * from './romanNames';
export * from './titles';
export * from './childrenData';
export * from './educationPaths';
