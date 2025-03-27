
import { EducationPath } from '../types/educationTypes';
import { militaryPath } from './paths/militaryPath';
import { politicalPath } from './paths/politicalPath';
import { religiousPath } from './paths/religiousPath';
import { rhetoricPath } from './paths/rhetoricPath';
import { academicPath } from './paths/academicPath';

export const educationPaths: EducationPath[] = [
  militaryPath,
  politicalPath,
  religiousPath,
  rhetoricPath,
  academicPath
];

export const getEducationPathById = (id: string): EducationPath | undefined => {
  return educationPaths.find(path => path.id === id);
};

export const getAllEducationPaths = (): EducationPath[] => {
  return educationPaths;
};
