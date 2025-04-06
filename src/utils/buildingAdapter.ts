
import { Building, OwnedBuilding as TypedOwnedBuilding } from '@/types/proprietes';
import { OwnedBuilding as PropertyOwnedBuilding } from '@/components/proprietes/types/property';
import { OwnedBuilding as HookOwnedBuilding } from '@/components/proprietes/hooks/building/types';

/**
 * Adapte un objet Building pour qu'il soit compatible avec OwnedBuilding de type property
 */
export const adaptToPropertyBuilding = (building: any): PropertyOwnedBuilding => {
  return {
    id: building.id ? String(building.id) : String(Date.now()),
    buildingId: building.buildingId || building.id || String(Date.now()),
    buildingType: building.buildingType || building.type || 'urban',
    name: building.name || 'Bâtiment sans nom',
    location: building.location || 'Rome',
    type: building.type || building.buildingType || 'urban',
    value: building.value || 0,
    maintenance: building.maintenance || building.maintenanceCost || 0,
    condition: building.condition ?? 100,
    status: building.status || 'good',
    maintenanceCost: building.maintenanceCost || building.maintenance || 0,
    maintenanceEnabled: building.maintenanceEnabled ?? true,
    slaves: building.slaves || 0,
    workers: building.workers || 0,
    income: building.income || 0,
    maintenanceLevel: building.maintenanceLevel || 1,
    securityLevel: building.securityLevel || 1,
    size: typeof building.size === 'string' ? parseInt(building.size, 10) : (building.size || 100),
    maxWorkers: building.maxWorkers || 5,
    upgrades: building.upgrades || [],
    purchaseDate: building.purchaseDate ? new Date(building.purchaseDate) : new Date(),
    lastMaintenance: building.lastMaintenance ? new Date(building.lastMaintenance) : undefined,
    description: building.description || ""
  };
};

/**
 * Adapte un objet OwnedBuilding de type property vers OwnedBuilding de type hook
 */
export const adaptToHookBuilding = (building: PropertyOwnedBuilding): HookOwnedBuilding => {
  return {
    id: String(building.id),
    buildingId: String(building.buildingId),
    buildingType: building.buildingType,
    name: building.name,
    location: building.location,
    type: building.type || '',
    size: typeof building.size === 'number' ? String(building.size) : (building.size?.toString() || '0'),
    status: building.status || 'good',
    condition: building.condition,
    maintenanceLevel: building.maintenanceLevel || 0,
    securityLevel: building.securityLevel || 0,
    maintenanceEnabled: building.maintenanceEnabled || false,
    workers: building.workers || 0,
    slaves: building.slaves || 0,
    income: building.income || 0,
    maxWorkers: building.maxWorkers || 0,
    maintenanceCost: building.maintenanceCost,
    description: building.description || '',
    upgrades: building.upgrades || [],
    purchaseDate: building.purchaseDate?.toString() || new Date().toString(),
    lastMaintenance: building.lastMaintenance?.toString() || new Date().toString(),
  };
};

/**
 * Adapte un OwnedBuilding en un Building standard
 */
export const adaptToBuilding = (ownedBuilding: PropertyOwnedBuilding): Building => {
  return {
    id: String(ownedBuilding.id),
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
export function adaptOwnedBuilding(building: any): PropertyOwnedBuilding {
  if (!building) return null;
  
  // Construction des champs obligatoires
  const adaptedBuilding: PropertyOwnedBuilding = {
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
    status: building.status || 'good',
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
