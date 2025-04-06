import { Building, OwnedBuilding as TypedOwnedBuilding } from '@/types/proprietes';
import { OwnedBuilding } from '@/components/proprietes/types/property';

/**
 * Adapte un objet Building pour qu'il soit compatible avec OwnedBuilding
 */
export const adaptOwnedBuilding = (building: Building | any): OwnedBuilding => {
  return {
    id: building.id.toString(),
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
    type: building.type || 'urban'
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

/**
 * Adapte un bâtiment à partir de différentes sources vers un format uniforme
 */
export function adaptOwnedBuilding(building: any): any {
  if (!building) return null;
  
  // Construction des champs obligatoires
  const adaptedBuilding = {
    id: building.id || String(Date.now()),
    name: building.name || 'Bâtiment sans nom',
    buildingId: building.buildingId || building.id || String(Date.now()),
    buildingType: building.buildingType || building.type || 'other',
    type: building.type || building.buildingType || 'other',
    location: building.location || 'Rome',
    condition: building.condition !== undefined ? building.condition : 100,
    maintenanceEnabled: building.maintenanceEnabled !== undefined ? building.maintenanceEnabled : true,
    maintenanceCost: building.maintenanceCost || building.maintenance || 0,
    maintenance: building.maintenance || building.maintenanceCost || 0,
    value: building.value || 0,
    income: building.income || 0,
    workers: building.workers || 0,
    slaves: building.slaves || 0,
    securityLevel: building.securityLevel || 1,
    maintenanceLevel: building.maintenanceLevel || 1,
    size: building.size || 100,
    maxWorkers: building.maxWorkers || 5,
    description: building.description || '',
    purchaseDate: building.purchaseDate ? new Date(building.purchaseDate) : new Date()
  };
  
  // Copie des champs additionnels
  for (const key in building) {
    if (!adaptedBuilding[key]) {
      adaptedBuilding[key] = building[key];
    }
  }
  
  return adaptedBuilding;
}
