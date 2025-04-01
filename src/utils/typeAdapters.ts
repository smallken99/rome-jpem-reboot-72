
/**
 * This file contains adapter functions to bridge type incompatibilities
 * across different parts of the codebase that use similar but slightly different
 * types.
 */

import { BuildingType, BuildingStatus } from '@/components/maitrejeu/types/batiments';
import { OwnedBuilding, PropertyUpgrade, Slave, SlaveAssignment } from '@/components/proprietes/types/property';

/**
 * Ensures a building status value complies with the BuildingStatus enum
 */
export function adaptBuildingStatus(status?: string): BuildingStatus {
  if (!status) return 'good';
  
  const validStatus: Record<string, BuildingStatus> = {
    'excellent': 'excellent',
    'good': 'good',
    'fair': 'fair',
    'poor': 'poor',
    'ruins': 'ruins',
    'construction': 'construction',
    'renovation': 'renovation',
    'average': 'average',
    'damaged': 'damaged',
    'ruined': 'ruined',
    'under_construction': 'under_construction'
  };
  
  return validStatus[status] || 'good';
}

/**
 * Ensures a building type value complies with the BuildingType enum
 */
export function adaptBuildingType(type?: string): BuildingType {
  if (!type) return 'other';
  
  const validTypes: Record<string, BuildingType> = {
    'temple': 'temple',
    'villa': 'villa',
    'domus': 'domus',
    'insula': 'insula',
    'forum': 'forum',
    'baths': 'baths',
    'theater': 'theater',
    'amphitheater': 'amphitheater',
    'senate': 'senate',
    'basilica': 'basilica',
    'market': 'market',
    'warehouse': 'warehouse',
    'workshop': 'workshop',
    'port': 'port',
    'aqueduct': 'aqueduct',
    'road': 'road',
    'bridge': 'bridge',
    'military': 'military',
    'wall': 'wall'
  };
  
  return validTypes[type] || 'other';
}

/**
 * Ensures property upgrades have the required properties
 */
export function adaptPropertyUpgrades(upgrades?: any[]): PropertyUpgrade[] {
  if (!upgrades) return [];
  
  return upgrades.map(upgrade => ({
    id: upgrade.id || String(Date.now()),
    name: upgrade.name || 'Unknown Upgrade',
    cost: upgrade.cost || 0,
    description: upgrade.description || '',
    effect: upgrade.effect || upgrade.effects?.toString() || '',
    applied: upgrade.applied || upgrade.installed || false,
    installed: upgrade.installed || upgrade.applied || false,
    buildingType: Array.isArray(upgrade.buildingType) ? upgrade.buildingType : [],
    type: upgrade.type || 'general',
    requirements: {
      minBuildingLevel: upgrade.requirements?.minBuildingLevel || upgrade.requirements?.buildingLevel,
      minValue: upgrade.requirements?.minValue || upgrade.requirements?.value,
      minWorkers: upgrade.requirements?.minWorkers || upgrade.requirements?.workers,
      minCondition: upgrade.requirements?.minCondition || upgrade.requirements?.buildingCondition,
      otherUpgrades: upgrade.requirements?.otherUpgrades || upgrade.requirements?.upgrades || [],
      buildingLevel: upgrade.requirements?.buildingLevel,
      buildingCondition: upgrade.requirements?.buildingCondition,
      minIncome: upgrade.requirements?.minIncome,
      value: upgrade.requirements?.value,
      previousUpgrade: upgrade.requirements?.previousUpgrade,
      upgrades: upgrade.requirements?.upgrades
    },
    effects: {
      income: upgrade.effects?.income || 0,
      maintenanceReduction: upgrade.effects?.maintenanceReduction || 0,
      conditionBoost: upgrade.effects?.conditionBoost || 0,
      workers: upgrade.effects?.workers || 0,
      value: upgrade.effects?.value || 0,
      maintenance: upgrade.effects?.maintenance,
      condition: upgrade.effects?.condition,
      security: upgrade.effects?.security
    }
  }));
}

/**
 * Standardize the OwnedBuilding type based on different building inputs
 */
export function adaptOwnedBuilding(building: any): OwnedBuilding {
  return {
    id: building.id || String(Date.now()),
    buildingId: building.buildingId || building.id || String(Date.now()),
    name: building.name || 'Unknown Building',
    buildingType: building.buildingType || 'other',
    type: adaptBuildingType(building.type),
    location: building.location || 'Rome',
    size: building.size || 'medium',
    value: building.value || 0,
    condition: building.condition || 100,
    maintenanceLevel: building.maintenanceLevel || 1,
    maintenanceCost: building.maintenanceCost || building.maintenance || 0,
    maintenance: building.maintenance || building.maintenanceCost || 0,
    income: building.income || 0,
    workers: building.workers || 0,
    maxWorkers: building.maxWorkers || 10,
    securityLevel: building.securityLevel || 1,
    description: building.description || '',
    purchaseDate: building.purchaseDate || new Date(),
    lastMaintenance: building.lastMaintenance,
    status: adaptBuildingStatus(building.status),
    maintenanceEnabled: building.maintenanceEnabled ?? true,
    slaves: building.slaves || 0,
    upgrades: adaptPropertyUpgrades(building.upgrades)
  };
}

/**
 * Standardize the Slave type
 */
export function adaptSlave(slave: any): Slave {
  return {
    id: slave.id || String(Date.now()),
    name: slave.name || 'Unknown Slave',
    age: slave.age || 25,
    gender: slave.gender || 'male',
    status: slave.status || 'healthy',
    acquired: slave.acquired || new Date(),
    value: slave.value || 1000,
    assignedTo: slave.assignedTo,
    health: slave.health || 100,
    skills: slave.skills || [],
    origin: slave.origin || 'Unknown',
    notes: slave.notes || '',
    assigned: slave.assigned ?? false
  };
}

/**
 * Standardize the SlaveAssignment type
 */
export function adaptSlaveAssignment(assignment: any): SlaveAssignment {
  return {
    id: assignment.id || String(Date.now()),
    slaveId: assignment.slaveId || '',
    buildingId: assignment.buildingId || '',
    propertyId: assignment.propertyId || assignment.buildingId || '',
    startDate: assignment.startDate || assignment.assignedAt || new Date(),
    efficiency: assignment.efficiency || assignment.productivity || 100,
    buildingName: assignment.buildingName || '',
    assignedAt: assignment.assignedAt || assignment.startDate || new Date(),
    role: assignment.role || 'worker',
    productivity: assignment.productivity || assignment.efficiency || 100,
    count: assignment.count || 1,
    maxCount: assignment.maxCount || 10
  };
}
