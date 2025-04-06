
import { Building, OwnedBuilding as TypedOwnedBuilding } from '@/types/proprietes';
import { OwnedBuilding } from '@/components/proprietes/types/property';

/**
 * Adapte un bâtiment à partir de différentes sources vers un format uniforme
 * Fonction unifiée qui combine les fonctionnalités des précédentes versions
 */
export function adaptOwnedBuilding(building: Building | any): OwnedBuilding {
  if (!building) return null;
  
  // Construction des champs obligatoires
  const adaptedBuilding = {
    id: building.id ? building.id.toString() : String(Date.now()),
    name: building.name || 'Bâtiment sans nom',
    buildingId: building.buildingId || (building.id ? building.id.toString() : String(Date.now())),
    buildingType: building.buildingType || building.type || 'urban',
    type: building.type || building.buildingType || 'urban',
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
    upgrades: building.upgrades || [],
    status: building.status || 'good',
    purchaseDate: building.purchaseDate ? new Date(building.purchaseDate) : new Date(),
    lastMaintenance: building.lastMaintenance,
    description: building.description || ''
  };
  
  // Copie des champs additionnels
  for (const key in building) {
    if (!adaptedBuilding[key]) {
      adaptedBuilding[key] = building[key];
    }
  }
  
  return adaptedBuilding;
}

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

// Pour assurer la rétrocompatibilité
export const adaptBuilding = adaptOwnedBuilding;
