
import { GameDate } from './common';

export type BuildingType = 
  | 'temple'
  | 'forum'
  | 'aqueduc'
  | 'thermes'
  | 'theatre'
  | 'amphitheatre'
  | 'cirque'
  | 'marche'
  | 'port'
  | 'entrepot'
  | 'caserne'
  | 'residence'
  | 'villa'
  | 'ferme'
  | 'atelier'
  | 'mine'
  | 'autre';

export type BuildingCondition = 
  | 'excellent' 
  | 'bon' 
  | 'moyen' 
  | 'mauvais' 
  | 'critique';

export interface Building {
  id: string;
  name: string;
  type: BuildingType;
  description: string;
  location: string;
  condition: BuildingCondition;
  constructionYear: number;
  lastMaintenance: GameDate | null;
  maintenanceCost: number;
  maintenanceInterval: number; // en mois
  revenue: number;
  cost: number;
  capacity: number;
  isPublic: boolean;
  ownerId: string | null;
  slaves: number;
  slaveCost: number;
  tags: string[];
  attributes: Record<string, any>;
}

export interface MaintenanceTask {
  id: string;
  buildingId: string;
  description: string;
  cost: number;
  duration: number; // en jours
  startDate: GameDate;
  endDate: GameDate | null;
  status: 'planned' | 'ongoing' | 'completed' | 'cancelled';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  responsibleId: string | null;
  notes: string;
}

export interface ConstructionProject {
  id: string;
  buildingName: string;
  buildingType: BuildingType;
  location: string;
  description: string;
  totalCost: number;
  expectedCompletionYear: number;
  expectedCompletionSeason: string;
  startDate: GameDate;
  endDate: GameDate | null;
  progress: number; // 0-100%
  responsible: string | null;
  sponsors: string[];
  approved: boolean;
  payments: {
    date: GameDate;
    amount: number;
    description: string;
  }[];
}

export interface BuildingRevenue {
  id: string;
  buildingId: string;
  year: number;
  season: string;
  amount: number;
  details: string;
  collected: boolean;
  collectedDate: GameDate | null;
}

export interface Slave {
  id: string;
  name: string | null;
  buildingId: string | null;
  ownerId: string | null;
  age: number | null;
  origin: string | null;
  purchasePrice: number;
  purchaseDate: GameDate;
  specialization: string | null;
  efficiency: number; // 0-100%
  monthlyCost: number;
  status: 'active' | 'sick' | 'escaped' | 'deceased';
}
