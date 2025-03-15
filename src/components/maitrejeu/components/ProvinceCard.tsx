
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Province, ProvinceCardProps } from '../types/provinces';
import { ChevronRight, MapPin, Users, Coins, Sword, Flag } from 'lucide-react';

export const ProvinceCard: React.FC<ProvinceCardProps> = ({ 
  province, 
  onSelect,
  selected = false
}) => {
  const getLoyauteColor = (loyaute: number) => {
    if (loyaute >= 80) return 'bg-green-500';
    if (loyaute >= 60) return 'bg-lime-500';
    if (loyaute >= 40) return 'bg-amber-500';
    if (loyaute >= 20) return 'bg-orange-500';
    return 'bg-red-500';
  };

  const loyaltyDirection = (province.loyautéVariation || province.variationLoyauté || 0) > 0
    ? "↑" 
    : (province.loyautéVariation || province.variationLoyauté || 0) < 0 
      ? "↓" 
      : "→";

  return (
    <Card 
      className={`overflow-hidden transition-all ${
        selected ? 'ring-2 ring-primary' : 'hover:shadow-md'
      }`}
    >
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-bold">{province.nom}</CardTitle>
          <Badge>{province.région}</Badge>
        </div>
        <p className="text-sm text-muted-foreground">
          Gouverneur: {province.gouverneur || "Aucun"}
        </p>
      </CardHeader>
      
      <CardContent className="pb-3">
        <div className="grid grid-cols-2 gap-x-4 gap-y-2 mb-3">
          <div className="flex items-center gap-1.5">
            <Users className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">{province.population.toLocaleString()}</span>
          </div>
          
          <div className="flex items-center gap-1.5">
            <Coins className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">{province.impôts} As</span>
          </div>
          
          <div className="flex items-center gap-1.5">
            <Sword className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">{province.armée?.légions || 0} légions</span>
          </div>
          
          <div className="flex items-center gap-1.5">
            <Flag className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">
              Loyauté: {province.loyauté}% 
              <span className={`ml-1 ${
                loyaltyDirection === "↑" ? "text-green-600" : 
                loyaltyDirection === "↓" ? "text-red-600" : ""
              }`}>
                {loyaltyDirection}
              </span>
            </span>
          </div>
        </div>
        
        <div className="mb-2">
          <div className="text-xs font-medium mb-1">Loyauté:</div>
          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className={`h-2 rounded-full ${getLoyauteColor(province.loyauté)}`} 
              style={{ width: `${province.loyauté}%` }}
            />
          </div>
        </div>
        
        {province.ressources && province.ressources.length > 0 && (
          <div className="mt-3">
            <div className="text-xs font-medium mb-1">Ressources:</div>
            <div className="flex flex-wrap gap-1">
              {province.ressources.map((resource, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {resource}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </CardContent>
      
      <CardFooter className="pt-0">
        <Button 
          variant="ghost" 
          className="w-full justify-between" 
          onClick={() => onSelect && onSelect(province.id)}
        >
          <span>Détails</span>
          <ChevronRight className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};
