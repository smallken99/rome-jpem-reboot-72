
// Add PropertyTransaction type to property.ts

import { OwnedBuilding } from './buildingTypes';

export interface PropertyTransaction {
  id: string;
  resourceId: string;
  resourceName: string;
  type: 'acquisition' | 'consumption' | 'transfer';
  quantity: number;
  date: Date;
  responsible: string;
  source?: string;
  destination?: string;
  cost?: number;
  reason?: string;
}

export interface TransactionsListProps {
  searchTerm?: string;
  resourceId?: string;
  onTransactionSelect?: (transaction: PropertyTransaction) => void;
  onAddTransaction?: () => void;
  filters?: {
    resourceName?: string;
    type?: string;
    startDate?: Date;
    endDate?: Date;
    responsible?: string;
  };
}

// Re-export building types
export { OwnedBuilding };
