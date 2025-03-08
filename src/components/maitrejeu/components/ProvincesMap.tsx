
import React from 'react';
import { Button } from "@/components/ui/button";
import { Province } from '../types/provinces';

interface ProvincesMapProps {
  provinces: Province[];
  onProvinceSelect: (id: string) => void;
}

export const ProvincesMap: React.FC<ProvincesMapProps> = ({ 
  provinces,
  onProvinceSelect
}) => {
  // Fonction pour obtenir la couleur appropriée selon le statut
  const getProvinceColor = (status: string) => {
    switch(status) {
      case 'pacifiée':
        return '#4ade80'; // Vert
      case 'instable':
        return '#facc15'; // Jaune
      case 'rebelle':
        return '#ef4444'; // Rouge
      case 'conquise':
        return '#60a5fa'; // Bleu
      default:
        return '#94a3b8'; // Gris
    }
  };
  
  const mapWidth = 600;
  const mapHeight = 400;
  
  return (
    <div className="bg-white p-4 rounded-md shadow overflow-x-auto">
      <h3 className="text-lg font-semibold mb-4">Carte des Provinces</h3>
      
      <svg width={mapWidth} height={mapHeight} viewBox={`0 0 ${mapWidth} ${mapHeight}`} className="border border-gray-200 bg-blue-50">
        {/* Mer Méditerranée (fond bleu clair) */}
        <rect x="0" y="0" width={mapWidth} height={mapHeight} fill="#cfe2ff" />
        
        {/* Italie (masse terrestre centrale) */}
        <path d="M250,100 L300,80 L320,150 L280,250 L230,280 L200,200 Z" fill="#e9d8a6" stroke="#bda77a" strokeWidth="1" />
        
        {/* Provinces */}
        {provinces.map((province) => {
          if (!province.position) return null;
          
          const { x, y } = province.position;
          const radius = 20;
          const color = getProvinceColor(province.status);
          
          return (
            <g key={province.id} onClick={() => onProvinceSelect(province.id)} style={{ cursor: 'pointer' }}>
              <circle 
                cx={x} 
                cy={y} 
                r={radius} 
                fill={color} 
                stroke="#ffffff" 
                strokeWidth="2"
                opacity="0.8"
              />
              <text 
                x={x} 
                y={y} 
                textAnchor="middle" 
                dominantBaseline="middle" 
                fill="#333333" 
                fontSize="10"
                fontWeight="bold"
              >
                {province.nom}
              </text>
            </g>
          );
        })}
        
        {/* Légende */}
        <g transform="translate(20, 340)">
          <text x="0" y="0" fontSize="12" fontWeight="bold">Statut des provinces:</text>
          
          <circle cx="10" cy="20" r="6" fill="#4ade80" />
          <text x="20" y="23" fontSize="10">Pacifiée</text>
          
          <circle cx="10" cy="40" r="6" fill="#facc15" />
          <text x="20" y="43" fontSize="10">Instable</text>
          
          <circle cx="10" cy="60" r="6" fill="#ef4444" />
          <text x="20" y="63" fontSize="10">Rebelle</text>
          
          <circle cx="90" cy="20" r="6" fill="#60a5fa" />
          <text x="100" y="23" fontSize="10">Conquise</text>
        </g>
      </svg>
      
      <div className="mt-4 text-sm text-gray-500 italic">
        Cliquez sur une province pour voir ses détails ou la modifier.
      </div>
    </div>
  );
};
