
import { Equilibre } from '../types/equilibre';
import { Character } from '@/types/character';
import { Slave, SlaveAssignment } from '@/types/slaves';
import { OwnedBuilding, PropertyUpgrade } from '@/components/proprietes/types/property';

/**
 * Normalise le format d'équilibre pour garantir la cohérence
 */
export function normalizeEquilibre(equilibre: Partial<Equilibre>): Equilibre {
  // Valeurs par défaut
  const defaultEquilibre: Equilibre = {
    id: 'default',
    political: {
      populaires: 33,
      optimates: 33,
      moderates: 34
    },
    social: {
      patriciens: 50,
      plébéiens: 50
    },
    economie: 50,
    stability: 50,
    armée: 50,
    loyauté: 50,
    morale: 50,
    religion: 50,
    facteurJuridique: 50,
    risques: [],
    historique: []
  };

  // Fusion avec les valeurs fournies
  const result = { ...defaultEquilibre, ...equilibre };

  // Normalisation des valeurs sur 100
  if (result.optimates && result.populaires && result.moderates) {
    const total = result.optimates + result.populaires + result.moderates;
    if (total !== 100) {
      result.optimates = Math.round((result.optimates / total) * 100);
      result.populaires = Math.round((result.populaires / total) * 100);
      result.moderates = 100 - result.optimates - result.populaires;
    }
  }

  // Mise à jour des alias pour la rétrocompatibilité
  result.political.populaires = result.populaires || result.political.populaires;
  result.political.optimates = result.optimates || result.political.optimates;
  result.political.moderates = result.moderates || result.political.moderates;
  
  result.populaires = result.political.populaires;
  result.populares = result.political.populaires;
  result.optimates = result.political.optimates;
  result.moderates = result.political.moderates;
  
  result.patriciens = result.social.patriciens;
  result.plébéiens = result.social.plébéiens;
  
  result.economy = result.economie;
  result.économie = result.economie;
  result.economicStability = result.economie;

  return result as Equilibre;
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
    return assignments;
  }
  
  const result: SlaveAssignment[] = [];
  for (const propertyId in assignments) {
    assignments[propertyId].forEach(slaveId => {
      result.push({
        slaveId,
        propertyId,
        role: 'worker',
        startDate: new Date().toISOString(),
        efficiency: 100
      });
    });
  }
  
  return result;
}
