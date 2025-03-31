
import { Building, ConstructionProject, MaintenanceTask } from '@/components/maitrejeu/types/batiments';
import { v4 as uuidv4 } from 'uuid';
import { GameDate } from '@/components/maitrejeu/types/common';

/**
 * Service pour la gestion des bâtiments, de leur construction et maintenance
 */
export class BuildingService {
  /**
   * Calcule le coût de maintenance annuel pour un bâtiment
   */
  static calculateMaintenanceCost(building: Building): number {
    // Formule de base pour calculer le coût de maintenance
    const baseCost = building.value * 0.02; // 2% de la valeur du bâtiment
    const conditionFactor = Math.max(0.5, building.condition / 100); // Plus la condition est mauvaise, plus le coût est élevé
    
    let maintenanceCost = baseCost / conditionFactor;
    
    // Ajustements supplémentaires
    if (building.type === 'temple') {
      maintenanceCost *= 1.2; // Les temples coûtent plus cher à maintenir
    } else if (building.type === 'road' || building.type === 'bridge') {
      maintenanceCost *= 1.5; // Les infrastructures sont coûteuses
    } else if (building.type === 'military') {
      maintenanceCost *= 1.3; // Les bâtiments militaires sont coûteux
    }
    
    return Math.round(maintenanceCost);
  }
  
  /**
   * Calcule le revenu potentiel d'un bâtiment
   */
  static calculatePotentialIncome(building: Building): number {
    let baseIncome = 0;
    
    switch (building.type) {
      case 'market':
        baseIncome = building.value * 0.08; // 8% de la valeur
        break;
      case 'workshop':
        baseIncome = building.value * 0.06; // 6% de la valeur
        break;
      case 'port':
        baseIncome = building.value * 0.10; // 10% de la valeur
        break;
      case 'villa':
        baseIncome = building.value * 0.04; // 4% de la valeur
        break;
      case 'insula':
        baseIncome = building.value * 0.05; // 5% de la valeur
        break;
      case 'warehouse':
        baseIncome = building.value * 0.03; // 3% de la valeur
        break;
      default:
        baseIncome = building.value * 0.01; // 1% pour les autres types
    }
    
    // Facteurs d'ajustement
    const conditionFactor = building.condition / 100; // Meilleure condition = meilleur revenu
    const maintenanceFactor = building.maintenanceLevel ? building.maintenanceLevel / 100 : 0.5;
    
    return Math.round(baseIncome * conditionFactor * maintenanceFactor);
  }
  
  /**
   * Calcule le coût de construction d'un nouveau bâtiment
   */
  static calculateConstructionCost(type: string, size: number): number {
    const baseCosts: Record<string, number> = {
      'temple': 50000,
      'villa': 30000,
      'domus': 20000,
      'insula': 15000,
      'forum': 100000,
      'baths': 40000,
      'theater': 60000,
      'amphitheater': 150000,
      'senate': 80000,
      'basilica': 70000,
      'market': 25000,
      'warehouse': 15000,
      'workshop': 10000,
      'port': 80000,
      'aqueduct': 120000,
      'road': 5000,
      'bridge': 30000,
      'military': 35000,
      'other': 20000
    };
    
    const baseTypeCost = baseCosts[type] || 20000;
    return Math.round(baseTypeCost * (size / 100));
  }
  
  /**
   * Estime le temps de construction d'un nouveau bâtiment
   */
  static estimateConstructionTime(type: string, size: number, workers: number): number {
    // Temps de base en jours
    const baseTimeInDays: Record<string, number> = {
      'temple': 365,
      'villa': 180,
      'domus': 120,
      'insula': 90,
      'forum': 730,
      'baths': 365,
      'theater': 450,
      'amphitheater': 1460,
      'senate': 730,
      'basilica': 545,
      'market': 180,
      'warehouse': 90,
      'workshop': 60,
      'port': 730,
      'aqueduct': 1095,
      'road': 30,
      'bridge': 180,
      'military': 180,
      'other': 120
    };
    
    // Base time adjusted for size
    const baseTime = baseTimeInDays[type] || 120;
    const sizeAdjustedTime = baseTime * (size / 100);
    
    // Adjust for number of workers (more workers = less time)
    const workerAdjustment = Math.sqrt(100 / Math.max(workers, 1)); // Square root to model diminishing returns
    
    // Final time in days
    const timeInDays = Math.round(sizeAdjustedTime * workerAdjustment);
    
    // Convert to seasons (90 days per season)
    return Math.ceil(timeInDays / 90);
  }
  
  /**
   * Crée un nouveau projet de construction
   */
  static createConstructionProject(
    name: string, 
    type: string, 
    location: string, 
    size: number, 
    workers: number,
    currentDate: GameDate
  ): ConstructionProject {
    const cost = this.calculateConstructionCost(type, size);
    const constructionTimeInSeasons = this.estimateConstructionTime(type, size, workers);
    
    // Calculer la date de fin estimée
    let estimatedEndDate = { ...currentDate };
    for (let i = 0; i < constructionTimeInSeasons; i++) {
      const seasons = ['Ver', 'Aestas', 'Autumnus', 'Hiems'];
      const currentIndex = seasons.indexOf(estimatedEndDate.season as 'Ver' | 'Aestas' | 'Autumnus' | 'Hiems');
      if (currentIndex === 3) {
        estimatedEndDate = {
          year: estimatedEndDate.year + 1,
          season: 'Ver'
        };
      } else {
        estimatedEndDate = {
          ...estimatedEndDate,
          season: seasons[currentIndex + 1] as any
        };
      }
    }
    
    return {
      id: uuidv4(),
      name,
      type: type as any, // Note: needs proper type validation
      location,
      cost,
      progress: 0,
      startDate: currentDate,
      estimatedEndDate,
      status: 'planning',
      workers,
      description: `Construction de ${name} à ${location}`
    };
  }
  
  /**
   * Crée une tâche de maintenance pour un bâtiment
   */
  static createMaintenanceTask(
    building: Building,
    description: string,
    priority: 'high' | 'medium' | 'low' | 'critical',
    currentDate: GameDate
  ): MaintenanceTask {
    // Calculer une date limite basée sur la priorité
    let deadline = { ...currentDate };
    const seasonsToAdd = priority === 'critical' ? 1 : (priority === 'high' ? 2 : (priority === 'medium' ? 3 : 4));
    
    // Avancer la date
    const seasons = ['Ver', 'Aestas', 'Autumnus', 'Hiems'];
    let currentIndex = seasons.indexOf(deadline.season as 'Ver' | 'Aestas' | 'Autumnus' | 'Hiems');
    
    for (let i = 0; i < seasonsToAdd; i++) {
      currentIndex = (currentIndex + 1) % 4;
      if (currentIndex === 0) {
        deadline.year += 1;
      }
    }
    
    deadline.season = seasons[currentIndex] as any;
    
    // Estimer le coût en fonction de la condition du bâtiment
    const estimatedCost = Math.round(building.value * ((100 - building.condition) / 200));
    
    return {
      id: uuidv4(),
      buildingId: building.id,
      buildingName: building.name,
      description,
      estimatedCost,
      priority,
      deadline,
      status: 'pending'
    };
  }
  
  /**
   * Détermine si un bâtiment nécessite une maintenance
   */
  static needsMaintenance(building: Building): boolean {
    return building.condition < 70;
  }
  
  /**
   * Calcule la détérioration d'un bâtiment par saison
   */
  static calculateDeteriorationRate(building: Building): number {
    let baseRate = 1; // Détérioration de base: 1 point par saison
    
    // Ajustements selon le type de bâtiment
    switch (building.type) {
      case 'road':
      case 'bridge':
        baseRate = 2; // Les infrastructures se détériorent plus vite
        break;
      case 'temple':
      case 'senate':
        baseRate = 0.5; // Les monuments importants sont mieux entretenus
        break;
    }
    
    // Facteur de maintenance
    const maintenanceFactor = building.maintenanceLevel ? (100 - building.maintenanceLevel) / 100 : 0.5;
    
    return baseRate * maintenanceFactor;
  }
}
