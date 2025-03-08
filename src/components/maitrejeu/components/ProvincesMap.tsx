
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Province } from '../types/provinces';

interface ProvincesMapProps {
  provinces: Province[];
  onSelectProvince: (id: string) => void;
  selectedProvinceId?: string;
}

const getProvinceColor = (status: string) => {
  switch (status.toLowerCase()) {
    case 'pacifiée':
    case 'pacifiee':
      return 'bg-green-500';
    case 'instable':
      return 'bg-yellow-500';
    case 'rebelle':
    case 'en révolte':
    case 'en revolte':
      return 'bg-red-500';
    case 'conquise':
      return 'bg-blue-500';
    default:
      return 'bg-gray-500';
  }
};

export const ProvincesMap: React.FC<ProvincesMapProps> = ({ 
  provinces, 
  onSelectProvince, 
  selectedProvinceId 
}) => {
  return (
    <div className="relative w-full h-[500px] border rounded-lg bg-slate-100">
      <div className="absolute inset-0 p-4">
        <h3 className="text-lg font-medium mb-2">Carte des Provinces</h3>
        
        {/* Représentation simplifiée de la carte */}
        {provinces.map(province => {
          // Gérer la compatibilité entre position et coordonnées
          const coords = province.coordonnées || province.position;
          if (!coords) return null;
          
          const isSelected = selectedProvinceId === province.id;
          
          return (
            <div 
              key={province.id}
              className={`absolute cursor-pointer transition-all duration-200 ${isSelected ? 'z-10' : 'z-0'}`}
              style={{ 
                left: `${coords.x}px`, 
                top: `${coords.y}px`,
                transform: 'translate(-50%, -50%)'
              }}
              onClick={() => onSelectProvince(province.id)}
            >
              <div 
                className={`${getProvinceColor(province.status)} w-4 h-4 rounded-full ${
                  isSelected ? 'ring-4 ring-primary shadow-lg' : ''
                }`}
              />
              {isSelected && (
                <div className="absolute top-5 left-1/2 transform -translate-x-1/2 bg-white p-2 rounded shadow-md text-xs whitespace-nowrap">
                  <p className="font-medium">{province.nom}</p>
                  <Badge className="mt-1" variant="outline">{province.status}</Badge>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
