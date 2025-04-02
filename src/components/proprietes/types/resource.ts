
export interface ResourceItem {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  value: number;
  totalValue: number;
  category: 'food' | 'material' | 'luxury';
  location: string;
  description?: string;
  expirationDate?: Date;
  acquiredDate?: Date;
}

export interface StorageStats {
  capacity: number;
  used: number;
  uniqueItems: number;
  totalValue: number;
}

export interface ResourceTransactionType {
  id: string;
  resourceId: string;
  type: 'acquisition' | 'consumption' | 'transfer';
  quantity: number;
  date: Date;
  value: number;
  source?: string;
  destination?: string;
}

export interface ResourceFilter {
  category?: 'food' | 'material' | 'luxury';
  name?: string;
  location?: string;
  sortBy?: 'name' | 'quantity' | 'value' | 'date';
  sortOrder?: 'asc' | 'desc';
}
