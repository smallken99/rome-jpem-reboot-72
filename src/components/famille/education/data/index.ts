
export * from './educationPaths';
export * from './paths/militaryPath';
export * from './paths/religiousPath';
export * from './paths/rhetoricPath';

// Function to get an education path by type for backwards compatibility
export const getEducationPath = (type: string) => {
  return educationPaths.find(path => path.id === type);
};
