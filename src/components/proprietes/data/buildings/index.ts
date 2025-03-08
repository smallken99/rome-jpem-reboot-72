
import { urbanResidentialBuildings } from './urbanResidentialBuildings';
import { religiousBuildings } from './religiousBuildings';
import { publicBuildings } from './publicBuildings';
import { militaryBuildings } from './militaryBuildings';
import { ruralProperties } from './ruralProperties';

export { urbanResidentialBuildings } from './urbanResidentialBuildings';
export { religiousBuildings } from './religiousBuildings';
export { publicBuildings } from './publicBuildings';
export { militaryBuildings } from './militaryBuildings';
export { ruralProperties } from './ruralProperties';

// Export all building types in a single object
export const allBuildingTypes = {
  urbanResidential: urbanResidentialBuildings,
  religious: religiousBuildings,
  public: publicBuildings,
  military: militaryBuildings,
  rural: ruralProperties
};
