
import { ResourceItemProps } from '../ResourceItem';

export interface PropertyResource extends ResourceItemProps {
  id: number;
  propertyId: number;
}

export const propertyResources: PropertyResource[] = [
  {
    id: 1,
    propertyId: 1,
    name: 'Blé',
    type: 'Céréale',
    quantity: 12400,
    unit: 'unités',
    value: 24800,
    trend: 'up',
    trendPercentage: 5
  },
  {
    id: 2,
    propertyId: 1,
    name: 'Vin',
    type: 'Produit fini',
    quantity: 5200,
    unit: 'amphores',
    value: 52000,
    trend: 'up',
    trendPercentage: 12
  },
  {
    id: 3,
    propertyId: 1,
    name: 'Huile d\'olive',
    type: 'Produit fini',
    quantity: 3200,
    unit: 'amphores',
    value: 38400,
    trend: 'stable'
  },
  {
    id: 4,
    propertyId: 2,
    name: 'Loyers',
    type: 'Revenu',
    quantity: 15,
    unit: 'logements',
    value: 15000,
    trend: 'stable'
  },
  {
    id: 5,
    propertyId: 3,
    name: 'Loyers',
    type: 'Revenu',
    quantity: 8,
    unit: 'boutiques',
    value: 8000,
    trend: 'down',
    trendPercentage: 3
  },
  {
    id: 6,
    propertyId: 4,
    name: 'Orge',
    type: 'Céréale',
    quantity: 9800,
    unit: 'unités',
    value: 14700,
    trend: 'stable'
  },
  {
    id: 7,
    propertyId: 4,
    name: 'Laine',
    type: 'Textile',
    quantity: 580,
    unit: 'rouleaux',
    value: 5800,
    trend: 'up',
    trendPercentage: 8
  },
  {
    id: 8,
    propertyId: 5,
    name: 'Offrandes',
    type: 'Revenu',
    quantity: 120,
    unit: 'dons',
    value: 6000,
    trend: 'up',
    trendPercentage: 15
  }
];

export const getResourcesByPropertyId = (propertyId: number | string): PropertyResource[] => {
  const id = typeof propertyId === 'string' ? parseInt(propertyId, 10) : propertyId;
  return propertyResources.filter(resource => resource.propertyId === id);
};

export const getResourceTypes = (): string[] => {
  const types = new Set(propertyResources.map(resource => resource.type));
  return Array.from(types);
};

export interface MarketPrice {
  resourceName: string;
  buyPrice: number;
  sellPrice: number;
  trend: 'up' | 'down' | 'stable';
  trendPercentage: number;
}

export const marketPrices: MarketPrice[] = [
  {
    resourceName: 'Blé',
    buyPrice: 2.2,
    sellPrice: 1.8,
    trend: 'up',
    trendPercentage: 5
  },
  {
    resourceName: 'Vin',
    buyPrice: 12,
    sellPrice: 10,
    trend: 'up',
    trendPercentage: 8
  },
  {
    resourceName: 'Huile d\'olive',
    buyPrice: 14,
    sellPrice: 12,
    trend: 'stable',
    trendPercentage: 0
  },
  {
    resourceName: 'Orge',
    buyPrice: 1.8,
    sellPrice: 1.5,
    trend: 'down',
    trendPercentage: 3
  },
  {
    resourceName: 'Laine',
    buyPrice: 12,
    sellPrice: 10,
    trend: 'up',
    trendPercentage: 10
  }
];

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

export const transactions: Transaction[] = [
  {
    id: 1,
    propertyId: 1,
    resourceName: 'Blé',
    quantity: 1000,
    unitPrice: 2,
    total: 2000,
    type: 'sell',
    date: '2023-05-15',
    to: 'Marché de Rome'
  },
  {
    id: 2,
    propertyId: 1,
    resourceName: 'Vin',
    quantity: 500,
    unitPrice: 10,
    total: 5000,
    type: 'sell',
    date: '2023-05-10',
    to: 'Exportation Alexandrie'
  },
  {
    id: 3,
    propertyId: 4,
    resourceName: 'Orge',
    quantity: 800,
    unitPrice: 1.5,
    total: 1200,
    type: 'buy',
    date: '2023-04-22',
    from: 'Ferme voisine'
  },
  {
    id: 4,
    propertyId: 1,
    resourceName: 'Huile d\'olive',
    quantity: 300,
    unitPrice: 12,
    total: 3600,
    type: 'transfer',
    date: '2023-04-15',
    from: 'Domaine de Latium',
    to: 'Stock personnel'
  }
];

export const getTransactionsByPropertyId = (propertyId: number | string): Transaction[] => {
  const id = typeof propertyId === 'string' ? parseInt(propertyId, 10) : propertyId;
  return transactions.filter(transaction => transaction.propertyId === id);
};
