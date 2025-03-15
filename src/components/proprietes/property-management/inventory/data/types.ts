
export interface Transaction {
  id: string;
  date: string;
  type: 'buy' | 'sell' | 'transfer';
  resourceName: string;
  quantity: number;
  unitPrice: number;
  total: number;
  propertyId?: string;
}

export interface Resource {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  value: number;
  category: string;
  location: string;
  lastUpdated: string;
}

export interface ResourceType {
  id: string;
  name: string;
  unit: string;
  categories: string[];
}

export interface MarketPrice {
  resourceId?: string;
  resourceName: string;
  basePrice: number;
  currentPrice: number;
  buyPrice: number;
  sellPrice: number;
  trend: 'up' | 'down' | 'stable';
  volatility: number;
  trendPercentage?: number;
}

export interface PropertyResource {
  id: number;
  propertyId: number;
  name: string;
  type: string;
  quantity: number;
  unit: string;
  value: number;
  trend: 'up' | 'down' | 'stable';
  trendPercentage?: number;
}

export interface ResourceTransaction {
  id: string;
  date: Date | string;
  type: 'achat' | 'vente' | 'transfert';
  resourceName: string;
  quantity: number;
  unit?: string;
  price?: number;
  total?: number;
  propertyId?: string;
  destination?: string;
  source?: string;
}
