
export interface OwnedBuilding {
  id: number;
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
}

export interface BuildingPurchaseOptions {
  buildingId: string;
  type: "urban" | "rural" | "religious" | "public";
  name: string;
  location: string;
  initialCost: number;
  maintenanceCost: number;
  slaves?: number;
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
}

export interface OwnedBuildingProps {
  building: OwnedBuilding;
  onMaintenance: (id: number) => void;
  onSell: (id: number) => void;
  onRename?: (id: number, newName: string) => void;
  estimatedValue: number;
}
