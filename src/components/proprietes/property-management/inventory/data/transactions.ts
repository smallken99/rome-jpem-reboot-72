
import { ResourceTransaction } from '../../../storage/types';

export const transactions: ResourceTransaction[] = [
  {
    id: "1",
    date: new Date('2023-10-15'),
    type: 'achat',
    resourceName: 'Blé',
    quantity: 500,
    unit: 'unités',
    price: 2.2,
    total: 1100,
    propertyId: "1"
  },
  {
    id: "2",
    date: new Date('2023-11-01'),
    type: 'vente',
    resourceName: 'Vin',
    quantity: 200,
    unit: 'amphores',
    price: 12,
    total: 2400,
    propertyId: "1"
  },
  {
    id: "3",
    date: new Date('2023-11-10'),
    type: 'transfert',
    resourceName: 'Huile d\'olive',
    quantity: 100,
    unit: 'amphores',
    source: 'Villa Tusculum',
    destination: 'Domus Romae',
    propertyId: "1"
  },
  {
    id: "4",
    date: new Date('2023-12-01'),
    type: 'achat',
    resourceName: 'Laine',
    quantity: 50,
    unit: 'rouleaux',
    price: 10,
    total: 500,
    propertyId: "4"
  }
];
