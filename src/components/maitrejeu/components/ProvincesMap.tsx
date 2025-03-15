
import React from 'react';
import { Province } from '../types/provinces';
import { MapPin, Flag } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface ProvincesMapProps {
  provinces: Province[];
  onProvinceSelect: (provinceId: string) => void;
}

export const ProvincesMap: React.FC<ProvincesMapProps> = ({ provinces, onProvinceSelect }) => {
  // Utiliser Map pour simplifier l'affichage
  return (
    <div className="relative h-full w-full bg-[url('/images/roman-map.jpg')] bg-cover bg-center">
      <div className="absolute inset-0 bg-black/20"></div>
      
      {provinces.map((province) => {
        const position = province.position || province.coordonnées || { x: 50, y: 50 };
        
        return (
          <TooltipProvider key={province.id}>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 group"
                  style={{
                    left: `${position.x}%`,
                    top: `${position.y}%`
                  }}
                  onClick={() => onProvinceSelect(province.id)}
                >
                  <div className="flex flex-col items-center">
                    <div className={`p-1 rounded-full transition-all duration-200 
                      ${province.loyauté > 70 ? 'bg-green-500' : 
                        province.loyauté > 40 ? 'bg-amber-500' : 'bg-red-500'} 
                      group-hover:scale-125`}>
                      {province.status === 'capital' ? (
                        <Flag className="h-6 w-6 text-white" />
                      ) : (
                        <MapPin className="h-6 w-6 text-white" />
                      )}
                    </div>
                    <span className="font-bold text-xs bg-black/70 text-white px-2 py-0.5 rounded mt-1 whitespace-nowrap">
                      {province.nom}
                    </span>
                  </div>
                </button>
              </TooltipTrigger>
              <TooltipContent side="top">
                <div className="space-y-1 p-1">
                  <p className="font-bold">{province.nom}</p>
                  <p className="text-xs">Gouverneur: {province.gouverneur}</p>
                  <div className="flex gap-1 mt-1">
                    <Badge variant={province.loyauté > 70 ? "success" : 
                      province.loyauté > 40 ? "warning" : "destructive"}>
                      Loyauté: {province.loyauté}%
                    </Badge>
                    <Badge variant="outline">
                      Pop: {(province.population / 1000).toFixed(0)}K
                    </Badge>
                  </div>
                </div>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        );
      })}
    </div>
  );
};
