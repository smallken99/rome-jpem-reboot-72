
import { religiousPath } from './religiousPath';
import { rhetoricPath } from './rhetoricPath';
import { militaryPath } from './militaryPath';
import { academicPath } from './academicPath';
import { politicalPath } from './politicalPath';

export const educationPaths = {
  religious: religiousPath,
  rhetoric: rhetoricPath,
  military: militaryPath,
  academic: academicPath,
  political: politicalPath
};

export * from './religiousPath';
export * from './rhetoricPath';
export * from './militaryPath';
export * from './academicPath';
export * from './politicalPath';
