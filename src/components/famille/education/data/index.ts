
import { militaryPath } from './paths/militaryPath';
import { religiousPath } from './paths/religiousPath';
import { rhetoricPath } from './paths/rhetoricPath';
import { EducationPath } from '../types/educationTypes';

export const educationPaths = [militaryPath, religiousPath, rhetoricPath];

export const getEducationPath = (type: string): EducationPath | undefined => {
  switch (type) {
    case 'military':
      return militaryPath;
    case 'religious':
      return religiousPath;
    case 'rhetoric':
      return rhetoricPath;
    default:
      return undefined;
  }
};

export { militaryPath, religiousPath, rhetoricPath };
