
import { OwnedBuilding, PropertyUpgrade } from '../types/property';
import { BuildingType } from '../types/buildingTypes';

/**
 * Vérifie si une amélioration est disponible pour un bâtiment spécifique
 */
export function isUpgradeAvailable(upgrade: PropertyUpgrade, building: OwnedBuilding): boolean {
  // Si l'amélioration est déjà installée, elle n'est plus disponible
  if (upgrade.installed) {
    return false;
  }
  
  // Vérifier si le type de bâtiment est compatible
  if (upgrade.buildingType && upgrade.buildingType.length > 0 && 
      !upgrade.buildingType.includes(building.type) && 
      !upgrade.buildingType.includes(building.buildingType)) {
    return false;
  }
  
  // Vérifier les prérequis
  if (upgrade.requirements) {
    // Vérifier le niveau minimum du bâtiment
    if (upgrade.requirements.buildingLevel && 
        building.maintenanceLevel < upgrade.requirements.buildingLevel) {
      return false;
    }
    
    // Vérifier l'état du bâtiment
    if (upgrade.requirements.buildingCondition && 
        building.condition < upgrade.requirements.buildingCondition) {
      return false;
    }
    
    // Vérifier le revenu minimum
    if (upgrade.requirements.minIncome && 
        building.income < upgrade.requirements.minIncome) {
      return false;
    }
    
    // Vérifier la valeur minimum
    if (upgrade.requirements.value && 
        building.value < upgrade.requirements.value) {
      return false;
    }
    
    // Vérifier si les améliorations prérequises sont installées
    if (upgrade.requirements.previousUpgrade) {
      const hasPrerequisite = building.upgrades.some(u => 
        u.id === upgrade.requirements.previousUpgrade && u.installed
      );
      if (!hasPrerequisite) {
        return false;
      }
    }
    
    // Vérifier tous les prérequis d'amélioration
    if (upgrade.requirements.upgrades && upgrade.requirements.upgrades.length > 0) {
      const hasAllPrerequisites = upgrade.requirements.upgrades.every(requiredId => {
        return building.upgrades.some(u => u.id === requiredId && u.installed);
      });
      if (!hasAllPrerequisites) {
        return false;
      }
    }
  }
  
  return true;
}

/**
 * Calcule l'effet d'une amélioration sur un bâtiment
 */
export function calculateUpgradeEffect(
  upgrade: PropertyUpgrade, 
  building: OwnedBuilding
): Partial<OwnedBuilding> {
  const result: Partial<OwnedBuilding> = {};
  
  const effects = upgrade.effects || 
    (typeof upgrade.effect === 'object' ? upgrade.effect : {});
  
  if (effects.income !== undefined) {
    result.income = building.income + effects.income;
  }
  
  if (effects.maintenance !== undefined) {
    result.maintenanceCost = building.maintenanceCost + effects.maintenance;
    result.maintenance = building.maintenanceCost + effects.maintenance;
  }
  
  if (effects.condition !== undefined) {
    result.condition = Math.min(100, building.condition + effects.condition);
  }
  
  if (effects.value !== undefined) {
    result.value = building.value + effects.value;
  }
  
  return result;
}

/**
 * Obtient la liste des améliorations disponibles pour un bâtiment
 */
export function getAvailableUpgrades(
  building: OwnedBuilding,
  allUpgrades: PropertyUpgrade[]
): PropertyUpgrade[] {
  return allUpgrades.filter(upgrade => isUpgradeAvailable(upgrade, building));
}

/**
 * Calcule le coût de maintenance total pour un bâtiment
 */
export function calculateTotalMaintenance(building: OwnedBuilding): number {
  let baseMaintenance = building.maintenanceCost;
  
  // Ajouter les effets des améliorations
  if (building.upgrades && building.upgrades.length > 0) {
    building.upgrades.forEach(upgrade => {
      if (upgrade.installed) {
        const effects = upgrade.effects || 
          (typeof upgrade.effect === 'object' ? upgrade.effect : {});
        
        if (effects.maintenance !== undefined) {
          baseMaintenance += effects.maintenance;
        }
      }
    });
  }
  
  // Ajuster en fonction du niveau d'entretien
  return baseMaintenance * (building.maintenanceLevel / 2);
}
