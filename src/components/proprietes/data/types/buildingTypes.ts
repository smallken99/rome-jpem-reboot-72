
// Common building description interface
export interface BuildingDescription {
  id: string;  // Making id required to match the other definition
  name: string;
  description: string;
  advantages: string[];
  initialCost: number;
  maintenanceCost: number;
  prestige: number;
  income?: number;
  piete?: number;
  popularite?: number;
  reputation?: number;
  production?: {
    type: string;
    amount: number;
    unit: string;
  };
  slaves?: {
    required: number;
    optimal: number;
    maxProfit: number;
  };
  basePrice?: number;
  type?: "urban" | "rural" | "religious" | "public";
}
