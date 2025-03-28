
import { BuildingType } from './buildingTypes';

export interface PropertyUpgrade {
  id: string;
  name: string;
  description: string;
  cost: number;
  effect: {
    income?: number;
    maintenance?: number;
    value?: number;
    efficiency?: number;
    capacity?: number;
    satisfaction?: number;
    production?: number;
  };
  effects?: {
    income?: number;
    maintenance?: number;
    value?: number;
    efficiency?: number;
    capacity?: number;
    satisfaction?: number;
    production?: number;
  };
  appliesTo: BuildingType[];
  requirements: {
    buildingSize?: number;
    buildingType?: BuildingType[];
    otherUpgrades?: string[];
    money?: number;
    influence?: number;
  };
  installed: boolean;
  icon?: string;
}

export interface PropertyStats {
  totalValue: number;
  totalIncome: number;
  totalMaintenance: number;
  netIncome: number;
  avgCondition: number;
  totalWorkers: number;
  maxWorkers: number;
  workerEfficiency: number;
  buildings: number;
}
