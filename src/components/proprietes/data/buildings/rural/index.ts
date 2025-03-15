
import { agriculturalDomains } from './agriculturalDomains';
import { livestockFarms } from './livestockFarms';
import { BuildingDescription } from '../../types/buildingTypes';

// Exporter toutes les propriétés rurales dans un seul objet
export const ruralProperties: Record<string, BuildingDescription> = {
  ...agriculturalDomains,
  ...livestockFarms
};

// Exporter également les catégories individuelles
export { agriculturalDomains } from './agriculturalDomains';
export { livestockFarms } from './livestockFarms';
