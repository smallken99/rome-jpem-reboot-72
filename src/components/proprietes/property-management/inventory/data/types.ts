
export interface Transaction {
  id: string;
  date: string;
  type: 'buy' | 'sell' | 'transfer';
  resourceName: string;
  quantity: number;
  unitPrice: number;
  total: number;
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
  resourceId: string;
  resourceName: string;
  basePrice: number;
  currentPrice: number;
  trend: 'up' | 'down' | 'stable';
  volatility: number;
}
