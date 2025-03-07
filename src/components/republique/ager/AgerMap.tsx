
import React from 'react';
import { MapPin } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface Land {
  id: string;
  name: string;
  location: string;
  status: 'available' | 'allocated' | 'reserved';
}

interface AgerMapProps {
  selectedLandId: string | null;
  setSelectedLandId: (id: string) => void;
  availableLands: Land[];
  ownedLands: Land[];
}

export const AgerMap: React.FC<AgerMapProps> = ({ 
  selectedLandId, 
  setSelectedLandId,
  availableLands,
  ownedLands
}) => {
  const allLands = [...availableLands, ...ownedLands];
  
  // Simuler une carte basique avec positionnement des terres
  const regions = {
    "Campanie": { x: 60, y: 65 },
    "Latium": { x: 45, y: 55 },
    "Lucanie": { x: 70, y: 75 },
    "Étrurie": { x: 35, y: 40 },
    "Vénétie": { x: 30, y: 25 },
    "Sicile": { x: 65, y: 90 }
  };

  // Obtenir la couleur du marqueur selon le statut
  const getMarkerColor = (status: string) => {
    switch (status) {
      case 'available': return 'bg-green-500';
      case 'allocated': return 'bg-blue-500';
      case 'reserved': return 'bg-amber-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-4 mb-4">
        <div className="flex items-center">
          <span className="h-3 w-3 rounded-full bg-green-500 mr-2"></span>
          <span className="text-sm">Disponible</span>
        </div>
        <div className="flex items-center">
          <span className="h-3 w-3 rounded-full bg-blue-500 mr-2"></span>
          <span className="text-sm">Attribuée</span>
        </div>
        <div className="flex items-center">
          <span className="h-3 w-3 rounded-full bg-amber-500 mr-2"></span>
          <span className="text-sm">Réservée</span>
        </div>
      </div>
      
      <div className="relative border rounded-md bg-stone-100 h-96 overflow-hidden">
        {/* Image de fond de l'Italie */}
        <div className="absolute inset-0 opacity-20 bg-[url('https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/Italy_map-it.svg/800px-Italy_map-it.svg.png')] bg-contain bg-center bg-no-repeat"></div>
        
        {/* Placer les marqueurs des terres */}
        {allLands.map((land) => {
          const position = regions[land.location as keyof typeof regions] || { x: 50, y: 50 };
          const isSelected = selectedLandId === land.id;
          
          return (
            <div 
              key={land.id}
              className={`absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2 transition-all ${isSelected ? 'z-20 scale-110' : 'z-10'}`}
              style={{ 
                left: `${position.x}%`, 
                top: `${position.y}%` 
              }}
              onClick={() => setSelectedLandId(land.id)}
            >
              <div className={`flex flex-col items-center relative`}>
                <div className={`h-5 w-5 rounded-full ${getMarkerColor(land.status)} shadow-md flex items-center justify-center text-white`}>
                  <MapPin className="h-3 w-3" />
                </div>
                
                {isSelected && (
                  <div className="absolute top-6 bg-white rounded-md shadow-md p-2 min-w-48 z-30">
                    <h4 className="font-cinzel text-sm font-semibold">{land.name}</h4>
                    <p className="text-xs text-muted-foreground">{land.location}</p>
                    <Badge className="mt-1 text-xs">
                      {land.status === 'available' ? 'Disponible' : 
                       land.status === 'allocated' ? 'Attribuée' : 'Réservée'}
                    </Badge>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="bg-stone-50 p-3 rounded border border-stone-200">
        <p className="text-sm text-muted-foreground italic">
          Cliquez sur un marqueur pour voir les détails de la terre. Les terres disponibles peuvent être attribuées à des citoyens romains.
        </p>
      </div>
    </div>
  );
};
