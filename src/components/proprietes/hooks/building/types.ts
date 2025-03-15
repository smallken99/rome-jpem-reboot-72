
export interface OwnedBuilding {
  id: number | string;
  buildingId: string;
  buildingType: "urban" | "rural" | "religious" | "public";
  name: string;
  location: string;
  maintenanceEnabled: boolean;
  maintenanceCost: number;
  slaves: number;
  condition: number;
  purchaseDate: Date;
  lastMaintenance?: Date;
  size?: string;
  status?: string;
}

export interface BuildingPurchaseOptions {
  buildingId: string;
  type: "urban" | "rural" | "religious" | "public";
  name: string;
  location: string;
  initialCost: number;
  maintenanceCost: number;
  slaves?: number;
  customName?: string;
  buildingType?: "urban" | "rural" | "religious" | "public"; // Alternative to type
}

export interface BuildingDescription {
  id: string;
  name: string;
  description: string;
  basePrice: number;
  maintenanceCost: number;
  revenuePerTurn?: number;
  type: "urban" | "rural" | "religious" | "public";
  requiredSlaves?: number;
  prestigeBonus?: number;
  size?: "small" | "medium" | "large";
  advantages: string[];  
  initialCost: number;   
  prestige: number;      
  slaves?: {
    required: number;
    optimal: number;
    maxProfit?: number;
  };
}

export interface OwnedBuildingProps {
  building: OwnedBuilding;
  onMaintenance: (id: number | string) => void;
  onSell: (id: number | string) => void;
  onRename?: (id: number | string, newName: string) => void;
  estimatedValue: number;
}
