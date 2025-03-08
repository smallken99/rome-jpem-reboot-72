
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowUp, ArrowDown, Minus } from 'lucide-react';

export interface ResourceItemProps {
  name: string;
  type: string;
  quantity: number;
  unit: string;
  value: number;
  trend?: 'up' | 'down' | 'stable';
  trendPercentage?: number;
}

export const ResourceItem: React.FC<ResourceItemProps> = ({
  name,
  type,
  quantity,
  unit,
  value,
  trend = 'stable',
  trendPercentage = 0
}) => {
  const renderTrendIcon = () => {
    switch (trend) {
      case 'up':
        return <ArrowUp className="h-3 w-3 text-green-500" />;
      case 'down':
        return <ArrowDown className="h-3 w-3 text-red-500" />;
      default:
        return <Minus className="h-3 w-3 text-gray-500" />;
    }
  };

  const formatValue = (value: number) => {
    return new Intl.NumberFormat('fr-FR').format(value);
  };

  return (
    <Card className="bg-muted/50 hover:bg-muted/70 transition-colors">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-medium">{name}</h3>
            <p className="text-sm text-muted-foreground">{type}</p>
          </div>
          <div className="text-right">
            <p className="font-bold">{formatValue(quantity)} {unit}</p>
            <p className="text-sm text-muted-foreground">Valeur: {formatValue(value)} as</p>
          </div>
        </div>
        {trend !== 'stable' && (
          <div className="mt-2 flex items-center justify-end">
            <Badge 
              variant={trend === 'up' ? 'default' : 'destructive'} 
              className="flex items-center gap-1"
            >
              {renderTrendIcon()}
              {trendPercentage}%
            </Badge>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
