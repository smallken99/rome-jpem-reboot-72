
import { MarketPrice } from './types';

export const marketPrices: MarketPrice[] = [
  {
    resourceName: 'Blé',
    basePrice: 2.0,
    currentPrice: 2.2,
    buyPrice: 2.2,
    sellPrice: 1.8,
    trend: 'up',
    volatility: 0.05,
    trendPercentage: 5
  },
  {
    resourceName: 'Vin',
    basePrice: 11.0,
    currentPrice: 12.0,
    buyPrice: 12,
    sellPrice: 10,
    trend: 'up',
    volatility: 0.08,
    trendPercentage: 8
  },
  {
    resourceName: 'Huile d\'olive',
    basePrice: 14.0,
    currentPrice: 14.0,
    buyPrice: 14,
    sellPrice: 12,
    trend: 'stable',
    volatility: 0.03,
    trendPercentage: 0
  },
  {
    resourceName: 'Orge',
    basePrice: 1.9,
    currentPrice: 1.8,
    buyPrice: 1.8,
    sellPrice: 1.5,
    trend: 'down',
    volatility: 0.04,
    trendPercentage: 3
  },
  {
    resourceName: 'Laine',
    basePrice: 10.0,
    currentPrice: 12.0,
    buyPrice: 12,
    sellPrice: 10,
    trend: 'up',
    volatility: 0.1,
    trendPercentage: 10
  }
];
