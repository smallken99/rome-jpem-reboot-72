
export interface PublicBuilding {
  id: string;
  buildingTypeId: string;
  name: string;
  location: string;
  constructionYear: number;
  condition: number; // 0-100
  maintenanceCost: number;
  maintenanceLevel: 'minimal' | 'standard' | 'excellent';
  lastMaintenance?: number; // année de dernière maintenance
  benefits: string[];
  capacity?: number;
  investmentAmount: number;
  constructionStatus: 'planned' | 'in_progress' | 'completed' | 'damaged' | 'abandoned';
  constructionProgress?: number; // 0-100
  image?: string;
}

export interface ConstructionProject {
  id: string;
  buildingTypeId: string;
  name: string;
  location: string;
  estimatedCost: number;
  duration: number; // en années
  progress: number; // 0-100
  startedYear?: number;
  expectedCompletionYear?: number;
  benefits: string[];
  sponsors: string[];
  approved: boolean;
}
