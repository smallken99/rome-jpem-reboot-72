
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MarketPrice } from '../data/types';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface MarketPricesTableProps {
  marketPrices: MarketPrice[];
}

export const MarketPricesTable: React.FC<MarketPricesTableProps> = ({ marketPrices }) => {
  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="h-4 w-4 text-green-600" />;
      case 'down':
        return <TrendingDown className="h-4 w-4 text-red-600" />;
      default:
        return <Minus className="h-4 w-4 text-yellow-600" />;
    }
  };

  const getPriceChangeClass = (current: number, base: number) => {
    if (current > base) return 'text-green-600';
    if (current < base) return 'text-red-600';
    return 'text-yellow-600';
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Prix du marché</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground mb-4">
          Consultez les prix actuels du marché pour vos ressources et anticipez les évolutions.
        </p>
        
        {marketPrices.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-muted/50">
                  <th className="text-left p-3 font-medium">Ressource</th>
                  <th className="text-left p-3 font-medium">Prix de base</th>
                  <th className="text-left p-3 font-medium">Prix actuel</th>
                  <th className="text-left p-3 font-medium">Variation</th>
                  <th className="text-left p-3 font-medium">Tendance</th>
                  <th className="text-left p-3 font-medium">Volatilité</th>
                </tr>
              </thead>
              <tbody>
                {marketPrices.map(price => {
                  const priceChange = ((price.currentPrice - price.basePrice) / price.basePrice) * 100;
                  
                  return (
                    <tr key={price.resourceId} className="border-b hover:bg-muted/20">
                      <td className="p-3 font-medium">{price.resourceName}</td>
                      <td className="p-3">{price.basePrice} As</td>
                      <td className={`p-3 font-medium ${getPriceChangeClass(price.currentPrice, price.basePrice)}`}>
                        {price.currentPrice} As
                      </td>
                      <td className={`p-3 ${getPriceChangeClass(price.currentPrice, price.basePrice)}`}>
                        {priceChange > 0 ? '+' : ''}{priceChange.toFixed(1)}%
                      </td>
                      <td className="p-3">
                        <div className="flex items-center">
                          {getTrendIcon(price.trend)}
                          <span className="ml-1 capitalize">{price.trend}</span>
                        </div>
                      </td>
                      <td className="p-3">
                        {(price.volatility * 100).toFixed(0)}%
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            Aucune information de prix disponible
          </div>
        )}
        
        <div className="mt-4 text-xs text-muted-foreground">
          Note: Les prix peuvent varier selon les saisons et les événements politiques ou militaires.
        </div>
      </CardContent>
    </Card>
  );
};
