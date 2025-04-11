
import { religiousPath } from './religiousPath';
import { rhetoricPath } from './rhetoricPath';
import { militaryPath } from './militaryPath';
import { academicPath } from './academicPath';
import { politicalPath } from './politicalPath';
import { EducationPath } from '../../types/educationTypes';

export const educationPaths: Record<string, EducationPath> = {
  religious: religiousPath,
  rhetoric: rhetoricPath,
  military: militaryPath,
  academic: academicPath,
  political: politicalPath
};

export const getAllEducationPaths = (): EducationPath[] => {
  return Object.values(educationPaths);
};

export const getEducationPathById = (id: string): EducationPath | undefined => {
  return Object.values(educationPaths).find(path => path.id === id);
};

export const getEducationPathByType = (type: string): EducationPath | undefined => {
  return educationPaths[type];
};

// Export the individual paths
export { religiousPath, rhetoricPath, militaryPath, academicPath, politicalPath };
