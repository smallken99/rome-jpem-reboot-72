
export interface MarketPrice {
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
  id: string;
  propertyId: number;
  name: string;
  type: string;
  quantity: number;
  quality: 'low' | 'medium' | 'high';
  harvestDate?: string;
  expirationDate?: string;
  marketValue: number;
}

export interface ResourceTransaction {
  id: string;
  propertyId: string;
  resourceName: string;
  type: 'purchase' | 'sale' | 'harvest';
  quantity: number;
  price: number;
  total: number;
  date: string;
}

export interface ResourceInventoryProps {
  resources: PropertyResource[];
  propertyId?: number;
}

export interface ResourcesListProps {
  resources: PropertyResource[];
  propertyId?: number;
}

export interface MarketPricesProps {
  prices: MarketPrice[];
}

export interface ResourceTransactionsProps {
  transactions: ResourceTransaction[];
}
