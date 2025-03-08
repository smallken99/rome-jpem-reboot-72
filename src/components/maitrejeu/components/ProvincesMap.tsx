
import React from 'react';
import { Province } from '../types/provinces';

interface ProvincesMapProps {
  provinces: Province[];
  onProvinceSelect: (provinceId: string) => void;
}

export const ProvincesMap: React.FC<ProvincesMapProps> = ({ provinces, onProvinceSelect }) => {
  const mapWidth = 800;
  const mapHeight = 600;
  
  const getProvinceColor = (status: string) => {
    switch (status) {
      case 'pacifiée': return '#22c55e'; // green
      case 'instable': return '#eab308'; // yellow
      case 'rebelle': return '#ef4444'; // red
      default: return '#94a3b8'; // slate
    }
  };
  
  return (
    <div className="h-full w-full flex items-center justify-center bg-slate-100 overflow-auto">
      <svg width={mapWidth} height={mapHeight} viewBox={`0 0 ${mapWidth} ${mapHeight}`}>
        {/* Map background */}
        <rect x="0" y="0" width={mapWidth} height={mapHeight} fill="#e2e8f0" />
        
        {/* Sea */}
        <rect x="0" y="0" width={mapWidth} height={mapHeight} fill="#bfdbfe" opacity="0.7" />
        
        {/* Land mass */}
        <path 
          d="M100,100 L700,100 L700,500 L100,500 Z" 
          fill="#d6d3d1" 
          stroke="#9ca3af" 
          strokeWidth="2"
        />
        
        {/* Italy */}
        <path 
          d="M400,300 L450,200 L430,350 L380,400 Z" 
          fill="#d6d3d1" 
          stroke="#9ca3af" 
          strokeWidth="2"
        />
        
        {/* Provinces */}
        {provinces.map((province) => (
          <g key={province.id} onClick={() => onProvinceSelect(province.id)} style={{ cursor: 'pointer' }}>
            {/* Use position if available or a default position */}
            <circle 
              cx={province.position?.x || Math.random() * 600 + 100} 
              cy={province.position?.y || Math.random() * 400 + 100} 
              r="20"
              fill={getProvinceColor(province.status)}
              stroke="#1e293b"
              strokeWidth="2"
              opacity="0.8"
            />
            <text 
              x={province.position?.x || Math.random() * 600 + 100} 
              y={(province.position?.y || Math.random() * 400 + 100) + 5}
              textAnchor="middle"
              fontSize="10"
              fill="#1e293b"
              fontWeight="bold"
            >
              {province.nom.substring(0, 3)}
            </text>
          </g>
        ))}
        
        {/* Legend */}
        <g transform="translate(650, 550)">
          <rect x="0" y="0" width="120" height="80" fill="white" stroke="#9ca3af" />
          <text x="60" y="15" textAnchor="middle" fontWeight="bold">Légende</text>
          
          <circle cx="15" cy="30" r="5" fill="#22c55e" />
          <text x="25" y="35" textAnchor="start">Pacifiée</text>
          
          <circle cx="15" cy="50" r="5" fill="#eab308" />
          <text x="25" y="55" textAnchor="start">Instable</text>
          
          <circle cx="15" cy="70" r="5" fill="#ef4444" />
          <text x="25" y="75" textAnchor="start">Rebelle</text>
        </g>
      </svg>
    </div>
  );
};
