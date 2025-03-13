
/**
 * Utility functions for working with education specialties
 */

const MILITARY_SPECIALTIES = [
  'Combat au corps à corps',
  'Stratégie militaire',
  'Commandement',
  'Équitation de guerre',
  'Tactiques légionnaires',
  'Siège et fortifications'
];

const RELIGIOUS_SPECIALTIES = [
  'Rituels sacrés',
  'Interprétation des présages',
  'Droit pontifical',
  'Mythologie',
  'Tradition ancestrale',
  'Cérémonies officielles'
];

const RHETORIC_SPECIALTIES = [
  'Rhétorique grecque',
  'Débat public',
  'Composition littéraire',
  'Art de la mémoire',
  'Droit romain',
  'Éloquence civique'
];

/**
 * Get specialties based on education type - fallback function if not found in path
 */
export const getSpecialtiesByType = (educationType: string): string[] => {
  switch (educationType) {
    case 'military':
    case 'militaire':
      return MILITARY_SPECIALTIES;
    case 'religious':
    case 'religieuse':
      return RELIGIOUS_SPECIALTIES;
    case 'rhetoric':
    case 'rhetorique':
      return RHETORIC_SPECIALTIES;
    default:
      return [];
  }
};
