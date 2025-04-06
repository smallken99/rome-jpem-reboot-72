
import { religiousPath } from './religiousPath';
import { rhetoricPath } from './rhetoricPath';
import { militaryPath } from './militaryPath';
import { academicPath } from './academicPath';

export const educationPaths = {
  religious: religiousPath,
  rhetoric: rhetoricPath,
  military: militaryPath,
  academic: academicPath
};

export * from './religiousPath';
export * from './rhetoricPath';
export * from './militaryPath';
export * from './academicPath';
