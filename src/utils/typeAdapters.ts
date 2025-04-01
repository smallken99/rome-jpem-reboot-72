
/**
 * Type adapter utilities for converting between different interfaces
 */

import { OwnedBuilding, PropertyUpgrade, Slave, SlaveAssignment } from '@/components/proprietes/types/property';
import { BuildingType as MJBuildingType, Building as MJBuilding } from '@/components/maitrejeu/types/batiments';
import { BuildingType as PropBuildingType } from '@/components/proprietes/types/buildingTypes';

/**
 * Adapt a MaitreJeu Building to a Proprietes OwnedBuilding
 */
export const adaptOwnedBuilding = (building: any): OwnedBuilding => {
  if (!building) return null;
  
  // Handle different ID types
  const id = typeof building.id === 'number' ? String(building.id) : building.id;
  
  return {
    id: id,
    buildingId: building.buildingId || id,
    name: building.name || '',
    buildingType: building.buildingType || building.type || 'other',
    type: building.type || PropBuildingType.OTHER,
    location: building.location || '',
    size: building.size || 1,
    value: building.value || 0,
    condition: building.condition || 100,
    maintenanceLevel: building.maintenanceLevel || 1,
    maintenanceCost: building.maintenanceCost || building.maintenance || 0,
    maintenanceEnabled: building.maintenanceEnabled || true,
    income: building.income || 0,
    workers: building.workers || 0,
    maxWorkers: building.maxWorkers || 10,
    securityLevel: building.securityLevel || 1,
    description: building.description || '',
    purchaseDate: building.purchaseDate || new Date(),
    status: building.status || 'active',
    maintenance: building.maintenance || building.maintenanceCost || 0,
    upgrades: adaptPropertyUpgrades(building.upgrades || [])
  };
};

/**
 * Adapt property upgrades to ensure consistent format
 */
export const adaptPropertyUpgrades = (upgrades: any[]): PropertyUpgrade[] => {
  if (!upgrades || !Array.isArray(upgrades)) {
    return [];
  }
  
  return upgrades.map(upgrade => {
    if (!upgrade) return null;
    
    // Normalize effect/effects
    const effect = upgrade.effect || upgrade.effects || {};
    
    // Normalize requirements
    const requirements = upgrade.requirements || {};
    
    return {
      id: upgrade.id || `upgrade-${Math.random().toString(36).substr(2, 9)}`,
      name: upgrade.name || '',
      description: upgrade.description || '',
      cost: upgrade.cost || 0,
      effect: {
        income: effect.income,
        popularity: effect.popularity,
        security: effect.security,
        maintenance: effect.maintenance,
        condition: effect.condition,
        value: effect.value,
        conditionBoost: effect.conditionBoost,
        maintenanceReduction: effect.maintenanceReduction
      },
      effects: effect, // Maintain compatibility
      installed: upgrade.installed || upgrade.applied || false,
      buildingTypes: Array.isArray(upgrade.buildingTypes) 
        ? upgrade.buildingTypes 
        : (upgrade.buildingType 
            ? (Array.isArray(upgrade.buildingType) ? upgrade.buildingType : [upgrade.buildingType]) 
            : []),
      requirements: {
        minWorkers: requirements.minWorkers,
        minSecurity: requirements.minSecurity,
        minMaintenance: requirements.minMaintenance,
        minIncome: requirements.minIncome,
        minCondition: requirements.minCondition,
        minBuildingLevel: requirements.minBuildingLevel || requirements.buildingLevel,
        minValue: requirements.minValue || requirements.value,
        otherUpgrades: requirements.otherUpgrades || requirements.upgrades,
        buildingLevel: requirements.buildingLevel,
        buildingCondition: requirements.buildingCondition,
        previousUpgrade: requirements.previousUpgrade,
        value: requirements.value,
        upgrades: requirements.upgrades
      },
      applied: upgrade.applied || false,
      type: upgrade.type || '',
    };
  }).filter(Boolean);
};

/**
 * Adapt a slave to ensure consistent format
 */
export const adaptSlave = (slave: any): Slave => {
  if (!slave) return null;
  
  return {
    id: slave.id || `slave-${Math.random().toString(36).substr(2, 9)}`,
    name: slave.name || 'Esclave sans nom',
    age: slave.age || 25,
    gender: slave.gender || 'male',
    status: slave.status || 'healthy',
    acquired: slave.acquired || new Date(),
    value: slave.value || slave.price || 500,
    assignedTo: slave.assignedTo,
    assigned: !!slave.assignedTo || slave.assigned || false,
    specialties: slave.specialties || slave.skills || [],
    notes: slave.notes || '',
    // Additional compatibility fields
    health: slave.health,
    skills: slave.skills,
    origin: slave.origin
  };
};

/**
 * Adapt slave assignments to ensure consistent format
 */
export const adaptSlaveAssignment = (assignment: any): SlaveAssignment => {
  if (!assignment) return null;
  
  return {
    id: assignment.id,
    propertyId: assignment.propertyId || assignment.buildingId,
    slaveId: assignment.slaveId,
    buildingId: assignment.buildingId,
    startDate: assignment.startDate || assignment.assignedAt || new Date(),
    efficiency: assignment.efficiency || assignment.productivity || 100,
    role: assignment.role,
    productivity: assignment.productivity,
    assignedAt: assignment.assignedAt,
    buildingName: assignment.buildingName,
    count: assignment.count,
    maxCount: assignment.maxCount
  };
};
