
import { ResourceItemProps } from '../ResourceItem';

export interface PropertyResource extends ResourceItemProps {
  id: number;
  propertyId: number;
}

export interface MarketPrice {
  resourceName: string;
  buyPrice: number;
  sellPrice: number;
  trend: 'up' | 'down' | 'stable';
  trendPercentage: number;
}

export interface Transaction {
  id: number;
  propertyId: number;
  resourceName: string;
  quantity: number;
  unitPrice: number;
  total: number;
  type: 'buy' | 'sell' | 'transfer';
  date: string;
  to?: string;
  from?: string;
}
