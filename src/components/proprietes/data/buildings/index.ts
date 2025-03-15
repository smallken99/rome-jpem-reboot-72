
import { urbanResidentialBuildings } from './urbanResidentialBuildings';
import { religiousBuildings } from './religiousBuildings';
import { publicBuildings } from './public';
import { militaryBuildings } from './militaryBuildings';
import { ruralProperties } from './rural';

export { urbanResidentialBuildings } from './urbanResidentialBuildings';
export { religiousBuildings } from './religiousBuildings';
export { publicBuildings } from './public';
export { militaryBuildings } from './militaryBuildings';
export { ruralProperties } from './rural';

// Export all building types in a single object
export const allBuildingTypes = {
  urbanResidential: urbanResidentialBuildings,
  religious: religiousBuildings,
  public: publicBuildings,
  military: militaryBuildings,
  rural: ruralProperties
};
