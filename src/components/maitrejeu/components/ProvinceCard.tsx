
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { EyeIcon, TrendingUpIcon, TrendingDownIcon } from 'lucide-react';
import { Province } from '../types/provinces';

export interface ProvinceCardProps {
  province: Province;
  onViewProvince: (id: string) => void;
}

export const ProvinceCard: React.FC<ProvinceCardProps> = ({ province, onViewProvince }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pacifiée':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'instable':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'rebelle':
        return 'bg-red-100 text-red-800 border-red-300';
      case 'conquise':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'en révolte':
        return 'bg-red-100 text-red-800 border-red-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  return (
    <Card className="border-2 hover:border-rome-gold/50 transition-all duration-200">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-semibold">{province.nom}</CardTitle>
          <Badge variant="outline" className={getStatusColor(province.status)}>
            {province.status}
          </Badge>
        </div>
        <CardDescription>Gouverneur: {province.gouverneur || 'Aucun'}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex justify-between items-center text-sm">
            <span>Population:</span>
            <span className="font-medium">{province.population.toLocaleString()}</span>
          </div>
          
          {province.loyauté !== undefined && (
            <div className="flex justify-between items-center text-sm">
              <span>Loyauté:</span>
              <div className="flex items-center">
                <span className="font-medium mr-1">{province.loyauté}%</span>
                {province.variationLoyauté && province.variationLoyauté > 0 && (
                  <TrendingUpIcon className="h-4 w-4 text-green-500" />
                )}
                {province.variationLoyauté && province.variationLoyauté < 0 && (
                  <TrendingDownIcon className="h-4 w-4 text-red-500" />
                )}
              </div>
            </div>
          )}
          
          {province.richesse !== undefined && (
            <div className="flex justify-between items-center text-sm">
              <span>Richesse:</span>
              <span className="font-medium">{province.richesse.toLocaleString()} as</span>
            </div>
          )}
          
          {province.dernierEvénement && (
            <div className="text-sm mt-2 pt-2 border-t border-gray-200">
              <p className="text-muted-foreground">Dernier événement: {province.dernierEvénement}</p>
            </div>
          )}
          
          <div className="flex justify-end space-x-2 pt-2">
            <Button 
              size="sm" 
              variant="outline" 
              className="flex items-center gap-1"
              onClick={() => onViewProvince(province.id)}
            >
              <EyeIcon className="h-4 w-4" />
              <span>Détails</span>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
