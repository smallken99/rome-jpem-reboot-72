
import { EducationPath } from '../types/educationTypes';
import { educationPaths } from './paths';

// Types d'éducation disponibles
export const educationTypes = [
  { id: 'rhetoric', name: 'Rhétorique' },
  { id: 'military', name: 'Militaire' },
  { id: 'political', name: 'Politique' },
  { id: 'religious', name: 'Religieuse' },
  { id: 'philosophical', name: 'Philosophique' },
  { id: 'academic', name: 'Académique' }
];

// Obtenir tous les chemins d'éducation
export const getAllEducationPaths = (): EducationPath[] => {
  return Object.values(educationPaths);
};

// Obtenir un chemin d'éducation par ID
export const getEducationPathById = (id: string): EducationPath | undefined => {
  return Object.values(educationPaths).find(path => path.id === id);
};

// Exporter educationPaths pour l'utiliser dans EducationDetail.tsx
export { educationPaths };
