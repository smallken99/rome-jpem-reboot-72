import React from 'react';
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, ArrowUp, ArrowDown } from "lucide-react";
import { formatDate } from '@/utils/formatUtils';
import { Province, ProvinceCardProps } from '../types/compatibilityAdapter';

export const ProvinceCard: React.FC<ProvinceCardProps> = ({ province, onViewProvince }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pacifiée': return 'bg-green-100 text-green-800 border-green-200';
      case 'instable': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'rebelle': return 'bg-red-100 text-red-800 border-red-200';
      case 'conquise': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };
  
  const handleProvinceClick = () => {
    onViewProvince(province.id);
  };
  
  return (
    <Card className="cursor-pointer hover:shadow-md transition-shadow">
      <CardHeader>
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">{province.nom}</h3>
          <Badge variant="secondary" className={getStatusColor(province.status)}>
            {province.status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        <p className="text-sm text-gray-500">
          <AlertCircle className="h-4 w-4 inline-block mr-1 align-middle" />
          {province.description}
        </p>
        <div className="flex items-center text-xs">
          <span className="mr-2">Loyauté:</span>
          <span className="font-medium">{province.loyauté}%</span>
          {province.loyauteVariation && (
            <span className={`ml-1 ${province.loyauteVariation > 0 ? 'text-green-600' : 'text-red-600'}`}>
              {province.loyauteVariation > 0 ? <ArrowUp className="h-3 w-3 inline-block align-middle" /> : <ArrowDown className="h-3 w-3 inline-block align-middle" />}
              {Math.abs(province.loyauteVariation)}
            </span>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <span className="text-xs text-gray-600">
          Dernier événement: {formatDate(province.lastEvent?.year, province.lastEvent?.season)}
        </span>
        <Button onClick={handleProvinceClick} size="sm">
          Voir détails
        </Button>
      </CardFooter>
    </Card>
  );
};
