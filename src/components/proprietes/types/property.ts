
export interface OwnedBuilding {
  id: string;
  buildingId: string;
  name: string;
  buildingType: string;
  type: string;
  location: string;
  size: number;
  value: number;
  condition: number;
  maintenanceLevel: number;
  maintenanceCost: number;
  maintenance: number;
  income: number;
  workers: number;
  maxWorkers: number;
  securityLevel: number;
  description?: string;
  purchaseDate?: Date | string;
  status?: string;
  upgrades?: PropertyUpgrade[];
}

export interface PropertyUpgrade {
  id: string;
  name: string;
  type?: string;
  description: string;
  cost: number;
  effect: string;
  effects?: Record<string, any> | string[];
  installed: boolean;
  requirements?: {
    buildingLevel?: number;
    buildingType?: string[];
    prerequisiteUpgrades?: string[];
    minValue?: number;
    buildingCondition?: number;
    minIncome?: number;
    value?: number;
    previousUpgrade?: string;
    upgrades?: string[];
    condition?: number;
  };
}

export interface SlaveAssignment {
  id: string;
  slaveId: string;
  buildingId: string;
  propertyId?: string;
  assignedAt: Date;
  startDate?: Date | string;
  role: string;
  productivity: number;
  efficiency?: number;
}

export interface Slave {
  id: string;
  name: string;
  age: number;
  gender: string;
  skills: string[];
  price: number;
  health: number;
  status: string;
  acquired: Date | string;
  value: number;
}

export interface SlaveStatisticsProps {
  totalSlaves: number;
  assignedSlaves: number;
  availableSlaves?: number;
  slaveValue: number;
}

export interface SlavePurchaseFormProps {
  slavePrice: number;
  totalSlaves: number;
  balance: number;
  onPurchase: (quantity: number) => void;
  onSell: (quantity: number) => void;
}
