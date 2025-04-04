
import { Building, OwnedBuilding as TypedOwnedBuilding } from '@/types/proprietes';
import { OwnedBuilding } from '@/components/proprietes/types/property';

/**
 * Adapte un objet Building pour qu'il soit compatible avec OwnedBuilding
 */
export const adaptOwnedBuilding = (building: Building | any): OwnedBuilding => {
  return {
    id: building.id,
    buildingId: building.buildingId || building.id.toString(),
    buildingType: building.buildingType || building.type || 'urban',
    name: building.name,
    location: building.location || 'Rome',
    value: building.value || 0,
    maintenance: building.maintenance || 0,
    condition: building.condition || 100,
    status: building.status || 'good',
    maintenanceCost: building.maintenanceCost || building.maintenance || 0,
    maintenanceEnabled: building.maintenanceEnabled !== undefined ? building.maintenanceEnabled : true,
    slaves: building.slaves || 0,
    workers: building.workers || 0,
    income: building.income || 0,
    maintenanceLevel: building.maintenanceLevel || 1,
    securityLevel: building.securityLevel || 1,
    size: building.size || 1,
    maxWorkers: building.maxWorkers || 10,
    upgrades: building.upgrades || [],
    purchaseDate: building.purchaseDate || new Date(),
    lastMaintenance: building.lastMaintenance,
    description: building.description || "",
  };
};

/**
 * Adapte un OwnedBuilding en un Building standard
 */
export const adaptToBuilding = (ownedBuilding: OwnedBuilding): Building => {
  return {
    id: ownedBuilding.id.toString(),
    type: ownedBuilding.buildingType || ownedBuilding.type || 'urban',
    buildingType: ownedBuilding.buildingType,
    name: ownedBuilding.name,
    location: ownedBuilding.location,
    value: ownedBuilding.value,
    maintenance: ownedBuilding.maintenance,
    maintenanceCost: ownedBuilding.maintenanceCost,
    condition: ownedBuilding.condition,
    status: ownedBuilding.status,
    workers: ownedBuilding.workers,
    slaves: ownedBuilding.slaves,
    securityLevel: ownedBuilding.securityLevel,
    maintenanceLevel: ownedBuilding.maintenanceLevel,
    upgrades: ownedBuilding.upgrades,
    income: ownedBuilding.income,
    maintenanceEnabled: ownedBuilding.maintenanceEnabled
  };
};
