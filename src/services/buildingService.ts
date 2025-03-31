
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'sonner';
import { OwnedBuilding, PropertyUpgrade } from '@/components/proprietes/types/property';
import { economyService } from './economyService';

/**
 * Service de gestion des bâtiments et propriétés
 */
class BuildingService {
  private buildings: OwnedBuilding[] = [];
  private buildingListeners: ((buildings: OwnedBuilding[]) => void)[] = [];
  
  constructor() {
    // Initialiser avec quelques bâtiments par défaut si nécessaire
    this.buildings = [];
  }
  
  // Ajouter un nouveau bâtiment
  addBuilding(building: Omit<OwnedBuilding, 'id'>): string {
    const id = typeof building.id === 'string' ? building.id : uuidv4();
    const newBuilding: OwnedBuilding = {
      ...building,
      id,
      // Définir des valeurs par défaut si nécessaire
      maintenanceLevel: building.maintenanceLevel || 50,
      securityLevel: building.securityLevel || 1,
      condition: building.condition || 100,
      status: building.status || 'excellent',
      upgrades: building.upgrades || []
    };
    
    this.buildings = [...this.buildings, newBuilding];
    this.notifyBuildingListeners();
    
    return id;
  }
  
  // Supprimer un bâtiment
  removeBuilding(id: string | number): boolean {
    const index = this.buildings.findIndex(b => b.id === id);
    if (index === -1) {
      return false;
    }
    
    this.buildings = [...this.buildings.slice(0, index), ...this.buildings.slice(index + 1)];
    this.notifyBuildingListeners();
    
    return true;
  }
  
  // Mettre à jour un bâtiment
  updateBuilding(updatedBuilding: OwnedBuilding): boolean {
    const index = this.buildings.findIndex(b => b.id === updatedBuilding.id);
    if (index === -1) {
      return false;
    }
    
    this.buildings = [
      ...this.buildings.slice(0, index),
      updatedBuilding,
      ...this.buildings.slice(index + 1)
    ];
    
    this.notifyBuildingListeners();
    return true;
  }
  
  // Mettre à jour une propriété spécifique d'un bâtiment
  updateBuildingProperty<K extends keyof OwnedBuilding>(
    id: string | number,
    property: K,
    value: OwnedBuilding[K]
  ): boolean {
    const building = this.buildings.find(b => b.id === id);
    if (!building) {
      return false;
    }
    
    const updatedBuilding = { ...building, [property]: value };
    return this.updateBuilding(updatedBuilding);
  }
  
  // Obtenir un bâtiment par id
  getBuilding(id: string | number): OwnedBuilding | undefined {
    return this.buildings.find(b => b.id === id);
  }
  
  // Obtenir tous les bâtiments
  getAllBuildings(): OwnedBuilding[] {
    return [...this.buildings];
  }
  
  // Filtrer les bâtiments par type
  getBuildingsByType(type: string): OwnedBuilding[] {
    return this.buildings.filter(b => b.buildingType === type || b.type === type);
  }
  
  // Calculer les statistiques des bâtiments
  calculateBuildingStats() {
    const stats = {
      totalValue: 0,
      monthlyIncome: 0,
      monthlyMaintenance: 0,
      totalBuildings: this.buildings.length,
      averageCondition: 0,
      byType: {} as Record<string, number>
    };
    
    // Calculer les statistiques globales
    this.buildings.forEach(building => {
      stats.totalValue += building.value || 0;
      stats.monthlyIncome += building.income || 0;
      stats.monthlyMaintenance += building.maintenanceCost || 0;
      stats.averageCondition += building.condition || 0;
      
      // Compter par type
      const type = building.buildingType || building.type || 'other';
      stats.byType[type] = (stats.byType[type] || 0) + 1;
    });
    
    // Calculer la condition moyenne
    if (this.buildings.length > 0) {
      stats.averageCondition /= this.buildings.length;
    }
    
    return stats;
  }
  
  // Acheter un bâtiment
  purchaseBuilding(options: {
    name: string;
    type: string;
    buildingType: string;
    location: string;
    cost: number;
    maintenanceCost: number;
    income?: number;
    description?: string;
  }): string | null {
    // Vérifier si on peut se permettre ce bâtiment
    if (!economyService.canAfford(options.cost)) {
      toast.error("Fonds insuffisants pour acheter ce bâtiment");
      return null;
    }
    
    // Effectuer le paiement
    economyService.makePayment(
      options.cost,
      "Vendeur de propriété",
      "Achat immobilier",
      `Achat de ${options.name}`
    );
    
    // Créer le nouveau bâtiment
    const buildingId = this.addBuilding({
      id: uuidv4(),
      buildingId: uuidv4(),
      name: options.name,
      type: options.type,
      buildingType: options.buildingType,
      location: options.location,
      value: options.cost,
      maintenanceCost: options.maintenanceCost,
      maintenance: options.maintenanceCost,
      condition: 100,
      maintenanceLevel: 50,
      securityLevel: 1,
      income: options.income || 0,
      description: options.description || '',
      purchaseDate: new Date(),
      size: 'medium',
      maxWorkers: 5
    });
    
    toast.success(`${options.name} acquis avec succès!`);
    return buildingId;
  }
  
  // Vendre un bâtiment
  sellBuilding(id: string | number): boolean {
    const building = this.getBuilding(id);
    if (!building) {
      toast.error("Bâtiment introuvable");
      return false;
    }
    
    // Calculer le prix de vente (généralement moins que la valeur)
    const conditionFactor = building.condition / 100;
    const ageFactor = calculateAgeFactor(building.purchaseDate);
    const sellingPrice = Math.round(building.value * conditionFactor * ageFactor);
    
    // Recevoir le paiement
    economyService.receivePayment(
      sellingPrice,
      "Acheteur de propriété",
      "Vente immobilière",
      `Vente de ${building.name}`
    );
    
    // Supprimer le bâtiment
    this.removeBuilding(id);
    
    toast.success(`${building.name} vendu pour ${sellingPrice.toLocaleString()} As`);
    return true;
  }
  
  // Calculer les revenus d'un bâtiment
  calculateBuildingIncome(building: OwnedBuilding): number {
    if (!building.income) return 0;
    
    // Facteurs affectant le revenu
    const conditionFactor = building.condition / 100;
    const maintenanceFactor = building.maintenanceLevel ? building.maintenanceLevel / 100 : 0.5;
    
    // Ajustements des upgrades
    const upgradeBonus = building.upgrades?.reduce((bonus, upgrade) => {
      if (upgrade.applied && upgrade.effects?.income) {
        return bonus + upgrade.effects.income;
      }
      return bonus;
    }, 0) || 0;
    
    // Calcul final
    return Math.round(building.income * conditionFactor * maintenanceFactor + upgradeBonus);
  }
  
  // Calculer le coût de maintenance réel d'un bâtiment
  calculateMaintenanceCost(building: OwnedBuilding): number {
    if (!building.maintenanceCost) return 0;
    
    // Facteurs affectant le coût de maintenance
    const ageFactor = calculateAgeFactor(building.purchaseDate);
    const conditionPenalty = (100 - building.condition) / 200; // +0-50% basé sur la condition
    
    // Ajustements des upgrades
    const upgradeReduction = building.upgrades?.reduce((reduction, upgrade) => {
      if (upgrade.applied && upgrade.effects?.maintenanceReduction) {
        return reduction + upgrade.effects.maintenanceReduction;
      }
      return reduction;
    }, 0) || 0;
    
    // Calcul final (ne peut pas être en dessous de 50% du coût de base)
    const baseCost = building.maintenanceCost;
    const reducedCost = baseCost * (1 - upgradeReduction / 100);
    return Math.max(baseCost * 0.5, reducedCost * (1 + ageFactor * 0.5 + conditionPenalty));
  }
  
  // Appliquer une amélioration à un bâtiment
  applyUpgrade(buildingId: string | number, upgradeId: string): boolean {
    const building = this.getBuilding(buildingId);
    if (!building || !building.upgrades) {
      return false;
    }
    
    const upgradeIndex = building.upgrades.findIndex(u => u.id === upgradeId);
    if (upgradeIndex === -1) {
      return false;
    }
    
    const upgrade = building.upgrades[upgradeIndex];
    
    // Vérifier si on peut se permettre cette amélioration
    if (!economyService.canAfford(upgrade.cost)) {
      toast.error("Fonds insuffisants pour cette amélioration");
      return false;
    }
    
    // Vérifier les prérequis
    if (upgrade.requirements) {
      if (upgrade.requirements.minBuildingLevel && building.maintenanceLevel < upgrade.requirements.minBuildingLevel) {
        toast.error(`Niveau d'entretien insuffisant pour cette amélioration`);
        return false;
      }
      
      if (upgrade.requirements.minValue && building.value < upgrade.requirements.minValue) {
        toast.error(`Valeur du bâtiment insuffisante pour cette amélioration`);
        return false;
      }
      
      if (upgrade.requirements.minWorkers && (building.workers || 0) < upgrade.requirements.minWorkers) {
        toast.error(`Nombre de travailleurs insuffisant pour cette amélioration`);
        return false;
      }
      
      if (upgrade.requirements.minCondition && building.condition < upgrade.requirements.minCondition) {
        toast.error(`État du bâtiment insuffisant pour cette amélioration`);
        return false;
      }
      
      // Vérifier les prérequis d'autres améliorations
      if (upgrade.requirements.otherUpgrades && upgrade.requirements.otherUpgrades.length > 0) {
        const missingUpgrades = upgrade.requirements.otherUpgrades.filter(
          requiredId => !building.upgrades?.some(u => u.id === requiredId && u.applied)
        );
        
        if (missingUpgrades.length > 0) {
          toast.error(`Améliorations prérequises manquantes`);
          return false;
        }
      }
    }
    
    // Effectuer le paiement
    economyService.makePayment(
      upgrade.cost,
      "Entrepreneur",
      "Amélioration immobilière",
      `Amélioration: ${upgrade.name} pour ${building.name}`
    );
    
    // Appliquer l'amélioration
    const updatedUpgrades = [...building.upgrades];
    updatedUpgrades[upgradeIndex] = {
      ...upgrade,
      applied: true
    };
    
    // Appliquer les effets de l'amélioration au bâtiment
    const updatedBuilding = { ...building, upgrades: updatedUpgrades };
    
    if (upgrade.effects) {
      if (upgrade.effects.income) {
        updatedBuilding.income = (building.income || 0) + upgrade.effects.income;
      }
      
      if (upgrade.effects.value) {
        updatedBuilding.value = building.value + upgrade.effects.value;
      }
      
      if (upgrade.effects.conditionBoost) {
        updatedBuilding.condition = Math.min(100, building.condition + upgrade.effects.conditionBoost);
      }
    }
    
    this.updateBuilding(updatedBuilding);
    
    toast.success(`Amélioration ${upgrade.name} appliquée avec succès!`);
    return true;
  }
  
  // Collecter les revenus d'un bâtiment
  collectBuildingIncome(buildingId: string | number): number {
    const building = this.getBuilding(buildingId);
    if (!building || !building.income) {
      toast.error("Ce bâtiment ne génère pas de revenus");
      return 0;
    }
    
    const adjustedIncome = this.calculateBuildingIncome(building);
    
    // Enregistrer la transaction
    economyService.receivePayment(
      adjustedIncome,
      building.name,
      "Revenus immobiliers",
      `Revenus de ${building.name}`
    );
    
    toast.success(`Revenus collectés: ${adjustedIncome.toLocaleString()} As de ${building.name}`);
    
    return adjustedIncome;
  }
  
  // Collecter les revenus de tous les bâtiments
  collectAllBuildingIncomes(): number {
    let totalIncome = 0;
    
    this.buildings.forEach(building => {
      if (building.income && building.income > 0) {
        const adjustedIncome = this.calculateBuildingIncome(building);
        
        // Ajouter au revenu total
        totalIncome += adjustedIncome;
        
        // Enregistrer la transaction pour ce bâtiment
        economyService.receivePayment(
          adjustedIncome,
          building.name,
          "Revenus immobiliers",
          `Revenus de ${building.name}`
        );
      }
    });
    
    if (totalIncome > 0) {
      toast.success(`Revenus immobiliers collectés: ${totalIncome.toLocaleString()} As`);
    } else {
      toast.info("Aucun revenu à collecter pour le moment");
    }
    
    return totalIncome;
  }
  
  // Effectuer la maintenance d'un bâtiment
  performMaintenance(buildingId: string | number): boolean {
    const building = this.getBuilding(buildingId);
    if (!building) {
      toast.error("Bâtiment introuvable");
      return false;
    }
    
    const maintenanceCost = this.calculateMaintenanceCost(building);
    
    // Vérifier si on peut se permettre la maintenance
    if (!economyService.canAfford(maintenanceCost)) {
      toast.error(`Fonds insuffisants pour la maintenance (coût: ${maintenanceCost.toLocaleString()} As)`);
      return false;
    }
    
    // Effectuer le paiement
    economyService.makePayment(
      maintenanceCost,
      "Équipe d'entretien",
      "Maintenance",
      `Maintenance de ${building.name}`
    );
    
    // Améliorer l'état du bâtiment
    const conditionImprovement = Math.min(100 - building.condition, 20); // +20% max, jusqu'à 100%
    const updatedBuilding = {
      ...building,
      condition: building.condition + conditionImprovement,
      lastMaintenance: new Date()
    };
    
    this.updateBuilding(updatedBuilding);
    
    toast.success(`Maintenance effectuée sur ${building.name}`);
    return true;
  }
  
  // S'abonner aux changements de bâtiments
  subscribeToBuildings(listener: (buildings: OwnedBuilding[]) => void): () => void {
    this.buildingListeners.push(listener);
    return () => {
      this.buildingListeners = this.buildingListeners.filter(l => l !== listener);
    };
  }
  
  // Notifier les écouteurs de bâtiments
  private notifyBuildingListeners(): void {
    this.buildingListeners.forEach(listener => listener([...this.buildings]));
  }
}

// Fonction utilitaire pour calculer le facteur d'âge
function calculateAgeFactor(purchaseDate: Date): number {
  const ageInYears = (new Date().getTime() - new Date(purchaseDate).getTime()) / (1000 * 60 * 60 * 24 * 365);
  return Math.max(0.7, 1 - (ageInYears * 0.05)); // 5% de dépréciation par an, minimum 70%
}

// Exporter une instance unique du service
export const buildingService = new BuildingService();
