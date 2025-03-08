
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowDownIcon, ArrowUpIcon, CircleAlertIcon, Globe, MapIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Province } from '../types/provinces';

interface ProvinceCardProps {
  province: Province;
  onClick: (id: string) => void;
}

export const ProvinceCard: React.FC<ProvinceCardProps> = ({ province, onClick }) => {
  // Détermine la couleur du badge en fonction du statut
  const getStatusColor = () => {
    switch (province.status) {
      case 'pacifiée':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'instable':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'rebelle':
        return 'bg-red-100 text-red-800 border-red-300';
      case 'conquise':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'en révolte':
        return 'bg-rose-100 text-rose-800 border-rose-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  // Détermine l'icône et la couleur pour la variation de loyauté
  const getLoyaltyVariation = () => {
    if (!province.loyautéVariation || province.loyautéVariation === 0) {
      return { icon: null, color: 'text-gray-500' };
    }
    
    if (province.loyautéVariation > 0) {
      return {
        icon: <ArrowUpIcon className="h-4 w-4 text-green-500" />,
        color: 'text-green-600'
      };
    } else {
      return {
        icon: <ArrowDownIcon className="h-4 w-4 text-red-500" />,
        color: 'text-red-600'
      };
    }
  };

  const loyaltyInfo = getLoyaltyVariation();

  return (
    <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => onClick(province.id)}>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold flex items-center justify-between">
          {province.nom}
          <Badge className={getStatusColor()}>
            {province.status}
          </Badge>
        </CardTitle>
        <div className="text-sm text-gray-500">
          Gouverneur: {province.gouverneur || 'Non assigné'}
        </div>
      </CardHeader>
      
      <CardContent className="pb-2">
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div>
            <div className="text-gray-500">Population</div>
            <div className="font-medium">{province.population.toLocaleString()}</div>
          </div>
          
          <div>
            <div className="text-gray-500">Région</div>
            <div className="font-medium">{province.région}</div>
          </div>
          
          <div>
            <div className="text-gray-500">Richesse</div>
            <div className="font-medium">{province.richesse}</div>
          </div>
          
          <div>
            <div className="text-gray-500 flex items-center gap-1">
              Loyauté
              {loyaltyInfo.icon}
            </div>
            <div className={`font-medium ${loyaltyInfo.color}`}>
              {province.loyauté}
              {province.loyautéVariation ? ` (${province.loyautéVariation > 0 ? '+' : ''}${province.loyautéVariation})` : ''}
            </div>
          </div>
        </div>
      
        {province.dernierEvenement && (
          <div className="mt-3 p-2 bg-gray-50 rounded-sm text-xs">
            <div className="font-medium text-rose-700 flex items-center gap-1">
              <CircleAlertIcon className="h-3 w-3" />
              Dernier événement
            </div>
            <div className="mt-1">{province.dernierEvenement}</div>
          </div>
        )}
      </CardContent>
      
      <CardFooter>
        <Button variant="outline" size="sm" className="w-full" onClick={(e) => {
          e.stopPropagation();
          onClick(province.id);
        }}>
          <MapIcon className="h-4 w-4 mr-2" />
          Détails
        </Button>
      </CardFooter>
    </Card>
  );
};
