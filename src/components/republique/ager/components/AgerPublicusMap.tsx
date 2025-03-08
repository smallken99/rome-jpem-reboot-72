
import React from 'react';
import { LandParcel } from '../types';
import { Card } from '@/components/ui/card';

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
                <div className="font-medium">{parcel.name}</div>
                <div className="text-xs text-muted-foreground">{parcel.location}</div>
                <div className="text-xs">{parcel.size} iugera</div>
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
