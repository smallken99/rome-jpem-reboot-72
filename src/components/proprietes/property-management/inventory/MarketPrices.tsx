
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowUp, ArrowDown, Minus } from 'lucide-react';
import { MarketPrice } from './data/types';

interface MarketPricesProps {
  prices: MarketPrice[];
}

export const MarketPrices: React.FC<MarketPricesProps> = ({ prices }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Marché des ressources</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground mb-4">
          Consultez les prix actuels du marché et effectuez des achats et ventes.
        </p>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Ressource</TableHead>
              <TableHead>Prix d'achat (as)</TableHead>
              <TableHead>Prix de vente (as)</TableHead>
              <TableHead>Tendance</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {prices.map((price, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{price.resourceName}</TableCell>
                <TableCell>{price.buyPrice} par unité</TableCell>
                <TableCell>{price.sellPrice} par unité</TableCell>
                <TableCell>
                  <Badge 
                    variant={price.trend === 'up' ? 'default' : price.trend === 'down' ? 'destructive' : 'secondary'} 
                    className="flex items-center gap-1 w-fit"
                  >
                    {price.trend === 'up' && <ArrowUp className="h-3 w-3" />}
                    {price.trend === 'down' && <ArrowDown className="h-3 w-3" />}
                    {price.trend === 'stable' && <Minus className="h-3 w-3" />}
                    {price.trendPercentage || 0}%
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="outline" size="sm" className="mr-2">Acheter</Button>
                  <Button variant="outline" size="sm">Vendre</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
