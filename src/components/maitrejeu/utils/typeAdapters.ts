
import { Equilibre, Risk } from '../types/equilibre';
import { Character } from '@/types/character';
import { Slave, SlaveAssignment } from '@/types/slaves';
import { OwnedBuilding, PropertyUpgrade } from '@/components/proprietes/types/property';

/**
 * Normalise le format d'équilibre pour garantir la cohérence
 */
export function normalizeEquilibre(equilibreInput: Partial<Equilibre>): Equilibre {
  // Valeurs par défaut
  const defaultEquilibre: Equilibre = {
    politique: {
      populaires: 33,
      optimates: 33,
      moderates: 34
    },
    populaires: 33,
    populares: 33,
    optimates: 33,
    moderates: 34,
    economie: {
      stabilite: 50,
      croissance: 50,
      commerce: 50,
      agriculture: 50
    },
    social: {
      plebeiens: 50,
      patriciens: 50,
      esclaves: 0,
      cohesion: 50,
      plébéiens: 50 // Alternate spelling
    },
    patriciens: 50,
    plébéiens: 50,
    militaire: {
      moral: 50,
      effectifs: 50,
      equipement: 50,
      discipline: 50
    },
    religion: {
      piete: 50,
      traditions: 50,
      superstition: 50
    },
    stability: 50,
    armée: 50,
    loyauté: 50,
    morale: 50,
    facteurJuridique: 50,
    historique: [],
    risques: {}
  };

  // Fusion avec les valeurs fournies
  const result = { ...defaultEquilibre, ...equilibreInput };

  // Ensure all fields are synchronized
  if (equilibreInput.politique) {
    result.populaires = equilibreInput.politique.populaires;
    result.populares = equilibreInput.politique.populaires;
    result.optimates = equilibreInput.politique.optimates;
    result.moderates = equilibreInput.politique.moderates;
  }
  
  if (equilibreInput.social) {
    result.patriciens = equilibreInput.social.patriciens;
    // Support both spelling variants
    result.plébéiens = equilibreInput.social.plebeiens;
    result.social.plébéiens = equilibreInput.social.plebeiens;
  }

  // Handle various aliased fields
  if (typeof equilibreInput.economie === 'number') {
    result.economie = {
      stabilite: equilibreInput.economie,
      croissance: equilibreInput.economie,
      commerce: equilibreInput.economie,
      agriculture: equilibreInput.economie
    };
  }

  return result;
}

/**
 * Adapter de propriété pour assurer la compatibilité entre les différentes interfaces
 */
export function adaptBuilding(building: any): OwnedBuilding {
  if (!building) return null;
  
  return {
    id: building.id || '',
    buildingId: building.buildingId || building.id || '',
    name: building.name || '',
    buildingType: building.buildingType || building.type || '',
    type: building.type || '',
    location: building.location || '',
    size: building.size || 1,
    value: building.value || 0,
    condition: building.condition || 100,
    maintenanceLevel: building.maintenanceLevel || 1,
    maintenanceCost: building.maintenanceCost || building.maintenance || 0,
    income: building.income || 0,
    workers: building.workers || 0,
    maxWorkers: building.maxWorkers || 10,
    securityLevel: building.securityLevel || 1,
    description: building.description || '',
    purchaseDate: building.purchaseDate || new Date(),
    status: building.status || 'active',
    maintenance: building.maintenance || building.maintenanceCost || 0,
    upgrades: building.upgrades || []
  };
}

/**
 * Adapter de personnage pour assurer la compatibilité
 */
export function adaptCharacter(character: Partial<Character>): Character {
  if (!character) return null;
  
  const defaultCharacter: Character = {
    id: '',
    name: '',
    gender: 'male',
    age: 30,
    stats: {
      popularity: 0,
      oratory: 0,
      piety: 0,
      martialEducation: 0
    },
    traits: [],
    status: 'alive',
    health: 100
  };
  
  return { ...defaultCharacter, ...character } as Character;
}

/**
 * Adapter d'esclave pour assurer la compatibilité
 */
export function adaptSlave(slave: Partial<Slave>): Slave {
  if (!slave) return null;
  
  return {
    id: slave.id || '',
    name: slave.name || '',
    age: slave.age || 25,
    gender: slave.gender || 'male',
    origin: slave.origin || 'Unknown',
    price: slave.price || 0,
    skills: slave.skills || [],
    health: slave.health || 100,
    loyalty: slave.loyalty || 50,
    productivity: slave.productivity || 100,
    value: slave.value || slave.price || 0,
    ...slave
  };
}

/**
 * Conversion entre formats d'assignation d'esclaves
 */
export function convertSlaveAssignments(
  assignments: Record<string, string[]> | SlaveAssignment[]
): SlaveAssignment[] {
  if (Array.isArray(assignments)) {
    return assignments.map(assignment => ({
      id: assignment.id || `${assignment.slaveId}-${assignment.buildingId}`,
      slaveId: assignment.slaveId,
      buildingId: assignment.buildingId,
      assignedAt: assignment.assignedAt || new Date(),
      role: assignment.role || 'worker',
      productivity: assignment.productivity || 100
    }));
  }
  
  const result: SlaveAssignment[] = [];
  for (const propertyId in assignments) {
    assignments[propertyId].forEach(slaveId => {
      result.push({
        id: `${slaveId}-${propertyId}`,
        slaveId,
        buildingId: propertyId,
        assignedAt: new Date(),
        role: 'worker',
        productivity: 100
      });
    });
  }
  
  return result;
}
