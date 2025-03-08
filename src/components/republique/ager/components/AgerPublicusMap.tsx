
import React from 'react';
import { LandParcel } from '../types';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { UsersRound, Wheat, Trees } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface AgerPublicusMapProps {
  parcels: LandParcel[];
  isLoading: boolean;
  onSelectParcel: (parcel: LandParcel) => void;
  selectedParcelId?: string;
}

export const AgerPublicusMap: React.FC<AgerPublicusMapProps> = ({ 
  parcels, 
  isLoading, 
  onSelectParcel,
  selectedParcelId
}) => {
  if (isLoading) {
    return (
      <Card className="p-6 flex items-center justify-center h-[400px]">
        <div className="text-muted-foreground italic">Chargement de la carte...</div>
      </Card>
    );
  }
  
  // Aide à obtenir l'icône du type de parcelle
  const getParcelTypeIcon = (type: LandParcel['type']) => {
    switch (type) {
      case 'cultivable':
        return <Wheat className="h-4 w-4 text-amber-600" />;
      case 'forest':
        return <Trees className="h-4 w-4 text-emerald-700" />;
      default:
        return null;
    }
  };
  
  // Obtenir une couleur basée sur l'efficacité de la main d'œuvre
  const getEfficiencyColor = (efficiency?: number) => {
    if (!efficiency) return 'bg-gray-200';
    if (efficiency >= 80) return 'bg-green-500';
    if (efficiency >= 60) return 'bg-green-400';
    if (efficiency >= 40) return 'bg-yellow-400';
    if (efficiency >= 20) return 'bg-orange-400';
    return 'bg-red-500';
  };
  
  // This is a placeholder for a real map implementation
  // In a real app, this would use a mapping library like Leaflet or Google Maps
  return (
    <Card className="p-0 overflow-hidden">
      <div className="relative bg-stone-100 h-[400px] border-b">
        <div className="absolute inset-0 p-4 flex flex-col items-center justify-center">
          <p className="text-muted-foreground text-center mb-4">
            Carte interactive des terres publiques de la République
          </p>
          
          <div className="grid grid-cols-3 gap-3 w-full max-w-2xl">
            {parcels.map(parcel => (
              <div 
                key={parcel.id}
                className={`p-3 rounded-lg border cursor-pointer text-center transition-colors
                  ${selectedParcelId === parcel.id 
                    ? 'bg-rome-gold/20 border-rome-gold' 
                    : 'bg-white hover:bg-stone-50 border-stone-200'
                  }
                  ${parcel.type === 'cultivable' && 'border-l-4 border-l-green-500'}
                  ${parcel.type === 'pastoral' && 'border-l-4 border-l-amber-500'}
                  ${parcel.type === 'forest' && 'border-l-4 border-l-emerald-700'}
                  ${parcel.type === 'wetland' && 'border-l-4 border-l-blue-500'}
                  ${parcel.type === 'rocky' && 'border-l-4 border-l-gray-500'}
                `}
                onClick={() => onSelectParcel(parcel)}
              >
                <div className="font-medium flex items-center justify-center gap-1">
                  {getParcelTypeIcon(parcel.type)} 
                  <span>{parcel.name}</span>
                </div>
                <div className="text-xs text-muted-foreground">{parcel.location}</div>
                <div className="text-xs">{parcel.size} iugera</div>
                
                {/* Indicateur de main d'œuvre */}
                <div className="mt-2 flex justify-center gap-1">
                  {parcel.workforce && (
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Badge variant="outline" className="flex items-center gap-1 h-5">
                            <UsersRound className="h-3 w-3" />
                            <span>{(parcel.workforce.magistrates || 0) + (parcel.workforce.overseers || 0) + (parcel.workforce.publicSlaves || 0)}</span>
                          </Badge>
                        </TooltipTrigger>
                        <TooltipContent>
                          <div className="text-xs">
                            <p>Magistrats: {parcel.workforce.magistrates || 0}</p>
                            <p>Contremaîtres: {parcel.workforce.overseers || 0}</p>
                            <p>Esclaves: {parcel.workforce.publicSlaves || 0}</p>
                          </div>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  )}
                  
                  {parcel.workforce?.efficiency !== undefined && (
                    <div className="flex items-center gap-1">
                      <div 
                        className={`h-2 w-2 rounded-full ${getEfficiencyColor(parcel.workforce.efficiency)}`}
                      ></div>
                      <span className="text-xs">{parcel.workforce.efficiency}%</span>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {parcels.length === 0 && (
              <div className="col-span-3 p-6 text-center text-muted-foreground">
                Aucune parcelle trouvée.
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="p-3 text-xs text-muted-foreground bg-muted/20">
        Note: Ceci est une représentation simplifiée. Cliquez sur une parcelle pour voir ses détails.
      </div>
    </Card>
  );
};
