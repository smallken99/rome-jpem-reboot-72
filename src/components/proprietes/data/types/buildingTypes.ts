
// Common building description interface
export interface BuildingDescription {
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
}
