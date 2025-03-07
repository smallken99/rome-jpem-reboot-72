
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Info, Eye, Map } from 'lucide-react';
import { toast } from 'sonner';

interface Land {
  id: string;
  name: string;
  location: string;
  description: string;
  size: string;
  type: string;
  value: number;
  status: 'available' | 'allocated' | 'reserved';
  allocatedTo?: string;
  revenue?: number;
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
  // Placeholder fonction pour simuler un zoom
  const handleZoomIn = () => {
    toast.info("Carte agrandie");
  };

  const handleZoomOut = () => {
    toast.info("Carte réduite");
  };

  const handleExportMap = () => {
    toast.success("Carte exportée avec succès");
  };

  // Combiner toutes les terres pour la carte
  const allLands = [...availableLands, ...ownedLands];

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <div>
          <p className="text-sm text-muted-foreground">
            Visualisez l'ager publicus de la République romaine et sélectionnez des terres pour les gérer.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={handleZoomIn}>
            <span className="text-lg">+</span>
          </Button>
          <Button variant="outline" size="sm" onClick={handleZoomOut}>
            <span className="text-lg">-</span>
          </Button>
          <Button variant="outline" size="sm" onClick={handleExportMap}>
            <Map className="h-4 w-4 mr-1" />
            Exporter
          </Button>
        </div>
      </div>
      
      {/* Visualisation simplifiée de la carte des terres */}
      <div className="relative h-[500px] border rounded-md overflow-hidden bg-amber-50">
        {/* Fond de carte stylisé */}
        <div className="absolute inset-0 bg-[url('/images/roman-pattern.svg')] opacity-5"></div>
        
        {/* Représentation des terres sur la carte */}
        <div className="absolute inset-0 p-6 grid grid-cols-3 gap-4">
          {allLands.map((land) => (
            <div 
              key={land.id}
              className={`
                relative p-4 rounded-md border cursor-pointer transition-all
                ${selectedLandId === land.id 
                  ? 'border-rome-gold shadow-md scale-105 z-10 bg-white' 
                  : 'border-gray-200 hover:border-rome-gold/50 bg-white/90'}
                ${land.status === 'available' ? 'border-green-200' : ''}
                ${land.status === 'allocated' ? 'border-blue-200' : ''}
                ${land.status === 'reserved' ? 'border-amber-200' : ''}
              `}
              onClick={() => setSelectedLandId(land.id)}
            >
              <div className="flex justify-between items-start">
                <h3 className="font-cinzel text-sm font-medium">{land.name}</h3>
                <Badge 
                  className={`
                    text-xs
                    ${land.status === 'available' ? 'bg-green-100 text-green-800' : ''}
                    ${land.status === 'allocated' ? 'bg-blue-100 text-blue-800' : ''}
                    ${land.status === 'reserved' ? 'bg-amber-100 text-amber-800' : ''}
                  `}
                >
                  {land.status === 'available' ? 'Disponible' : ''}
                  {land.status === 'allocated' ? 'Attribuée' : ''}
                  {land.status === 'reserved' ? 'Réservée' : ''}
                </Badge>
              </div>
              
              <div className="mt-2 flex items-center text-xs text-muted-foreground">
                <MapPin className="h-3 w-3 mr-1" />
                {land.location}
              </div>
              
              <div className="mt-2 text-xs">{land.size}</div>
              
              {land.status === 'allocated' && (
                <div className="mt-2 text-xs font-medium">
                  Attribuée à: {land.allocatedTo}
                </div>
              )}
              
              {selectedLandId === land.id && (
                <div className="absolute -bottom-2 -right-2">
                  <Button size="sm" variant="outline" className="h-8 w-8 p-0 rounded-full bg-white">
                    <Info className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>
          ))}
        </div>
        
        {/* Légende de la carte */}
        <div className="absolute bottom-4 left-4 bg-white/90 p-3 rounded-md border shadow-sm">
          <h4 className="text-xs font-cinzel font-semibold mb-2">Légende</h4>
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs">
              <div className="w-3 h-3 bg-green-100 border border-green-200 rounded-sm"></div>
              <span>Terres disponibles</span>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <div className="w-3 h-3 bg-blue-100 border border-blue-200 rounded-sm"></div>
              <span>Terres attribuées</span>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <div className="w-3 h-3 bg-amber-100 border border-amber-200 rounded-sm"></div>
              <span>Terres réservées</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Informations sur la terre sélectionnée */}
      {selectedLandId && (
        <div className="mt-4 p-4 border rounded-md bg-muted/20">
          <h3 className="font-cinzel font-medium mb-2">Détails de la terre sélectionnée</h3>
          {(() => {
            const selectedLand = allLands.find(land => land.id === selectedLandId);
            if (!selectedLand) return <p>Aucune terre sélectionnée</p>;
            
            return (
              <div className="space-y-2">
                <p className="text-sm"><span className="font-medium">Nom:</span> {selectedLand.name}</p>
                <p className="text-sm"><span className="font-medium">Description:</span> {selectedLand.description}</p>
                <p className="text-sm"><span className="font-medium">Localisation:</span> {selectedLand.location}</p>
                <p className="text-sm"><span className="font-medium">Type:</span> {selectedLand.type}</p>
                <p className="text-sm"><span className="font-medium">Superficie:</span> {selectedLand.size}</p>
                <p className="text-sm"><span className="font-medium">Valeur estimée:</span> {selectedLand.value.toLocaleString()} As</p>
                {selectedLand.status === 'allocated' && (
                  <>
                    <p className="text-sm"><span className="font-medium">Attribuée à:</span> {selectedLand.allocatedTo}</p>
                    <p className="text-sm"><span className="font-medium">Revenu annuel:</span> {selectedLand.revenue?.toLocaleString()} As</p>
                  </>
                )}
              </div>
            );
          })()}
        </div>
      )}
    </div>
  );
};
