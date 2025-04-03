
export enum BuildingType {
  TEMPLE = 'temple',
  FORUM = 'forum',
  BASILICA = 'basilica',
  THERMES = 'thermes',
  THEATRE = 'theatre',
  AMPHITHEATRE = 'amphitheatre',
  AQUEDUC = 'aqueduc',
  ROUTE = 'route',
  BATHHOUSE = 'bathhouse',
  BARRACKS = 'barracks',
  ACADEMY = 'academy'
}

export interface BuildingOwner {
  id: string;
  name: string;
  type: 'senateur' | 'famille' | 'public' | 'temple';
}

export interface BuildingFilter {
  type?: BuildingType | string;
  status?: string;
  minCondition?: number;
  maxCondition?: number;
  location?: string;
  owner?: string;
  search?: string;
}

export interface Building {
  id: string;
  name: string;
  type: BuildingType | string;
  location: string;
  condition: number;
  status: string;
  value: number;
  maintenance: number;
  constructionDate?: Date | string;
  lastMaintenance?: Date | string;
  owner?: BuildingOwner;
  description?: string;
  workers?: number;
  income?: number;
  maintenanceLevel?: number;
}

export interface BuildingCreationData {
  name: string;
  type: BuildingType | string;
  location: string;
  condition: number;
  status: string;
  value: number;
  maintenance: number;
  constructionDate?: Date | string;
  lastMaintenance?: Date | string;
  owner?: BuildingOwner;
  description?: string;
  workers?: number;
}

export enum BuildingStatus {
  EXCELLENT = 'excellent',
  GOOD = 'good',
  AVERAGE = 'average',
  POOR = 'poor',
  FAIR = 'fair',
  RUINED = 'ruined'
}
