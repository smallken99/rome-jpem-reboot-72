
export * from './educationPaths';
export * from './paths/militaryPath';
export * from './paths/religiousPath';
export * from './paths/rhetoricPath';

// Function to get an education path by type for backwards compatibility
export const getEducationPath = (type: string) => {
  const { educationPaths } = require('./educationPaths');
  return educationPaths.find(path => path.id === type);
};

// Export educationPaths from the educationPaths file
export { educationPaths } from './educationPaths';

// Function to get education types for backwards compatibility
export const getEducationTypes = () => {
  return ['military', 'religious', 'rhetoric'];
};
