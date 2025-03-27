
import { EducationPath } from '../types/educationTypes';
import { militaryPath } from './paths/militaryPath';
import { religiousPath } from './paths/religiousPath';
import { rhetoricPath } from './paths/rhetoricPath';
import { politicalPath } from './paths/politicalPath';

export const educationPaths: EducationPath[] = [
  militaryPath,
  religiousPath,
  rhetoricPath,
  politicalPath
];

export const getEducationPathById = (id: string): EducationPath | undefined => {
  return educationPaths.find(path => path.id === id);
};

export const getAllEducationPaths = (): EducationPath[] => {
  return educationPaths;
};
