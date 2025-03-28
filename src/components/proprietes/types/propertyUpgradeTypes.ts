
export interface PropertyUpgrade {
  id: string;
  name: string;
  description: string;
  cost: number;
  effect: string;
  effects?: {
    income?: number;
    maintenance?: number;
    security?: number;
    capacity?: number;
    condition?: number;
    [key: string]: any;
  };
  applied: boolean;
  available: boolean;
  category: string;
  requirements?: {
    buildingType?: string[];
    minLevel?: number;
    minSize?: string;
    minIncome?: number;
    value?: number;
    condition?: number;
    upgrades?: string[];
    [key: string]: any;
  };
}
