
import { PropertyResource } from './types';

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
