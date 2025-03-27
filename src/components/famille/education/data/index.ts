
import { EducationPath } from '../types/educationTypes';
import { educationPaths, getEducationPathById, getAllEducationPaths } from './educationPaths';
import { getAllPreceptors, getPreceptorById, getPreceptorsForType, generatePreceptor } from './preceptors';

// Main function to get education path by type
export const getEducationPath = (type: string): EducationPath | undefined => {
  return educationPaths.find(path => path.type === type);
};

export {
  educationPaths,
  getEducationPathById,
  getAllEducationPaths,
  getAllPreceptors,
  getPreceptorById,
  getPreceptorsForType,
  generatePreceptor
};
