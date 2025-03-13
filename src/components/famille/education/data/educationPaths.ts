
import { EducationPath } from '../types/educationTypes';
import { militaryPath } from './paths/militaryPath';
import { religiousPath } from './paths/religiousPath';
import { rhetoricPath } from './paths/rhetoricPath';
import { getSpecialtiesByType } from './utils/specialtiesUtil';

// Types d'éducation disponibles (limités à 3 principaux)
export const educationPaths: EducationPath[] = [
  militaryPath,
  religiousPath,
  rhetoricPath
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
  return getSpecialtiesByType(educationType);
};
