
import { Transaction } from './types';

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
