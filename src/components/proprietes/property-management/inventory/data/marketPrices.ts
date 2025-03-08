
import { MarketPrice } from './types';

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
