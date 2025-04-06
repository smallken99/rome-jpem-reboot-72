
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

export * from './religiousPath';
export * from './rhetoricPath';
export * from './militaryPath';
export * from './academicPath';
export * from './politicalPath';
