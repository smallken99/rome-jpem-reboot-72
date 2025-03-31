
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
    condition?: number;
    [key: string]: any;
  };
  type: string;
  installed?: boolean;
  applied?: boolean;
  buildingType?: string[];
  duration?: number;
  requirements?: {
    buildingLevel?: number;
    previousUpgrade?: string;
    minCondition?: number;
    specialBuilding?: string;
    minIncome?: number;
    funds?: number;
    workers?: number;
    buildingCondition?: number;
    maintenance?: number;
    value?: number;
    upgrades?: string[];
    condition?: number;
    buildingType?: string[];
    minValue?: number;
    prerequisiteUpgrades?: string[];
  };
}
