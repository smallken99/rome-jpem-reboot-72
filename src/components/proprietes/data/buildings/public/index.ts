
import { administrativeBuildings } from './administrativeBuildings';
import { securityBuildings } from './securityBuildings';
import { entertainmentBuildings } from './entertainmentBuildings';
import { utilityBuildings } from './utilityBuildings';
import { publicMonuments } from './publicMonuments';
import { BuildingDescription } from '../../types/buildingTypes';

// Merge all public building types into a single record
export const publicBuildings: Record<string, BuildingDescription> = {
  ...administrativeBuildings,
  ...securityBuildings,
  ...entertainmentBuildings,
  ...utilityBuildings,
  ...publicMonuments
};

// Export individual categories for more granular access
export {
  administrativeBuildings,
  securityBuildings,
  entertainmentBuildings,
  utilityBuildings,
  publicMonuments
};
