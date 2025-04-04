
import { EducationPath } from '../types/educationTypes';
import { v4 as uuidv4 } from 'uuid';

export const educationPaths: Record<string, EducationPath> = {
  military: {
    id: uuidv4(),
    name: "Éducation Militaire",
    description: "Formation aux tactiques militaires, au maniement des armes et au commandement des légions romaines.",
    duration: 3,
    relatedStat: "martial",
    minAge: 12,
    maxAge: 18,
    suitableFor: ["male"],
    skills: ["Tactique militaire", "Commandement", "Maniement des armes", "Équitation"],
    outcomes: { martialEducation: 10, popularity: 5 }
  },
  rhetoric: {
    id: uuidv4(),
    name: "Éducation Rhétorique",
    description: "Formation à l'art oratoire, la persuasion et l'éloquence nécessaire au forum et au sénat.",
    duration: 3,
    relatedStat: "oratory",
    minAge: 10,
    maxAge: 20,
    suitableFor: { gender: "both" },
    skills: ["Art oratoire", "Persuasion", "Éloquence", "Argumentation"],
    outcomes: { oratory: 10, popularity: 5 }
  },
  religious: {
    id: uuidv4(),
    name: "Éducation Religieuse",
    description: "Étude des rites, traditions et obligations religieuses romaines pour servir les dieux.",
    duration: 3,
    relatedStat: "piety",
    minAge: 8,
    maxAge: 16,
    suitableFor: { gender: "both" },
    skills: ["Rituel sacré", "Divination", "Interprétation des présages", "Connaissance des divinités"],
    outcomes: { piety: 10, popularity: 5 }
  },
  political: {
    id: uuidv4(),
    name: "Éducation Politique",
    description: "Formation aux affaires politiques, à la gouvernance et aux alliances stratégiques.",
    duration: 3,
    relatedStat: "politics",
    minAge: 14,
    maxAge: 22,
    suitableFor: ["male"],
    skills: ["Gouvernance", "Diplomatie", "Négociation", "Droit romain"],
    outcomes: { popularity: 8, oratory: 7 }
  }
};

export function getAllEducationPaths(): EducationPath[] {
  return Object.values(educationPaths);
}

export function getEducationPathById(id: string): EducationPath | undefined {
  return Object.values(educationPaths).find(path => path.id === id);
}

export function getEducationPathByType(type: string): EducationPath | undefined {
  return educationPaths[type];
}
