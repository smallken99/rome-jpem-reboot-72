
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowUpIcon, ArrowDownIcon, ShieldIcon, CoinIcon } from 'lucide-react';
import { Province, ProvinceCardProps } from '../types/provinces';

export const ProvinceCard: React.FC<ProvinceCardProps> = ({
  province,
  onEdit,
  onDelete,
  onSelect,
  selected = false
}) => {
  const getStatusColor = (status: Province['status']) => {
    switch (status) {
      case 'Pacifiée': return 'bg-green-100 text-green-800 border-green-300';
      case 'Instable': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'En guerre': return 'bg-red-100 text-red-800 border-red-300';
      case 'Rebelle': return 'bg-purple-100 text-purple-800 border-purple-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getLoyaltyTrend = () => {
    const variation = province.variationLoyauté;
    if (variation > 0) {
      return <span className="text-green-600 flex items-center"><ArrowUpIcon className="w-4 h-4 mr-1" />{Math.abs(variation)}%</span>;
    } else if (variation < 0) {
      return <span className="text-red-600 flex items-center"><ArrowDownIcon className="w-4 h-4 mr-1" />{Math.abs(variation)}%</span>;
    } else {
      return <span className="text-gray-600">Stable</span>;
    }
  };

  return (
    <Card className={`overflow-hidden transition-all ${selected ? 'ring-2 ring-primary' : 'hover:shadow-md'}`}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-semibold">{province.nom}</CardTitle>
          <Badge className={`${getStatusColor(province.status)}`}>
            {province.status}
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground">{province.région}</p>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="grid grid-cols-2 gap-2 mb-3">
          <div className="bg-muted/50 p-2 rounded">
            <div className="text-xs text-muted-foreground">Population</div>
            <div className="font-semibold">{province.population.toLocaleString()}</div>
          </div>
          <div className="bg-muted/50 p-2 rounded">
            <div className="text-xs text-muted-foreground">Armée</div>
            <div className="font-semibold flex items-center">
              <ShieldIcon className="w-3 h-3 mr-1" />
              {province.armée} {province.armée > 0 ? 'légions' : 'légion'}
            </div>
          </div>
          <div className="bg-muted/50 p-2 rounded">
            <div className="text-xs text-muted-foreground">Loyauté</div>
            <div className="font-semibold flex items-center justify-between">
              <span>{province.loyauté}%</span>
              <span className="text-xs">{getLoyaltyTrend()}</span>
            </div>
          </div>
          <div className="bg-muted/50 p-2 rounded">
            <div className="text-xs text-muted-foreground">Richesse</div>
            <div className="font-semibold flex items-center">
              <CoinIcon className="w-3 h-3 mr-1" />
              {province.richesse}
            </div>
          </div>
        </div>
        <div className="text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Ressource:</span>
            <span className="font-medium">{province.ressource}</span>
          </div>
          <div className="flex justify-between mt-1">
            <span className="text-muted-foreground">Gouverneur:</span>
            <span className="font-medium">{province.gouverneur || 'Vacant'}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-2 flex justify-between">
        <Button variant="outline" size="sm" onClick={onSelect}>
          Détails
        </Button>
        <div className="space-x-2">
          {onEdit && (
            <Button variant="ghost" size="sm" onClick={() => onEdit(province)}>
              Éditer
            </Button>
          )}
          {onDelete && (
            <Button variant="ghost" size="sm" className="text-destructive" onClick={() => onDelete(province.id)}>
              Supprimer
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};
