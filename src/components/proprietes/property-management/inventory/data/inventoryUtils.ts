
import { propertyResources } from './propertyResources';
import { transactions } from './transactions';

export const getResourcesByPropertyId = (propertyId: number | string): typeof propertyResources => {
  const id = typeof propertyId === 'string' ? parseInt(propertyId, 10) : propertyId;
  return propertyResources.filter(resource => resource.propertyId === id);
};

export const getResourceTypes = (): string[] => {
  const types = new Set(propertyResources.map(resource => resource.type));
  return Array.from(types);
};

export const getTransactionsByPropertyId = (propertyId: number | string): typeof transactions => {
  const id = typeof propertyId === 'string' ? parseInt(propertyId, 10) : propertyId;
  return transactions.filter(transaction => transaction.propertyId === id);
};
