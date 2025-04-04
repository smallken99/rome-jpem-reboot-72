
import { OwnedBuilding as PropertyOwnedBuilding } from '@/components/proprietes/types/property';
import { OwnedBuilding as BuildingHookOwnedBuilding } from '@/components/proprietes/hooks/building/types';

/**
 * Adapte un OwnedBuilding du module property vers le format utilisé par les hooks building
 */
export function adaptToHookBuilding(building: PropertyOwnedBuilding): BuildingHookOwnedBuilding {
  return {
    id: building.id,
    buildingId: building.buildingId,
    buildingType: building.buildingType,
    name: building.name,
    location: building.location,
    type: building.type || '',
    size: typeof building.size === 'number' ? building.size.toString() : (building.size || '0'),
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
}

/**
 * Adapte un OwnedBuilding du format hook vers le format property
 */
export function adaptToPropertyBuilding(building: BuildingHookOwnedBuilding): PropertyOwnedBuilding {
  return {
    id: building.id,
    buildingId: building.buildingId,
    buildingType: building.buildingType,
    name: building.name,
    location: building.location,
    type: building.type || '',
    value: 10000, // Valeur par défaut si non fournie
    maintenance: building.maintenanceCost,
    condition: building.condition,
    status: building.status,
    maintenanceCost: building.maintenanceCost,
    maintenanceLevel: building.maintenanceLevel,
    maintenanceEnabled: building.maintenanceEnabled,
    workers: building.workers,
    slaves: building.slaves,
    securityLevel: building.securityLevel,
    income: building.income,
    size: parseInt(building.size) || 0,
    maxWorkers: building.maxWorkers,
    upgrades: building.upgrades,
    description: building.description,
    purchaseDate: building.purchaseDate ? new Date(building.purchaseDate) : undefined,
    lastMaintenance: building.lastMaintenance ? new Date(building.lastMaintenance) : undefined,
  };
}
