
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Province } from '../types/provinces';

interface ProvincesMapProps {
  provinces: Province[];
  onProvinceSelect: (id: string) => void;
}

export const ProvincesMap: React.FC<ProvincesMapProps> = ({
  provinces,
  onProvinceSelect,
}) => {
  // Cette fonction simulera l'affichage d'une carte
  // Dans une implémentation réelle, on utiliserait une bibliothèque de cartographie
  // comme Leaflet ou MapBox

  const renderProvinceMarker = (province: Province, index: number) => {
    const getStatusColor = (): "default" | "destructive" | "outline" | "secondary" | "success" => {
      switch (province.statut) {
        case 'Pacifiée':
          return 'success';
        case 'Instable':
          return 'secondary';
        case 'En guerre':
          return 'destructive';
        case 'Rebelle':
          return 'destructive';
        default:
          return 'default';
      }
    };

    // Calculer une position aléatoire mais déterministe pour la démonstration
    const top = 50 + ((index * 37) % 400);
    const left = 100 + ((index * 53) % 400);

    return (
      <div
        key={province.id}
        className="absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2 hover:z-10"
        style={{ top: `${top}px`, left: `${left}px` }}
        onClick={() => onProvinceSelect(province.id)}
      >
        <div className="flex flex-col items-center space-y-1">
          <div className="w-4 h-4 bg-primary rounded-full" />
          <Badge variant={getStatusColor()} className="whitespace-nowrap">
            {province.nom}
          </Badge>
        </div>
      </div>
    );
  };

  return (
    <div className="relative w-full h-full bg-slate-100 overflow-hidden">
      {/* Fond de carte simplifié */}
      <div className="absolute inset-0 bg-[url('/images/roman-empire-map.svg')] bg-no-repeat bg-cover opacity-20"></div>
      
      <div className="absolute inset-0 p-4 flex items-center justify-center">
        {provinces.length === 0 ? (
          <div className="text-center text-muted-foreground">
            Aucune province à afficher. Ajoutez des provinces pour les voir sur la carte.
          </div>
        ) : (
          provinces.map(renderProvinceMarker)
        )}
      </div>
      
      <div className="absolute bottom-4 right-4 bg-white p-2 rounded shadow-md text-xs">
        <div className="flex items-center space-x-2 mb-1">
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          <span>Pacifiée</span>
        </div>
        <div className="flex items-center space-x-2 mb-1">
          <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
          <span>Instable</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <span>En guerre/Rebelle</span>
        </div>
      </div>
    </div>
  );
};
