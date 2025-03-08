
// Main data export file
export { educationPaths } from './educationPaths';
export { generatePreceptors } from './preceptors';
export { romanNames, romanNamePrefixes, romanNameSuffixes } from './romanNames';
export { specialties, educationSpecialties } from './specialties';
export { titles } from './titles';

// Re-export for backward compatibility
import { educationPaths } from './educationPaths';
import { generatePreceptors } from './preceptors';

export default {
  educationPaths,
  generatePreceptors
};
