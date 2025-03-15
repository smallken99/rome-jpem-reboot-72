
import { ResourceTransaction } from './types';

export const resourceTransactions: ResourceTransaction[] = [
  {
    id: "1",
    propertyId: "1",
    resourceName: "Blé",
    type: "sale",
    quantity: 500,
    price: 2,
    total: 1000,
    date: "15 Mars 724 AUC"
  },
  {
    id: "2",
    propertyId: "1",
    resourceName: "Vin",
    type: "sale",
    quantity: 120,
    price: 10,
    total: 1200,
    date: "2 Avril 724 AUC"
  },
  {
    id: "3",
    propertyId: "4",
    resourceName: "Orge",
    type: "purchase",
    quantity: 300,
    price: 1.5,
    total: 450,
    date: "10 Mai 724 AUC"
  },
  {
    id: "4",
    propertyId: "1",
    resourceName: "Huile d'olive",
    type: "harvest",
    quantity: 800,
    price: 0,
    total: 0,
    date: "20 Juin 724 AUC"
  },
  {
    id: "5",
    propertyId: "4",
    resourceName: "Laine",
    type: "sale",
    quantity: 100,
    price: 10,
    total: 1000,
    date: "5 Juillet 724 AUC"
  }
];
