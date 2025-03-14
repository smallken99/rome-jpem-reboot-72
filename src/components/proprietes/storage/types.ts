
export interface Resource {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  category: string;
  location: string;
  lastUpdate: Date;
  quality?: string;
  origin?: string;
  expirationDate?: Date;
}

export interface Transaction {
  id: string;
  resourceId: string;
  resourceName: string;
  type: 'acquisition' | 'consumption' | 'transfer';
  quantity: number;
  date: Date;
  responsible: string;
  source?: string;
  destination?: string;
  reason?: string;
  cost?: number;
}

export interface StorageLocation {
  id: string;
  name: string;
  capacity: number;
  usedCapacity: number;
  type: 'warehouse' | 'cellar' | 'granary' | 'armory' | string;
  address?: string;
  security?: string;
  climate?: string;
}

export interface ResourceFilter {
  name?: string;
  category?: string;
  location?: string;
  minQuantity?: number;
  maxQuantity?: number;
  quality?: string;
}

export interface TransactionFilter {
  resourceName?: string;
  type?: 'acquisition' | 'consumption' | 'transfer';
  startDate?: Date;
  endDate?: Date;
  responsible?: string;
}

export interface ResourcesListProps {
  searchTerm?: string;
  onResourceSelect?: (resource: Resource) => void;
  onAddResource?: () => void;
  filters?: ResourceFilter;
}

export interface TransactionsListProps {
  searchTerm?: string;
  resourceId?: string;
  onTransactionSelect?: (transaction: Transaction) => void;
  onAddTransaction?: () => void;
  filters?: TransactionFilter;
}

export interface StorageLocationsProps {
  onLocationSelect?: (location: StorageLocation) => void;
  onAddLocation?: () => void;
}

export interface ResourceManagementProps {
  resourceId?: string;
  onBack?: () => void;
}

export interface ResourceTransactionsProps {
  resourceId: string;
  onBack?: () => void;
}
