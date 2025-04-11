
import { Building } from '@/types/proprietes';
import { OwnedBuilding } from '@/components/proprietes/types/property';

/**
 * Adapte un objet Building pour qu'il soit compatible avec OwnedBuilding
 */
export const adaptToPropertyBuilding = (building: Building | any): OwnedBuilding => {
  return {
    id: building.id?.toString() || '',
    buildingId: building.id?.toString() || '',
    buildingType: building.type || 'urban',
    type: building.type || 'urban',
    name: building.name || '',
    location: building.location || 'Rome',
    value: building.value || 0,
    maintenance: building.maintenance || 0,
    condition: building.condition || 100,
    status: building.status || 'good',
    maintenanceCost: building.maintenance || 0,
    maintenanceEnabled: building.maintenanceEnabled !== undefined ? building.maintenanceEnabled : true,
    slaves: building.slaves || 0,
    workers: building.workers || 0,
    income: building.income || 0,
    maintenanceLevel: building.maintenanceLevel || 1,
    securityLevel: building.securityLevel || 1,
    size: building.size || 100,
    upgrades: building.upgrades || [],
    purchaseDate: building.purchaseDate || new Date(),
    lastMaintenance: building.lastMaintenance || null,
    description: building.description || ""
  };
};

/**
 * Adapte un OwnedBuilding en Building
 */
export const adaptToBuilding = (ownedBuilding: OwnedBuilding): Building => {
  return {
    id: ownedBuilding.id.toString(),
    type: ownedBuilding.buildingType || ownedBuilding.type || 'urban',
    name: ownedBuilding.name || '',
    location: ownedBuilding.location || 'Rome',
    value: ownedBuilding.value || 0,
    maintenance: ownedBuilding.maintenance || ownedBuilding.maintenanceCost || 0,
    condition: ownedBuilding.condition || 100,
    status: ownedBuilding.status || 'good',
    workers: ownedBuilding.workers || 0,
    slaves: ownedBuilding.slaves || 0,
    income: ownedBuilding.income || 0,
  };
};
