
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, AlertTriangle, Shield, TrendingUp, TrendingDown } from 'lucide-react';
import { Province } from '../types/provinces';

export interface ProvinceCardProps {
  province: Province;
  onSelect?: (id: string) => void;
  selected?: boolean;
  onViewProvince?: (provinceId: string) => void;
}

const getStatusIcon = (status: string) => {
  switch (status.toLowerCase()) {
    case 'pacifiée':
    case 'pacifiee':
      return <CheckCircle className="h-4 w-4 text-green-500" />;
    case 'instable':
      return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
    case 'rebelle':
    case 'en révolte':
    case 'en revolte':
      return <Shield className="h-4 w-4 text-red-500" />;
    default:
      return <AlertTriangle className="h-4 w-4 text-gray-500" />;
  }
};

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case 'pacifiée':
    case 'pacifiee':
      return 'bg-green-100 text-green-800';
    case 'instable':
      return 'bg-yellow-100 text-yellow-800';
    case 'rebelle':
    case 'en révolte':
    case 'en revolte':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

export const ProvinceCard: React.FC<ProvinceCardProps> = ({ 
  province, 
  onSelect, 
  selected = false,
  onViewProvince
}) => {
  // Récupérer la variation de loyauté (gestion de la compatibilité)
  const loyautyVariation = province.variationLoyauté !== undefined 
    ? province.variationLoyauté 
    : province.loyautéVariation;
    
  // Récupérer le dernier événement (gestion de la compatibilité)
  const lastEvent = province.dernierEvénement || province.dernierEvenement;
  
  return (
    <Card 
      className={`cursor-pointer transition-all hover:shadow-md ${selected ? 'ring-2 ring-primary' : ''}`}
      onClick={() => onSelect && onSelect(province.id)}
    >
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{province.nom}</CardTitle>
          <Badge className={getStatusColor(province.status)}>
            <span className="flex items-center gap-1">
              {getStatusIcon(province.status)}
              {province.status}
            </span>
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground">Région: {province.région}</p>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Gouverneur:</span>
            <span className="text-sm">{province.gouverneur}</span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Population:</span>
            <span className="text-sm">{province.population.toLocaleString()}</span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Loyauté:</span>
            <div className="flex items-center gap-1">
              <span className="text-sm">{province.loyauté}%</span>
              {loyautyVariation > 0 ? (
                <TrendingUp className="h-4 w-4 text-green-500" />
              ) : loyautyVariation < 0 ? (
                <TrendingDown className="h-4 w-4 text-red-500" />
              ) : null}
            </div>
          </div>
          
          {lastEvent && (
            <div className="mt-2 pt-2 border-t">
              <p className="text-xs text-muted-foreground">{lastEvent}</p>
            </div>
          )}
          
          {onViewProvince && (
            <div className="mt-3 pt-2 border-t">
              <button 
                className="text-sm text-primary hover:underline w-full text-center"
                onClick={(e) => {
                  e.stopPropagation();
                  onViewProvince(province.id);
                }}
              >
                Voir les détails
              </button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
