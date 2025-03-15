
import { ResourceTransaction } from './types';

export const calculateTransactionTotal = (transaction: ResourceTransaction): number => {
  return transaction.quantity * transaction.price;
};

export const getTransactionTypeColor = (type: 'purchase' | 'sale' | 'harvest'): string => {
  switch (type) {
    case 'purchase':
      return 'text-amber-600';
    case 'sale':
      return 'text-green-600';
    case 'harvest':
      return 'text-blue-600';
    default:
      return 'text-gray-600';
  }
};

export const getTrendIcon = (trend: 'up' | 'down' | 'stable'): string => {
  switch (trend) {
    case 'up':
      return '↑';
    case 'down':
      return '↓';
    case 'stable':
      return '→';
    default:
      return '-';
  }
};

export const getTrendColor = (trend: 'up' | 'down' | 'stable'): string => {
  switch (trend) {
    case 'up':
      return 'text-green-600';
    case 'down':
      return 'text-red-600';
    case 'stable':
      return 'text-gray-600';
    default:
      return 'text-gray-600';
  }
};
